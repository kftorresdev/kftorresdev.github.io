import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageService } from '../../core/services/language.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { ContactApiService } from '../../core/services/contact-api.service';
import { ContactMessageDto } from '../../core/models/portfolio.models';

export type FormSubmissionState = 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';

/**
 * Componente del formulario de contacto reactivo con integración serverless.
 * Capa 1 (UI) conforme a la Constitución de Ingeniería v2.3.
 * Implementa los 4 estados de interfaz: Cargando, Vacío, Error y Exitoso.
 */
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly langService = inject(LanguageService);
  readonly dataService = inject(PortfolioDataService);
  private readonly contactApi = inject(ContactApiService);

  /**
   * Signal reactivo con el estado del proceso de envío.
   */
  readonly submissionState = signal<FormSubmissionState>('IDLE');

  /**
   * Formulario reactivo tipado y validado.
   */
  readonly contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['remote', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(15)]],
    _gotcha: [''], // Campo señuelo invisible (Honeypot)
  });

  readonly t = computed(() => this.langService.dictionary().contactSection);

  /**
   * Contador de caracteres del mensaje actual.
   */
  readonly currentMessageLength = signal<number>(0);

  constructor() {
    this.contactForm
      .get('message')
      ?.valueChanges.pipe(takeUntilDestroyed())
      .subscribe((val: string | null) => {
        this.currentMessageLength.set(val ? val.length : 0);
      });
  }

  /**
   * Procesa el envío del formulario aplicando Guard Clauses y la Tríada Anti-Congelamiento.
   */
  onSubmit(): void {
    // Guard Clause 1: Formulario inválido
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // Guard Clause 2: Prevención de envíos simultáneos (Idempotencia)
    if (this.submissionState() === 'SUBMITTING') {
      return;
    }

    this.submissionState.set('SUBMITTING');

    const formValues = this.contactForm.getRawValue() as Record<string, unknown>;
    const name = typeof formValues['name'] === 'string' ? formValues['name'].trim() : '';
    const email = typeof formValues['email'] === 'string' ? formValues['email'].trim() : '';
    const subject = typeof formValues['subject'] === 'string' ? formValues['subject'].trim() : 'remote';
    const message = typeof formValues['message'] === 'string' ? formValues['message'].trim() : '';
    const gotcha = typeof formValues['_gotcha'] === 'string' ? formValues['_gotcha'].trim() : undefined;

    const payload: ContactMessageDto = {
      name,
      email,
      subject,
      message,
      _gotcha: gotcha,
    };

    this.contactApi.sendMessage(payload).subscribe({
      next: () => {
        this.submissionState.set('SUCCESS');
        this.contactForm.reset({ subject: 'remote' });
        this.currentMessageLength.set(0);

        // Auto-cierre del feedback de éxito a los 6 segundos
        setTimeout(() => {
          if (this.submissionState() === 'SUCCESS') {
            this.submissionState.set('IDLE');
          }
        }, 6000);
      },
      error: () => {
        this.submissionState.set('ERROR');
      },
    });
  }

  /**
   * Permite al usuario reintentar el envío tras un error de red.
   */
  retry(): void {
    this.submissionState.set('IDLE');
    this.onSubmit();
  }

  /**
   * Restablece el formulario a su estado inactivo.
   */
  resetState(): void {
    this.submissionState.set('IDLE');
  }

  /**
   * Auxiliar de comprobación de errores en campos de formulario.
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
