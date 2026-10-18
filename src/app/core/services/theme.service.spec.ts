import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  function setupService(): ThemeService {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [ThemeService],
    });
    service = TestBed.inject(ThemeService);
    TestBed.flushEffects();
    return service;
  }

  it('debe inicializarse por defecto en modo oscuro (dark) cuando no hay preferencia guardada ni media query activa', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const s = setupService();

    expect(s.currentTheme()).toBe('dark');
    expect(s.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('kftorres_theme')).toBe('dark');
  });

  it('debe inicializarse en modo claro (light) si matchMedia reporta preferencia por tema claro y no hay storage previo', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const s = setupService();

    expect(s.currentTheme()).toBe('light');
    expect(s.isDark()).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('kftorres_theme')).toBe('light');
  });

  it('debe priorizar el valor almacenado en localStorage sobre la preferencia de matchMedia', () => {
    localStorage.setItem('kftorres_theme', 'dark');

    // matchMedia configurado en light, pero localStorage tiene dark
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: light)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const s = setupService();

    expect(s.currentTheme()).toBe('dark');
    expect(s.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('debe recuperarse ante un valor corrupto en localStorage y utilizar el valor por defecto', () => {
    localStorage.setItem('kftorres_theme', 'neon-cyberpunk-invalido');
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const s = setupService();

    expect(s.currentTheme()).toBe('dark');
    expect(s.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('debe alternar fluidamente entre temas oscuro y claro al invocar toggleTheme', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const s = setupService();
    expect(s.currentTheme()).toBe('dark');

    // Cambiar a claro
    s.toggleTheme();
    TestBed.flushEffects();

    expect(s.currentTheme()).toBe('light');
    expect(s.isDark()).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('kftorres_theme')).toBe('light');

    // Cambiar nuevamente a oscuro
    s.toggleTheme();
    TestBed.flushEffects();

    expect(s.currentTheme()).toBe('dark');
    expect(s.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('kftorres_theme')).toBe('dark');
  });

  it('debe asignar un tema explícito mediante setTheme y sincronizar clases del DOM', () => {
    const s = setupService();

    s.setTheme('light');
    TestBed.flushEffects();

    expect(s.currentTheme()).toBe('light');
    expect(s.isDark()).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('kftorres_theme')).toBe('light');

    s.setTheme('dark');
    TestBed.flushEffects();

    expect(s.currentTheme()).toBe('dark');
    expect(s.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('kftorres_theme')).toBe('dark');
  });
});
