import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ContactApiService } from './contact-api.service';
import { ContactMessageDto } from '../models/portfolio.models';

describe('ContactApiService', () => {
  let service: ContactApiService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ContactApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('debe instanciarse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('Guarda de seguridad Honeypot', () => {
    it('debe neutralizar silenciosamente envíos con honeypot lleno', () => {
      const spamPayload: ContactMessageDto = {
        name: 'SpamBot',
        email: 'bot@spam.com',
        subject: 'Spam Subject',
        message: 'Mensaje no deseado de spammer',
        _gotcha: 'Soy un bot malicioso',
      };

      let resultReceived = false;
      service.sendMessage(spamPayload).subscribe((res) => {
        expect(res.success).toBe(true);
        expect(res.message).toBe('Operación procesada');
        resultReceived = true;
      });

      expect(resultReceived).toBe(true);
      // No debe emitir ninguna petición HTTP hacia el endpoint remoto
      httpTesting.expectNone('https://formspree.io/f/xvgqkjjz');
    });

    it('debe procesar la petición HTTP si honeypot solo contiene espacios o está vacío', () => {
      const legitPayload: ContactMessageDto = {
        name: 'Usuario Real',
        email: 'real@domain.com',
        subject: 'project',
        message: 'Mensaje de usuario con campo honeypot vacío o sólo espacios.',
        _gotcha: '   ',
      };

      service.sendMessage(legitPayload).subscribe((res) => {
        expect(res.success).toBe(true);
      });

      const req = httpTesting.expectOne('https://formspree.io/f/xvgqkjjz');
      expect(req.request.method).toBe('POST');
      req.flush({ ok: true });
    });
  });

  describe('Comunicación HTTP y cabeceras', () => {
    it('debe enviar cabeceras Content-Type y Accept con application/json', () => {
      const validPayload: ContactMessageDto = {
        name: 'Reclutador Tech',
        email: 'recruiter@company.com',
        subject: 'Oportunidad Remota',
        message: 'Nos gustaría entrevistarte para una posición de Software Engineer.',
      };

      service.sendMessage(validPayload).subscribe((res) => {
        expect(res.success).toBe(true);
      });

      const req = httpTesting.expectOne('https://formspree.io/f/xvgqkjjz');
      expect(req.request.method).toBe('POST');
      expect(req.request.headers.get('Accept')).toBe('application/json');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush({ ok: true });
    });
  });

  describe('Manejo de errores y resiliencia', () => {
    it('debe lanzar error cuando el servidor responde con ok: false', () => {
      const payload: ContactMessageDto = {
        name: 'Usuario Prueba',
        email: 'test@domain.com',
        subject: 'technical',
        message: 'Mensaje para verificar respuesta no satisfactoria.',
      };

      let errorReceived: Error | null = null;
      service.sendMessage(payload).subscribe({
        next: () => {},
        error: (err: unknown) => {
          if (err instanceof Error) {
            errorReceived = err;
          }
        },
      });

      const req = httpTesting.expectOne('https://formspree.io/f/xvgqkjjz');
      req.flush({ ok: false });

      expect(errorReceived).not.toBeNull();
      if (errorReceived) {
        const errorObj: Error = errorReceived;
        expect(errorObj.message).toBe('Respuesta no satisfactoria del servicio de mensajería');
      }
    });

    it('debe capturar errores HTTP 500 y convertirlos en Error de conexión', () => {
      const payload: ContactMessageDto = {
        name: 'Usuario Prueba',
        email: 'test@domain.com',
        subject: 'technical',
        message: 'Mensaje para verificar error 500 del servidor remoto.',
      };

      let errorReceived: Error | null = null;
      service.sendMessage(payload).subscribe({
        next: () => {},
        error: (err: unknown) => {
          if (err instanceof Error) {
            errorReceived = err;
          }
        },
      });

      const req = httpTesting.expectOne('https://formspree.io/f/xvgqkjjz');
      req.flush('Error interno del servidor', { status: 500, statusText: 'Internal Server Error' });

      expect(errorReceived).not.toBeNull();
      if (errorReceived) {
        const errorObj: Error = errorReceived;
        expect(errorObj.message).toContain('Http failure response');
      }
    });

    it('debe disparar el fusible temporal ante demoras superiores a 8000 ms', () => {
      vi.useFakeTimers();
      try {
        const payload: ContactMessageDto = {
          name: 'Demora Test',
          email: 'slow@network.com',
          subject: 'remote',
          message: 'Mensaje para verificar el fusible de 8 segundos.',
        };

        let errorReceived: Error | null = null;
        service.sendMessage(payload).subscribe({
          next: () => {},
          error: (err: unknown) => {
            if (err instanceof Error) {
              errorReceived = err;
            }
          },
        });

        const req = httpTesting.expectOne('https://formspree.io/f/xvgqkjjz');
        expect(req.request.method).toBe('POST');

        // Avanzamos el temporizador simulado más allá del fusible de 8 segundos
        vi.advanceTimersByTime(8050);

        expect(errorReceived).not.toBeNull();
        if (errorReceived) {
          const errorObj: Error = errorReceived;
          expect(errorObj.message).toContain('Timeout has occurred');
        }
      } finally {
        vi.useRealTimers();
      }
    });
  });
});
