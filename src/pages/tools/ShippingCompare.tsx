import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function ShippingCompare() {
  const [company1, setCompany1] = useState("");
  const [price1, setPrice1] = useState("");
  const [delivery1, setDelivery1] = useState("");
  const [company2, setCompany2] = useState("");
  const [price2, setPrice2] = useState("");
  const [delivery2, setDelivery2] = useState("");
  const [done, setDone] = useState(false);

  return (
    <ToolLayout title="مقارنة شركات الشحن" emoji="⚖️" toolPath="/shipping-compare" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <p className="text-sm font-bold text-primary text-center">الشركة الأولى</p>
          <Input placeholder="اسم الشركة" value={company1} onChange={e => setCompany1(e.target.value)} className="text-center" />
          <Input type="number" placeholder="سعر الشحن (جنيه)" value={price1} onChange={e => setPrice1(e.target.value)} className="text-center" />
          <Input type="number" placeholder="نسبة التوصيل (%)" value={delivery1} onChange={e => setDelivery1(e.target.value)} className="text-center" />
          <p className="text-sm font-bold text-primary text-center pt-2">الشركة التانية</p>
          <Input placeholder="اسم الشركة" value={company2} onChange={e => setCompany2(e.target.value)} className="text-center" />
          <Input type="number" placeholder="سعر الشحن (جنيه)" value={price2} onChange={e => setPrice2(e.target.value)} className="text-center" />
          <Input type="number" placeholder="نسبة التوصيل (%)" value={delivery2} onChange={e => setDelivery2(e.target.value)} className="text-center" />
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!company1 || !company2}>⚖️ قارن دلوقتي</Button>
      {done && (
        <AiResultCard tool="shipping-compare" data={{ company1, price1, delivery1, company2, price2, delivery2 }} buttonText="🤖 تحليل ونصيحة" />
      )}
    </ToolLayout>
  );
}
