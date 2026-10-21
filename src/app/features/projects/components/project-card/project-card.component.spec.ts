import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ProjectCardComponent } from './project-card.component';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { LanguageService } from '../../../../core/services/language.service';
import { ProjectItem } from '../../../../core/models/portfolio.models';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  let dataService: PortfolioDataService;
  let langService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(PortfolioDataService);
    langService = TestBed.inject(LanguageService);

    // Aseguramos idioma español por defecto
    langService.setLanguage('es');

    // Fijamos el proyecto de prueba requerido
    fixture.componentRef.setInput('project', dataService.projects[0]);
    fixture.detectChanges();
  });

  it('debe instanciarse correctamente con un proyecto', () => {
    expect(component).toBeTruthy();
    expect(component.project().title).toBe('CargoPulse Web');
  });

  it('debe emitir el evento openModal al invocar onOpenArchitecture', () => {
    let emittedProject: ProjectItem | null = null;
    component.openModal.subscribe((proj) => {
      emittedProject = proj;
    });

    component.onOpenArchitecture();
    expect(emittedProject).toBe(dataService.projects[0]);
  });

  it('debe resolver el enlace a README en español cuando el idioma activo es es', () => {
    langService.setLanguage('es');
    fixture.detectChanges();

    expect(component.localizedGithubUrl()).toBe(
      'https://github.com/kftorresdev/CargoPulse/blob/main/README.es.md'
    );

    const anchor = fixture.nativeElement.querySelector(
      'a[title="Código fuente en GitHub"]'
    ) as HTMLAnchorElement;
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe(
      'https://github.com/kftorresdev/CargoPulse/blob/main/README.es.md'
    );
  });

  it('debe resolver el enlace raíz a GitHub cuando el idioma activo es en', () => {
    langService.setLanguage('en');
    fixture.detectChanges();

    expect(component.localizedGithubUrl()).toBe(
      'https://github.com/kftorresdev/CargoPulse'
    );

    const anchor = fixture.nativeElement.querySelector(
      'a[title="Código fuente en GitHub"]'
    ) as HTMLAnchorElement;
    expect(anchor).toBeTruthy();
    expect(anchor.getAttribute('href')).toBe(
      'https://github.com/kftorresdev/CargoPulse'
    );
  });

  it('debe utilizar githubUrl como fallback si el proyecto no define githubReadmeUrls', () => {
    const fallbackProject: ProjectItem = {
      ...dataService.projects[0],
      githubReadmeUrls: undefined,
    };
    fixture.componentRef.setInput('project', fallbackProject);
    fixture.detectChanges();

    expect(component.localizedGithubUrl()).toBe(fallbackProject.githubUrl);
  });
});
