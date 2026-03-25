import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function ProfitCalc() {
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [shipping, setShipping] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [orders, setOrders] = useState("");
  const [done, setDone] = useState(false);

  const p = Number(price), c = Number(cost), s = Number(shipping), r = Number(returnRate) / 100, o = Number(orders);
  const profitPerOrder = p - c - s;
  const lostToReturns = Math.round(o * r * (c + s));
  const netProfit = Math.round(o * profitPerOrder - lostToReturns);

  return (
    <ToolLayout title="حاسبة الربح الصافي" emoji="💰" toolPath="/profit-calc" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">💵 سعر البيع</label>
            <Input type="number" placeholder="مثال: 500" value={price} onChange={e => setPrice(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🏭 تكلفة المنتج</label>
            <Input type="number" placeholder="مثال: 200" value={cost} onChange={e => setCost(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🚚 تكلفة الشحن</label>
            <Input type="number" placeholder="مثال: 45" value={shipping} onChange={e => setShipping(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🔄 نسبة المرتجعات (%)</label>
            <Input type="number" placeholder="مثال: 15" value={returnRate} onChange={e => setReturnRate(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">📦 أوردرات شهرية</label>
            <Input type="number" placeholder="مثال: 300" value={orders} onChange={e => setOrders(e.target.value)} className="text-center text-lg" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!price || !cost}>💥 احسب ربحي</Button>
      {done && (
        <>
          <Card className={`border-${netProfit > 0 ? 'primary' : 'neon-red'}/30 bg-card`}>
            <CardContent className="p-5 text-center space-y-3">
              <p className={`text-3xl font-black ${netProfit > 0 ? 'text-primary' : 'text-neon-red'}`}>{netProfit.toLocaleString()} جنيه</p>
              <p className="text-sm text-muted-foreground">💰 الربح الصافي الشهري</p>
              <p className="text-xs text-muted-foreground">خسارة المرتجعات: {lostToReturns.toLocaleString()} جنيه</p>
            </CardContent>
          </Card>
          <AiResultCard tool="profit-calc" data={{ price, cost, shipping, returnRate, orders, netProfit, lostToReturns }} buttonText="🤖 نصائح لزيادة الربح" />
        </>
      )}
    </ToolLayout>
  );
}
