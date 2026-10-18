import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
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

  it('debe instanciarse correctamente', () => {
    expect(service).toBeTruthy();
  });

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
      resultReceived = true;
    });

    expect(resultReceived).toBe(true);
    httpTesting.expectNone('https://formspree.io/f/xvgqkjjz');
  });

  it('debe ejecutar petición POST HTTP cuando el payload es legítimo', () => {
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
    req.flush({ ok: true });
  });
});
