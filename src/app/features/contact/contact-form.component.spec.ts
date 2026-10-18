import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { of, throwError, Observable } from 'rxjs';
import { ContactFormComponent } from './contact-form.component';
import { ContactApiService, ContactSubmissionResult } from '../../core/services/contact-api.service';
import { ContactMessageDto } from '../../core/models/portfolio.models';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let mockSendMessage: Mock<(dto: ContactMessageDto) => Observable<ContactSubmissionResult>>;

  beforeEach(async () => {
    mockSendMessage = vi.fn<(dto: ContactMessageDto) => Observable<ContactSubmissionResult>>().mockReturnValue(
      of({ success: true })
    );

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [
        {
          provide: ContactApiService,
          useValue: { sendMessage: mockSendMessage },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con valores inválidos por defecto', () => {
    expect(component.contactForm.valid).toBe(false);
  });

  it('debe validar requerimientos de nombre, correo y mensaje', () => {
    const form = component.contactForm;
    form.patchValue({
      name: 'Al',
      email: 'invalido',
      subject: 'remote',
      message: 'muy corto',
    });

    expect(form.valid).toBe(false);

    form.patchValue({
      name: 'Alejandro Mendoza',
      email: 'alejandro@empresa.com',
      subject: 'remote',
      message: 'Este es un mensaje válido con longitud adecuada para pruebas.',
    });

    expect(form.valid).toBe(true);
  });

  it('debe marcar todos los campos como touched y no enviar si el formulario es inválido', () => {
    expect(component.contactForm.valid).toBe(false);

    component.onSubmit();

    expect(component.contactForm.get('name')?.touched).toBe(true);
    expect(component.contactForm.get('email')?.touched).toBe(true);
    expect(component.contactForm.get('message')?.touched).toBe(true);
    expect(component.submissionState()).toBe('IDLE');
    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('debe transicionar a estado SUCCESS tras un envío exitoso y limpiar el formulario', () => {
    component.contactForm.patchValue({
      name: 'Reclutador Tech',
      email: 'reclutador@empresa.com',
      subject: 'remote',
      message: 'Estimado Kevin, nos interesa evaluar tu perfil profesional.',
    });

    component.onSubmit();

    expect(mockSendMessage).toHaveBeenCalledTimes(1);
    expect(component.submissionState()).toBe('SUCCESS');
    expect(component.currentMessageLength()).toBe(0);
  });

  it('debe transicionar a estado ERROR ante fallo de red o rechazo de API', () => {
    mockSendMessage.mockReturnValue(throwError(() => new Error('Fallo de conexión')));

    component.contactForm.patchValue({
      name: 'Reclutador Tech',
      email: 'reclutador@empresa.com',
      subject: 'remote',
      message: 'Estimado Kevin, nos interesa evaluar tu perfil profesional.',
    });

    component.onSubmit();

    expect(mockSendMessage).toHaveBeenCalledTimes(1);
    expect(component.submissionState()).toBe('ERROR');
  });

  it('debe permitir reintentar el envío mediante el método retry', () => {
    component.contactForm.patchValue({
      name: 'Reclutador Tech',
      email: 'reclutador@empresa.com',
      subject: 'remote',
      message: 'Estimado Kevin, nos interesa evaluar tu perfil profesional.',
    });

    // Simulamos un primer fallo
    mockSendMessage.mockReturnValueOnce(throwError(() => new Error('Error')));
    component.onSubmit();
    expect(component.submissionState()).toBe('ERROR');

    // Ahora el reintento será exitoso
    mockSendMessage.mockReturnValueOnce(of({ success: true }));
    component.retry();

    expect(component.submissionState()).toBe('SUCCESS');
  });

  it('debe ignorar envíos simultáneos cuando el estado actual es SUBMITTING', () => {
    component.submissionState.set('SUBMITTING');

    component.contactForm.patchValue({
      name: 'Reclutador Tech',
      email: 'reclutador@empresa.com',
      subject: 'remote',
      message: 'Estimado Kevin, nos interesa evaluar tu perfil profesional.',
    });

    component.onSubmit();

    expect(mockSendMessage).not.toHaveBeenCalled();
  });

  it('debe actualizar reactivamente el contador de caracteres al escribir en el mensaje', () => {
    expect(component.currentMessageLength()).toBe(0);

    component.contactForm.patchValue({ message: 'Hola mundo' });
    expect(component.currentMessageLength()).toBe(10);

    component.contactForm.patchValue({ message: '' });
    expect(component.currentMessageLength()).toBe(0);
  });

  it('debe evaluar correctamente la validez visual mediante isFieldInvalid', () => {
    const nameControl = component.contactForm.get('name');

    // No tocado ni sucio: no debe marcarse inválido visualmente
    expect(component.isFieldInvalid('name')).toBe(false);

    // Tocado pero inválido
    nameControl?.markAsTouched();
    expect(component.isFieldInvalid('name')).toBe(true);

    // Con valor válido y tocado
    nameControl?.setValue('Kevin Torres');
    expect(component.isFieldInvalid('name')).toBe(false);
  });

  it('debe restablecer el estado a IDLE mediante resetState', () => {
    component.submissionState.set('ERROR');
    component.resetState();
    expect(component.submissionState()).toBe('IDLE');
  });
});
