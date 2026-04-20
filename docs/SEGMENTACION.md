# Sistema de Segmentación de Leads

## Overview

Sistema para clasificar y rastrear potenciales clientes a lo largo del customer journey.

## Estados de Lead

| Estado | Descripción | Score Inicial |
|--------|------------|--------------|
| **Suspecto** | Visitó el sitio pero no interactuó | 0-10 |
| **Lead** | Se registró en masterclass | 10-30 |
| **Cliente** | Reservó cita o compró curso | 30-60 |
| **Fidelizado** | Múltiples interacciones/compras | 60-100 |

## Fuentes de Lead

```javascript
- masterclass: Registro en masterclass
- agenda: Reservación de sesión
- curso: Compra de curso
- orgánico: Visitante sin fuente rastreable
```

## API de Leads

### Lectura

```javascript
// Obtener todos los leads
const leads = getLeads();

// Resumen por estado
const summary = getLeadSummary();
// { total, suspecto, lead, cliente, fidelizado, promedioScore }

// Filtrar por estado
const clientes = getLeadsByStatus(LEAD_STATUS.CLIENTE);
```

### Escritura

```javascript
// Crear o actualizar lead al registrar
const lead = getOrCreateLead(email, nombre, fuente);

// Actualizar status
updateLeadStatus(email, LEAD_STATUS.CLIENTE, 'Reservó primera sesión');

// Actualizar score
updateLeadScore(email, +20, 'Asistió a masterclass');
```

## Score Automático

| Acción | Puntos |
|--------|--------|
| Registro masterclass | +20 |
| Reserva cita | +40 |
| Compra curso | +50 |
| Asistencia a clase | +15 |
| Respuesta a follow-up | +10 |

## Seguimiento Recomendado

| Estado | Acción | Tiempo |
|--------|--------|--------|
| Suspecto | Re-targeted ads | 7 días |
| Lead | Email nurture | 2 días post-registro |
| Cliente | Follow-up personal | 1 día post-reserva |
| Fidelizado | Upselling / Referencias | 30 días |

## Estructura de Datos

```javascript
{
  id: "1234567890",
  nombre: "Juan Pérez",
  email: "juan@email.com",
  status: "lead",
  fuente: "masterclass",
  score: 30,
  fecha_registro: "2026-04-19T10:00:00Z",
  ultima_interaccion: "2026-04-19T10:00:00Z",
  notas: [
    { fecha: "...", texto: "Registrado en masterclass" }
  ]
}
```

## Funciones Futuras

- [ ] Dashboard admin para ver leads
- [ ] Exportación a Google Sheets
- [ ] Email sequences automáticos
- [ ] Integración WhatsApp API
- [ ] Tracking de abandon cart
- [ ] Re-targeting por segmento