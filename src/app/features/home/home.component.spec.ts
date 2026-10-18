import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { HomeComponent } from './home.component';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataService: PortfolioDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(PortfolioDataService);
    fixture.detectChanges();
  });

  it('debe instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar el titular y las tarjetas de proyectos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Kevin Fernando Torres Castro');
    expect(compiled.querySelectorAll('app-project-card').length).toBe(2);
  });

  it('debe gestionar la apertura y cierre del modal de arquitectura', () => {
    expect(component.selectedProjectForModal()).toBeNull();
    component.openProjectModal(dataService.projects[0]);
    expect(component.selectedProjectForModal()).toBe(dataService.projects[0]);
    component.closeProjectModal();
    expect(component.selectedProjectForModal()).toBeNull();
  });
});
