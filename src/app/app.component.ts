import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FloatingActionsComponent } from './shared/components/floating-actions/floating-actions.component';
import { LanguageService } from './core/services/language.service';

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
export class App {
  readonly langService = inject(LanguageService);
  readonly t = computed(() => this.langService.dictionary().nav);
}
