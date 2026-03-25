import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function ProductDesc() {
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [done, setDone] = useState(false);

  return (
    <ToolLayout title="مولد وصف المنتجات" emoji="✍️" toolPath="/product-desc" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🛍️ اسم المنتج</label>
            <Input placeholder="مثال: ساعة ذكية سمارت واتش" value={name} onChange={e => setName(e.target.value)} className="text-center" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">⭐ المميزات</label>
            <Textarea placeholder="اكتب مميزات المنتج..." value={features} onChange={e => setFeatures(e.target.value)} className="text-center min-h-[100px]" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!name}>✍️ اكتب الوصف</Button>
      {done && <AiResultCard tool="product-desc" data={{ name, features }} buttonText="🤖 ولد وصف احترافي" />}
    </ToolLayout>
  );
}
