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
    <Card className="w-full bg-success/10 border-success/20 rounded-2xl shadow-lg animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-success-foreground">
          <Trophy className="h-5 w-5 text-success" />
          Voting Complete
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-success-foreground">
            Thanks for voting! 
          </p>
          <p className="text-sm text-muted-foreground">
            You voted for <Badge className="bg-success text-success-foreground rounded-full mx-1">{winner}</Badge> as the better response.
          </p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
            <Users className="h-3 w-3" />
            Your vote has been saved locally
          </p>
        </div>
      </CardContent>
    </Card>
  );
}