/**
 * Modelos de datos del Portafolio Profesional de Ingeniería.
 * En cumplimiento estricto con la Constitución de Ingeniería v2.3 y el documento 05_BACKEND_SCHEMA.md.
 * Política: Tipado estricto (Zero Any), inmutabilidad (readonly) y comentarios 100% en español.
 */

/**
 * Idiomas admitidos por el sistema de localización reactivo.
 */
export type SupportedLanguage = 'es' | 'en';

/**
 * Modos de tema visual soportados por la aplicación.
 */
export type ThemeMode = 'dark' | 'light';

/**
 * Claves de clasificación de competencias técnicas.
 */
export type SkillCategoryKey = 'frontend' | 'mobile' | 'backend' | 'devops_testing' | 'architecture';

/**
 * Diccionario de textos bilingües.
 */
export type LocalizedText = Record<SupportedLanguage, string>;

/**
 * Diccionario de listas de textos bilingües.
 */
export type LocalizedList = Record<SupportedLanguage, readonly string[]>;

/**
 * Datos del perfil profesional y titularidad.
 */
export interface ProfileData {
  readonly id: string;
  readonly fullName: string;
  readonly handle: string;
  readonly title: LocalizedText;
  readonly headlineSubtitle: LocalizedText;
  readonly location: LocalizedText;
  readonly timezone: string;
  readonly availability: LocalizedText;
  readonly email: string;
  readonly phone: string;
  readonly whatsappUrl: string;
  readonly githubUrl: string;
  readonly linkedinUrl: string;
  readonly bioSummary: LocalizedText;
  readonly cvDownloadUrls: Record<SupportedLanguage, string>;
}

/**
 * Métrica cuantitativa de impacto o rendimiento de un proyecto.
 */
export interface ProjectMetric {
  readonly id: string;
  readonly label: LocalizedText;
  readonly value: string;
  readonly iconName: string;
}

/**
 * Módulo arquitectónico o subsistema de un estudio de caso.
 */
export interface ArchitectureModule {
  readonly id: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly tags?: readonly string[];
}

/**
 * Definición completa de un proyecto o estudio de caso de ingeniería.
 */
export interface ProjectItem {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: LocalizedText;
  readonly category: 'Web SaaS' | 'Mobile Field';
  readonly badgeStatus: string;
  readonly summary: LocalizedText;
  readonly businessProblem: LocalizedText;
  readonly technicalSolution: LocalizedText;
  readonly keyHighlights: LocalizedList;
  readonly metrics: readonly ProjectMetric[];
  readonly architectureModules: readonly ArchitectureModule[];
  readonly techStack: readonly string[];
  readonly githubUrl: string;
  readonly githubReadmeUrls?: Record<SupportedLanguage, string>;
  readonly liveDemoUrl?: string;
  readonly sortOrder: number;
}

/**
 * Habilidad técnica individual con nivel y estado destacado.
 */
export interface SkillItem {
  readonly id: string;
  readonly name: string;
  readonly level: LocalizedText;
  readonly isFeatured: boolean;
  readonly badgeColor: string;
}

/**
 * Categoría que agrupa un conjunto de habilidades técnicas.
 */
export interface SkillCategory {
  readonly id: string;
  readonly key: SkillCategoryKey;
  readonly name: LocalizedText;
  readonly iconName: string;
  readonly skills: readonly SkillItem[];
  readonly sortOrder: number;
}

/**
 * Experiencia laboral y trayectoria en empresas de software.
 */
export interface WorkExperienceItem {
  readonly id: string;
  readonly role: LocalizedText;
  readonly company: string;
  readonly sector: LocalizedText;
  readonly period: LocalizedText;
  readonly isCurrent: boolean;
  readonly achievements: LocalizedList;
  readonly technologies: readonly string[];
  readonly sortOrder: number;
}

/**
 * Formación académica y grado universitario.
 */
export interface EducationItem {
  readonly id: string;
  readonly degree: LocalizedText;
  readonly institution: string;
  readonly graduationYear: string;
  readonly status: LocalizedText;
  readonly details: LocalizedText;
}

/**
 * Carga útil para envío del formulario de contacto serverless.
 */
export interface ContactMessageDto {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly _gotcha?: string;
}
