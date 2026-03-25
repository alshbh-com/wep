import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { saveSubmission, type Submission } from "@/lib/storage";
import { Ghost, MessageCircle, Send, Share2, TrendingDown, AlertTriangle, ShoppingCart, Building2, Store, Code2, Wrench } from "lucide-react";
import AiAdvice from "@/components/AiAdvice";
import { shareForAccuracy, openWhatsApp } from "@/lib/share";

const WHATSAPP_NUMBER = "201061067966";

export default function Index() {
  const navigate = useNavigate();
  const [dailyMessages, setDailyMessages] = useState("");
  const [dailyOrders, setDailyOrders] = useState("");
  const [respondents, setRespondents] = useState("");
  const [returns, setReturns] = useState("");
  const [result, setResult] = useState<{ lostCustomers: number; lostMoney: number; lossPercentage: number } | null>(null);

  const calculate = () => {
    const msgs = Number(dailyMessages) || 0;
    const orders = Number(dailyOrders) || 0;
    const resp = Number(respondents) || 0;
    const ret = Number(returns) || 0;

    const nonResponders = msgs - resp;
    const cancelled = orders - (orders - ret);
    const lostPerDay = Math.max(0, nonResponders + cancelled);
    const lostCustomers = Math.round(lostPerDay * 30);
    const avgOrderValue = 350;
    const lostMoney = lostCustomers * avgOrderValue;
    const lossPercentage = msgs > 0 ? Math.round((lostPerDay / msgs) * 100) : 0;

    setResult({ lostCustomers, lostMoney, lossPercentage });

    const sub: Submission = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      dailyMessages: msgs,
      dailyOrders: orders,
      respondents: resp,
      returns: ret,
      lostCustomers,
      lostMoney,
      lossPercentage,
    };
    saveSubmission(sub);
    setStep("results");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <Ghost className="h-7 w-7 text-primary neon-text" />
          <h1 className="text-lg font-bold text-foreground">شركة الشبح للبرمجة</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        {/* HERO */}
        {step === "hero" && (
          <div className="flex flex-col items-center gap-6 pt-8 text-center">
            <div className="relative">
              <div className="rounded-full bg-primary/10 p-6 neon-glow">
                <TrendingDown className="h-16 w-16 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-black leading-tight text-foreground">
              😳 اكتشف كام عميل
              <br />
              <span className="neon-text text-primary">بيهرب منك</span> كل شهر!
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              كل تاجر عنده ناس بتطلب ومش بترد… ناس بتلغي… ناس بتختفي.
              <br />
              احنا هنكشف لك <strong className="text-foreground">قد ايه فلوس راحت عليك</strong> 💸
            </p>
            <Button
              onClick={() => setStep("form")}
              size="lg"
              className="w-full max-w-xs text-lg font-bold neon-glow"
            >
              🔍 اكشف خسارتك مجاناً
            </Button>
            <p className="text-xs text-muted-foreground">مجاني تماماً • نتيجة فورية</p>
            <Button onClick={() => navigate("/tools")} variant="outline" size="lg" className="w-full max-w-xs gap-2 border-primary/50 text-primary font-bold mt-2">
              <Wrench className="h-5 w-5" /> 🔥 20 أداة مجانية للتجار
            </Button>
          </div>
        )}

        {/* FORM */}
        {step === "form" && (
          <div className="space-y-5 pt-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">⚡ ادخل أرقامك</h2>
              <p className="mt-1 text-sm text-muted-foreground">هنحسب لك في ثانية</p>
            </div>

            <Card className="border-border/50 bg-card">
              <CardContent className="space-y-4 p-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">📩 عدد الرسائل اليومية</label>
                  <Input
                    type="number"
                    placeholder="مثال: 50"
                    value={dailyMessages}
                    onChange={(e) => setDailyMessages(e.target.value)}
                    className="text-center text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">📦 عدد الأوردرات اليومية</label>
                  <Input
                    type="number"
                    placeholder="مثال: 20"
                    value={dailyOrders}
                    onChange={(e) => setDailyOrders(e.target.value)}
                    className="text-center text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">✅ عدد اللي بيردوا</label>
                  <Input
                    type="number"
                    placeholder="مثال: 30"
                    value={respondents}
                    onChange={(e) => setRespondents(e.target.value)}
                    className="text-center text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">🔄 عدد المرتجع</label>
                  <Input
                    type="number"
                    placeholder="مثال: 5"
                    value={returns}
                    onChange={(e) => setReturns(e.target.value)}
                    className="text-center text-lg"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={calculate}
              size="lg"
              className="w-full text-lg font-bold neon-glow"
              disabled={!dailyMessages || !dailyOrders}
            >
              💥 اكشف النتيجة
            </Button>
          </div>
        )}

        {/* RESULTS */}
        {step === "results" && result && (
          <div className="space-y-5 pt-4">
            {/* Shock Stats */}
            <Card className="result-card border-neon-red/30 bg-card neon-red-glow">
              <CardContent className="space-y-4 p-5 text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-neon-red" />
                <h2 className="text-xl font-black text-foreground">😱 النتيجة صادمة!</h2>

                <div className="space-y-3">
                  <div className="count-up rounded-lg bg-destructive/10 p-3">
                    <p className="text-3xl font-black text-neon-red">{result.lostCustomers}</p>
                    <p className="text-sm text-muted-foreground">❌ عميل بيضيع منك كل شهر</p>
                  </div>
                  <div className="count-up rounded-lg bg-neon-orange/10 p-3" style={{ animationDelay: "0.2s" }}>
                    <p className="text-3xl font-black text-neon-orange">{result.lostMoney.toLocaleString()} جنيه</p>
                    <p className="text-sm text-muted-foreground">💸 خسارة تقديرية شهرياً</p>
                  </div>
                  <div className="count-up rounded-lg bg-warning/10 p-3" style={{ animationDelay: "0.4s" }}>
                    <p className="text-3xl font-black text-warning">%{result.lossPercentage}</p>
                    <p className="text-sm text-muted-foreground">😡 نسبة الضياع من رسائلك</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  السبب: مفيش متابعة + رد بطيء + مفيش سيستم
                </p>
              </CardContent>
            </Card>

            {/* AI Rescue Plan */}
            <AiAdvice
              lostCustomers={result.lostCustomers}
              lostMoney={result.lostMoney}
              lossPercentage={result.lossPercentage}
              dailyMessages={Number(dailyMessages)}
              dailyOrders={Number(dailyOrders)}
              respondents={Number(respondents)}
              returns={Number(returns)}
            />

            {/* Solution */}
            <Card className="border-primary/30 bg-card neon-glow">
              <CardContent className="space-y-4 p-5 text-center">
                <Ghost className="mx-auto h-10 w-10 text-primary pulse-neon" />
                <h3 className="text-lg font-bold text-foreground">
                  😎 عايز تسترجع العملاء دول؟
                </h3>
                <p className="text-sm text-primary font-semibold">استخدم سيستم الشبح 👻</p>

                <div className="space-y-2">
                  <Button
                    onClick={() => openWhatsApp("عايز استرجع عملائي - سيستم شحن 📦")}
                    className="w-full gap-2 bg-primary text-primary-foreground font-bold"
                  >
                    <ShoppingCart className="h-4 w-4" /> استرجع عملائي (سيستم شحن)
                  </Button>
                  <Button
                    onClick={() => openWhatsApp("عايز انظم شغلي - سيستم مكاتب 🏢")}
                    variant="secondary"
                    className="w-full gap-2 font-bold"
                  >
                    <Building2 className="h-4 w-4" /> نظم شغلي (سيستم مكاتب)
                  </Button>
                  <Button
                    onClick={() => openWhatsApp("عايز ازود مبيعاتي - متجر 🛒")}
                    variant="secondary"
                    className="w-full gap-2 font-bold"
                  >
                    <Store className="h-4 w-4" /> زود مبيعاتي (متجر)
                  </Button>
                  <Button
                    onClick={() => openWhatsApp("عايز فكرة خاصة - برمجة 💻")}
                    variant="outline"
                    className="w-full gap-2 font-bold"
                  >
                    <Code2 className="h-4 w-4" /> اعمللي فكرة خاصة (برمجة)
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Viral Share */}
            <Button
              onClick={() => shareForAccuracy("كشف العملاء الهاربين", "/lost-orders")}
              variant="outline"
              size="lg"
              className="w-full gap-2 border-primary/50 text-primary font-bold"
            >
              <Share2 className="h-5 w-5" /> 🔥 شارك مع صاحبك عشان نتيجة أدق
            </Button>

            {/* WhatsApp Direct */}
            <Button
              onClick={() => openWhatsApp("محتاج استشارة مجانية من شركة الشبح 👻")}
              size="lg"
              className="w-full gap-2 bg-[hsl(142,70%,45%)] text-foreground font-bold"
            >
              <MessageCircle className="h-5 w-5" /> تواصل معانا على واتساب
            </Button>

            {/* Restart */}
            <button
              onClick={() => { setStep("hero"); setResult(null); }}
              className="w-full text-center text-sm text-muted-foreground underline"
            >
              جرب تاني بأرقام مختلفة
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-border/50 px-4 py-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <Ghost className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            شركة الشبح للبرمجة © {new Date().getFullYear()}
          </p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">صدمة + خوف + حل = نتائج 🔥</p>
      </footer>
    </div>
  );
}
