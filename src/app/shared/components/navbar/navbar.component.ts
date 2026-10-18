import { Component, ChangeDetectionStrategy, inject, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { ThemeService } from '../../../core/services/theme.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';

/**
 * Componente de barra de navegación principal con efecto Glassmorphism.
 * Capa 1 (UI) conforme a la Constitución de Ingeniería v2.3.
 * Reactividad gobernada exclusivamente por Signals y ChangeDetectionStrategy.OnPush.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly langService = inject(LanguageService);
  readonly themeService = inject(ThemeService);
  readonly dataService = inject(PortfolioDataService);

  /**
   * Signal que resguarda el estado de apertura del menú móvil.
   */
  readonly isMobileMenuOpen = signal<boolean>(false);

  /**
   * Signal reactivo con el diccionario de textos actual.
   */
  readonly t = computed(() => this.langService.dictionary().nav);

  /**
   * URL de descarga del CV correspondiente al idioma activo.
   */
  readonly activeCvUrl = computed(() => {
    const lang = this.langService.currentLanguage();
    return this.dataService.profile.cvDownloadUrls[lang];
  });

  /**
   * Alterna la visualización del menú en dispositivos móviles.
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  /**
   * Cierra el menú móvil tras seleccionar una sección.
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  /**
   * Cierra el menú móvil accesiblemente al pulsar la tecla Escape.
   */
  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.isMobileMenuOpen()) {
      this.closeMobileMenu();
    }
  }

  /**
   * Conmuta el idioma entre español e inglés.
   */
  onToggleLanguage(): void {
    this.langService.toggleLanguage();
  }

  /**
   * Conmuta el tema visual entre oscuro y claro.
   */
  onToggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
