import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { of } from 'rxjs';
import { ContactFormComponent } from './contact-form.component';
import { ContactApiService } from '../../core/services/contact-api.service';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let mockContactApi: { sendMessage: () => any };

  beforeEach(async () => {
    mockContactApi = {
      sendMessage: () => of({ success: true }),
    };

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [{ provide: ContactApiService, useValue: mockContactApi }],
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

  it('debe transicionar a estado SUCCESS tras un envío exitoso', () => {
    component.contactForm.patchValue({
      name: 'Reclutador Tech',
      email: 'reclutador@empresa.com',
      subject: 'remote',
      message: 'Estimado Kevin, nos interesa evaluar tu perfil profesional.',
    });

    component.onSubmit();
    expect(component.submissionState()).toBe('SUCCESS');
  });
});
