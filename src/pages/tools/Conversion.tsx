import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function Conversion() {
  const [visitors, setVisitors] = useState("");
  const [orders, setOrders] = useState("");
  const [done, setDone] = useState(false);
  const rate = Number(visitors) > 0 ? ((Number(orders) / Number(visitors)) * 100).toFixed(1) : "0";

  return (
    <ToolLayout title="كشف معدل التحويل" emoji="📈" toolPath="/conversion" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">👥 عدد الزوار الشهري</label>
            <Input type="number" placeholder="مثال: 10000" value={visitors} onChange={e => setVisitors(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">📦 عدد الأوردرات الشهرية</label>
            <Input type="number" placeholder="مثال: 200" value={orders} onChange={e => setOrders(e.target.value)} className="text-center text-lg" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!visitors || !orders}>📈 اكشف التحويل</Button>
      {done && (
        <>
          <Card className="border-primary/30 bg-card">
            <CardContent className="p-5 text-center space-y-2">
              <p className={`text-3xl font-black ${Number(rate) < 2 ? 'text-neon-red' : 'text-primary'}`}>%{rate}</p>
              <p className="text-sm text-muted-foreground">📊 معدل التحويل</p>
              <p className="text-xs text-muted-foreground">{Number(rate) < 1 ? "😱 ضعيف جداً!" : Number(rate) < 2 ? "⚠️ تحت المتوسط" : Number(rate) < 4 ? "👍 كويس" : "🔥 ممتاز!"}</p>
            </CardContent>
          </Card>
          <AiResultCard tool="conversion" data={{ visitors, orders, rate }} buttonText="🤖 نصائح لتحسين التحويل" />
        </>
      )}
    </ToolLayout>
  );
}
