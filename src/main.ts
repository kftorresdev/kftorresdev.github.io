/**
 * Punto de entrada principal para el arranque de la aplicación Angular 21 Standalone.
 * Inicializa el App Shell en modo Zoneless con detección de cambios basada en Signals.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app.component';

bootstrapApplication(App, appConfig).catch((err: unknown) => console.error(err));

