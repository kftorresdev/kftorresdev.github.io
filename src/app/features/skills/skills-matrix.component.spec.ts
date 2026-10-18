import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { SkillsMatrixComponent } from './skills-matrix.component';

describe('SkillsMatrixComponent', () => {
  let component: SkillsMatrixComponent;
  let fixture: ComponentFixture<SkillsMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsMatrixComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar todas las categorías por defecto', () => {
    expect(component.activeCategory()).toBe('all');
    expect(component.displayedCategories().length).toBeGreaterThan(0);
  });

  it('debe filtrar las habilidades cuando se selecciona una categoría', () => {
    component.setFilter('mobile');
    expect(component.activeCategory()).toBe('mobile');
    expect(component.displayedCategories().length).toBe(1);
    expect(component.displayedCategories()[0].key).toBe('mobile');
  });

  it('debe restablecer el filtro al invocar resetFilter', () => {
    component.setFilter('backend');
    component.resetFilter();
    expect(component.activeCategory()).toBe('all');
  });
});
