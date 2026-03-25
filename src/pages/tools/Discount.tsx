import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function Discount() {
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [currentSales, setCurrentSales] = useState("");
  const [done, setDone] = useState(false);

  const maxDiscount = Number(price) > 0 && Number(cost) > 0 ? Math.round(((Number(price) - Number(cost)) / Number(price)) * 100) : 0;

  return (
    <ToolLayout title="حاسبة الخصومات الذكية" emoji="🏷️" toolPath="/discount" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">💵 سعر البيع الحالي</label>
            <Input type="number" placeholder="مثال: 400" value={price} onChange={e => setPrice(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🏭 التكلفة</label>
            <Input type="number" placeholder="مثال: 200" value={cost} onChange={e => setCost(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">📦 المبيعات الشهرية الحالية</label>
            <Input type="number" placeholder="مثال: 100" value={currentSales} onChange={e => setCurrentSales(e.target.value)} className="text-center text-lg" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!price || !cost}>🏷️ احسب أفضل خصم</Button>
      {done && (
        <>
          <Card className="border-primary/30 bg-card">
            <CardContent className="p-5 text-center space-y-2">
              <p className="text-3xl font-black text-primary">%{maxDiscount}</p>
              <p className="text-sm text-muted-foreground">أقصى خصم ممكن من غير ما تخسر</p>
            </CardContent>
          </Card>
          <AiResultCard tool="discount" data={{ price, cost, currentSales, maxDiscount }} buttonText="🤖 استراتيجية خصومات ذكية" />
        </>
      )}
    </ToolLayout>
  );
}
