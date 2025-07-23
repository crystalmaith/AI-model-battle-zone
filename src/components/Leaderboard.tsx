import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardData {
  claude: number;
  mistral: number;
}

export function Leaderboard() {
  const [data, setData] = useState<LeaderboardData>({ claude: 0, mistral: 0 });

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('llm-battle-votes');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      // Set initial fake data for demonstration
      const initialData = { claude: 42, mistral: 38 };
      localStorage.setItem('llm-battle-votes', JSON.stringify(initialData));
      setData(initialData);
    }
  }, []);

  const total = data.claude + data.mistral;
  const claudePercentage = total > 0 ? (data.claude / total) * 100 : 0;
  const mistralPercentage = total > 0 ? (data.mistral / total) * 100 : 0;

  const getLeaderIcon = (isWinning: boolean, position: number) => {
    if (position === 1) return <Trophy className="h-5 w-5 text-warning" />;
    if (position === 2) return <Medal className="h-5 w-5 text-muted-foreground" />;
    return <Award className="h-5 w-5 text-muted-foreground" />;
  };

  const leaderboardItems = [
    { name: 'Claude', votes: data.claude, percentage: claudePercentage, emoji: '🧠' },
    { name: 'Mistral', votes: data.mistral, percentage: mistralPercentage, emoji: '🤖' }
  ].sort((a, b) => b.votes - a.votes);

  return (
    <Card className="w-full bg-warning/5 border-warning/20 rounded-2xl shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold text-warning-foreground">
          <Trophy className="h-6 w-6 text-warning" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">
          Total battles: <Badge variant="outline" className="rounded-full">{total}</Badge>
        </p>
        
        <div className="space-y-4">
          {leaderboardItems.map((item, index) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getLeaderIcon(index === 0, index + 1)}
                  <span className="text-lg">{item.emoji}</span>
                  <span className="font-semibold">{item.name}</span>
                  {index === 0 && total > 0 && (
                    <Badge className="bg-warning text-warning-foreground rounded-full text-xs">
                      Leader
                    </Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold">{item.votes}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
              <Progress
                value={item.percentage}
                className="h-2"
              />
            </div>
          ))}
        </div>

        <div className="text-center pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Data updates in real-time based on your votes
          </p>
        </div>
      </CardContent>
    </Card>
  );
}