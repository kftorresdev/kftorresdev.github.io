import { Injectable, computed, signal, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SupportedLanguage } from '../models/portfolio.models';

/**
 * Diccionario de textos de la aplicación estructurado por idioma.
 */
interface TranslationDictionary {
  readonly nav: {
    readonly projects: string;
    readonly skills: string;
    readonly experience: string;
    readonly contact: string;
    readonly downloadCv: string;
    readonly toggleTheme: string;
    readonly toggleLanguage: string;
    readonly mobileMenu: string;
  };
  readonly hero: {
    readonly availableBadge: string;
    readonly degreeBadge: string;
    readonly greeting: string;
    readonly primaryCta: string;
    readonly secondaryCta: string;
    readonly contactCta: string;
    readonly bioParagraph: string;
  };
  readonly projectsSection: {
    readonly badge: string;
    readonly title: string;
    readonly subtitle: string;
    readonly liveDemo: string;
    readonly sourceCode: string;
    readonly architectureDetails: string;
    readonly keyMetrics: string;
    readonly challengesSolved: string;
    readonly technologiesUsed: string;
    readonly closeDetails: string;
  };
  readonly skillsSection: {
    readonly badge: string;
    readonly title: string;
    readonly subtitle: string;
    readonly filterAll: string;
    readonly filterFrontend: string;
    readonly filterMobile: string;
    readonly filterBackend: string;
    readonly filterDevOps: string;
    readonly filterArchitecture: string;
    readonly resetFilter: string;
    readonly emptyStateTitle: string;
    readonly emptyStateSubtitle: string;
  };
  readonly timelineSection: {
    readonly badge: string;
    readonly title: string;
    readonly subtitle: string;
    readonly present: string;
    readonly educationTitle: string;
    readonly techApplied: string;
  };
  readonly contactSection: {
    readonly badge: string;
    readonly title: string;
    readonly subtitle: string;
    readonly nameLabel: string;
    readonly namePlaceholder: string;
    readonly emailLabel: string;
    readonly emailPlaceholder: string;
    readonly subjectLabel: string;
    readonly subjectPlaceholder: string;
    readonly subjectOptions: {
      readonly remote: string;
      readonly project: string;
      readonly technical: string;
      readonly other: string;
    };
    readonly messageLabel: string;
    readonly messagePlaceholder: string;
    readonly submitButton: string;
    readonly sendingButton: string;
    readonly successTitle: string;
    readonly successMessage: string;
    readonly errorTitle: string;
    readonly errorMessage: string;
    readonly retryButton: string;
    readonly directChannels: string;
    readonly whatsappDirect: string;
    readonly emailDirect: string;
    readonly locationInfo: string;
    readonly charCount: string;
  };
  readonly footer: {
    readonly allRightsReserved: string;
    readonly builtWith: string;
    readonly viewSource: string;
    readonly timezoneLabel: string;
  };
}

