import Link from "next/link";
import { Card, CardContent, Badge } from "@/components/ui";
import { Match } from "@/types";

interface MatchCardProps {
  match: Match & {
    home_team_name: string;
    away_team_name: string;
    competition_name: string;
  };
}

export function MatchCard({ match }: MatchCardProps) {
  const matchDate = new Date(match.match_date);
  const isFinished = match.status === "finished";
  const isLive = match.status === "live";

  const statusBadge = {
    scheduled: { label: "Próximo", variant: "info" as const },
    live: { label: "En Vivo", variant: "error" as const },
    finished: { label: "Finalizado", variant: "default" as const },
    postponed: { label: "Pospuesto", variant: "warning" as const },
    cancelled: { label: "Cancelado", variant: "error" as const },
  };

  return (
    <Link href={`/partidos/${match.id}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              {match.competition_name}
              {match.match_week && ` - Jornada ${match.match_week}`}
            </div>
            <Badge variant={statusBadge[match.status].variant}>
              {statusBadge[match.status].label}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="flex-1 text-center">
              <div className="font-semibold text-lg mb-2">{match.home_team_name}</div>
              {isFinished || isLive ? (
                <div className="text-3xl font-bold text-platzi-blue">{match.home_score}</div>
              ) : null}
            </div>

            {/* Score or Time */}
            <div className="px-6 text-center">
              {isFinished || isLive ? (
                <div className="text-2xl font-bold text-gray-400">-</div>
              ) : (
                <div className="text-sm text-gray-500">
                  <div>{matchDate.toLocaleDateString("es-ES", { day: "2-digit", month: "short" })}</div>
                  <div className="font-semibold">
                    {matchDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              )}
            </div>

            {/* Away Team */}
            <div className="flex-1 text-center">
              <div className="font-semibold text-lg mb-2">{match.away_team_name}</div>
              {isFinished || isLive ? (
                <div className="text-3xl font-bold text-platzi-blue">{match.away_score}</div>
              ) : null}
            </div>
          </div>

          {isFinished && (
            <div className="mt-4 pt-4 border-t text-center text-sm text-gray-500">
              {matchDate.toLocaleDateString("es-ES", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
