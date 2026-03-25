import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { lostCustomers, lostMoney, lossPercentage, dailyMessages, dailyOrders, respondents, returns } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `أنت خبير تسويق ومبيعات مصري متخصص في التجارة الإلكترونية والشحن. 
اسمك "خبير الشبح". بتتكلم بالعامية المصرية.
مهمتك تحلل أرقام التاجر وتديله خطة إنقاذ عملية ومختصرة.
الرد لازم يكون:
1. تحليل سريع للمشكلة (سطرين)
2. 3 نصائح عملية مختصرة (كل نصيحة سطر واحد)
3. جملة تحفيزية في الآخر
استخدم إيموجي مناسبة. خلي الرد قصير ومؤثر (أقل من 150 كلمة).`;

    const userPrompt = `تاجر عنده الأرقام دي:
- رسائل يومية: ${dailyMessages}
- أوردرات يومية: ${dailyOrders}
- اللي بيردوا: ${respondents}
- مرتجعات: ${returns}
- عملاء ضايعين شهرياً: ${lostCustomers}
- خسارة تقديرية: ${lostMoney} جنيه
- نسبة الضياع: ${lossPercentage}%

حلل الأرقام دي واديه خطة إنقاذ.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "تم تجاوز الحد المسموح، حاول تاني بعد شوية." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "الرصيد غير كافي." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "حصل مشكلة في التحليل، جرب تاني." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const advice = data.choices?.[0]?.message?.content || "مفيش نصائح متاحة دلوقتي.";

    return new Response(JSON.stringify({ advice }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-advice error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
