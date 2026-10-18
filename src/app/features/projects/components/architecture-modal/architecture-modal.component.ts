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
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../core/services/language.service';
import { ProjectItem } from '../../../../core/models/portfolio.models';

export type ModalTab = 'overview' | 'architecture' | 'metrics';

/**
 * Modal interactivo para inspección técnica y arquitectónica de proyectos.
 * Capa 1 (UI) conforme a la Constitución de Ingeniería v2.3 y WCAG 2.1 AA.
 * Implementa gestión estricta de foco, trampa de teclado y tecla Escape.
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
  private readonly elementRef = inject(ElementRef);

  /**
   * Elemento previamente enfocado antes de abrir el modal para su restauración accesible.
   */
  private previouslyFocusedElement: HTMLElement | null = null;

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
    // Control defensivo del scroll del body y gestión accesible del foco
    effect(() => {
      const proj = this.project();
      if (typeof document !== 'undefined') {
        if (proj) {
          this.previouslyFocusedElement = document.activeElement as HTMLElement | null;
          document.body.style.overflow = 'hidden';
          this.activeTab.set('overview');

          // Trasladar el foco al botón de cerrar o al diálogo para usuarios de lectores de pantalla
          setTimeout(() => {
            const host = this.elementRef.nativeElement as HTMLElement;
            const closeBtn = host.querySelector<HTMLElement>('#modal-close-button');
            if (closeBtn) {
              closeBtn.focus();
            } else {
              const dialog = host.querySelector<HTMLElement>('[role="dialog"]');
              dialog?.focus();
            }
          }, 0);
        } else {
          document.body.style.overflow = '';
          if (this.previouslyFocusedElement) {
            this.previouslyFocusedElement.focus();
            this.previouslyFocusedElement = null;
          }
        }
      }
    });
  }

  /**
   * Escucha la tecla Escape para cerrar el modal de forma accesible (WCAG 2.1 AA).
   */
  @HostListener('window:keydown.escape')
  onEscape(): void {
    if (this.project()) {
      this.closeModal.emit();
    }
  }

  /**
   * Trampa de foco accesible (Focus Trap) para ciclar navegación por tabulación dentro del modal.
   */
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.project() || event.key !== 'Tab') {
      return;
    }

    const host = this.elementRef.nativeElement as HTMLElement;
    const focusableElements = host.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  setTab(tab: ModalTab): void {
    if (tab === 'overview' || tab === 'architecture' || tab === 'metrics') {
      this.activeTab.set(tab);
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (!event || !event.target) {
      return;
    }
    const target = event.target as HTMLElement;
    if (target.classList && target.classList.contains('modal-backdrop')) {
      this.closeModal.emit();
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
