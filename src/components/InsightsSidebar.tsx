import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, BarChart3, FileText, Heart, Tag } from "lucide-react";

interface InsightsSidebarProps {
  claudeResponse: string;
  mistralResponse: string;
  claudeWordCount: number;
  mistralWordCount: number;
}

export function InsightsSidebar({ 
  claudeResponse, 
  mistralResponse, 
  claudeWordCount, 
  mistralWordCount 
}: InsightsSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSentiment = (text: string) => {
    // Simple sentiment analysis based on keywords
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'happy', 'success'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'sad', 'failure', 'problem', 'issue'];
    
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'Positive 😊';
    if (negativeCount > positiveCount) return 'Negative 😔';
    return 'Neutral 😐';
  };

  const extractEntities = (text: string) => {
    // Simple entity extraction (capitalized words)
    const words = text.split(/\s+/);
    const entities = words
      .filter(word => /^[A-Z][a-z]+/.test(word))
      .filter((word, index, arr) => arr.indexOf(word) === index)
      .slice(0, 5);
    return entities;
  };

  const claudeSentiment = getSentiment(claudeResponse);
  const mistralSentiment = getSentiment(mistralResponse);
  const claudeEntities = extractEntities(claudeResponse);
  const mistralEntities = extractEntities(mistralResponse);

  return (
    <Card className="bg-accent/5 border-accent/20 rounded-2xl shadow-lg">
      <CardHeader className="pb-4">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between p-0 h-auto hover:bg-transparent"
        >
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-accent-foreground">
            <BarChart3 className="h-5 w-5 text-accent" />
            📈 Insights
          </CardTitle>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-accent" />
          ) : (
            <ChevronRight className="h-4 w-4 text-accent" />
          )}
        </Button>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6 animate-fade-in">
          {/* Word Count Comparison */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-accent" />
              <span className="font-medium text-sm">Word Count</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Claude</span>
                <Badge variant="outline" className="rounded-full">
                  {claudeWordCount}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mistral</span>
                <Badge variant="outline" className="rounded-full">
                  {mistralWordCount}
                </Badge>
              </div>
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-accent" />
              <span className="font-medium text-sm">Sentiment</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Claude</span>
                <Badge variant="outline" className="rounded-full text-xs">
                  {claudeSentiment}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Mistral</span>
                <Badge variant="outline" className="rounded-full text-xs">
                  {mistralSentiment}
                </Badge>
              </div>
            </div>
          </div>

          {/* Key Entities */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-accent" />
              <span className="font-medium text-sm">Key Entities</span>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Claude:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {claudeEntities.length > 0 ? (
                    claudeEntities.map((entity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs rounded-full">
                        {entity}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No entities found</span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium">Mistral:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mistralEntities.length > 0 ? (
                    mistralEntities.map((entity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs rounded-full">
                        {entity}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">No entities found</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}