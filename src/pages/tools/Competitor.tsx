import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function Competitor() {
  const [myPrice, setMyPrice] = useState("");
  const [myStrength, setMyStrength] = useState("");
  const [compPrice, setCompPrice] = useState("");
  const [compStrength, setCompStrength] = useState("");
  const [done, setDone] = useState(false);

  return (
    <ToolLayout title="تحليل المنافسين" emoji="🔍" toolPath="/competitor" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <p className="text-sm font-bold text-primary text-center">أنت 👇</p>
          <Input type="number" placeholder="سعرك (جنيه)" value={myPrice} onChange={e => setMyPrice(e.target.value)} className="text-center" />
          <Input placeholder="نقطة قوتك" value={myStrength} onChange={e => setMyStrength(e.target.value)} className="text-center" />
          <p className="text-sm font-bold text-neon-red text-center pt-2">المنافس 👇</p>
          <Input type="number" placeholder="سعر المنافس (جنيه)" value={compPrice} onChange={e => setCompPrice(e.target.value)} className="text-center" />
          <Input placeholder="نقطة قوة المنافس" value={compStrength} onChange={e => setCompStrength(e.target.value)} className="text-center" />
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!myPrice || !compPrice}>🔍 حلل المنافسين</Button>
      {done && <AiResultCard tool="competitor" data={{ myPrice, myStrength, compPrice, compStrength }} buttonText="🤖 تحليل ونصائح للتميز" />}
    </ToolLayout>
  );
}