const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  es: {
    nav: {
      projects: 'Proyectos',
      skills: 'Habilidades',
      experience: 'Trayectoria',
      contact: 'Contacto',
      downloadCv: 'Descargar CV',
      toggleTheme: 'Alternar tema visual',
      toggleLanguage: 'Cambiar a inglés',
      mobileMenu: 'Menú principal',
    },
    hero: {
      availableBadge: 'Disponible para Trabajo Remoto (UTC-6 / EE. UU. Overlap)',
      degreeBadge: 'Ingeniero en Sistemas · UNAH',
      greeting: 'Hola, soy',
      primaryCta: 'Explorar Proyectos',
      secondaryCta: 'Descargar CV (PDF)',
      contactCta: 'Contactar Directo',
      bioParagraph:
        'Ingeniero de Software especializado en la construcción y modernización de plataformas web empresariales y soluciones móviles de campo. Experiencia demostrada diseñando arquitecturas resilientes con Angular 21 (Zoneless + Signals), NestJS, .NET MAUI y persistencia Offline-First.',
    },
    projectsSection: {
      badge: 'Estudios de Caso de Ingeniería',
      title: 'Sistemas de Misión Crítica',
      subtitle:
        'Arquitecturas reales de producción desarrolladas con código limpio, pruebas automatizadas exhaustivas y alta resiliencia operativa.',
      liveDemo: 'Demo en Vivo',
      sourceCode: 'Ver en GitHub',
      architectureDetails: 'Arquitectura & Retos',
      keyMetrics: 'Métricas de Calidad',
      challengesSolved: 'Retos de Negocio Resueltos',
      technologiesUsed: 'Stack Tecnológico',
      closeDetails: 'Cerrar Detalles',
    },
    skillsSection: {
      badge: 'Competencias Técnicas',
      title: 'Matriz de Habilidades de Ingeniería',
      subtitle:
        'Herramientas y tecnologías aplicadas con criterio arquitectónico en sistemas reales de producción.',
      filterAll: 'Todas',
      filterFrontend: 'Frontend Web',
      filterMobile: 'Mobile & Offline',
      filterBackend: 'Backend & APIs',
      filterDevOps: 'DevOps & Testing',
      filterArchitecture: 'Arquitectura',
      resetFilter: 'Restablecer filtros',
      emptyStateTitle: 'No se encontraron habilidades',
      emptyStateSubtitle: 'No hay competencias registradas bajo este criterio de búsqueda.',
    },
    timelineSection: {
      badge: 'Experiencia Profesional',
      title: 'Trayectoria Laboral & Formación',
      subtitle:
        'Impacto medible en proyectos de digitalización logística, migraciones arquitectónicas y desarrollo continuo.',
      present: 'Actualidad',
      educationTitle: 'Formación Académica Universitaria',
      techApplied: 'Tecnologías aplicadas:',
    },
    contactSection: {
      badge: 'Contacto Profesional',
      title: 'Iniciemos una Conversación',
      subtitle:
        '¿Tienes una oportunidad de trabajo remoto, proyecto de ingeniería o consulta técnica? Escríbeme y te responderé en breve.',
      nameLabel: 'Nombre Completo',
      namePlaceholder: 'Ej. Alejandro Mendoza',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'correo@empresa.com',
      subjectLabel: 'Motivo del Contacto',
      subjectPlaceholder: 'Selecciona una opción',
      subjectOptions: {
        remote: 'Oportunidad Laboral Remota (Full-Time)',
        project: 'Consultoría o Desarrollo de Proyecto',
        technical: 'Pregunta Técnica o Colaboración',
        other: 'Otro Motivo',
      },
      messageLabel: 'Mensaje Detallado',
      messagePlaceholder: 'Describe tu proyecto, vacante o requerimiento técnico...',
      submitButton: 'Enviar Mensaje',
      sendingButton: 'Enviando Mensaje...',
      successTitle: '¡Mensaje Enviado con Éxito!',
      successMessage: 'Gracias por ponerte en contacto. Responderé a tu correo en menos de 24 horas.',
      errorTitle: 'Inconveniente de Envío',
      errorMessage:
        'Ocurrió un error al enviar el formulario. Puedes contactarme directamente por WhatsApp o enviarme un correo.',
      retryButton: 'Reintentar Envío',
      directChannels: 'Canales de Contacto Directo',
      whatsappDirect: 'Mensaje Inmediato por WhatsApp',
      emailDirect: 'kevin.torres.9800@gmail.com',
      locationInfo: 'Tegucigalpa, Honduras (UTC-6) · Cobertura completa de horario con EE. UU.',
      charCount: 'caracteres mínimos',
    },
    footer: {
      allRightsReserved: 'Todos los derechos reservados.',
      builtWith: 'Diseñado bajo la Constitución de Ingeniería v2.3 con Angular 21 Standalone & Tailwind CSS v4.',
      viewSource: 'Código Fuente en GitHub',
      timezoneLabel: 'Zona Horaria Central (UTC-6)',
    },
  },
  en: {
    nav: {
      projects: 'Projects',
      skills: 'Skills',
      experience: 'Experience',
      contact: 'Contact',
      downloadCv: 'Download Resume',
      toggleTheme: 'Toggle visual theme',
      toggleLanguage: 'Switch to Spanish',
      mobileMenu: 'Main menu',
    },
    hero: {
      availableBadge: 'Available for Remote Work (UTC-6 / US Timezone Overlap)',
      degreeBadge: 'B.S. in Systems Engineering · UNAH',
      greeting: "Hello, I'm",
      primaryCta: 'Explore Projects',
      secondaryCta: 'Download Resume (PDF)',
      contactCta: 'Direct Contact',
      bioParagraph:
        'Software Engineer specializing in building and modernizing enterprise web platforms and resilient field mobile solutions. Proven track record designing architectures with Angular 21 (Zoneless + Signals), NestJS, .NET MAUI, and Offline-First persistence.',
    },
    projectsSection: {
      badge: 'Engineering Case Studies',
      title: 'Mission-Critical Systems',
      subtitle:
        'Real production architectures built with clean code, comprehensive automated test suites, and high operational resilience.',
      liveDemo: 'Live Demo',
      sourceCode: 'View on GitHub',
      architectureDetails: 'Architecture & Challenges',
      keyMetrics: 'Quality Metrics',
      challengesSolved: 'Business Challenges Solved',
      technologiesUsed: 'Tech Stack',
      closeDetails: 'Close Details',
    },
    skillsSection: {
      badge: 'Core Competencies',
      title: 'Engineering Skills Matrix',
      subtitle:
        'Tools and technologies applied with architectural discipline across real-world production systems.',
      filterAll: 'All',
      filterFrontend: 'Frontend Web',
      filterMobile: 'Mobile & Offline',
      filterBackend: 'Backend & APIs',
      filterDevOps: 'DevOps & Testing',
      filterArchitecture: 'Architecture',
      resetFilter: 'Reset filters',
      emptyStateTitle: 'No skills found',
      emptyStateSubtitle: 'No competencies registered under this search criterion.',
    },
    timelineSection: {
      badge: 'Professional Experience',
      title: 'Career History & Education',
      subtitle:
        'Measurable impact across supply chain digitization, architectural migrations, and continuous software engineering.',
      present: 'Present',
      educationTitle: 'University Academic Education',
      techApplied: 'Technologies applied:',
    },
    contactSection: {
      badge: 'Professional Inquiries',
      title: "Let's Start a Conversation",
      subtitle:
        'Have a remote engineering role, software project, or technical question? Reach out and I will reply promptly.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. John Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'john@company.com',
      subjectLabel: 'Inquiry Subject',
      subjectPlaceholder: 'Select an option',
      subjectOptions: {
        remote: 'Remote Career Opportunity (Full-Time)',
        project: 'Consulting or Project Development',
        technical: 'Technical Inquiry or Collaboration',
        other: 'Other Inquiry',
      },
      messageLabel: 'Detailed Message',
      messagePlaceholder: 'Describe your project, open role, or technical requirement...',
      submitButton: 'Send Message',
      sendingButton: 'Sending Message...',
      successTitle: 'Message Sent Successfully!',
      successMessage: 'Thank you for getting in touch. I will reply to your email within 24 hours.',
      errorTitle: 'Submission Issue',
      errorMessage:
        'An error occurred while submitting the form. You can reach out directly via WhatsApp or email.',
      retryButton: 'Retry Submission',
      directChannels: 'Direct Contact Channels',
      whatsappDirect: 'Instant WhatsApp Message',
      emailDirect: 'kevin.torres.9800@gmail.com',
      locationInfo: 'Tegucigalpa, Honduras (UTC-6) · Full business day overlap with US tech hubs.',
      charCount: 'minimum characters',
    },
    footer: {
      allRightsReserved: 'All rights reserved.',
      builtWith: 'Engineered under Master Constitution v2.3 with Angular 21 Standalone & Tailwind CSS v4.',
      viewSource: 'Source Code on GitHub',
      timezoneLabel: 'Central Time Zone (UTC-6)',
    },
  },
};

