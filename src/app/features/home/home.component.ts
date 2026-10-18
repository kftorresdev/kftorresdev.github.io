import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SkillsMatrixComponent } from '../skills/skills-matrix.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { ProjectCardComponent } from '../projects/components/project-card/project-card.component';
import { ArchitectureModalComponent } from '../projects/components/architecture-modal/architecture-modal.component';
import { ContactFormComponent } from '../contact/contact-form.component';
import { ProjectItem } from '../../core/models/portfolio.models';

/**
 * Página principal / Landing del portafolio.
 * Orquesta los componentes inteligentes y proyecta las secciones de contenido.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SkillsMatrixComponent,
    TimelineComponent,
    ProjectCardComponent,
    ArchitectureModalComponent,
    ContactFormComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly langService = inject(LanguageService);
  readonly dataService = inject(PortfolioDataService);

  /**
   * Signal que resguarda el proyecto activo para inspección en el modal de arquitectura.
   */
  readonly selectedProjectForModal = signal<ProjectItem | null>(null);

  readonly t = computed(() => this.langService.dictionary());

  /**
   * Abre el modal de arquitectura para el proyecto seleccionado.
   */
  openProjectModal(project: ProjectItem): void {
    this.selectedProjectForModal.set(project);
  }

  /**
   * Cierra el modal de arquitectura.
   */
  closeProjectModal(): void {
    this.selectedProjectForModal.set(null);
  }
}
