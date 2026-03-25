import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ToolLayout from "@/components/ToolLayout";
import AiResultCard from "@/components/AiResultCard";

export default function EmployeeCost() {
  const [salary, setSalary] = useState("");
  const [employees, setEmployees] = useState("");
  const [ordersPerEmployee, setOrdersPerEmployee] = useState("");
  const [done, setDone] = useState(false);

  const totalCost = Number(salary) * Number(employees);
  const costPerOrder = Number(ordersPerEmployee) > 0 ? Math.round(totalCost / (Number(ordersPerEmployee) * Number(employees))) : 0;

  return (
    <ToolLayout title="تكلفة الموظف vs السيستم" emoji="👤" toolPath="/employee-cost" showShare={done}>
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">💰 مرتب الموظف الشهري</label>
            <Input type="number" placeholder="مثال: 5000" value={salary} onChange={e => setSalary(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">👥 عدد الموظفين</label>
            <Input type="number" placeholder="مثال: 3" value={employees} onChange={e => setEmployees(e.target.value)} className="text-center text-lg" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">📦 أوردرات لكل موظف شهرياً</label>
            <Input type="number" placeholder="مثال: 200" value={ordersPerEmployee} onChange={e => setOrdersPerEmployee(e.target.value)} className="text-center text-lg" />
          </div>
        </CardContent>
      </Card>
      <Button onClick={() => setDone(true)} size="lg" className="w-full text-lg font-bold neon-glow" disabled={!salary || !employees}>👤 قارن التكلفة</Button>
      {done && (
        <>
          <Card className="border-neon-orange/30 bg-card">
            <CardContent className="p-5 text-center space-y-3">
              <p className="text-3xl font-black text-neon-orange">{totalCost.toLocaleString()} جنيه</p>
              <p className="text-sm text-muted-foreground">💸 تكلفة الموظفين الشهرية</p>
              <p className="text-lg font-bold text-foreground">{costPerOrder} جنيه / أوردر</p>
            </CardContent>
          </Card>
          <AiResultCard tool="employee-cost" data={{ salary, employees, ordersPerEmployee, totalCost, costPerOrder }} buttonText="🤖 مقارنة بالسيستم" />
        </>
      )}
    </ToolLayout>
  );
}
