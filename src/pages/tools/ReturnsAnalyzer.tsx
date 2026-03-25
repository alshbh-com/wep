import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function ReturnsAnalyzer() {
  const [totalOrders, setTotalOrders] = useState("");
  const [returns, setReturns] = useState("");
  const [topReason, setTopReason] = useState("");
  const [done, setDone] = useState(false);
  const rate = Number(totalOrders) > 0 ? Math.round((Number(returns) / Number(totalOrders)) * 100) : 0;

  return (
    <ToolLayout title="محلل المرتجعات" emoji="🔄" toolPath="/returns-analyzer" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">📦 إجمالي الأوردرات الشهرية</label>
            <Input type="number" placeholder="مثال: 500" value={totalOrders} onChange={e => setTotalOrders(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🔄 عدد المرتجعات الشهرية</label>
            <Input type="number" placeholder="مثال: 80" value={returns} onChange={e => setReturns(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">❓ أكتر سبب للمرتجع</label>
            <Input placeholder="مثال: المنتج مش زي الصورة" value={topReason} onChange={e => setTopReason(e.target.value)} className="text-center" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!totalOrders || !returns}>💥 حلل المرتجعات</Button>
      {done && (
        <>
          <Card className="border-neon-red/30 bg-card">
            <CardContent className="p-5 text-center space-y-2">
              <p className="text-3xl font-black text-neon-red">%{rate}</p>
              <p className="text-sm text-muted-foreground">📊 نسبة المرتجعات</p>
              <p className="text-xs text-muted-foreground">{rate > 15 ? "😱 نسبة عالية جداً!" : rate > 8 ? "⚠️ محتاج تحسين" : "✅ نسبة مقبولة"}</p>
            </CardContent>
          </Card>
          <AiResultCard tool="returns-analyzer" data={{ totalOrders, returns, topReason, rate }} buttonText="🤖 نصائح لتقليل المرتجعات" />
        </>
      )}
    </ToolLayout>
  );
}
