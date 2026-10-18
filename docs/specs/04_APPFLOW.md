# 04_APPFLOW — Navigation Flows & Application State Machines
## Portafolio Profesional de Ingeniería de Software — Kevin Fernando Torres Castro (@kftorresdev)

---

### Control del Documento
- **Proyecto:** Portafolio Profesional de Ingeniería de Software
- **Titular:** Kevin Fernando Torres Castro (`@kftorresdev`)
- **Versión:** 1.0.0
- **Fase:** Fase 0 (Pre-Desarrollo y Especificación)
- **Marco Rector:** `MASTER_ENGINEERING_CONSTITUTION.md` (v2.3)
- **Estado:** Pendiente de Aprobación Formal

---

## 1. Árbol de Navegación Jerárquico del Sistema

La aplicación está diseñada bajo el patrón de **Single-Page Application (SPA) de Alto Rendimiento** con navegación fluida por anclas contextuales, combinada con sub-enrutamiento para modales de estudio de caso de arquitectura:

```mermaid
flowchart TD
    Root["/ (Landing Raíz Canónica)"]
    
    subgraph NavigationBar ["Barra de Navegación Superior Fija"]
        NavBrand["Logotipo </> kftorresdev\n(Scroll al inicio)"]
        NavProjects["#proyectos\n(Scroll a Proyectos Destacados)"]
        NavSkills["#habilidades\n(Scroll a Matriz de Competencias)"]
        NavExperience["#experiencia\n(Scroll a Trayectoria Laboral)"]
        NavContact["#contacto\n(Scroll a Formulario y Redes)"]
        LangToggle["Control ES | EN\n(Signal Switcher)"]
        ThemeToggle["Control ☀️ | 🌙\n(Signal Switcher)"]
        CVButton["Descarga Directa CV (PDF)"]
    end

    subgraph Sections ["Secciones Principales de Contenido"]
        HeroSec["1. Hero Section\n(Headline, Badges, Quick Bio, CTAs)"]
        ProjectsSec["2. Proyectos Destacados\n• CargoPulse Web\n• CargoPulse Mobile"]
        SkillsSec["3. Matriz de Habilidades\n(Filtros interactivos por dominio)"]
        ExperienceSec["4. Trayectoria Profesional\n• Grupo Vesta\n• MoviText\n• Educación UNAH"]
        ContactSec["5. Formulario de Contacto & Canales\n• Formulario Reactivo Serverless\n• Tarjetas directas WhatsApp / Email / LinkedIn"]
        FooterSec["6. Footer Oficial & Metadatos"]
    end

    subgraph Modals ["Modales de Detalle Arquitectónico"]
        ProjectModal["Modal de Estudio de Caso Profundo\n(Diagramas C4, Retos Resueltos, Métricas)"]
    end

    Root --> NavigationBar
    NavigationBar --> HeroSec
    NavProjects --> ProjectsSec
    NavSkills --> SkillsSec
    NavExperience --> ExperienceSec
    NavContact --> ContactSec
    ProjectsSec -.->|Clic en 'Ver Arquitectura'| ProjectModal
```

---

## 2. Matriz de Control de Acceso por Pantalla y Vistas

Dado que este portafolio es un escaparate profesional público orientado a evaluadores, clientes y reclutadores de todo el mundo:

| Sección / Vista | Nivel de Acceso | Mecanismo de Seguridad | Descripción y Comportamiento |
| :--- | :--- | :--- | :--- |
| **Hero & Perfil** | Público | Acceso Libre | Renderizado instantáneo; sin autenticación requerida. |
| **Proyectos Insignia** | Público | Acceso Libre | Muestra resúmenes, métricas y enlaces directos a repositorios y demos públicas. |
| **Modales de Arquitectura** | Público | Control de Estado (Signal) | Se abre y cierra mediante reactividad local; previene scroll del body de fondo. |
| **Matriz de Habilidades** | Público | Filtrado Reactivo | Interacción fluida en memoria del cliente sin llamadas al servidor. |
| **Trayectoria & Educación**| Público | Acceso Libre | Visualización cronológica ordenada. |
| **Formulario de Contacto** | Público con Protección | Rate-Limiting & Honeypot | Control anti-spam mediante honeypot invisible y debounce en el botón de envío. |
| **Descarga de CV (PDF)** | Público | Enlace Estático Seguro | Descarga directa desde `/assets/docs/` en español o inglés según corresponda. |

---

## 3. Máquinas de Estados de Flujos Críticos

### 3.1 Máquina de Estados: Selector Bilingüe Instantáneo (ES / EN)

El idioma del portafolio se gobierna mediante un Signal reactivo centralizado en `LanguageService`. No requiere recargar el navegador ni consultar APIs externas:

```mermaid
stateDiagram-v2
    [*] --> InicializacionIdioma: Usuario carga la web
    
    state InicializacionIdioma {
        [*] --> VerificarLocalStorage
        VerificarLocalStorage --> CargarPreferencia: Existe clave 'kftorres_lang'
        VerificarLocalStorage --> DetectarNavegador: No existe en localStorage
        DetectarNavegador --> IdiomaDetectado: Si navegador inicia con 'en' -> EN, sino -> ES
        CargarPreferencia --> IdiomaActivo
        IdiomaDetectado --> IdiomaActivo
    }

    IdiomaActivo --> IdiomaEspanol: lang.set('es')
    IdiomaActivo --> IdiomaIngles: lang.set('en')

    state IdiomaEspanol {
        [*] --> ActualizarDiccionarioES
        ActualizarDiccionarioES --> PersistirLocalStorageES
        PersistirLocalStorageES --> ActualizarTituloYMetaES
    }

    state IdiomaIngles {
        [*] --> ActualizarDiccionarioEN
        ActualizarDiccionarioEN --> PersistirLocalStorageEN
        PersistirLocalStorageEN --> ActualizarTituloYMetaEN
    }

    IdiomaEspanol --> IdiomaIngles: Usuario pulsa botón 'EN'
    IdiomaIngles --> IdiomaEspanol: Usuario pulsa botón 'ES'
```

