import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function ShippingCost() {
  const [orders, setOrders] = useState("");
  const [avgShipping, setAvgShipping] = useState("");
  const [cities, setCities] = useState("");
  const [done, setDone] = useState(false);
  const total = (Number(orders) || 0) * (Number(avgShipping) || 0) * 30;

  return (
    <ToolLayout title="حاسبة تكلفة الشحن" emoji="🚚" toolPath="/shipping-cost" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">📦 عدد الأوردرات اليومية</label>
            <Input type="number" placeholder="مثال: 20" value={orders} onChange={e => setOrders(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">💰 متوسط سعر الشحن (جنيه)</label>
            <Input type="number" placeholder="مثال: 45" value={avgShipping} onChange={e => setAvgShipping(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🏙️ عدد المحافظات</label>
            <Input type="number" placeholder="مثال: 5" value={cities} onChange={e => setCities(e.target.value)} className="text-center text-lg" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!orders || !avgShipping}>💥 احسب التكلفة</Button>
      {done && (
        <>
          <Card className="border-neon-orange/30 bg-card">
            <CardContent className="p-5 text-center space-y-2">
              <p className="text-3xl font-black text-neon-orange">{total.toLocaleString()} جنيه</p>
              <p className="text-sm text-muted-foreground">💸 تكلفة الشحن الشهرية التقديرية</p>
            </CardContent>
          </Card>
          <AiResultCard tool="shipping-cost" data={{ orders, avgShipping, cities, total }} buttonText="🤖 نصيحة لتقليل التكلفة" />
        </>
      )}
    </ToolLayout>
  );
}
