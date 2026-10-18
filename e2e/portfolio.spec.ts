import { test, expect } from '@playwright/test';

/**
 * Suite de Pruebas End-to-End (E2E) con Playwright.
 * En cumplimiento estricto con la Sección 8.1 de la Constitución de Ingeniería v2.3.
 */
test.describe('Portafolio Profesional — Kevin Fernando Torres Castro', () => {

  test.beforeEach(async ({ page }) => {
    // Navegar a la raíz del portafolio
    await page.goto('/');
  });

  test('debe cargar el Hero Section con el titular y enlaces de descarga de CV', async ({ page }) => {
    // Validar nombre y headline principal
    await expect(page.locator('h1')).toContainText('Kevin Fernando Torres Castro');
    await expect(page.locator('text=Software Engineer')).toBeVisible();

    // Validar disponibilidad y titulación
    await expect(page.locator('text=Tegucigalpa, Honduras')).toBeVisible();

    // Validar enlaces de descarga de CV en PDF
    const cvDownloadLink = page.locator('a[download]').first();
    await expect(cvDownloadLink).toBeVisible();
    await expect(cvDownloadLink).toHaveAttribute('href', /CV_Kevin_Torres/);
  });

  test('debe alternar el idioma entre Español e Inglés instantáneamente sin recarga', async ({ page }) => {
    // Estado inicial en Español
    await expect(page.locator('nav a[href="#proyectos"]')).toHaveText('Proyectos');
    await expect(page.locator('nav a[href="#habilidades"]')).toHaveText('Habilidades');

    // Cambiar a Inglés
    const langToggle = page.locator('button:has-text("ES / EN"), button[aria-label*="inglés"], button[aria-label*="Spanish"]').first();
    await langToggle.click();

    // Verificar actualización instantánea de textos en Inglés
    await expect(page.locator('nav a[href="#proyectos"]')).toHaveText('Projects');
    await expect(page.locator('nav a[href="#habilidades"]')).toHaveText('Skills');
    await expect(page.locator('nav a[href="#experiencia"]')).toHaveText('Experience');
    await expect(page.locator('nav a[href="#contacto"]')).toHaveText('Contact');

    // Cambiar nuevamente a Español
    await langToggle.click();
    await expect(page.locator('nav a[href="#proyectos"]')).toHaveText('Proyectos');
  });

  test('debe conmutar el tema visual entre Modo Oscuro y Modo Claro', async ({ page }) => {
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);

    const themeToggle = page.locator('button[aria-label*="tema"], button[aria-label*="theme"]').first();
    await themeToggle.click();

    // Debe removerse la clase dark para activar el modo claro
    await expect(htmlElement).not.toHaveClass(/dark/);

    // Volver a modo oscuro
    await themeToggle.click();
    await expect(htmlElement).toHaveClass(/dark/);
  });

  test('debe abrir, navegar por pestañas y cerrar el modal de arquitectura de proyectos', async ({ page }) => {
    // Abrir modal del primer proyecto (CargoPulse Web)
    const openModalBtn = page.locator('button:has-text("Arquitectura & Retos"), button:has-text("Architecture & Challenges")').first();
    await openModalBtn.click();

    // Verificar presencia del modal accesible
    const modal = page.locator('div[role="dialog"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('CargoPulse Web');

    // Cambiar a la pestaña de Módulos del Sistema
    const modulesTab = modal.locator('button:has-text("Módulos del Sistema"), button:has-text("System Modules")');
    await modulesTab.click();
    await expect(modal).toContainText('Control Tower & Topological DAG');

    // Cambiar a la pestaña de Métricas & Calidad
    const metricsTab = modal.locator('button:has-text("Pruebas & Métricas"), button:has-text("QA & Test Matrix")');
    await metricsTab.click();
    await expect(modal).toContainText('322 (100% Pass)');

    // Cerrar el modal mediante la tecla Escape
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('debe filtrar reactivamente las habilidades técnicas en la matriz', async ({ page }) => {
    // Inicialmente se muestran todas las categorías
    const categoryHeadings = page.locator('section#habilidades h3');
    await expect(categoryHeadings).toHaveCount(5);

    // Filtrar por categoría Mobile
    const mobileFilterBtn = page.locator('section#habilidades button:has-text("Mobile")');
    await mobileFilterBtn.click();

    // Debe mostrarse únicamente 1 categoría (Ingeniería Móvil)
    await expect(page.locator('section#habilidades h3')).toHaveCount(1);
    await expect(page.locator('section#habilidades')).toContainText('.NET MAUI 9');

    // Restablecer filtro a "Todas"
    const allFilterBtn = page.locator('section#habilidades button:has-text("Todas"), section#habilidades button:has-text("All")');
    await allFilterBtn.click();
    await expect(page.locator('section#habilidades h3')).toHaveCount(5);
  });

  test('debe validar campos obligatorios en el formulario de contacto', async ({ page }) => {
    // Intentar enviar formulario vacío
    const submitBtn = page.locator('section#contacto button[type="submit"]');
    await submitBtn.click();

    // Deben activarse mensajes de error de validación
    await expect(page.locator('section#contacto')).toContainText(/Ingresa un nombre válido|Please provide a valid name/);
    await expect(page.locator('section#contacto')).toContainText(/formato válido|valid.*email/);
  });

});
