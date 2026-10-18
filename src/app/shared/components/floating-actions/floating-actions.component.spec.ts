import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { FloatingActionsComponent } from './floating-actions.component';

describe('FloatingActionsComponent', () => {
  let component: FloatingActionsComponent;
  let fixture: ComponentFixture<FloatingActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener el estado inicial de showScrollTop en false', () => {
    expect(component.showScrollTop()).toBe(false);
  });
});