/**
 * Servicio singleton encargado de la reactividad del idioma (ES / EN).
 * Gobierna el estado mediante Signals y actualiza metadatos del navegador.
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'kftorres_lang';
  private readonly titleService = inject(Title);

  /**
   * Signal de estado del idioma actualmente activo.
   */
  readonly currentLanguage = signal<SupportedLanguage>(this.getInitialLanguage());

  /**
   * Signal derivado con el diccionario de textos correspondiente al idioma activo.
   */
  readonly dictionary = computed<TranslationDictionary>(() => {
    return TRANSLATIONS[this.currentLanguage()];
  });

  /**
   * Signal derivado que indica si el idioma activo es inglés.
   */
  readonly isEnglish = computed<boolean>(() => this.currentLanguage() === 'en');

  constructor() {
    // Sincronización reactiva con el atributo lang del documento y localStorage
    effect(() => {
      const lang = this.currentLanguage();
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, lang);
        document.documentElement.lang = lang;
        this.updateDocumentTitle(lang);
      }
    });
  }

  /**
   * Alterna entre español e inglés de forma instantánea sin recarga.
   */
  toggleLanguage(): void {
    const nextLang: SupportedLanguage = this.currentLanguage() === 'es' ? 'en' : 'es';
    this.currentLanguage.set(nextLang);
  }

  /**
   * Establece un idioma específico.
   */
  setLanguage(lang: SupportedLanguage): void {
    if (lang === 'es' || lang === 'en') {
      this.currentLanguage.set(lang);
    }
  }

  /**
   * Resuelve el idioma inicial desde localStorage o preferencia del navegador.
   */
  private getInitialLanguage(): SupportedLanguage {
    if (typeof window === 'undefined') {
      return 'es';
    }

    const saved = localStorage.getItem(this.STORAGE_KEY) as SupportedLanguage | null;
    if (saved === 'es' || saved === 'en') {
      return saved;
    }

    // Detección automática por idioma del navegador
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('en')) {
      return 'en';
    }

    return 'es';
  }

  /**
   * Actualiza el título del documento en el navegador según el idioma.
   */
  private updateDocumentTitle(lang: SupportedLanguage): void {
    if (lang === 'en') {
      this.titleService.setTitle('Kevin Torres | Software Engineer (Web & Mobile Systems)');
    } else {
      this.titleService.setTitle('Kevin Torres | Ingeniero de Software (Sistemas Web y Móviles)');
    }
  }
}
