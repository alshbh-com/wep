import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function MarketingPlan() {
  const [product, setProduct] = useState("");
  const [budget, setBudget] = useState("");
  const [audience, setAudience] = useState("");
  const [done, setDone] = useState(false);

  const audiences = ["شباب 18-25", "ستات 25-40", "رجالة 25-40", "كل الفئات"];

  return (
    <ToolLayout title="خطة تسويق شهرية" emoji="📅" toolPath="/marketing-plan" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🛍️ المنتج أو الخدمة</label>
            <Input placeholder="مثال: ملابس رياضية" value={product} onChange={e => setProduct(e.target.value)} className="text-center" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">💰 الميزانية الشهرية (جنيه)</label>
            <Input type="number" placeholder="مثال: 5000" value={budget} onChange={e => setBudget(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🎯 الجمهور المستهدف</label>
            <div className="grid grid-cols-2 gap-2">
              {audiences.map(a => (
                <Button key={a} variant={audience === a ? "default" : "outline"} size="sm" onClick={() => setAudience(a)} className="text-xs">{a}</Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!product || !budget}>📅 اعمل الخطة</Button>
      {done && <AiResultCard tool="marketing-plan" data={{ product, budget, audience }} buttonText="🤖 خطة تسويق كاملة بالـ AI" />}
    </ToolLayout>
  );
}
