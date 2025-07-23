import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Vote, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ModelCardProps {
  modelName: string;
  response: string;
  wordCount: number;
  onVote: (model: string) => void;
  hasVoted: boolean;
  isWinner?: boolean;
}

export function ModelCard({ 
  modelName, 
  response, 
  wordCount, 
  onVote, 
  hasVoted,
  isWinner 
}: ModelCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Response copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const getModelIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'claude':
        return '🧠';
      case 'mistral':
        return '🤖';
      default:
        return '🤔';
    }
  };

  const getModelColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'claude':
        return 'bg-primary/10 border-primary/20';
      case 'mistral':
        return 'bg-secondary/10 border-secondary/20';
      default:
        return 'bg-muted/10 border-muted/20';
    }
  };

  return (
    <Card className={`h-full ${getModelColor(modelName)} ${isWinner ? 'ring-2 ring-success' : ''} rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getModelIcon(modelName)}</span>
            <span className="text-xl font-semibold">{modelName}</span>
            {isWinner && (
              <Badge className="bg-success text-success-foreground rounded-full">
                🏆 Winner
              </Badge>
            )}
          </div>
          <Badge variant="outline" className="rounded-full">
            {wordCount} words
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-background/50 p-4 rounded-xl border border-border">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {response}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex-1 rounded-xl"
          >
            {copied ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Copy className="h-4 w-4 mr-2" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
          
          <Button
            variant={hasVoted ? "secondary" : "default"}
            size="sm"
            onClick={() => onVote(modelName)}
            disabled={hasVoted}
            className="flex-1 rounded-xl"
          >
            <Vote className="h-4 w-4 mr-2" />
            {hasVoted ? "Voted" : "Vote"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}