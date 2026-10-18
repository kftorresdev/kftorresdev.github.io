import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { FloatingActionsComponent } from './floating-actions.component';

describe('FloatingActionsComponent', () => {
  let component: FloatingActionsComponent;
  let fixture: ComponentFixture<FloatingActionsComponent>;
  const originalScrollTo = window.scrollTo;
  const originalMatchMedia = window.matchMedia;

  beforeEach(async () => {
    window.scrollTo = vi.fn();
    await TestBed.configureTestingModule({
      imports: [FloatingActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('debe instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener el estado inicial de showScrollTop en false', () => {
    expect(component.showScrollTop()).toBe(false);
  });

  it('debe mostrar el botón de scroll al superar el umbral de 350 píxeles', () => {
    Object.defineProperty(window, 'scrollY', { value: 400, configurable: true, writable: true });
    component.onWindowScroll();
    expect(component.showScrollTop()).toBe(true);

    Object.defineProperty(window, 'scrollY', { value: 200, configurable: true, writable: true });
    component.onWindowScroll();
    expect(component.showScrollTop()).toBe(false);
  });

  it('debe ejecutar desplazamiento suave al invocar scrollToTop con movimiento estándar', () => {
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

    component.scrollToTop();

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('debe ejecutar desplazamiento instantáneo al invocar scrollToTop con movimiento reducido', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    component.scrollToTop();

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });
});
