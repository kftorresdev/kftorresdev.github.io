import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { ContactMessageDto } from '../models/portfolio.models';

/**
 * Resultado estructurado del envío de mensaje de contacto.
 */
export interface ContactSubmissionResult {
  readonly success: boolean;
  readonly message?: string;
}

/**
 * Servicio encargado de la comunicación con el endpoint serverless de contacto.
 * Capa 3 (Data Layer) conforme a la Constitución de Ingeniería v2.3.
 * Implementa la Tríada Anti-Congelamiento con límite estricto de timeout (8s).
 */
@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private readonly http = inject(HttpClient);

  /**
   * Endpoint de Formspree (ID de formulario público para recepción de correos).
   */
  private readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/xvgqkjjz';

  /**
   * Envía los datos del formulario de contacto hacia el servicio serverless.
   * Aplica guardas de seguridad contra bots (Honeypot) y timeout defensivo de 8000 ms.
   */
  sendMessage(dto: ContactMessageDto): Observable<ContactSubmissionResult> {
    // Escudo 1: Guarda defensiva Honeypot. Si el bot llenó el campo trampa, descartamos silenciosamente
    if (dto._gotcha && dto._gotcha.trim().length > 0) {
      return of({ success: true, message: 'Operación procesada' });
    }

    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http
      .post<{ ok?: boolean }>(this.FORMSPREE_ENDPOINT, dto, { headers })
      .pipe(
        // Escudo 2: Fusible temporal estricto de 8 segundos (Anti-Freeze Triad)
        timeout(8000),
        map((response) => {
          if (response && response.ok !== false) {
            return { success: true };
          }
          throw new Error('Respuesta no satisfactoria del servicio de mensajería');
        }),
        // Escudo 3: Plan de contingencia defensivo ante fallas de red o rechazo de servidor
        catchError((error: unknown) => {
          const errorMessage =
            error instanceof Error
              ? error.message
              : typeof error === 'object' && error !== null && 'message' in error
                ? String((error as { message: unknown }).message)
                : 'Fallo de conexión en el envío de contacto';
          return throwError(() => new Error(errorMessage));
        })
      );
  }
}
