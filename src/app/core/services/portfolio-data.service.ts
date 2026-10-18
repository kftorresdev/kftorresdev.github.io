import { Injectable } from '@angular/core';
import {
  EducationItem,
  ProfileData,
  ProjectItem,
  SkillCategory,
  WorkExperienceItem,
} from '../models/portfolio.models';

/**
 * Servicio proveedor de datos inmutables y tipados del portafolio.
 * Capa 3 (Data Layer) según la arquitectura en 3 capas de la Constitución de Ingeniería.
 */
@Injectable({
  providedIn: 'root',
})
export class PortfolioDataService {
  /**
   * Datos maestros del perfil profesional de Kevin Fernando Torres Castro.
   */
  readonly profile: ProfileData = {
    id: 'kftorres-profile',
    fullName: 'Kevin Fernando Torres Castro',
    handle: '@kftorresdev',
    title: {
      es: 'Software Engineer | Sistemas Web & Móviles',
      en: 'Software Engineer | Web & Mobile Systems',
    },
    headlineSubtitle: {
      es: 'Especialista en Angular 21 (Zoneless + Signals) · NestJS · .NET MAUI · Arquitectura Offline-First',
      en: 'Specialist in Angular 21 (Zoneless + Signals) · NestJS · .NET MAUI · Offline-First Architecture',
    },
    location: {
      es: 'Tegucigalpa, Honduras (UTC-6)',
      en: 'Tegucigalpa, Honduras (UTC-6)',
    },
    timezone: 'Central Time (UTC-6) · Full US Business Hours Overlap',
    availability: {
      es: 'Disponible para contratación remota (Tiempo Completo / Contrato USD)',
      en: 'Available for remote hiring (Full-Time / USD Contract)',
    },
    email: 'kevin.torres.9800@gmail.com',
    phone: '+504 9375-7672',
    whatsappUrl: 'https://wa.me/50493757672?text=Hola%20Kevin,%20vi%20tu%20portafolio%20profesional%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad.',
    githubUrl: 'https://github.com/kftorresdev',
    linkedinUrl: 'https://www.linkedin.com/in/kevin-torres-developer',
    bioSummary: {
      es: 'Ingeniero en Sistemas con cerca de 3 años de experiencia en la construcción de sistemas de misión crítica, modernización de arquitecturas legadas a Angular 21 y desarrollo de aplicaciones móviles industriales con .NET MAUI y SQLite. Apasionado por el código limpio, la automatización de pruebas y el diseño de software de alto rendimiento.',
      en: 'Systems Engineer with nearly 3 years of experience building mission-critical systems, modernizing legacy architectures to Angular 21, and developing industrial mobile solutions with .NET MAUI and SQLite. Passionate about clean code, automated testing, and high-performance software design.',
    },
    cvDownloadUrls: {
      es: 'assets/docs/CV_Kevin_Torres.pdf',
      en: 'assets/docs/CV_Kevin_Torres_EN.pdf',
    },
  };

