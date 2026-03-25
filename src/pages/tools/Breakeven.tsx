import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function Breakeven() {
  const [fixedCosts, setFixedCosts] = useState("");
  const [price, setPrice] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [done, setDone] = useState(false);

  const margin = Number(price) - Number(costPerUnit);
  const breakPoint = margin > 0 ? Math.ceil(Number(fixedCosts) / margin) : 0;

  return (
    <ToolLayout title="حاسبة نقطة التعادل" emoji="⚖️" toolPath="/breakeven" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🏢 التكاليف الثابتة الشهرية (إيجار، مرتبات...)</label>
            <Input type="number" placeholder="مثال: 15000" value={fixedCosts} onChange={e => setFixedCosts(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">💵 سعر البيع</label>
            <Input type="number" placeholder="مثال: 500" value={price} onChange={e => setPrice(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🏭 تكلفة الوحدة (منتج + شحن)</label>
            <Input type="number" placeholder="مثال: 250" value={costPerUnit} onChange={e => setCostPerUnit(e.target.value)} className="text-center text-lg" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!fixedCosts || !price || !costPerUnit}>⚖️ احسب نقطة التعادل</Button>
      {done && (
        <>
          <Card className="border-primary/30 bg-card">
            <CardContent className="p-5 text-center space-y-2">
              <p className="text-3xl font-black text-primary">{breakPoint} أوردر</p>
              <p className="text-sm text-muted-foreground">⚖️ لازم تبيع العدد ده عشان تغطي التكاليف</p>
              <p className="text-xs text-muted-foreground">هامش الربح لكل أوردر: {margin} جنيه</p>
            </CardContent>
          </Card>
          <AiResultCard tool="breakeven" data={{ fixedCosts, price, costPerUnit, breakPoint, margin }} buttonText="🤖 نصائح للوصول أسرع" />
        </>
      )}
    </ToolLayout>
  );
}
