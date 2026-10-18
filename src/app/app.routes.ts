import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

/**
 * Tabla de enrutamiento principal de la aplicación.
 * Ruta raíz hacia la Landing Page (HomeComponent) con redirección comodín segura.
 */
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Kevin Torres | Software Engineer (Web & Mobile Systems)',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