### 3.2 Máquina de Estados: Selector de Tema Visual (Dark / Light)

El tema se gestiona mediante Signals con persistencia en `localStorage` y detección automática de la preferencia del sistema operativo del usuario (`prefers-color-scheme`):

```mermaid
stateDiagram-v2
    [*] --> DetectarPreferenciaTema
    DetectarPreferenciaTema --> LeerStorage: Existe 'kftorres_theme'
    DetectarPreferenciaTema --> ConsultarMediaOS: No existe en storage
    
    LeerStorage --> AplicarTema
    ConsultarMediaOS --> AplicarTema: Dark por defecto si OS es dark o neutral
    
    state AplicarTema {
        [*] --> EvaluarClaseHTML
        EvaluarClaseHTML --> ModoOscuro: theme() === 'dark' -> classList.add('dark')
        EvaluarClaseHTML --> ModoClaro: theme() === 'light' -> classList.remove('dark')
    }

    ModoOscuro --> ModoClaro: Usuario pulsa icono Sol
    ModoClaro --> ModoOscuro: Usuario pulsa icono Luna
```

### 3.3 Máquina de Estados: Envío de Formulario de Contacto Reactivo

El flujo de contacto implementa la **Tríada Anti-Congelamiento** de la Constitución (Fusible temporal, guarda de timeout y fallback defensivo):

```mermaid
stateDiagram-v2
    [*] --> FormularioInactivo: Carga inicial (Estado IDLE)
    
    FormularioInactivo --> FormularioEditandose: Usuario escribe en inputs
    FormularioEditandose --> FormularioInvalido: Campos requeridos vacíos o email inválido
    FormularioEditandose --> FormularioValido: Todos los campos cumplen validadores
    FormularioInvalido --> FormularioEditandose: Usuario corrige errores

    FormularioValido --> EnvioEnProgreso: Usuario hace clic en 'Enviar Mensaje'
    
    state EnvioEnProgreso {
        [*] --> ValidarHoneypot
        ValidarHoneypot --> DescartarSilencioso: Honeypot lleno (Bot detectado)
        ValidarHoneypot --> DispararHttpRequest: Honeypot vacío (Usuario real)
        DispararHttpRequest --> IniciarFusibleTimeout: Timeout límite duro de 8000ms
    }

    EnvioEnProgreso --> EnvioExitoso: HTTP 200 OK recibido < 8000ms
    EnvioEnProgreso --> EnvioFallido: HTTP 4xx/5xx o Timeout cumplido (8s)

    state EnvioExitoso {
        [*] --> MostrarBannerVerde
        MostrarBannerVerde --> LimpiarCamposFormulario
        LimpiarCamposFormulario --> AutocerrarFeedback: Después de 6 segundos
    }

    state EnvioFallido {
        [*] --> MostrarBannerRojo
        MostrarBannerRojo --> OfrecerAlternativaDirecta: Enlaces a WhatsApp y Email
        OfrecerAlternativaDirecta --> BotonReintentarActivo
    }

    EnvioFallido --> EnvioEnProgreso: Usuario pulsa 'Reintentar'
    AutocerrarFeedback --> FormularioInactivo
```

### 3.4 Máquina de Estados: Modal de Estudio de Caso de Arquitectura

```mermaid
stateDiagram-v2
    [*] --> ModalCerrado: Navegación estándar
    
    ModalCerrado --> ModalAbriendo: Clic en 'Ver Arquitectura y Retos'
    
    state ModalAbriendo {
        [*] --> CargarDetalleProyecto: activeProject.set(project)
        CargarDetalleProyecto --> BloquearScrollBody: document.body.style.overflow = 'hidden'
        BloquearScrollBody --> TabActivaOverview: tab.set('overview')
    }

    ModalAbriendo --> ModalAbierto
    
    state ModalAbierto {
        TabActivaOverview --> TabActivaArquitectura: Clic en tab 'Diagrama C4'
        TabActivaArquitectura --> TabActivaMetricas: Clic en tab 'Pruebas & Métricas'
        TabActivaMetricas --> TabActivaOverview: Clic en tab 'Resumen Ejecutivo'
    }

    ModalAbierto --> ModalCerrando: Clic en botón 'Cerrar' (X)
    ModalAbierto --> ModalCerrando: Presionar tecla Escape (ESC)
    ModalAbierto --> ModalCerrando: Clic en el telón de fondo (Backdrop)

    state ModalCerrando {
        [*] --> DesbloquearScrollBody: document.body.style.overflow = ''
        DesbloquearScrollBody --> LimpiarProyectoActivo: activeProject.set(null)
    }

    ModalCerrando --> ModalCerrado
```

---
*Fin del Documento 04_APPFLOW.md — Pendiente de Aprobación Formal.*
