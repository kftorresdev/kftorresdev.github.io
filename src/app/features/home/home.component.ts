import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SkillsMatrixComponent } from '../skills/skills-matrix.component';
import { TimelineComponent } from '../timeline/timeline.component';

/**
 * Página principal / Landing del portafolio.
 * Orquesta los componentes inteligentes y proyecta las secciones de contenido.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SkillsMatrixComponent, TimelineComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly langService = inject(LanguageService);
  readonly dataService = inject(PortfolioDataService);

  readonly t = computed(() => this.langService.dictionary());
}
