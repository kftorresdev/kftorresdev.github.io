import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FloatingActionsComponent } from './shared/components/floating-actions/floating-actions.component';

/**
 * Componente raíz de la aplicación (App Shell).
 * Proyecta la barra de navegación superior, la salida del enrutador, el pie de página y las acciones flotantes.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, FloatingActionsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
