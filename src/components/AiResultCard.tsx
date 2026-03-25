import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AiResultCardProps {
  tool: string;
  data: Record<string, any> | string;
  buttonText?: string;
}

export default function AiResultCard({ tool, data, buttonText = "🤖 تحليل بالذكاء الاصطناعي" }: AiResultCardProps) {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);

  const fetch_ = async () => {
    setRequested(true);
    setLoading(true);
    setError(null);
    try {
      const { data: res, error: fnError } = await supabase.functions.invoke("ai-tool", {
        body: { tool, data },
      });
      if (fnError) throw fnError;
      setResult(res.result);
    } catch (e) {
      console.error("AI tool error:", e);
      setError("مقدرناش نجيب التحليل دلوقتي، جرب تاني.");
    } finally {
      setLoading(false);
    }
  };

  if (!requested) {
    return (
      <Button onClick={fetch_} size="lg" variant="outline" className="w-full gap-2 border-primary/50 text-primary font-bold">
        <Sparkles className="h-5 w-5" /> {buttonText}
      </Button>
    );
  }

  return (
    <Card className="border-primary/30 bg-card">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">🤖 تحليل الذكاء الاصطناعي</h3>
        </div>
        {loading && (
          <div className="flex items-center justify-center gap-2 py-6 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">بنحلل...</span>
          </div>
        )}
        {error && <p className="text-sm text-destructive text-center py-4">{error}</p>}
        {result && (
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">{result}</div>
        )}
      </CardContent>
    </Card>
  );
}
