import { Injectable, computed, effect, signal } from '@angular/core';
import { ThemeMode } from '../models/portfolio.models';

/**
 * Servicio singleton encargado de la gobernanza del tema visual (Dark / Light).
 * Administra el estado reactivo mediante Signals y manipula la clase 'dark' en el documento HTML.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'kftorres_theme';

  /**
   * Signal reactivo que resguarda el modo de tema activo.
   */
  readonly currentTheme = signal<ThemeMode>(this.getInitialTheme());

  /**
   * Signal derivado que indica si el modo oscuro está activo.
   */
  readonly isDark = computed<boolean>(() => this.currentTheme() === 'dark');

  constructor() {
    // Sincronización reactiva con las clases del elemento raíz HTML y almacenamiento
    effect(() => {
      const theme = this.currentTheme();
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, theme);
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    });
  }

  /**
   * Alterna fluidamente entre modo oscuro y modo claro.
   */
  toggleTheme(): void {
    const nextTheme: ThemeMode = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.currentTheme.set(nextTheme);
  }

  /**
   * Fija un modo de tema específico.
   */
  setTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
  }

  /**
   * Resuelve el tema inicial desde localStorage o preferencia del sistema operativo.
   */
  private getInitialTheme(): ThemeMode {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    const saved = localStorage.getItem(this.STORAGE_KEY) as ThemeMode | null;
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }

    // Por defecto se prefiere el tema oscuro de alta tecnología
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  }
}
