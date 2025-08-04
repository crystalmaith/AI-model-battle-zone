import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users } from "lucide-react";

interface VotingSectionProps {
  winner: string | null;
  showFeedback: boolean;
}

export function VotingSection({ winner, showFeedback }: VotingSectionProps) {
  if (!showFeedback) return null;

  return (
    <Card className="w-full bg-destructive/20 border-destructive/40 rounded-2xl shadow-lg animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-destructive drop-shadow-lg">
          <Trophy className="h-5 w-5 text-warning" />
          🔥 DARK RITUAL COMPLETE 💀
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-red-200 drop-shadow-md">
            🔥 YOUR DARK VOTE HAS BEEN CAST! 💀
          </p>
          <p className="text-sm text-red-300">
            You've chosen <Badge className="bg-warning text-black rounded-full mx-1">{winner}</Badge> as your champion of digital darkness!
          </p>
          <p className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1">
            <Users className="h-3 w-3" />
            🔥 The infernal scores burn in eternal memory 💀
          </p>
        </div>
      </CardContent>
    </Card>
  );
}