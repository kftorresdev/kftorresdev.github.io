import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { PortfolioDataService } from './portfolio-data.service';
import {
  ProjectItem,
  SkillCategory,
  WorkExperienceItem,
  EducationItem,
} from '../models/portfolio.models';

describe('PortfolioDataService', () => {
  let service: PortfolioDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioDataService],
    });
    service = TestBed.inject(PortfolioDataService);
  });

  it('debe instanciarse correctamente como servicio singleton', () => {
    expect(service).toBeTruthy();
  });

  describe('Integridad y bilingüismo del perfil profesional', () => {
    it('debe contener los datos maestros del perfil con enlaces y correos válidos', () => {
      const profile = service.profile;

      expect(profile.id).toBe('kftorres-profile');
      expect(profile.fullName).toBe('Kevin Fernando Torres Castro');
      expect(profile.handle).toBe('@kftorresdev');
      expect(profile.email).toBe('kevin.torres.9800@gmail.com');
      expect(profile.phone).toBe('+504 9375-7672');
      expect(profile.whatsappUrl).toContain('https://wa.me/50493757672');
      expect(profile.githubUrl).toBe('https://github.com/kftorresdev');
      expect(profile.linkedinUrl).toContain('linkedin.com/in/kevin-torres-developer');
    });

    it('debe contener textos localizados bilingües completos en español e inglés para el perfil', () => {
      const p = service.profile;

      expect(p.title.es).toBeTruthy();
      expect(p.title.en).toBeTruthy();
      expect(p.title.es).not.toBe(p.title.en);

      expect(p.headlineSubtitle.es).toBeTruthy();
      expect(p.headlineSubtitle.en).toBeTruthy();

      expect(p.location.es).toContain('Tegucigalpa');
      expect(p.location.en).toContain('Tegucigalpa');

      expect(p.availability.es).toBeTruthy();
      expect(p.availability.en).toBeTruthy();

      expect(p.bioSummary.es).toBeTruthy();
      expect(p.bioSummary.en).toBeTruthy();
      expect(p.bioSummary.es.length).toBeGreaterThan(50);
      expect(p.bioSummary.en.length).toBeGreaterThan(50);

      expect(p.cvDownloadUrls.es).toMatch(/\.pdf$/);
      expect(p.cvDownloadUrls.en).toMatch(/\.pdf$/);
    });
  });

  describe('Integridad y bilingüismo del catálogo de proyectos', () => {
    it('debe suministrar los proyectos insignia con sus datos completos', () => {
      const projects = service.projects;

      expect(projects.length).toBeGreaterThanOrEqual(2);
      const projectIds = projects.map((p) => p.id);
      expect(projectIds).toContain('cargopulse-web');
      expect(projectIds).toContain('cargopulse-mobile');
    });

    it('debe validar la estructura y contenido bilingüe de cada proyecto', () => {
      service.projects.forEach((proj: ProjectItem) => {
        expect(proj.id).toBeTruthy();
        expect(proj.slug).toBeTruthy();
        expect(proj.title).toBeTruthy();
        expect(proj.badgeStatus).toBeTruthy();
        expect(proj.githubUrl).toMatch(/^https:\/\//);

        // Textos bilingües
        expect(proj.subtitle.es).toBeTruthy();
        expect(proj.subtitle.en).toBeTruthy();
        expect(proj.summary.es).toBeTruthy();
        expect(proj.summary.en).toBeTruthy();
        expect(proj.businessProblem.es).toBeTruthy();
        expect(proj.businessProblem.en).toBeTruthy();
        expect(proj.technicalSolution.es).toBeTruthy();
        expect(proj.technicalSolution.en).toBeTruthy();

        // Puntos destacados (highlights)
        expect(proj.keyHighlights.es.length).toBeGreaterThan(0);
        expect(proj.keyHighlights.en.length).toBeGreaterThan(0);
        expect(proj.keyHighlights.es.length).toBe(proj.keyHighlights.en.length);

        // Métricas
        expect(proj.metrics.length).toBeGreaterThan(0);
        proj.metrics.forEach((metric) => {
          expect(metric.id).toBeTruthy();
          expect(metric.value).toBeTruthy();
          expect(metric.iconName).toBeTruthy();
          expect(metric.label.es).toBeTruthy();
          expect(metric.label.en).toBeTruthy();
        });

        // Módulos arquitectónicos
        expect(proj.architectureModules.length).toBeGreaterThan(0);
        proj.architectureModules.forEach((mod) => {
          expect(mod.id).toBeTruthy();
          expect(mod.title.es).toBeTruthy();
          expect(mod.title.en).toBeTruthy();
          expect(mod.description.es).toBeTruthy();
          expect(mod.description.en).toBeTruthy();
        });

        // Stack de tecnologías
        expect(proj.techStack.length).toBeGreaterThan(0);
      });
    });

    it('debe mantener orden secuencial definido en sortOrder para proyectos', () => {
      const orders = service.projects.map((p) => p.sortOrder);
      const sorted = [...orders].sort((a, b) => a - b);
      expect(orders).toEqual(sorted);
    });
  });

  describe('Integridad y bilingüismo de la matriz de habilidades (Skills)', () => {
    it('debe contener las 5 categorías oficiales requeridas por la arquitectura', () => {
      const categories = service.skillCategories;
      expect(categories.length).toBe(5);

      const keys = categories.map((c) => c.key);
      expect(keys).toContain('frontend');
      expect(keys).toContain('mobile');
      expect(keys).toContain('backend');
      expect(keys).toContain('devops_testing');
      expect(keys).toContain('architecture');
    });

    it('debe validar que cada categoría posea nombre bilingüe y habilidades estructuradas', () => {
      service.skillCategories.forEach((cat: SkillCategory) => {
        expect(cat.id).toBeTruthy();
        expect(cat.name.es).toBeTruthy();
        expect(cat.name.en).toBeTruthy();
        expect(cat.iconName).toBeTruthy();
        expect(cat.skills.length).toBeGreaterThan(0);

        cat.skills.forEach((skill) => {
          expect(skill.id).toBeTruthy();
          expect(skill.name).toBeTruthy();
          expect(skill.level.es).toBeTruthy();
          expect(skill.level.en).toBeTruthy();
          expect(skill.badgeColor).toContain('border-');
          expect(typeof skill.isFeatured).toBe('boolean');
        });
      });
    });
  });

  describe('Integridad y bilingüismo de la trayectoria laboral y educación', () => {
    it('debe contener los registros de experiencia profesional con logros bilingües', () => {
      const exp = service.workExperience;
      expect(exp.length).toBeGreaterThanOrEqual(2);

      exp.forEach((item: WorkExperienceItem) => {
        expect(item.id).toBeTruthy();
        expect(item.company).toBeTruthy();
        expect(item.role.es).toBeTruthy();
        expect(item.role.en).toBeTruthy();
        expect(item.sector.es).toBeTruthy();
        expect(item.sector.en).toBeTruthy();
        expect(item.period.es).toBeTruthy();
        expect(item.period.en).toBeTruthy();
        expect(item.achievements.es.length).toBeGreaterThan(0);
        expect(item.achievements.en.length).toBeGreaterThan(0);
        expect(item.technologies.length).toBeGreaterThan(0);
      });

      // Debe haber al menos un empleo actual marcado como isCurrent
      const currentJobs = exp.filter((item) => item.isCurrent);
      expect(currentJobs.length).toBeGreaterThanOrEqual(1);
    });

    it('debe contener la formación académica universitaria con titulación y detalles bilingües', () => {
      const edu = service.education;
      expect(edu.length).toBeGreaterThan(0);

      edu.forEach((item: EducationItem) => {
        expect(item.id).toBeTruthy();
        expect(item.institution).toContain('Universidad Nacional Autónoma de Honduras');
        expect(item.degree.es).toBeTruthy();
        expect(item.degree.en).toBeTruthy();
        expect(item.status.es).toBeTruthy();
        expect(item.status.en).toBeTruthy();
        expect(item.details.es).toBeTruthy();
        expect(item.details.en).toBeTruthy();
        expect(item.graduationYear).toBe('2025');
      });
    });
  });

  describe('Inmutabilidad de colecciones de datos', () => {
    it('debe exponer colecciones de sólo lectura que previenen mutaciones no deseadas', () => {
      // Las propiedades projects, skillCategories, workExperience y education son readonly arrays
      expect(Array.isArray(service.projects)).toBe(true);
      expect(Array.isArray(service.skillCategories)).toBe(true);
      expect(Array.isArray(service.workExperience)).toBe(true);
      expect(Array.isArray(service.education)).toBe(true);

      // Verificamos que los datos devueltos no varían ante múltiples accesos
      const refProjects1 = service.projects;
      const refProjects2 = service.projects;
      expect(refProjects1).toBe(refProjects2);

      const refProfile1 = service.profile;
      const refProfile2 = service.profile;
      expect(refProfile1).toBe(refProfile2);
    });
  });
});
