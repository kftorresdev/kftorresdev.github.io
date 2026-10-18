import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';
import { PortfolioDataService } from '../../../core/services/portfolio-data.service';

/**
 * Componente de pie de página (Footer) oficial del portafolio.
 * Proyecta metadatos, zona horaria y enlaces profesionales.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly langService = inject(LanguageService);
  readonly dataService = inject(PortfolioDataService);

  readonly currentYear = new Date().getFullYear();
  readonly t = computed(() => this.langService.dictionary().footer);
}
