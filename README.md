# ⚡ Kevin Torres — Software Engineering Portfolio & Systems Architecture Showcase

<div align="center">

[![CI/CD Pipeline](https://github.com/kftorresdev/kftorresdev.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/kftorresdev/kftorresdev.github.io/actions)
[![Angular 21](https://img.shields.io/badge/Angular_21-Zoneless_%2B_Signals-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit_Tests-FCC72B?style=for-the-badge&logo=vitest&logoColor=black)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Tests-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

<p align="center">
  <a href="https://kftorresdev.github.io/">
    <img src="https://img.shields.io/badge/🚀_LIVE_PORTFOLIO-Visit_kftorresdev.github.io-blueviolet?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Portfolio on GitHub Pages" />
  </a>
</p>

<p align="center">
  <strong>High-performance, mission-critical Software Engineering Portfolio and Interactive Systems Architecture Showcase for Kevin Fernando Torres Castro (@kftorresdev).</strong>
</p>

<p align="center">
  <a href="#-1-visión-operativa-y-perfiles-objetivo">Visión Operativa</a> •
  <a href="#-2-arquitectura-y-stack-tecnológico">Arquitectura & C4</a> •
  <a href="#-3-topología-de-red-y-despliegue-estático">Topología & Despliegue</a> •
  <a href="#-4-proyectos-insignia-y-datos-maestros">Proyectos & Datos</a> •
  <a href="#-5-instalación-compilación-y-testing">Instalación & Tests</a> •
  <a href="#-6-automatización-de-pruebas-e2e-playwright">Playwright E2E</a> •
  <a href="#-7-empaquetado-de-producción--cicd">CI/CD & Producción</a> •
  <a href="#-8-autor-y-contacto-profesional">Autor & Contacto</a>
</p>

</div>

---

## 📋 1. Visión Operativa y Perfiles Objetivo

Este portafolio profesional es un artefacto de ingeniería de software en sí mismo. Ha sido construido bajo la **Constitución Maestra de Ingeniería de Software (v2.3)** para resolver la fricción del filtro inicial de 30 segundos en procesos de contratación técnica internacional:

### Los 4 Pilares Operativos
1. **⚡ Rendimiento Extremo & Core Web Vitals:** Arquitectura Angular 21 Standalone sin `zone.js` (*Zoneless*), gobernada exclusivamente por Signals nativos (`signal()`, `computed()`), logrando un tiempo de carga del primer contenido ($FCP < 0.8\text{ s}$) y puntuaciones de Google Lighthouse $\ge 98$.
2. **🌐 Bilingüismo Reactivo Instantáneo (ES / EN):** Conmutación de idioma en un solo fotograma ($< 16\text{ ms}$) mediante el `LanguageService` reactivo sin recargar el navegador ni perder el estado de lectura del evaluador.
3. **🏛️ Demostración de Arquitectura Real (No Proyectos de Juguete):** Análisis profundo de sistemas de misión crítica en producción: telemetría logística con topología DAG SVG ([CargoPulse Web](https://github.com/kftorresdev/CargoPulse)) e inspección móvil industrial con persistencia SQLite Offline-First ([CargoPulse Mobile](https://github.com/kftorresdev/CargoPulse-mobile)).
4. **🔒 Tríada Anti-Congelamiento en Contacto:** Formulario reactivo protegido contra spam (*Honeypot*), validación asíncrona, temporizador de corte (timeout de 8s) y canales directos alternativos a WhatsApp y correo sin fricción.

---

## 🏛️ 2. Arquitectura y Stack Tecnológico

El proyecto está diseñado bajo **Clean Architecture en 3 Capas**, respetando rigurosamente la separación de responsabilidades:

```mermaid
flowchart TD
    subgraph UI ["Capa 1: Presentación UI (Componentes Standalone OnPush)"]
        Navbar["Navbar Glassmorphism & Toggles"]
        Hero["Hero Section & Badges"]
        Projects["Featured Projects Showcase"]
        Skills["Interactive Skills Matrix"]
        Timeline["Experience & Education Timeline"]
        Contact["Reactive Contact Form (Serverless)"]
    end

    subgraph StateStore ["Capa 2: Store Reactivo / Signals (El Cerebro)"]
        LangStore["LanguageService (ES / EN Signals)"]
        ThemeStore["ThemeService (Dark / Light Signals)"]
        DataStore["PortfolioStore (Filters, Active Modals)"]
    end

    subgraph CoreData ["Capa 3: Datos Tipados & Mensajería (El Mensajero)"]
        DataService["PortfolioDataService (Modelos TypeScript Inmutables)"]
        ContactApi["ContactApiService (HTTP POST Serverless / Honeypot)"]
    end

    UI -->|Inyección inject() & Eventos| StateStore
    StateStore -->|Signals Reactivos (Readonly)| UI
    StateStore -->|Consultas Tipadas| CoreData
    CoreData -->|DTOs Tipados| StateStore
```

### Tecnologías Clave:
* **Framework:** Angular 21 Standalone en modo Zoneless (`provideZonelessChangeDetection()`).
* **Lenguaje:** TypeScript 5.9+ con tipado estricto (`"strict": true`, cero `any`).
* **Estilos & Diseño:** Tailwind CSS v4.1 con tokens de diseño dinámicos para Dark y Light mode.
* **Pruebas Unitarias:** Vitest 4.1 con entorno DOM para pruebas ultrarrápidas de Signals y servicios.
* **Pruebas E2E:** Playwright Test para validación de flujos de usuario en navegadores Chromium.
* **Despliegue:** GitHub Pages con automatización mediante GitHub Actions.

---

## 🌐 3. Topología de Red y Despliegue Estático

El portafolio reside en el repositorio canónico de GitHub Pages `kftorresdev.github.io`:
* **URL Pública de Producción:** `https://kftorresdev.github.io/`
* **CDN Global:** Servido mediante la red distribuida de GitHub Pages con compresión Brotli/Gzip y certificados SSL/TLS automáticos.
* **Soporte de Rutas SPA:** Script `404.html` en la raíz de salida que intercepta rutas profundas y las restaura transparentemente en `index.html` sin mostrar errores de página no encontrada.

---

## 📦 4. Proyectos Insignia y Datos Maestros

El portafolio expone dos proyectos de gran envergadura desarrollados bajo la misma Constitución de Ingeniería:

| Proyecto | Plataforma & Stack | Problema de Negocio Resuelto | Cobertura de Pruebas | Enlaces Canónicos |
| :--- | :--- | :--- | :---: | :--- |
| **CargoPulse Web** | Angular 21 Zoneless, NestJS 12, Prisma, PostgreSQL, Docker | Ceguera topológica en fletes transfronterizos mediante grafo DAG SVG interactivo y motor de auditoría de 5 tramos. | **322 Tests (100% Pass)** | [Demo en Vivo](https://kftorresdev.github.io/CargoPulse/) · [GitHub](https://github.com/kftorresdev/CargoPulse) |
| **CargoPulse Mobile** | .NET MAUI 9, C# 13, SQLite local, CommunityToolkit.Mvvm | Digitalización de inspecciones de patio sin señal celular mediante arquitectura Offline-First, escáner ZXing y firma digital. | **251 Tests Unitarios (~410ms)** | [GitHub](https://github.com/kftorresdev/CargoPulse-mobile) |

---

## 🚀 5. Instalación, Compilación y Testing

### Requisitos Previos:
* **Node.js:** v20.x o v22.x LTS
* **npm:** v10.x o superior
* **Git:** 2.x+

### 1. Clonar el Repositorio e Instalar Dependencias:
```bash
git clone https://github.com/kftorresdev/kftorresdev.github.io.git
cd kftorresdev.github.io
npm install --legacy-peer-deps
```

### 2. Iniciar Servidor de Desarrollo Local:
```bash
npm start
# La aplicación iniciará en http://localhost:4200 con recarga en caliente (HMR)
```

### 3. Ejecutar Pruebas Unitarias con Vitest:
```bash
npm run test:unit
```

### 4. Compilar para Producción:
```bash
npm run build:prod
# Los archivos optimizados se generan en dist/portfolio/browser
```

---

## 🎭 6. Automatización de Pruebas E2E (Playwright)

El portafolio incluye una suite de pruebas End-to-End que valida los flujos críticos de la interfaz:
```bash
# Ejecutar suite E2E completa en modo headless
npm run test:e2e

# Ejecutar con visor interactivo de Playwright
npx playwright test --ui
```

---

## 📦 7. Empaquetado de Producción & CI/CD

El repositorio cuenta con integración continua y entrega continua automatizada en `.github/workflows/deploy.yml`:
1. **Linter & Formato:** Validación de estándares de código.
2. **Pruebas Unitarias:** Ejecución de suites Vitest en cada Pull Request y push a `main`.
3. **Build de Producción:** Compilación Ahead-of-Time (AOT) con presupuestos estrictos de tamaño de bundle.
4. **Despliegue a GitHub Pages:** Carga segura de artefactos mediante `actions/deploy-pages@v4`.

---

## 👨‍💻 8. Autor y Contacto Profesional

**Kevin Fernando Torres Castro**  
*Software Engineer | Web & Mobile Systems Specialist*  
*Ingeniero en Sistemas (UNAH 2025)*  

- 🌐 **GitHub:** [@kftorresdev](https://github.com/kftorresdev)
- 💼 **LinkedIn:** [kevin-torres-developer](https://www.linkedin.com/in/kevin-torres-developer)
- 💬 **WhatsApp:** [+504 9375-7672](https://wa.me/50493757672)
- 📧 **Correo Electrónico:** [kevin.torres.9800@gmail.com](mailto:kevin.torres.9800@gmail.com)
- 📍 **Ubicación:** Tegucigalpa, Honduras (UTC-6 / US Central Time Zone) — Solapamiento comercial completo con EE. UU.

---

## 📄 Licencia
Este proyecto está protegido bajo la [Licencia MIT](LICENSE) — ver archivo para más detalles.
