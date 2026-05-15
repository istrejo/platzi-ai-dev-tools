import { Article } from "@/types";

export const mockNews: Article[] = [
  {
    id: "1",
    title: "Victoria contundente ante el Atlético Tech",
    slug: "victoria-contundente-atletico-tech",
    excerpt:
      "El Platzi FC consiguió una importante victoria por 2-1 en casa ante el Atlético Tech en un partido emocionante.",
    content: `
# Victoria contundente ante el Atlético Tech

El Platzi FC consiguió una importante victoria por 2-1 en casa ante el Atlético Tech en un partido emocionante que mantuvo a los 25,000 espectadores al borde de sus asientos.

## Primer Tiempo

El equipo local salió con intensidad desde el primer minuto, presionando alto y buscando el gol temprano. Lucas Silva abrió el marcador en el minuto 23 con un potente disparo desde fuera del área que se coló por la escuadra.

## Segundo Tiempo

En la segunda mitad, el Atlético Tech empató momentáneamente, pero David Martínez sentenció el partido con un golazo en el minuto 78.

## Declaraciones

"Estoy muy orgulloso del equipo. Trabajamos toda la semana para este partido y lo demostramos en el campo", declaró el entrenador Juan Pérez tras el encuentro.
    `,
    cover_media_ref_id: null,
    published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "published",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Lucas Silva, el goleador que no para de crecer",
    slug: "lucas-silva-goleador-que-no-para",
    excerpt:
      "El delantero brasileño se ha convertido en una pieza fundamental del equipo con 8 goles en 14 partidos.",
    content: `
# Lucas Silva, el goleador que no para de crecer

Con solo 26 años, Lucas Silva se ha consolidado como el máximo goleador del Platzi FC en esta temporada, acumulando 8 goles en 14 partidos disputados.

## Trayectoria

Llegado al club hace dos temporadas, Silva ha demostrado ser una inversión acertada. Su velocidad, técnica y olfato goleador lo han convertido en el favorito de la afición.

## Números impresionantes

- 8 goles en 14 partidos
- 4 asistencias
- 89% de efectividad en pases
- Mejor jugador del mes en octubre

## Futuro prometedor

"Mi objetivo es ayudar al equipo a clasificar a Champions League. Estamos trabajando duro para lograrlo", afirmó Silva en conferencia de prensa.
    `,
    cover_media_ref_id: null,
    published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "published",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Preparación intensiva para el próximo partido",
    slug: "preparacion-intensiva-proximo-partido",
    excerpt:
      "El equipo se prepara con entrenamientos dobles de cara al importante encuentro del próximo fin de semana.",
    content: `
# Preparación intensiva para el próximo partido

El cuerpo técnico del Platzi FC ha implementado una rutina de entrenamientos intensivos para preparar el crucial partido de la próxima jornada.

## Enfoque táctico

Ana Fernández, entrenadora asistente y especialista en preparación física, ha diseñado sesiones específicas para mejorar la resistencia y la velocidad del equipo.

## Recuperación de lesionados

Buenas noticias en el departamento médico: todos los jugadores están disponibles para la convocatoria.

## Palabras del entrenador

"Sabemos la importancia del próximo partido. Estamos trabajando cada detalle para llegar en las mejores condiciones", comentó Juan Pérez.
    `,
    cover_media_ref_id: null,
    published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "published",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
