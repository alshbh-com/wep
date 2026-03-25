import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function MarketSize() {
  const [product, setProduct] = useState("");
  const [city, setCity] = useState("");
  const [done, setDone] = useState(false);

  return (
    <ToolLayout title="أداة حجم السوق" emoji="🌍" toolPath="/market-size" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🛍️ المنتج أو الخدمة</label>
            <Input placeholder="مثال: مستحضرات تجميل" value={product} onChange={e => setProduct(e.target.value)} className="text-center" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🏙️ المنطقة المستهدفة</label>
            <Input placeholder="مثال: القاهرة الكبرى" value={city} onChange={e => setCity(e.target.value)} className="text-center" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!product}>🌍 قدر حجم السوق</Button>
      {done && <AiResultCard tool="market-size" data={{ product, city }} buttonText="🤖 تحليل فرص السوق" />}
    </ToolLayout>
  );
}
