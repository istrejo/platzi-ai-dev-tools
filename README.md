# Platzi AI Tools

Repositorio de proyectos desarrollados con asistencia de IA.

## Proyectos

### Platzi FC

Sitio web oficial del club de fútbol Platzi FC. Proyecto completo con frontend Next.js 15, backend Supabase y CMS Sanity.

📂 **Ubicación**: `platzi-fc/`

📖 **Documentación**:
- [Plan de Ejecución](plan.md) - Stack técnico, roadmap y fases
- [Requirements](platzi-fc-requirements.md) - Sitemap y especificaciones

🌿 **Branches**:
- `main` - MVP completo con mock data
- `feature/supabase-integration` - Integración con Supabase (en revisión)

**Estado actual**: MVP completado (85%), integración Supabase en PR

Ver [platzi-fc/README.md](platzi-fc/README.md) para más detalles.

## Estructura

```
.
├── platzi-fc/              # Proyecto Platzi FC
│   ├── apps/
│   │   └── web/            # Next.js 15 App
│   ├── packages/           # Paquetes compartidos (futuro)
│   └── README.md
├── plan.md                 # Plan de ejecución Platzi FC
├── platzi-fc-requirements.md  # Requirements Platzi FC
└── README.md               # Este archivo
```

## Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript 5, Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL)
- **CMS**: Sanity.io
- **Monorepo**: Turborepo + pnpm
- **Deploy**: Vercel

## Desarrollo

Cada proyecto tiene su propio README con instrucciones específicas de desarrollo.
