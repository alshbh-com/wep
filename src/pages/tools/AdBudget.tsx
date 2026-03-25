import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function AdBudget() {
  const [budget, setBudget] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [platform, setPlatform] = useState("فيسبوك");
  const [done, setDone] = useState(false);

  return (
    <ToolLayout title="حاسبة ميزانية الإعلانات" emoji="📊" toolPath="/ad-budget" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">💰 الميزانية الشهرية (جنيه)</label>
            <Input type="number" placeholder="مثال: 5000" value={budget} onChange={e => setBudget(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🛍️ سعر المنتج (جنيه)</label>
            <Input type="number" placeholder="مثال: 350" value={productPrice} onChange={e => setProductPrice(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">📱 المنصة</label>
            <div className="flex gap-2">
              {["فيسبوك", "انستجرام", "تيكتوك"].map(p => (
                <Button key={p} variant={platform === p ? "default" : "outline"} size="sm" onClick={() => setPlatform(p)} className="flex-1 text-xs">{p}</Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!budget || !productPrice}>📊 حلل الميزانية</Button>
      {done && <AiResultCard tool="ad-budget" data={{ budget, productPrice, platform }} buttonText="🤖 خطة توزيع الميزانية" />}
    </ToolLayout>
  );
}
