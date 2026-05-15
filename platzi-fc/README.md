# Platzi FC

Sitio web oficial del Platzi FC construido con Next.js 15, TypeScript y Tailwind CSS.

## Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 3
- **Monorepo**: Turborepo + pnpm
- **Base de datos**: PostgreSQL (Supabase)
- **CMS**: Sanity.io

## Estructura del Proyecto

```
platzi-fc/
├── apps/
│   └── web/              # Aplicación Next.js principal
├── packages/             # Paquetes compartidos (futuro)
└── drizzle/             # Migraciones de base de datos (futuro)
```

## Desarrollo

### Requisitos

- Node.js >= 20.0.0
- pnpm >= 9.15.4

### Instalación

```bash
pnpm install
```

### Desarrollo Local

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:3000`

### Build

```bash
pnpm build
```

### Linting y Formateo

```bash
pnpm lint
pnpm format
```

## Fase Actual: Setup (Fase 0)

Estamos en la fase inicial de configuración del proyecto. Ver `plan.md` para más detalles sobre las fases de desarrollo.

## Licencia

Privado - Platzi FC
