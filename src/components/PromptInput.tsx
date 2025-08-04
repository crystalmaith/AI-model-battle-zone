import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Play } from "lucide-react";

interface PromptInputProps {
  onRunPrompt: (prompt: string, taskType: string) => void;
  isLoading: boolean;
}

const taskTypes = [
  "Summarization",
  "Question Answering", 
  "Code Generation",
  "Creative Writing",
  "Roleplay"
];

export function PromptInput({ onRunPrompt, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [taskType, setTaskType] = useState("");

  const handleSubmit = () => {
    if (prompt.trim() && taskType) {
      onRunPrompt(prompt, taskType);
    }
  };

  return (
    <Card className="w-full bg-card border-border rounded-2xl shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="flex items-center gap-2 text-2xl font-semibold text-foreground">
          <PenTool className="h-6 w-6 text-destructive" />
          🔥 Summon Your Dark Command
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-red-200">
            💀 Dark Ritual Type
          </label>
          <Select value={taskType} onValueChange={setTaskType}>
            <SelectTrigger className="rounded-xl bg-background border-border">
              <SelectValue placeholder="Select a task type" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-popover border-border">
              {taskTypes.map((type) => (
                <SelectItem key={type} value={type} className="rounded-lg">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-red-200">
            🔥 Your Demonic Incantation
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Whisper your darkest commands here... (e.g., 'Unleash the essence of this cursed text')"
            className="min-h-[120px] rounded-xl bg-background border-border resize-none"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!prompt.trim() || !taskType || isLoading}
          className="w-full rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 transition-all duration-200 hover:scale-[1.02]"
        >
          <Play className="h-4 w-4 mr-2" />
          {isLoading ? "🔥 Summoning..." : "💀 UNLEASH HELL"}
        </Button>
      </CardContent>
    </Card>
  );
}