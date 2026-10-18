import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ArchitectureModalComponent } from './architecture-modal.component';
import { PortfolioDataService } from '../../../../core/services/portfolio-data.service';

describe('ArchitectureModalComponent', () => {
  let component: ArchitectureModalComponent;
  let fixture: ComponentFixture<ArchitectureModalComponent>;
  let dataService: PortfolioDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitectureModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchitectureModalComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(PortfolioDataService);
    fixture.detectChanges();
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
});
