# Configuración de Supabase

Este documento explica cómo configurar Supabase para el proyecto Platzi FC.

## 1. Obtener las credenciales de Supabase

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona el proyecto "Platzi FC"
3. Ve a Settings > API
4. Copia las siguientes credenciales:
   - **Project URL**: `https://yizqsmkfvlnwmgodxgqm.supabase.co`
   - **anon/public key**: La clave pública (anon key)
   - **service_role key**: La clave de servicio (solo para backend)

## 2. Configurar variables de entorno

Crea un archivo `.env.local` en `apps/web/` con el siguiente contenido:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://yizqsmkfvlnwmgodxgqm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui
```

## 3. Ejecutar el seed

El script de seed poblará la base de datos con datos de ejemplo:

```bash
cd apps/web
pnpm seed
```

Esto creará:
- 1 temporada (2024/2025)
- 2 competiciones (Liga Nacional, Copa del Rey)
- 5 equipos (Platzi FC + 4 rivales)
- 6 jugadores del Platzi FC
- 2 miembros del staff
- 4 partidos (2 próximos, 2 finalizados)
- 5 posiciones en la tabla de clasificación

## 4. Verificar los datos

Puedes verificar que los datos se insertaron correctamente:

1. Ve a Supabase Dashboard > Table Editor
2. Revisa las tablas: `seasons`, `teams`, `players`, `matches`, `standings`

## 5. Configurar Row Level Security (RLS)

⚠️ **IMPORTANTE**: Actualmente todas las tablas tienen RLS deshabilitado, lo que significa que cualquiera con la anon key puede leer/modificar los datos.

Para habilitar RLS en todas las tablas (recomendado para producción):

```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_match_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_season_stats ENABLE ROW LEVEL SECURITY;

-- Crear políticas para permitir lectura pública
CREATE POLICY "Allow public read access" ON public.seasons FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.competitions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.players FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.matches FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.standings FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.player_match_stats FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.player_season_stats FOR SELECT USING (true);
```

## 6. Estructura de la Base de Datos

### Tablas Deportivas

- `seasons`: Temporadas deportivas
- `competitions`: Competiciones (ligas, copas)
- `teams`: Equipos de fútbol
- `players`: Jugadores
- `staff`: Cuerpo técnico
- `matches`: Partidos
- `standings`: Clasificación
- `player_match_stats`: Estadísticas por partido
- `player_season_stats`: Estadísticas por temporada

### Tablas CMS (Fase V1)

- `news`: Noticias
- `pages`: Páginas institucionales
- `media_refs`: Referencias a archivos multimedia
- `sponsors`: Patrocinadores
- `store_categories`: Categorías de tienda
- `store_products`: Productos
- `tickets`: Entradas
- `memberships`: Membresías
- `events`: Eventos
- `stadiums`: Estadios
- `navigation_items`: Navegación

## 7. Próximos pasos

Una vez configurado Supabase:

1. Ejecuta el servidor de desarrollo: `pnpm dev`
2. Las páginas ahora cargarán datos reales de Supabase en lugar de mock data
3. Puedes agregar más datos directamente desde el Supabase Dashboard
