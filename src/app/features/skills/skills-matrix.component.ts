import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SkillCategory, SkillCategoryKey } from '../../core/models/portfolio.models';

/**
 * Componente interactivo de la Matriz de Habilidades Técnicas.
 * Capa 1 (UI) conforme a la Constitución de Ingeniería v2.3.
 * Reactividad gobernada con Signals para filtrado instantáneo por dominio.
 */
@Component({
  selector: 'app-skills-matrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-matrix.component.html',
  styleUrls: ['./skills-matrix.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsMatrixComponent {
  readonly langService = inject(LanguageService);
  readonly dataService = inject(PortfolioDataService);

  /**
   * Signal reactivo para la categoría seleccionada ('all' o clave específica).
   */
  readonly activeCategory = signal<SkillCategoryKey | 'all'>('all');

  /**
   * Signal derivado con el diccionario de textos actual.
   */
  readonly t = computed(() => this.langService.dictionary().skillsSection);

  /**
   * Signal derivado con las categorías filtradas reactivamente.
   */
  readonly displayedCategories = computed<readonly SkillCategory[]>(() => {
    const filter = this.activeCategory();
    if (filter === 'all') {
      return this.dataService.skillCategories;
    }
    return this.dataService.skillCategories.filter((cat) => cat.key === filter);
  });

  /**
   * Signal derivado que indica si el estado actual está vacío.
   */
  readonly isEmpty = computed<boolean>(() => this.displayedCategories().length === 0);

  /**
   * Cambia la categoría de filtro activa.
   */
  setFilter(categoryKey: SkillCategoryKey | 'all'): void {
    if (!categoryKey) {
      return;
    }
    this.activeCategory.set(categoryKey);
  }

  /**
   * Restablece el filtro a 'all' (Estado Vacío -> Activo).
   */
  resetFilter(): void {
    this.activeCategory.set('all');
  }
}