  /**
   * Catálogo de proyectos insignia desarrollados como estudios de caso de ingeniería.
   */
  readonly projects: readonly ProjectItem[] = [
    {
      id: 'cargopulse-web',
      slug: 'cargopulse-web',
      title: 'CargoPulse Web',
      subtitle: {
        es: 'Plataforma SaaS de Auditoría de Fletes en 5 Tramos y Telemetría Logística DAG',
        en: 'Enterprise Logistics Telemetry DAG & 5-Leg Freight Audit SaaS Platform',
      },
      category: 'Web SaaS',
      badgeStatus: 'v1.0.0 · Producción Activa',
      summary: {
        es: 'Sistema web de misión crítica diseñado para erradicar la ceguera topológica en cadenas de suministro transfronterizas y eliminar fugas de capital por discrepancias arancelarias en contratos multimodales.',
        en: 'Mission-critical web platform engineered to eliminate topological blindness across cross-border supply chains and prevent capital leakage from multimodal freight tariff discrepancies.',
      },
      businessProblem: {
        es: 'Las empresas de logística transfronteriza pierden entre el 3% y el 8% de su presupuesto anual debido a cobros no autorizados y demoras no monitoreadas en garitas aduaneras y tramos intermodales.',
        en: 'Cross-border logistics operators leak between 3% to 8% of total freight spend annually due to unauthorized surcharges, detention fees, and unmonitored border customs bottlenecks.',
      },
      technicalSolution: {
        es: 'Se construyó una arquitectura Modular Monolith en NestJS 12 y un cliente Angular 21 en modo Zoneless reactivo con Signals. Se integró una topología visual en tiempo real mediante Grafo Dirigido Acíclico (DAG SVG), motor de conciliación en 5 tramos con exportación server-side de hojas ExcelJS estilizadas y persistencia dual con failover en memoria.',
        en: 'Architected a Modular Monolith with NestJS 12 and an Angular 21 Zoneless reactive client using Signals. Integrated a real-time visual Directed Acyclic Graph (DAG SVG) network topology, 5-leg variance reconciliation engine with server-side styled ExcelJS streaming, and dual-mode database persistence with zero-downtime failover.',
      },
      keyHighlights: {
        es: [
          'Visualización interactiva de red mediante DAG SVG (@swimlane/ngx-graph) con filtrado bidireccional de embarques.',
          'Motor de auditoría de fletes en 5 tramos (Origen, Tránsito 1, Aduanas, Tránsito 2, Milla Final) con semáforos cromáticos.',
          'Centro de alertas SLA con contadores regresivos en tiempo real (DD:HH:MM) y cálculo de exposición en USD.',
          'Bitácora colaborativa jerárquica en 3 niveles con control estricto de profundidad y aislamiento por embarque.',
          '322 pruebas automatizadas (114 API, 195 Web, 13 E2E en Playwright) con 100% de tasa de aprobación.',
        ],
        en: [
          'Interactive SVG DAG network topology (@swimlane/ngx-graph) with bidirectional consignment filtering.',
          '5-leg freight reconciliation engine (Origin, Transit 1, Customs, Transit 2, Final Mile) with chromatic variance thresholds.',
          'SLA escalation center with live countdown tickers (DD:HH:MM) and dynamic USD exposure tracking.',
          '3-tier hierarchical collaborative note thread with enforced maximum depth and per-shipment isolation.',
          '322 automated tests (114 API, 195 Web, 13 Playwright E2E) with a 100% pass rate.',
        ],
      },
      metrics: [
        {
          id: 'cpw-m1',
          label: { es: 'Pruebas Automatizadas', en: 'Automated Tests' },
          value: '322 (100% Pass)',
          iconName: 'check-circle',
        },
        {
          id: 'cpw-m2',
          label: { es: 'Arquitectura Frontend', en: 'Frontend Architecture' },
          value: 'Angular 21 Zoneless',
          iconName: 'zap',
        },
        {
          id: 'cpw-m3',
          label: { es: 'Persistencia & Resiliencia', en: 'Persistence & Failover' },
          value: 'PostgreSQL + Dual-Mode',
          iconName: 'database',
        },
        {
          id: 'cpw-m4',
          label: { es: 'Conciliación de Costos', en: 'Freight Reconciliation' },
          value: '5 Tramos / ExcelJS',
          iconName: 'bar-chart',
        },
      ],
      architectureModules: [
        {
          id: 'mod-dag',
          title: { es: 'Control Tower & Topological DAG', en: 'Control Tower & Topological DAG' },
          description: {
            es: 'Visualizador SVG de nodos de origen, garitas aduaneras y almacenes destino con selección interactiva y métricas OTA en tiempo real.',
            en: 'SVG visualizer for origin plants, border customs checkpoints, and destination warehouses with interactive filtering and real-time OTA metrics.',
          },
        },
        {
          id: 'mod-audit',
          title: { es: 'Motor de Auditoría en 5 Tramos', en: '5-Leg Freight Audit Engine' },
          description: {
            es: 'Calcula desviaciones de flete contrastando contratos contra facturas reales, generando reportes corporativos en Excel con fórmulas nativas.',
            en: 'Calculates freight variance comparing contracts against invoices, streaming binary styled ExcelJS spreadsheets with formulas.',
          },
        },
        {
          id: 'mod-sla',
          title: { es: 'Alert Center & Mitigación de Riesgo', en: 'Alert Center & Risk Escalation' },
          description: {
            es: 'Monitoriza penalizaciones por demoras aduaneras y tiempos de enfriamiento con contadores regresivos por segundo y resolución auditada.',
            en: 'Tracks compounding customs demurrage and cold-chain excursions with per-second countdown tickers and audited resolution sign-off.',
          },
        },
        {
          id: 'mod-collab',
          title: { es: 'Bitácora Colaborativa Jerárquica', en: '3-Tier Collaborative Bitácora' },
          description: {
            es: 'Estructura hilos de notas operativas limitados a 3 niveles de profundidad para mantener trazabilidad documental sin ruido.',
            en: 'Enforces operational note threading capped at level 3 to maintain complete auditability without unbounded noise.',
          },
        },
      ],
      techStack: [
        'Angular 21',
        'TypeScript',
        'Signals',
        'Zoneless',
        'Tailwind CSS',
        'NestJS 12',
        'Prisma ORM',
        'PostgreSQL 16',
        'Playwright',
        'Vitest',
        'Docker',
        'ExcelJS',
      ],
      githubUrl: 'https://github.com/kftorresdev/CargoPulse',
      liveDemoUrl: 'https://kftorresdev.github.io/CargoPulse/',
      sortOrder: 1,
    },
    {
      id: 'cargopulse-mobile',
      slug: 'cargopulse-mobile',
      title: 'CargoPulse Mobile',
      subtitle: {
        es: 'Aplicación Móvil de Campo para Inspección Transfronteriza (México - EE. UU.)',
        en: 'Cross-Border Field Operations Companion (US - Mexico Terminals)',
      },
      category: 'Mobile Field',
      badgeStatus: 'v1.0.0 · APK Optimizado R8',
      summary: {
        es: 'Herramienta móvil de grado industrial para inspectores de patio, choferes y agentes aduanales en terminales intermodales sin señal celular garantizada.',
        en: 'Industrial-grade mobile companion for yard inspectors, drivers, and customs agents across intermodal terminals with unreliable cellular coverage.',
      },
      businessProblem: {
        es: 'La falta de conectividad en patios aduaneros provocaba pérdidas de reportes de inspección, retrasos en la liberación de contenedores y discrepancias no detectadas en sellos fiscales.',
        en: 'Lack of cellular signal in freight yards led to lost inspection records, container release delays, and undetected fiscal seal discrepancies.',
      },
      technicalSolution: {
        es: 'Se diseñó una arquitectura Offline-First en .NET MAUI 9 (C# 13) con base de datos local SQLite y motor de sincronización secuencial en segundo plano (BackgroundSyncEngine con SemaphoreSlim). Se implementó la Tríada Anti-Congelamiento (Zero-ANR Triad) con un SLA estricto menor a 2 segundos en hardware, escáner de códigos de alta velocidad (ZXing) y captura de firma táctil vectorial (DrawingView).',
        en: 'Engineered an Offline-First architecture in .NET MAUI 9 (C# 13) with local SQLite database and sequential background sync engine (BackgroundSyncEngine with SemaphoreSlim). Implemented the Zero-ANR Triad ensuring a strict SLA under 2 seconds for hardware, high-speed camera barcode/QR scanner (ZXing), and vector touch signature capture (DrawingView).',
      },
      keyHighlights: {
        es: [
          'Persistencia Offline-First instantánea con SQLite (sqlite-net-pcl) y sincronización automática al restablecer conexión.',
          'Escáner óptico de códigos 128, QR y DataMatrix vía cámara física con respuesta háptica y búsqueda manual de respaldo.',
          'Proof of Condition con captura de hasta 3 fotografías con control de memoria (20 MB), geoposicionamiento GPS y firma digital.',
          'Tríada Anti-Congelamiento: fusible temporal, guardián de carrera Task.WhenAny y fallback seguro ante timeout.',
          '251 pruebas unitarias headless en xUnit ejecutándose en ~410 ms y pruebas E2E declarativas con Maestro CLI.',
        ],
        en: [
          'Instant Offline-First persistence via SQLite (sqlite-net-pcl) with automatic queue synchronization upon connectivity restored.',
          'High-speed optical camera scanner for Code 128, QR, and DataMatrix with haptic feedback and manual search fallback.',
          'Proof of Condition with up to 3 compressed photos (20 MB ceiling), GPS geolocation, and vector touch signature.',
          'Anti-Freeze Triad: temporal cancellation fuse, Task.WhenAny race guardian, and defensive timeout fallback.',
          '251 headless unit tests in xUnit executing in ~410 ms and declarative UI E2E test suite with Maestro CLI.',
        ],
      },
      metrics: [
        {
          id: 'cpm-m1',
          label: { es: 'Pruebas Unitarias', en: 'Unit Tests' },
          value: '251 Passed (~410ms)',
          iconName: 'check-circle',
        },
        {
          id: 'cpm-m2',
          label: { es: 'Arquitectura Móvil', en: 'Mobile Architecture' },
          value: '.NET MAUI 9 / C# 13',
          iconName: 'smartphone',
        },
        {
          id: 'cpm-m3',
          label: { es: 'Persistencia Local', en: 'Local Persistence' },
          value: 'SQLite Offline-First',
          iconName: 'hard-drive',
        },
        {
          id: 'cpm-m4',
          label: { es: 'SLA de Hardware', en: 'Hardware SLA' },
          value: 'Zero-ANR < 2s',
          iconName: 'shield',
        },
      ],
      architectureModules: [
        {
          id: 'mod-offline',
          title: { es: 'Motor de Sincronización Offline-First', en: 'Offline-First Sync Engine' },
          description: {
            es: 'Cola de transacciones locales en SQLite que detecta cambios de conectividad y sincroniza con reintentos secuenciales.',
            en: 'Local SQLite transaction queue that monitors connectivity events and synchronizes sequentially with automatic retries.',
          },
        },
        {
          id: 'mod-scanner',
          title: { es: 'Escáner Óptico de Alta Velocidad', en: 'High-Speed Optical Scanner' },
          description: {
            es: 'Control ZXing para lectura instantánea de sellos y códigos de contenedor con soporte de linterna y feedback háptico.',
            en: 'ZXing controller for instantaneous seal and container code decoding with flashlight support and haptic feedback.',
          },
        },
        {
          id: 'mod-signature',
          title: { es: 'Captura de Evidencia y Firma Vectorial', en: 'Evidence & Touch Signature Capture' },
          description: {
            es: 'Canvas DrawingView para firma táctil del transportista y captura fotográfica comprimida de daños con ubicación GPS.',
            en: 'DrawingView touch canvas for driver digital sign-off and compressed photo capture with GPS coordinates.',
          },
        },
        {
          id: 'mod-antifreeze',
          title: { es: 'Tríada Defensiva Anti-Congelamiento', en: 'Anti-Freeze Defensive Triad' },
          description: {
            es: 'Previene bloqueos del hilo de interfaz (ANR) mediante límite temporal duro de 2 segundos en todos los sensores físicos.',
            en: 'Eliminates UI thread freezes (ANR) enforcing a 2-second hard ceiling across all physical hardware sensors.',
          },
        },
      ],
      techStack: [
        '.NET MAUI 9',
        'C# 13',
        'SQLite',
        'CommunityToolkit.Mvvm',
        'ZXing.Net.Maui',
        'xUnit',
        'FluentAssertions',
        'Moq',
        'Maestro CLI',
        'GitHub Actions',
      ],
      githubUrl: 'https://github.com/kftorresdev/CargoPulse-mobile',
      sortOrder: 2,
    },
  ];

