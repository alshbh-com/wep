import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function BusinessHealth() {
  const [revenue, setRevenue] = useState("");
  const [expenses, setExpenses] = useState("");
  const [customers, setCustomers] = useState("");
  const [returns, setReturns] = useState("");
  const [adSpend, setAdSpend] = useState("");
  const [done, setDone] = useState(false);

  const profit = Number(revenue) - Number(expenses);
  const profitMargin = Number(revenue) > 0 ? ((profit / Number(revenue)) * 100).toFixed(1) : "0";

  return (
    <ToolLayout title="تقرير صحة البيزنس" emoji="🏥" toolPath="/business-health" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">💰 الإيرادات الشهرية</label>
            <Input type="number" placeholder="مثال: 100000" value={revenue} onChange={e => setRevenue(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">💸 المصروفات الشهرية</label>
            <Input type="number" placeholder="مثال: 70000" value={expenses} onChange={e => setExpenses(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">👥 عدد العملاء الشهري</label>
            <Input type="number" placeholder="مثال: 300" value={customers} onChange={e => setCustomers(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🔄 عدد المرتجعات</label>
            <Input type="number" placeholder="مثال: 30" value={returns} onChange={e => setReturns(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">📊 ميزانية الإعلانات</label>
            <Input type="number" placeholder="مثال: 10000" value={adSpend} onChange={e => setAdSpend(e.target.value)} className="text-center text-lg" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!revenue || !expenses}>🏥 شخص البيزنس</Button>
      {done && (
        <>
          <Card className={`border-${Number(profitMargin) < 10 ? 'neon-red' : 'primary'}/30 bg-card`}>
            <CardContent className="p-5 text-center space-y-3">
              <p className={`text-3xl font-black ${Number(profitMargin) < 10 ? 'text-neon-red' : 'text-primary'}`}>{profit.toLocaleString()} جنيه</p>
              <p className="text-sm text-muted-foreground">💰 صافي الربح</p>
              <p className="text-lg font-bold text-foreground">هامش الربح: %{profitMargin}</p>
            </CardContent>
          </Card>
          <AiResultCard tool="business-health" data={{ revenue, expenses, customers, returns, adSpend, profit, profitMargin }} buttonText="🤖 تقرير صحة كامل بالـ AI" />
        </>
      )}
    </ToolLayout>
  );
}
