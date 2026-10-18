import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ArchitectureModalComponent } from './architecture-modal.component';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';
import { ProjectItem } from '../../../../core/models/portfolio.models';

describe('ArchitectureModalComponent', () => {
  let component: ArchitectureModalComponent;
  let fixture: ComponentFixture<ArchitectureModalComponent>;
  let dataService: PortfolioDataService;
  let sampleProject: ProjectItem;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureModalComponent],
      providers: [PortfolioDataService],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchitectureModalComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(PortfolioDataService);
    sampleProject = dataService.projects[0];
    fixture.detectChanges();
  });

  afterEach(() => {
    // Limpieza de estilos defensivos sobre el documento
    document.body.style.overflow = '';
  });

  it('debe instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cambiar de pestaña activa al invocar setTab', () => {
    expect(component.activeTab()).toBe('overview');
    component.setTab('architecture');
    expect(component.activeTab()).toBe('architecture');
    component.setTab('metrics');
    expect(component.activeTab()).toBe('metrics');
  });

  it('debe emitir closeModal al invocar el método onClose', () => {
    const emitSpy = vi.fn();
    component.closeModal.subscribe(emitSpy);

    component.onClose();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('debe emitir closeModal al hacer clic sobre el fondo del modal (modal-backdrop)', () => {
    const emitSpy = vi.fn();
    component.closeModal.subscribe(emitSpy);

    const backdropTarget = document.createElement('div');
    backdropTarget.className = 'modal-backdrop';

    const backdropEvent = { target: backdropTarget } as unknown as MouseEvent;
    component.onBackdropClick(backdropEvent);

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('no debe emitir closeModal si se hace clic dentro del contenedor de contenido interno', () => {
    const emitSpy = vi.fn();
    component.closeModal.subscribe(emitSpy);

    const innerTarget = document.createElement('div');
    innerTarget.className = 'modal-card-content';

    const innerEvent = { target: innerTarget } as unknown as MouseEvent;
    component.onBackdropClick(innerEvent);

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('debe emitir closeModal al presionar la tecla Escape cuando el modal está abierto', () => {
    fixture.componentRef.setInput('project', sampleProject);
    fixture.detectChanges();

    const emitSpy = vi.fn();
    component.closeModal.subscribe(emitSpy);

    // Despacho del listener de la tecla Escape
    component.onEscape();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('no debe emitir closeModal con la tecla Escape si el modal no tiene ningún proyecto asignado', () => {
    fixture.componentRef.setInput('project', null);
    fixture.detectChanges();

    const emitSpy = vi.fn();
    component.closeModal.subscribe(emitSpy);

    component.onEscape();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('debe bloquear el scroll del documento al abrir el modal y restaurarlo al cerrarlo', () => {
    // Inicialmente el proyecto es null
    expect(component.project()).toBeNull();
    expect(document.body.style.overflow).toBe('');

    // Al asignar proyecto, bloquea el scroll del body
    fixture.componentRef.setInput('project', sampleProject);
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(document.body.style.overflow).toBe('hidden');

    // Al remover el proyecto, desbloquea el scroll del body
    fixture.componentRef.setInput('project', null);
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(document.body.style.overflow).toBe('');
  });

  it('debe restablecer la pestaña activa a overview cuando se abre un nuevo proyecto', () => {
    fixture.componentRef.setInput('project', sampleProject);
    fixture.detectChanges();
    TestBed.flushEffects();

    // El usuario navega a la pestaña de arquitectura
    component.setTab('architecture');
    expect(component.activeTab()).toBe('architecture');

    // Si se asigna otro proyecto, el efecto reinicia a 'overview'
    const otherProject = dataService.projects[1];
    fixture.componentRef.setInput('project', otherProject);
    fixture.detectChanges();
    TestBed.flushEffects();

    expect(component.activeTab()).toBe('overview');
  });
});
