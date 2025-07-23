import { useState } from "react";
import { PromptInput } from "@/components/PromptInput";
import { ModelCard } from "@/components/ModelCard";
import { VotingSection } from "@/components/VotingSection";
import { InsightsSidebar } from "@/components/InsightsSidebar";
import { Leaderboard } from "@/components/Leaderboard";
import { useToast } from "@/hooks/use-toast";
import { Swords, Brain } from "lucide-react";

interface ModelResponse {
  claude: string;
  mistral: string;
}

const Index = () => {
  const [responses, setResponses] = useState<ModelResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const generateMockResponse = (model: string, prompt: string, taskType: string): string => {
    const claudeResponses = {
      "Summarization": `As Claude, I'll provide a comprehensive yet concise summary. ${prompt.slice(0, 50)}... This appears to be about [key topic]. The main points include: 1) Primary insight, 2) Supporting details, 3) Conclusion. The information suggests that understanding this topic requires considering multiple perspectives and weighing the evidence carefully.`,
      "Question Answering": `Based on my analysis, the answer to "${prompt.slice(0, 30)}..." involves several key considerations. First, we need to understand the context and scope of the question. Then, we can examine the relevant factors: technical aspects, practical implications, and potential outcomes. My recommendation would be to approach this systematically while considering edge cases.`,
      "Code Generation": `Here's my approach to "${prompt.slice(0, 30)}...": \n\n\`\`\`python\ndef solution():\n    # Claude's implementation\n    result = []\n    for item in data:\n        if condition(item):\n            result.append(process(item))\n    return result\n\`\`\`\n\nThis solution prioritizes readability and maintainability. I've included error handling and followed best practices for ${taskType.toLowerCase()}.`,
      "Creative Writing": `"${prompt.slice(0, 20)}..." - what an intriguing premise! Let me craft something special:\n\nThe morning light filtered through ancient windows, casting dancing shadows across the worn wooden floor. Sarah's fingers traced the edge of the mysterious letter, its contents promising to change everything she thought she knew about her family's past. The words seemed to whisper secrets that had been buried for generations, each sentence unraveling a tapestry of hidden truths and forgotten dreams.`,
      "Roleplay": `*adjusts character stance and speaks in character* \n\nAh, regarding "${prompt.slice(0, 30)}..." - as your chosen character, I must say this situation requires careful consideration. *thoughtful pause* In my experience, the best approach would be to first understand all parties involved. Let me share what I've learned from similar circumstances... *continues with authentic character voice and mannerisms*`
    };

    const mistralResponses = {
      "Summarization": `Here's my summary: ${prompt.slice(0, 40)}... The core elements are: central theme, supporting evidence, and practical implications. Key takeaways: 1) Main concept is well-established, 2) Evidence supports the primary argument, 3) Applications are broad and varied. This topic connects to broader themes in the field and offers valuable insights for practitioners.`,
      "Question Answering": `To address "${prompt.slice(0, 30)}...": The solution involves understanding the fundamental principles and applying them systematically. Key points: methodology, implementation steps, and expected outcomes. I recommend starting with basic concepts before advancing to complex scenarios. This approach ensures solid foundation and reliable results.`,
      "Code Generation": `For "${prompt.slice(0, 30)}...", here's my solution:\n\n\`\`\`python\ndef efficient_solution():\n    # Mistral's optimized approach\n    return [process(x) for x in data if validate(x)]\n\`\`\`\n\nThis implementation focuses on performance and conciseness. The list comprehension provides better memory efficiency, and the validation step ensures data integrity throughout the process.`,
      "Creative Writing": `Inspired by "${prompt.slice(0, 20)}...", here's my take:\n\nThe clock struck midnight as Emma discovered the hidden compartment behind the bookshelf. Inside lay a collection of photographs and letters that revealed a story spanning three generations. Each image told part of a larger narrative - one of love, loss, and the unbreakable bonds that connect us across time. The mystery that had haunted her family was finally beginning to unravel.`,
      "Roleplay": `*enters scene with confidence*\n\nRegarding "${prompt.slice(0, 30)}..." - I believe the situation calls for decisive action. *gestures expressively* From my perspective as this character, we should consider both immediate needs and long-term consequences. The wisdom I've gained suggests that sometimes the boldest move is the right one. *maintains character consistency throughout response*`
    };

    const responses = model === 'Claude' ? claudeResponses : mistralResponses;
    return responses[taskType as keyof typeof responses] || "I understand your request. Let me provide a thoughtful response that addresses your specific needs and requirements in a comprehensive manner.";
  };

  const handleRunPrompt = async (prompt: string, taskType: string) => {
    setIsLoading(true);
    setResponses(null);
    setWinner(null);
    setShowFeedback(false);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newResponses = {
      claude: generateMockResponse('Claude', prompt, taskType),
      mistral: generateMockResponse('Mistral', prompt, taskType)
    };

    setResponses(newResponses);
    setIsLoading(false);

    toast({
      title: "Responses generated!",
      description: "Compare the responses and vote for your favorite.",
    });
  };

  const handleVote = (model: string) => {
    setWinner(model);
    setShowFeedback(true);

    // Save vote to localStorage
    const savedData = localStorage.getItem('llm-battle-votes');
    const currentData = savedData ? JSON.parse(savedData) : { claude: 42, mistral: 38 };
    
    if (model.toLowerCase() === 'claude') {
      currentData.claude += 1;
    } else {
      currentData.mistral += 1;
    }
    
    localStorage.setItem('llm-battle-votes', JSON.stringify(currentData));

    toast({
      title: "Vote recorded!",
      description: `You voted for ${model}. Thanks for participating!`,
    });

    // Trigger a page refresh to update the leaderboard
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const claudeWordCount = responses?.claude ? responses.claude.split(/\s+/).length : 0;
  const mistralWordCount = responses?.mistral ? responses.mistral.split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LLM Battle Room
            </h1>
            <Swords className="h-8 w-8 text-accent" />
          </div>
          <p className="text-center text-muted-foreground mt-2">
            🧠 Compare responses from different large language models
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Prompt Input Section */}
        <section className="animate-fade-in">
          <PromptInput onRunPrompt={handleRunPrompt} isLoading={isLoading} />
        </section>

        {/* Loading State */}
        {isLoading && (
          <section className="text-center py-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-card rounded-2xl px-6 py-4 border border-border">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-lg font-medium">Generating responses...</span>
            </div>
          </section>
        )}

        {/* Model Comparison Panel */}
        {responses && !isLoading && (
          <section className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                ⚔️ Model Comparison
              </h2>
              <p className="text-muted-foreground">
                Compare the responses and vote for your favorite
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <ModelCard
                modelName="Claude"
                response={responses.claude}
                wordCount={claudeWordCount}
                onVote={handleVote}
                hasVoted={showFeedback}
                isWinner={winner === 'Claude'}
              />
              <ModelCard
                modelName="Mistral"
                response={responses.mistral}
                wordCount={mistralWordCount}
                onVote={handleVote}
                hasVoted={showFeedback}
                isWinner={winner === 'Mistral'}
              />
            </div>
          </section>
        )}

        {/* Voting Feedback */}
        <VotingSection winner={winner} showFeedback={showFeedback} />

        {/* Insights and Leaderboard */}
        {responses && (
          <section className="grid lg:grid-cols-2 gap-6 animate-fade-in">
            <InsightsSidebar
              claudeResponse={responses.claude}
              mistralResponse={responses.mistral}
              claudeWordCount={claudeWordCount}
              mistralWordCount={mistralWordCount}
            />
            <Leaderboard />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            🆚 Built with love for AI enthusiasts • Compare • Vote • Learn
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;