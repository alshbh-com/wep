import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";
import { Card, CardContent } from "@/components/ui/card";

export default function ReturnPolicy() {
  const [storeName, setStoreName] = useState("");
  const [category, setCategory] = useState("");
  const [done, setDone] = useState(false);

  const categories = ["ملابس", "إلكترونيات", "مستحضرات تجميل", "أثاث", "أكل", "عام"];

  return (
    <ToolLayout title="مولد سياسة الاسترجاع" emoji="📋" toolPath="/return-policy" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🏪 اسم المتجر</label>
            <Input placeholder="مثال: متجر النور" value={storeName} onChange={e => setStoreName(e.target.value)} className="text-center" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">📁 نوع المنتجات</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map(c => (
                <Button key={c} variant={category === c ? "default" : "outline"} size="sm" onClick={() => setCategory(c)} className="text-xs">{c}</Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {storeName && category && !done && (
        <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow">📋 ولد السياسة</Button>
      )}
      {done && <AiResultCard tool="return-policy" data={{ storeName, category }} buttonText="📋 اكتب سياسة احترافية" />}
    </ToolLayout>
  );
}
