import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AiAdviceProps {
  lostCustomers: number;
  lostMoney: number;
  lossPercentage: number;
  dailyMessages: number;
  dailyOrders: number;
  respondents: number;
  returns: number;
}

export default function AiAdvice(props: AiAdviceProps) {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("ai-advice", {
          body: props,
        });

        if (fnError) throw fnError;
        setAdvice(data.advice);
      } catch (e) {
        console.error("AI advice error:", e);
        setError("مقدرناش نجيب التحليل دلوقتي، جرب تاني.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
  }, []);

  return (
    <Card className="border-primary/30 bg-card">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">🤖 خطة الإنقاذ بالذكاء الاصطناعي</h3>
        </div>

        {loading && (
          <div className="flex items-center justify-center gap-2 py-6 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">بنحلل أرقامك...</span>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive text-center py-4">{error}</p>
        )}

        {advice && (
          <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {advice}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