  /**
   * Matriz estructurada de competencias técnicas.
   */
  readonly skillCategories: readonly SkillCategory[] = [
    {
      id: 'cat-frontend',
      key: 'frontend',
      name: { es: 'Frontend Web Moderno', en: 'Modern Frontend Web' },
      iconName: 'layout',
      sortOrder: 1,
      skills: [
        { id: 'sk-ang', name: 'Angular (v9–v21+)', level: { es: 'Avanzado · Especialista', en: 'Advanced · Specialist' }, isFeatured: true, badgeColor: 'border-red-500/30 text-red-400 bg-red-950/20' },
        { id: 'sk-ts', name: 'TypeScript (ES6+)', level: { es: 'Avanzado · Tipado Estricto', en: 'Advanced · Strict Typing' }, isFeatured: true, badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-950/20' },
        { id: 'sk-signals', name: 'Angular Signals', level: { es: 'Avanzado · Reactividad Nativa', en: 'Advanced · Native Reactivity' }, isFeatured: true, badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20' },
        { id: 'sk-rxjs', name: 'RxJS', level: { es: 'Avanzado · Flujos Asíncronos', en: 'Advanced · Async Streams' }, isFeatured: true, badgeColor: 'border-pink-500/30 text-pink-400 bg-pink-950/20' },
        { id: 'sk-tw', name: 'Tailwind CSS (v3 / v4)', level: { es: 'Avanzado · Tokens & Dark Mode', en: 'Advanced · Tokens & Dark Mode' }, isFeatured: true, badgeColor: 'border-teal-500/30 text-teal-400 bg-teal-950/20' },
        { id: 'sk-forms', name: 'Reactive Forms', level: { es: 'Avanzado · Validaciones Complejas', en: 'Advanced · Complex Validation' }, isFeatured: false, badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20' },
        { id: 'sk-zoneless', name: 'Zoneless Change Detection', level: { es: 'Avanzado · Alto Rendimiento', en: 'Advanced · High Performance' }, isFeatured: true, badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-950/20' },
        { id: 'sk-htmlcss', name: 'HTML5 Semántico / CSS3', level: { es: 'Avanzado · Responsive', en: 'Advanced · Responsive' }, isFeatured: false, badgeColor: 'border-orange-500/30 text-orange-400 bg-orange-950/20' },
      ],
    },
    {
      id: 'cat-mobile',
      key: 'mobile',
      name: { es: 'Ingeniería Móvil & Offline', en: 'Mobile Engineering & Offline' },
      iconName: 'smartphone',
      sortOrder: 2,
      skills: [
        { id: 'sk-maui', name: '.NET MAUI 9 (C# / XAML)', level: { es: 'Avanzado · Clean MVVM', en: 'Advanced · Clean MVVM' }, isFeatured: true, badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-950/20' },
        { id: 'sk-droid', name: 'Android Nativo (Java / Kotlin)', level: { es: 'Intermedio-Avanzado · Hardware', en: 'Mid-Senior · Hardware Access' }, isFeatured: true, badgeColor: 'border-green-500/30 text-green-400 bg-green-950/20' },
        { id: 'sk-sqlite', name: 'SQLite Offline-First', level: { es: 'Avanzado · Sincronización', en: 'Advanced · Background Sync' }, isFeatured: true, badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-950/20' },
        { id: 'sk-mvvm', name: 'CommunityToolkit.Mvvm', level: { es: 'Avanzado · Cero Code-Behind', en: 'Advanced · Zero Code-Behind' }, isFeatured: false, badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-950/20' },
        { id: 'sk-zxing', name: 'Escaneo Óptico (ZXing)', level: { es: 'Avanzado · Códigos 128 / QR', en: 'Advanced · Code 128 / QR' }, isFeatured: false, badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20' },
        { id: 'sk-drawing', name: 'Firma Táctil Vectorial', level: { es: 'Avanzado · DrawingView', en: 'Advanced · DrawingView Canvas' }, isFeatured: false, badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-950/20' },
      ],
    },
    {
      id: 'cat-backend',
      key: 'backend',
      name: { es: 'Backend, APIs & Datos', en: 'Backend, APIs & Databases' },
      iconName: 'server',
      sortOrder: 3,
      skills: [
        { id: 'sk-nestjs', name: 'NestJS (Modular Monolith)', level: { es: 'Avanzado · Bounded Contexts', en: 'Advanced · Bounded Contexts' }, isFeatured: true, badgeColor: 'border-red-500/30 text-red-400 bg-red-950/20' },
        { id: 'sk-node', name: 'Node.js (TypeScript)', level: { es: 'Avanzado · Microtareas & Stream', en: 'Advanced · Streams & Microtasks' }, isFeatured: true, badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20' },
        { id: 'sk-netcore', name: '.NET Core (C# REST APIs)', level: { es: 'Intermedio-Avanzado · Integración', en: 'Mid-Senior · Integration' }, isFeatured: true, badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-950/20' },
        { id: 'sk-prisma', name: 'Prisma ORM / Sequelize', level: { es: 'Avanzado · Migraciones & Seeds', en: 'Advanced · Migrations & Seeds' }, isFeatured: true, badgeColor: 'border-teal-500/30 text-teal-400 bg-teal-950/20' },
        { id: 'sk-postgres', name: 'PostgreSQL / MySQL / SQLite', level: { es: 'Avanzado · Relacional & Índices', en: 'Advanced · Relational & Indexes' }, isFeatured: false, badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-950/20' },
        { id: 'sk-jwt', name: 'Seguridad JWT & RBAC', level: { es: 'Avanzado · Guards & Interceptors', en: 'Advanced · Guards & Interceptors' }, isFeatured: false, badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-950/20' },
        { id: 'sk-swagger', name: 'OpenAPI / Swagger', level: { es: 'Avanzado · Contratos API-First', en: 'Advanced · API-First Contracts' }, isFeatured: false, badgeColor: 'border-green-500/30 text-green-400 bg-green-950/20' },
      ],
    },
    {
      id: 'cat-devops',
      key: 'devops_testing',
      name: { es: 'DevOps, Testing & Herramientas', en: 'DevOps, Testing & Tooling' },
      iconName: 'check-square',
      sortOrder: 4,
      skills: [
        { id: 'sk-playwright', name: 'Playwright (E2E Web)', level: { es: 'Avanzado · Suites Completas', en: 'Advanced · Complete Suites' }, isFeatured: true, badgeColor: 'border-green-500/30 text-green-400 bg-green-950/20' },
        { id: 'sk-vitest', name: 'Vitest / Jest / Karma', level: { es: 'Avanzado · Unit & Component', en: 'Advanced · Unit & Component' }, isFeatured: true, badgeColor: 'border-yellow-500/30 text-yellow-400 bg-yellow-950/20' },
        { id: 'sk-xunit', name: 'xUnit / Moq / FluentAssertions', level: { es: 'Avanzado · Headless Testing', en: 'Advanced · Headless Testing' }, isFeatured: true, badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-950/20' },
        { id: 'sk-maestro', name: 'Maestro CLI (E2E Mobile)', level: { es: 'Avanzado · Pruebas Declarativas', en: 'Advanced · Declarative UI Flows' }, isFeatured: false, badgeColor: 'border-pink-500/30 text-pink-400 bg-pink-950/20' },
        { id: 'sk-docker', name: 'Docker & Docker Compose', level: { es: 'Avanzado · Multi-Stage Builds', en: 'Advanced · Multi-Stage Builds' }, isFeatured: true, badgeColor: 'border-sky-500/30 text-sky-400 bg-sky-950/20' },
        { id: 'sk-ghactions', name: 'GitHub Actions (CI/CD)', level: { es: 'Avanzado · Pipelines & Deploy', en: 'Advanced · Pipelines & Deploy' }, isFeatured: true, badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-950/20' },
        { id: 'sk-nginx', name: 'Nginx (Reverse Proxy & SPA)', level: { es: 'Avanzado · Compresión & Rutas', en: 'Advanced · Compression & Routing' }, isFeatured: false, badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20' },
      ],
    },
    {
      id: 'cat-arch',
      key: 'architecture',
      name: { es: 'Arquitectura & Metodologías', en: 'Architecture & Methodologies' },
      iconName: 'cpu',
      sortOrder: 5,
      skills: [
        { id: 'sk-cleanarch', name: 'Clean Architecture (3 Capas)', level: { es: 'Avanzado · Separación Rigurosa', en: 'Advanced · Strict Layering' }, isFeatured: true, badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/20' },
        { id: 'sk-cleancode', name: 'Clean Code & Guard Clauses', level: { es: 'Avanzado · Cero Anidamientos', en: 'Advanced · Early Returns' }, isFeatured: true, badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-950/20' },
        { id: 'sk-antifrank', name: 'Gobernanza Constitucional', level: { es: 'Avanzado · Zero-Code Policy', en: 'Advanced · Zero-Code Policy' }, isFeatured: true, badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-950/20' },
        { id: 'sk-scrum', name: 'Scrum / Metodologías Ágiles', level: { es: 'Avanzado · Sprints & DoD', en: 'Advanced · Sprints & DoD' }, isFeatured: false, badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20' },
        { id: 'sk-gitflow', name: 'Git Flow & Conventional Commits', level: { es: 'Avanzado · Historial Semántico', en: 'Advanced · Semantic History' }, isFeatured: false, badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-950/20' },
      ],
    },
  ];

  /**
   * Registro histórico de trayectoria laboral en la industria.
   */
  readonly workExperience: readonly WorkExperienceItem[] = [
    {
      id: 'exp-vesta',
      role: {
        es: 'Desarrollador de Sistemas – Frontend',
        en: 'Systems Developer – Frontend Specialist',
      },
      company: 'Grupo Vesta',
      sector: {
        es: 'Soluciones Logísticas y Cadena de Suministro',
        en: 'Logistics Solutions & Supply Chain',
      },
      period: {
        es: 'Abr 2024 – Actualidad',
        en: 'Apr 2024 – Present',
      },
      isCurrent: true,
      achievements: {
        es: [
          'Lideró la migración arquitectónica integral de la plataforma de seguimiento de embarques Control Carrier Tower (CCT) de Angular 11 a Angular 21, eliminando vistas duplicadas y optimizando la mantenibilidad.',
          'Modernizó el Sistema de Proyectos interno a Angular 21 Standalone modular, incorporando generación y descarga de reportes corporativos en Excel con ExcelJS.',
          'Construyó el portal de Acciones de Personal con Angular 9, Metro UI y jsPDF, digitalizando solicitudes de recursos humanos con flujos de aprobación y firmas electrónicas.',
          'Diseñó e implementó el módulo de Corte Diario del sistema de Análisis de Impacto Logístico (Angular 11) con grids dinámicos para auditar costos de flete en 4 tramos (Origen, Tránsito, Frontera y Destino).',
          'Empaquetó y containerizó aplicaciones Angular con Docker y Nginx, estructurando pipelines de CI/CD en GitHub Actions con pruebas automatizadas en Playwright.',
          'Desarrolló soluciones móviles: aplicación de almacén en Android (Java) con lectura óptica de códigos de barras (SQLite local) y aplicación ejecutiva en .NET MAUI para visualización de KPIs.',
          'Integró el frontend con servicios backend y APIs REST desarrolladas en .NET Core trabajando bajo metodología Scrum.',
        ],
        en: [
          'Led the end-to-end architectural migration of the Control Carrier Tower (CCT) freight tracking platform from Angular 11 to Angular 21, consolidating duplicated components and boosting code maintainability.',
          'Modernized the internal Projects Management System to modular Angular 21 Standalone, integrating corporate Excel spreadsheet streaming with ExcelJS.',
          'Engineered the Personnel Actions HR portal using Angular 9, Metro UI, and jsPDF, digitalizing employee requests with multi-stage approval workflows and digital signatures.',
          'Designed and deployed the Daily Freight Cut module for the Logistics Impact Analysis system (Angular 11), auditing 4-leg shipping costs (Origin, Transit, Border, Destination).',
          'Containerized Angular applications with multi-stage Docker and Nginx, authoring GitHub Actions CI/CD pipelines with automated Playwright E2E suites.',
          'Developed industrial mobile solutions: Android (Java) warehouse app with barcode scanning (local SQLite) and .NET MAUI executive KPI companion.',
          'Integrated frontend modules with .NET Core RESTful APIs under agile Scrum methodology.',
        ],
      },
      technologies: [
        'Angular (v9–v21)',
        'TypeScript',
        '.NET MAUI',
        'Android (Java)',
        'Docker',
        'Nginx',
        'GitHub Actions',
        'Playwright',
        'ExcelJS',
        'SQLite',
        '.NET Core',
        'Scrum',
      ],
      sortOrder: 1,
    },
    {
      id: 'exp-movitext',
      role: {
        es: 'Desarrollador Frontend',
        en: 'Frontend Developer',
      },
      company: 'MoviText',
      sector: {
        es: 'Plataforma SaaS de Mensajería Masiva SMS',
        en: 'Enterprise Bulk SMS SaaS Platform',
      },
      period: {
        es: 'Sep 2023 – Ene 2024',
        en: 'Sep 2023 – Jan 2024',
      },
      isCurrent: false,
      achievements: {
        es: [
          'Desarrolló la interfaz de autogestión de la plataforma web de mensajería masiva en Angular, implementando carga perezosa (Lazy Loading) para optimizar el rendimiento inicial.',
          'Construyó formularios reactivos complejos con validaciones asíncronas en tiempo real para la configuración de campañas de mensajería.',
          'Diseñó e integró endpoints REST en NestJS y Sequelize con autenticación JWT, orquestando entornos locales con Docker Compose y almacenamiento en AWS S3.',
          'Aseguró la calidad del código mediante la elaboración de pruebas unitarias frontend con Karma y Jasmine.',
        ],
        en: [
          'Developed the customer self-service web interface for the bulk SMS platform in Angular, applying lazy-loaded routes to minimize initial bundle overhead.',
          'Engineered complex reactive forms with real-time asynchronous validators for messaging campaign configurations.',
          'Designed and integrated RESTful endpoints in NestJS and Sequelize with JWT authentication, orchestrating local multi-container services with Docker Compose and AWS S3 storage.',
          'Enforced frontend software quality authoring comprehensive unit test suites with Karma and Jasmine.',
        ],
      },
      technologies: [
        'Angular',
        'TypeScript',
        'NestJS',
        'Sequelize',
        'MySQL',
        'Docker Compose',
        'AWS S3',
        'JWT',
        'Karma / Jasmine',
      ],
      sortOrder: 2,
    },
  ];

  /**
   * Formación académica universitaria.
   */
  readonly education: readonly EducationItem[] = [
    {
      id: 'edu-unah',
      degree: {
        es: 'Ingeniería en Sistemas',
        en: 'B.S. in Systems Engineering',
      },
      institution: 'Universidad Nacional Autónoma de Honduras (UNAH)',
      graduationYear: '2025',
      status: {
        es: 'Graduado / Titulado',
        en: 'Graduated / Degree Conferred',
      },
      details: {
        es: 'Formación exhaustiva en ciencias de la computación, algoritmos, arquitectura de software, bases de datos relacionales, sistemas distribuidos e ingeniería de requisitos.',
        en: 'Comprehensive education in computer science, algorithms, software architecture, relational databases, distributed systems, and requirements engineering.',
      },
    },
  ];
}
