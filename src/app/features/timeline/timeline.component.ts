import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

/**
 * Componente de Línea de Tiempo Profesional y Formación Académica.
 * Proyecta la trayectoria verificada en Grupo Vesta, MoviText y la UNAH.
 */
@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  readonly langService = inject(LanguageService);
  readonly dataService = inject(PortfolioDataService);

  readonly t = computed(() => this.langService.dictionary().timelineSection);
}
