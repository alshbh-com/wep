import { Ghost, Share2, MessageCircle, TrendingDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { shareOnWhatsApp, openWhatsApp } from "@/lib/share";

const tools = [
  { path: "/lost-orders", emoji: "😱", name: "كشف العملاء الهاربين", desc: "اكتشف كام عميل بيضيع منك", hot: true },
  { path: "/shipping-cost", emoji: "🚚", name: "حاسبة تكلفة الشحن", desc: "احسب تكلفة الشحن الشهرية" },
  { path: "/returns-analyzer", emoji: "🔄", name: "محلل المرتجعات", desc: "حلل أسباب المرتجعات" },
  { path: "/shipping-compare", emoji: "⚖️", name: "مقارنة شركات الشحن", desc: "قارن بين شركات الشحن" },
  { path: "/profit-calc", emoji: "💰", name: "حاسبة الربح الصافي", desc: "اعرف ربحك الحقيقي" },
  { path: "/peak-time", emoji: "⏰", name: "كشف وقت الذروة", desc: "اعرف أفضل وقت للبيع" },
  { path: "/whatsapp-gen", emoji: "💬", name: "مولد رسائل واتساب", desc: "رسائل متابعة ذكية" },
  { path: "/ad-budget", emoji: "📊", name: "حاسبة ميزانية الإعلانات", desc: "وزع ميزانيتك صح" },
  { path: "/pricing", emoji: "🏷️", name: "تسعير المنتجات", desc: "حدد السعر الأمثل" },
  { path: "/product-desc", emoji: "✍️", name: "مولد وصف المنتجات", desc: "أوصاف احترافية بالـ AI" },
  { path: "/conversion", emoji: "📈", name: "كشف معدل التحويل", desc: "اعرف نسبة التحويل" },
  { path: "/breakeven", emoji: "⚖️", name: "نقطة التعادل", desc: "بعد كام أوردر تكسب" },
  { path: "/return-policy", emoji: "📋", name: "مولد سياسة الاسترجاع", desc: "سياسة احترافية جاهزة" },
  { path: "/competitor", emoji: "🔍", name: "تحليل المنافسين", desc: "اعرف ازاي تتميز" },
  { path: "/discount", emoji: "🏷️", name: "حاسبة الخصومات", desc: "خصومات من غير خسارة" },
  { path: "/marketing-plan", emoji: "📅", name: "خطة تسويق شهرية", desc: "خطة كاملة بالـ AI" },
  { path: "/repeat-customers", emoji: "🔁", name: "العملاء المتكررين", desc: "اكشف نسبة الولاء" },
  { path: "/market-size", emoji: "🌍", name: "حجم السوق", desc: "قدر فرصتك في السوق" },
  { path: "/cs-replies", emoji: "💬", name: "ردود خدمة العملاء", desc: "ردود جاهزة ذكية" },
  { path: "/employee-cost", emoji: "👤", name: "تكلفة الموظف vs السيستم", desc: "قارن واوفر" },
  { path: "/business-health", emoji: "🏥", name: "تقرير صحة البيزنس", desc: "تشخيص شامل بالـ AI" },
];

export default function ToolsHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <Ghost className="h-7 w-7 text-primary neon-text" />
          <h1 className="text-lg font-bold text-foreground">أدوات الشبح المجانية 👻</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6 space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-black text-foreground">🔥 20 أداة مجانية للتجار</h2>
          <p className="text-sm text-muted-foreground">كل الأدوات بالذكاء الاصطناعي • مجاناً تماماً</p>
        </div>

        <div className="space-y-3">
          {tools.map(tool => (
            <Card
              key={tool.path}
              className={`border-border/50 bg-card cursor-pointer hover:border-primary/50 transition-colors ${tool.hot ? 'border-neon-red/40 neon-red-glow' : ''}`}
              onClick={() => navigate(tool.path)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <span className="text-2xl">{tool.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-sm">{tool.name}</p>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </div>
                {tool.hot && <span className="text-xs bg-destructive/20 text-neon-red px-2 py-1 rounded-full font-bold">🔥 الأشهر</span>}
                <ArrowLeft className="h-4 w-4 text-muted-foreground shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={() => shareOnWhatsApp("أدوات الشبح المجانية للتجار", "/tools")}
          variant="outline"
          size="lg"
          className="w-full gap-2 border-primary/50 text-primary font-bold"
        >
          <Share2 className="h-5 w-5" /> 🔥 شارك الأدوات مع أصحابك
        </Button>

        <Button
          onClick={() => openWhatsApp("محتاج استشارة مجانية من شركة الشبح 👻")}
          size="lg"
          className="w-full gap-2 bg-[hsl(142,70%,45%)] text-foreground font-bold"
        >
          <MessageCircle className="h-5 w-5" /> تواصل معانا على واتساب
        </Button>
      </main>

      <footer className="mt-8 border-t border-border/50 px-4 py-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <Ghost className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">شركة الشبح للبرمجة © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
