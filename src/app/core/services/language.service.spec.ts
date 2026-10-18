import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LanguageService } from './language.service';
import { SupportedLanguage } from '../models/portfolio.models';

describe('LanguageService', () => {
  let service: LanguageService;
  let titleService: Title;
  const originalLanguage = navigator.language;

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    Object.defineProperty(navigator, 'language', {
      value: originalLanguage,
      configurable: true,
      writable: true,
    });
    vi.restoreAllMocks();
  });

  function setupService(): LanguageService {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [LanguageService, Title],
    });
    service = TestBed.inject(LanguageService);
    titleService = TestBed.inject(Title);
    TestBed.flushEffects();
    return service;
  }

  it('debe inicializarse por defecto en español cuando no existe preferencia previa', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'es-HN',
      configurable: true,
      writable: true,
    });

    const s = setupService();

    expect(s.currentLanguage()).toBe('es');
    expect(s.isEnglish()).toBe(false);
    expect(s.dictionary().nav.projects).toBe('Proyectos');
    expect(document.documentElement.lang).toBe('es');
    expect(titleService.getTitle()).toBe(
      'Kevin Torres | Ingeniero de Software (Sistemas Web y Móviles)'
    );
  });

  it('debe inicializarse en inglés si el navegador reporta idioma inglés y no hay storage previo', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      configurable: true,
      writable: true,
    });

    const s = setupService();

    expect(s.currentLanguage()).toBe('en');
    expect(s.isEnglish()).toBe(true);
    expect(s.dictionary().nav.projects).toBe('Projects');
    expect(document.documentElement.lang).toBe('en');
    expect(titleService.getTitle()).toBe(
      'Kevin Torres | Software Engineer (Web & Mobile Systems)'
    );
  });

  it('debe cargar el idioma guardado previamente en localStorage', () => {
    localStorage.setItem('kftorres_lang', 'en');

    const s = setupService();

    expect(s.currentLanguage()).toBe('en');
    expect(s.isEnglish()).toBe(true);
    expect(s.dictionary().nav.projects).toBe('Projects');
  });

  it('debe aplicar fallback seguro a español si el valor en localStorage está corrupto o es inválido', () => {
    localStorage.setItem('kftorres_lang', 'fr-FR');
    Object.defineProperty(navigator, 'language', {
      value: 'es-419',
      configurable: true,
      writable: true,
    });

    const s = setupService();

    expect(s.currentLanguage()).toBe('es');
    expect(s.isEnglish()).toBe(false);
  });

  it('debe alternar fluidamente entre español e inglés al invocar toggleLanguage', () => {
    const s = setupService();
    s.setLanguage('es');
    TestBed.flushEffects();

    expect(s.currentLanguage()).toBe('es');
    expect(s.isEnglish()).toBe(false);

    // Alternar a inglés
    s.toggleLanguage();
    TestBed.flushEffects();

    expect(s.currentLanguage()).toBe('en');
    expect(s.isEnglish()).toBe(true);
    expect(s.dictionary().nav.projects).toBe('Projects');
    expect(localStorage.getItem('kftorres_lang')).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(titleService.getTitle()).toBe(
      'Kevin Torres | Software Engineer (Web & Mobile Systems)'
    );

    // Alternar de vuelta a español
    s.toggleLanguage();
    TestBed.flushEffects();

    expect(s.currentLanguage()).toBe('es');
    expect(s.isEnglish()).toBe(false);
    expect(s.dictionary().nav.projects).toBe('Proyectos');
    expect(localStorage.getItem('kftorres_lang')).toBe('es');
    expect(document.documentElement.lang).toBe('es');
    expect(titleService.getTitle()).toBe(
      'Kevin Torres | Ingeniero de Software (Sistemas Web y Móviles)'
    );
  });

  it('debe asignar idioma explícito mediante setLanguage y persistir en localStorage', () => {
    const s = setupService();

    s.setLanguage('en');
    TestBed.flushEffects();
    expect(s.currentLanguage()).toBe('en');
    expect(localStorage.getItem('kftorres_lang')).toBe('en');

    s.setLanguage('es');
    TestBed.flushEffects();
    expect(s.currentLanguage()).toBe('es');
    expect(localStorage.getItem('kftorres_lang')).toBe('es');
  });

  it('debe ignorar valores no soportados pasados a setLanguage', () => {
    const s = setupService();
    s.setLanguage('es');
    TestBed.flushEffects();

    // Intentar pasar un valor arbitrario no soportado mediante casteo forzado
    s.setLanguage('pt' as unknown as SupportedLanguage);
    TestBed.flushEffects();

    expect(s.currentLanguage()).toBe('es');
  });

  it('debe actualizar los diccionarios reactivos de cada sección con el idioma activo', () => {
    const s = setupService();

    s.setLanguage('es');
    expect(s.dictionary().hero.greeting).toBe('Hola, soy');
    expect(s.dictionary().contactSection.submitButton).toBe('Enviar Mensaje');
    expect(s.dictionary().skillsSection.filterFrontend).toBe('Frontend Web');

    s.setLanguage('en');
    expect(s.dictionary().hero.greeting).toBe("Hello, I'm");
    expect(s.dictionary().contactSection.submitButton).toBe('Send Message');
    expect(s.dictionary().skillsSection.filterFrontend).toBe('Frontend Web');
  });
});
