import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function Pricing() {
  const [product, setProduct] = useState("");
  const [cost, setCost] = useState("");
  const [competitorPrice, setCompetitorPrice] = useState("");
  const [done, setDone] = useState(false);

  return (
    <ToolLayout title="أداة تسعير المنتجات" emoji="🏷️" toolPath="/pricing" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🛍️ اسم المنتج</label>
            <Input placeholder="مثال: تيشيرت قطن" value={product} onChange={e => setProduct(e.target.value)} className="text-center" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🏭 تكلفة المنتج (جنيه)</label>
            <Input type="number" placeholder="مثال: 120" value={cost} onChange={e => setCost(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">👀 سعر المنافس (جنيه)</label>
            <Input type="number" placeholder="مثال: 250" value={competitorPrice} onChange={e => setCompetitorPrice(e.target.value)} className="text-center text-lg" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!product || !cost}>🏷️ حدد السعر المثالي</Button>
      {done && <AiResultCard tool="pricing" data={{ product, cost, competitorPrice }} buttonText="🤖 تحليل التسعير" />}
    </ToolLayout>
  );
}
