import { Component, ChangeDetectionStrategy, inject, signal, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';

/**
 * Componente de acciones flotantes rápidas (WhatsApp directo y retorno al inicio).
 */
@Component({
  selector: 'app-floating-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-actions.component.html',
  styleUrls: ['./floating-actions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingActionsComponent {
  readonly langService = inject(LanguageService);
  readonly dataService = inject(PortfolioDataService);

  /**
   * Signal que indica si el usuario ha hecho scroll hacia abajo para mostrar el botón de subida.
   */
  readonly showScrollTop = signal<boolean>(false);

  readonly whatsappUrl = computed(() => this.dataService.profile.whatsappUrl);
  readonly tooltipText = computed(() =>
    this.langService.isEnglish() ? 'Message on WhatsApp' : 'Contactar por WhatsApp'
  );
  readonly scrollTopText = computed(() =>
    this.langService.isEnglish() ? 'Scroll to top' : 'Volver arriba'
  );

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.showScrollTop.set(window.scrollY > 350);
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
