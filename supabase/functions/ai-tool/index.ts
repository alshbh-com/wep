import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const toolPrompts: Record<string, string> = {
  "shipping-cost": `أنت خبير شحن مصري. التاجر هيديك بياناته وانت هتحسبله تكلفة الشحن الشهرية وتقارنها بالمتوسط في السوق. 
اديله نصائح لتقليل التكلفة. استخدم إيموجي. اتكلم بالعامية المصرية. خلي الرد أقل من 200 كلمة.`,

  "returns-analyzer": `أنت محلل مرتجعات محترف مصري. حلل بيانات المرتجعات اللي التاجر هيديهالك.
اديله أسباب محتملة وحلول عملية لتقليل المرتجعات. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "shipping-compare": `أنت خبير مقارنة شركات شحن في مصر. قارن بين الشركات بناءً على البيانات.
اديله توصية واضحة. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "profit-calc": `أنت محاسب تجارة إلكترونية مصري. حلل أرقام الربح والتكلفة.
اديله الربح الصافي الحقيقي ونصائح لزيادته. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "peak-time": `أنت خبير تسويق مصري. حلل أوقات الذروة بناءً على البيانات.
اديله أفضل أوقات للإعلانات والنشر. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "whatsapp-gen": `أنت كاتب محتوى تسويقي مصري محترف. اكتب رسائل واتساب متابعة للعملاء.
الرسائل لازم تكون قصيرة ومؤثرة وفيها CTA واضح. اكتب 3 رسائل مختلفة. عامية مصرية مع إيموجي.`,

  "ad-budget": `أنت خبير إعلانات فيسبوك وانستجرام مصري. حلل ميزانية الإعلانات.
اديله العائد المتوقع وخطة توزيع الميزانية. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "pricing": `أنت خبير تسعير منتجات مصري. ساعد التاجر يحدد السعر الأمثل.
خد في اعتبارك التكاليف والمنافسين والطلب. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "product-desc": `أنت كاتب أوصاف منتجات محترف مصري. اكتب وصف منتج جذاب وبيبيع.
الوصف لازم يكون فيه مميزات + فوائد + CTA. اكتب وصف طويل ووصف قصير. عامية مصرية مع إيموجي.`,

  "conversion": `أنت خبير تحسين معدل التحويل مصري. حلل الأرقام واديه نصائح عملية.
ركز على أسباب ضعف التحويل وإزاي يحسنه. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "breakeven": `أنت محاسب تجارة إلكترونية مصري. احسب نقطة التعادل.
قوله بعد كام أوردر يبدأ يكسب ونصائح للوصول أسرع. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "return-policy": `أنت كاتب سياسات محترف مصري. اكتب سياسة استرجاع واستبدال احترافية.
لازم تكون واضحة وعادلة وتحمي التاجر والعميل. اكتبها بلغة رسمية مع إيموجي.`,

  "competitor": `أنت محلل منافسين محترف مصري. حلل بيانات المنافسين.
اديله نقاط القوة والضعف وفرص التميز. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "discount": `أنت خبير عروض وخصومات مصري. حلل بيانات المنتج والمبيعات.
اديله أفضل نسبة خصم تزود المبيعات من غير ما تخسره. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "marketing-plan": `أنت خبير تسويق رقمي مصري. اعمل خطة تسويق شهرية كاملة.
الخطة لازم تكون عملية وفيها مواعيد وميزانيات وأنواع المحتوى. استخدم إيموجي وعامية مصرية. أقل من 300 كلمة.`,

  "repeat-customers": `أنت خبير ولاء عملاء مصري. حلل بيانات العملاء المتكررين.
اديله استراتيجيات لزيادة نسبة الشراء المتكرر. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "market-size": `أنت محلل أسواق مصري. قدر حجم السوق بناءً على البيانات.
اديله تقدير للفرصة المتاحة ونصائح للدخول. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "cs-replies": `أنت خبير خدمة عملاء مصري. اكتب ردود جاهزة لأشهر أسئلة العملاء.
اكتب 5 ردود لأشهر المواقف (تأخير، مرتجع، استفسار، شكوى، شكر). عامية مصرية مع إيموجي.`,

  "employee-cost": `أنت خبير موارد بشرية وأتمتة مصري. قارن تكلفة الموظف vs السيستم.
اديله الأرقام بوضوح والتوفير المتوقع. استخدم إيموجي وعامية مصرية. أقل من 200 كلمة.`,

  "business-health": `أنت استشاري أعمال مصري محترف. اعمل تقرير صحة بيزنس شامل.
قيم البيزنس من كل النواحي (مبيعات، تسويق، عمليات، مالية) واديه تقييم من 10. استخدم إيموجي وعامية مصرية. أقل من 300 كلمة.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { tool, data } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = toolPrompts[tool];
    if (!systemPrompt) {
      return new Response(JSON.stringify({ error: "أداة مش موجودة" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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
          { role: "user", content: typeof data === "string" ? data : JSON.stringify(data) },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "تم تجاوز الحد المسموح، حاول تاني بعد شوية." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "الرصيد غير كافي." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      return new Response(JSON.stringify({ error: "حصل مشكلة، جرب تاني." }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await response.json();
    const content = result.choices?.[0]?.message?.content || "مفيش نتيجة متاحة.";

    return new Response(JSON.stringify({ result: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("ai-tool error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
