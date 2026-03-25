import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function PeakTime() {
  const [morning, setMorning] = useState("");
  const [afternoon, setAfternoon] = useState("");
  const [evening, setEvening] = useState("");
  const [night, setNight] = useState("");
  const [done, setDone] = useState(false);

  const times = [
    { label: "الصبح (8-12)", val: Number(morning) },
    { label: "الضهر (12-5)", val: Number(afternoon) },
    { label: "المغرب (5-9)", val: Number(evening) },
    { label: "بالليل (9-12)", val: Number(night) },
  ];
  const best = times.reduce((a, b) => a.val > b.val ? a : b, times[0]);

  return (
    <ToolLayout title="كشف وقت الذروة" emoji="⏰" toolPath="/peak-time" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🌅 أوردرات الصبح (8-12)</label>
            <Input type="number" placeholder="مثال: 5" value={morning} onChange={e => setMorning(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">☀️ أوردرات الضهر (12-5)</label>
            <Input type="number" placeholder="مثال: 12" value={afternoon} onChange={e => setAfternoon(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🌆 أوردرات المغرب (5-9)</label>
            <Input type="number" placeholder="مثال: 20" value={evening} onChange={e => setEvening(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">🌙 أوردرات بالليل (9-12)</label>
            <Input type="number" placeholder="مثال: 8" value={night} onChange={e => setNight(e.target.value)} className="text-center text-lg" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!morning && !afternoon && !evening && !night}>⏰ اكشف الذروة</Button>
      {done && (
        <>
          <Card className="border-primary/30 bg-card">
            <CardContent className="p-5 text-center space-y-2">
              <p className="text-2xl font-black text-primary">🔥 {best.label}</p>
              <p className="text-sm text-muted-foreground">أكتر وقت فيه أوردرات ({best.val} أوردر)</p>
            </CardContent>
          </Card>
          <AiResultCard tool="peak-time" data={{ morning, afternoon, evening, night, bestTime: best.label }} buttonText="🤖 نصائح لاستغلال الذروة" />
        </>
      )}
    </ToolLayout>
  );
}
