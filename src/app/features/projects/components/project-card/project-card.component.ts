import { Component, ChangeDetectionStrategy, input, output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';
import { ProjectItem } from '../../../../core/models/portfolio.models';

/**
 * Tarjeta individual para presentación de estudios de caso de proyectos.
 * Capa 1 (UI) conforme a la Constitución de Ingeniería v2.3.
 */
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly langService = inject(LanguageService);

  /**
   * Proyecto a renderizar.
   */
  readonly project = input.required<ProjectItem>();

  /**
   * Emisor de evento para desplegar el modal de arquitectura profunda.
   */
  readonly openModal = output<ProjectItem>();

  readonly t = computed(() => this.langService.dictionary().projectsSection);

  /**
   * Enlace localizado a GitHub o a la documentación correspondiente según el idioma activo.
   */
  readonly localizedGithubUrl = computed<string>(() => {
    const proj = this.project();
    const currentLang = this.langService.currentLanguage();
    return proj.githubReadmeUrls?.[currentLang] ?? proj.githubUrl;
  });

  onOpenArchitecture(): void {
    const proj = this.project();
    if (!proj) {
      return;
    }
    this.openModal.emit(proj);
  }
}
