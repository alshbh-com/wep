import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function WhatsAppGen() {
  const [product, setProduct] = useState("");
  const [situation, setSituation] = useState("");
  const [done, setDone] = useState(false);

  const situations = ["عميل مش رد", "عميل لغى الأوردر", "عميل رجع المنتج", "عميل جديد", "عميل متكرر"];

  return (
    <ToolLayout title="مولد رسائل واتساب" emoji="💬" toolPath="/whatsapp-gen" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🛍️ اسم المنتج أو الخدمة</label>
            <Input placeholder="مثال: ساعة ذكية" value={product} onChange={e => setProduct(e.target.value)} className="text-center" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🎯 نوع العميل</label>
            <div className="grid grid-cols-2 gap-2">
              {situations.map(s => (
                <Button key={s} variant={situation === s ? "default" : "outline"} size="sm" onClick={() => setSituation(s)} className="text-xs">
                  {s}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {situation && product && !done && (
        <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow">💬 ولد الرسائل</Button>
      )}
      {done && (
        <AiResultCard tool="whatsapp-gen" data={{ product, situation }} buttonText="💬 ولد رسائل واتساب ذكية" />
      )}
    </ToolLayout>
  );
}
