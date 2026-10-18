import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  inject,
  computed,
  effect,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';
import { ProjectItem } from '../../../../core/models/portfolio.models';

export type ModalTab = 'overview' | 'architecture' | 'metrics';

/**
 * Modal interactivo para inspección técnica y arquitectónica de proyectos.
 * Capa 1 (UI) conforme a la Constitución de Ingeniería v2.3.
 */
@Component({
  selector: 'app-architecture-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './architecture-modal.component.html',
  styleUrls: ['./architecture-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchitectureModalComponent {
  readonly langService = inject(LanguageService);

  /**
   * Proyecto activo a inspeccionar (null si el modal está cerrado).
   */
  readonly project = input<ProjectItem | null>(null);

  /**
   * Emisor de evento para cerrar el modal.
   */
  readonly closeModal = output<void>();

  /**
   * Pestaña activa dentro del modal ('overview' | 'architecture' | 'metrics').
   */
  readonly activeTab = signal<ModalTab>('overview');

  readonly t = computed(() => this.langService.dictionary().projectsSection);

  constructor() {
    // Control defensivo del scroll del body cuando el modal está abierto
    effect(() => {
      const proj = this.project();
      if (typeof document !== 'undefined') {
        if (proj) {
          document.body.style.overflow = 'hidden';
          this.activeTab.set('overview');
        } else {
          document.body.style.overflow = '';
        }
      }
    });
  }

  /**
   * Escucha la tecla Escape para cerrar el modal de forma accesible.
   */
  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.project()) {
      this.closeModal.emit();
    }
  }

  setTab(tab: ModalTab): void {
    this.activeTab.set(tab);
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal.emit();
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
