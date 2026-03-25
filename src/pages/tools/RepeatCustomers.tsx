import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function RepeatCustomers() {
  const [totalCustomers, setTotalCustomers] = useState("");
  const [repeatCustomers, setRepeatCustomers] = useState("");
  const [done, setDone] = useState(false);
  const rate = Number(totalCustomers) > 0 ? ((Number(repeatCustomers) / Number(totalCustomers)) * 100).toFixed(1) : "0";

  return (
    <ToolLayout title="كشف العملاء المتكررين" emoji="🔁" toolPath="/repeat-customers" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">👥 إجمالي العملاء (آخر 3 شهور)</label>
            <Input type="number" placeholder="مثال: 500" value={totalCustomers} onChange={e => setTotalCustomers(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🔁 اللي اشتروا أكتر من مرة</label>
            <Input type="number" placeholder="مثال: 50" value={repeatCustomers} onChange={e => setRepeatCustomers(e.target.value)} className="text-center text-lg" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!totalCustomers || !repeatCustomers}>🔁 اكشف النسبة</Button>
      {done && (
        <>
          <Card className={`border-${Number(rate) < 15 ? 'neon-red' : 'primary'}/30 bg-card`}>
            <CardContent className="p-5 text-center space-y-2">
              <p className={`text-3xl font-black ${Number(rate) < 15 ? 'text-neon-red' : 'text-primary'}`}>%{rate}</p>
              <p className="text-sm text-muted-foreground">🔁 نسبة العملاء المتكررين</p>
              <p className="text-xs text-muted-foreground">{Number(rate) < 10 ? "😱 ضعيفة جداً!" : Number(rate) < 20 ? "⚠️ محتاج شغل" : "🔥 ممتاز!"}</p>
            </CardContent>
          </Card>
          <AiResultCard tool="repeat-customers" data={{ totalCustomers, repeatCustomers, rate }} buttonText="🤖 استراتيجيات الولاء" />
        </>
      )}
    </ToolLayout>
  );
}
