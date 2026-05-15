import Link from "next/link";
import { Card, CardContent, Badge } from "@/components/ui";
import { Player } from "@/types";

interface PlayerCardProps {
  player: Player;
}

const positionLabels = {
  goalkeeper: "Portero",
  defender: "Defensa",
  midfielder: "Centrocampista",
  forward: "Delantero",
};

const positionColors = {
  goalkeeper: "warning",
  defender: "info",
  midfielder: "success",
  forward: "error",
} as const;

export function PlayerCard({ player }: PlayerCardProps) {
  const age = player.date_of_birth
    ? new Date().getFullYear() - new Date(player.date_of_birth).getFullYear()
    : null;

  return (
    <Link href={`/equipo/${player.slug}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-platzi-blue text-white flex items-center justify-center text-xl font-bold">
                {player.jersey_number}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">
                  {player.first_name} {player.last_name}
                </h3>
                <p className="text-sm text-gray-500">{player.nationality}</p>
              </div>
            </div>
            <Badge variant={positionColors[player.position]}>
              {positionLabels[player.position]}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {age && (
              <div>
                <span className="text-gray-500">Edad:</span>
                <span className="ml-2 font-semibold">{age} años</span>
              </div>
            )}
            {player.height_cm && (
              <div>
                <span className="text-gray-500">Altura:</span>
                <span className="ml-2 font-semibold">{player.height_cm} cm</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
