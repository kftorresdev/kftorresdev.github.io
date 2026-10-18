# ⚖️ REGLAS PERMANENTES DE GOBERNANZA TÉCNICA — WORKSPACE @kftorresdev

Este archivo es ley de contexto activa e inviolable para Antigravity en todo momento en este workspace.
Complementa la `MASTER_ENGINEERING_CONSTITUTION.md` (v2.3).

---

## 🛑 PROTOCOLO INQUEBRANTABLE DE ENJAMBRE DE SUBAGENTES (SECCIÓN 11)

### 1. Prohibición de Desarrollo Monolítico en Hilo Único
El Agente Principal tiene **TERMINANTEMENTE PROHIBIDO** implementar código de producción y pruebas en un único hilo cuando una tarea involucra múltiples capas arquitectónicas. Su rol exclusivo es **Arquitecto Técnico Líder y Director del Enjambre (§ 11.4)**: fraccionar tareas, definir contratos, redactar prompts para subagentes especializados, supervisar su ejecución e integrar/certificar resultados.

### 2. Gatillo de Activación Mandatorio (§ 11.1)
Se considera **OBLIGATORIO** desplegar subagentes especializados (`invoke_subagent`) si la tarea cumple al menos UNA de las siguientes condiciones:
1. Involucra más de una capa arquitectónica (ej. Capa 1 UI + Capa 2 Signals/Store + Capa 3 Datos/HTTP).
2. Requiere investigación técnica profunda de contratos o librerías mientras se desarrollan vistas.
3. Demanda la creación simultánea de código de producción y suites de pruebas unitarias/E2E.
4. La actividad contiene más de 3 archivos interdependientes o lógica de sincronización crítica.

### 3. La Compuerta Pre-Vuelo Obligatoria (Pre-Flight Swarm Gate)
Antes de llamar a herramientas de escritura (`write_to_file`, `replace_file_content`) en cualquier sprint, actividad o refactorización, el Agente Principal **DEBE EMITIR OBLIGATORIAMENTE EN EL CHAT** la siguiente ficha de evaluación:

```markdown
### 🚦 COMPUERTA PRE-VUELO: EVALUACIÓN DE ENJAMBRE (§ 11.1)
- **¿Involucra >1 capa arquitectónica?:** [SÍ / NO]
- **¿Involucra >3 archivos interdependientes?:** [SÍ / NO]
- **¿Código de producción simultáneo con pruebas unitarias/E2E?:** [SÍ / NO]
- **¿Investigación técnica concurrente?:** [SÍ / NO]
- **VEREDICTO DE GOBERNANZA:** [ACTIVAR ENJAMBRE / DESARROLLO PUNTUAL EN 1 HILO]
- **ROLES DE SUBAGENTES ASIGNADOS:** (ej. Security & Code Auditor, UI & Accessibility Specialist, QA & Unit Testing Specialist)
```

Si el veredicto es **ACTIVAR ENJAMBRE**, el Agente Principal **NO PUEDE ESCRIBIR EL CÓDIGO DIRECTAMENTE**: debe invocar los subagentes correspondientes mediante `invoke_subagent`.

---

## 🛡️ ESTÁNDARES SAGRADOS DE CALIDAD Y REGLAS CONSTITUCIONALES
1. **Comentarios 100% en Español (§ 3.10):** Prohibido terminantemente dejar comentarios o docstrings en inglés en `.ts`, `.html` o `.css`.
2. **Cero `any` (§ 4.1):** Tipado estricto en todas las variables, funciones, retornos y mocks de pruebas.
3. **Cero Rutas de Máquina Host (§ 12.3):** Prohibido incluir `c:\Users\...` o rutas locales absolutas en documentación (`README.md`, specs, docs) y código fuente.
4. **Tríada Anti-Congelamiento (§ 18.1):** Todo recurso externo (red, I/O, almacenamiento) debe contar con fusible temporal de timeout, control de carrera y manejo con fallback.
5. **Pruebas Continuas (§ 8.1 & § 14):** Toda funcionalidad debe acompañarse de su correspondiente archivo `.spec.ts` y aprobarse al 100% en Vitest sin advertencias antes de dar por cerrado un sprint.
