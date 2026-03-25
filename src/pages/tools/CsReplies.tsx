import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function CsReplies() {
  const [category, setCategory] = useState("");
  const [done, setDone] = useState(false);

  const categories = [
    "تأخير الشحنة", "طلب استرجاع", "استفسار عن منتج",
    "شكوى جودة", "شكر وتقييم", "سؤال عن الدفع"
  ];

  return (
    <ToolLayout title="ردود خدمة العملاء" emoji="💬" toolPath="/cs-replies" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <label className="text-sm font-semibold text-foreground">🎯 اختار نوع الموقف</label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(c => (
              <Button key={c} variant={category === c ? "default" : "outline"} size="sm" onClick={() => { setCategory(c); setDone(false); }} className="text-xs">{c}</Button>
            ))}
          </div>
        </CardContent>
      </Card>
      {category && !done && (
        <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow">💬 ولد الردود</Button>
      )}
      {done && <AiResultCard tool="cs-replies" data={{ category }} buttonText="💬 اكتب ردود جاهزة" />}
    </ToolLayout>
  );
}
