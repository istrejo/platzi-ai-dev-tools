import { Badge } from "@/components/ui";
import { Match } from "@/types";

interface ScoreboardProps {
  match: Match & {
    home_team_name: string;
    away_team_name: string;
    competition_name: string;
  };
}

export function Scoreboard({ match }: ScoreboardProps) {
  const matchDate = new Date(match.match_date);
  const isFinished = match.status === "finished";
  const isLive = match.status === "live";
  const isScheduled = match.status === "scheduled";

  const statusConfig = {
    scheduled: { label: "Próximo", variant: "info" as const, color: "bg-blue-500" },
    live: { label: "En Vivo", variant: "error" as const, color: "bg-red-500 animate-pulse" },
    finished: { label: "Finalizado", variant: "default" as const, color: "bg-gray-500" },
    postponed: { label: "Pospuesto", variant: "warning" as const, color: "bg-yellow-500" },
    cancelled: { label: "Cancelado", variant: "error" as const, color: "bg-red-500" },
  };

  return (
    <div className="bg-gradient-to-br from-platzi-blue to-platzi-dark text-white rounded-lg p-8">
      {/* Competition and Status */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm opacity-90">{match.competition_name}</div>
          {match.match_week && (
            <div className="text-xs opacity-75">Jornada {match.match_week}</div>
          )}
        </div>
        <Badge variant={statusConfig[match.status].variant} className="text-white">
          {statusConfig[match.status].label}
        </Badge>
      </div>

      {/* Teams and Score */}
      <div className="grid grid-cols-3 gap-4 items-center mb-6">
        {/* Home Team */}
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">{match.home_team_name}</div>
          {(isFinished || isLive) && (
            <div className="text-5xl font-bold text-platzi-green">{match.home_score}</div>
          )}
        </div>

        {/* Separator or Time */}
        <div className="text-center">
          {isScheduled ? (
            <div>
              <div className="text-sm opacity-75 mb-1">
                {matchDate.toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="text-3xl font-bold">
                {matchDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          ) : (
            <div className="text-4xl font-bold opacity-50">-</div>
          )}
        </div>

        {/* Away Team */}
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">{match.away_team_name}</div>
          {(isFinished || isLive) && (
            <div className="text-5xl font-bold text-platzi-green">{match.away_score}</div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      {isFinished && (
        <div className="text-center text-sm opacity-75 border-t border-white/20 pt-4">
          {matchDate.toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {match.attendance && ` • ${match.attendance.toLocaleString("es-ES")} espectadores`}
        </div>
      )}
    </div>
  );
}
