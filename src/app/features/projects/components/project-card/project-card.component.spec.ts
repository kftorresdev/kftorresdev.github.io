import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ProjectCardComponent } from './project-card.component';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;
  let dataService: PortfolioDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(PortfolioDataService);

    // Fijamos el proyecto de prueba requerido
    fixture.componentRef.setInput('project', dataService.projects[0]);
    fixture.detectChanges();
  });

  it('debe instanciarse correctamente con un proyecto', () => {
    expect(component).toBeTruthy();
    expect(component.project().title).toBe('CargoPulse Web');
  });

  it('debe emitir el evento openModal al invocar onOpenArchitecture', () => {
    let emittedProject = null;
    component.openModal.subscribe((proj) => {
      emittedProject = proj;
    });

    component.onOpenArchitecture();
    expect(emittedProject).toBe(dataService.projects[0]);
  });
});
