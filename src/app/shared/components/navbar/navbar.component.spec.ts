import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { NavbarComponent } from './navbar.component';
import { LanguageService } from '../../../core/services/language.service';
import { ThemeService } from '../../../core/services/theme.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let langService: LanguageService;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    langService = TestBed.inject(LanguageService);
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('debe instanciarse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe alternar el idioma al invocar onToggleLanguage', () => {
    const initialLang = langService.currentLanguage();
    component.onToggleLanguage();
    expect(langService.currentLanguage()).not.toBe(initialLang);
  });

  it('debe alternar el tema visual al invocar onToggleTheme', () => {
    const initialTheme = themeService.currentTheme();
    component.onToggleTheme();
    expect(themeService.currentTheme()).not.toBe(initialTheme);
  });

  it('debe alternar y cerrar el menú móvil correctamente', () => {
    expect(component.isMobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(true);
    component.closeMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(false);
  });
});
