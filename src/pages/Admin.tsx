import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getSubmissions, clearSubmissions, type Submission } from "@/lib/storage";
import { Ghost, Lock, Trash2, Users, DollarSign, TrendingDown } from "lucide-react";

const ADMIN_PASSWORD = "alshbh@gmail.com";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setSubmissions(getSubmissions());
      setError("");
    } else {
      setError("كلمة السر غلط ❌");
    }
  };

  const handleClear = () => {
    if (confirm("متأكد إنك عايز تمسح كل البيانات؟")) {
      clearSubmissions();
      setSubmissions([]);
    }
  };

  const totalLostCustomers = submissions.reduce((s, x) => s + x.lostCustomers, 0);
  const totalLostMoney = submissions.reduce((s, x) => s + x.lostMoney, 0);
  const avgLoss = submissions.length > 0 ? Math.round(totalLostMoney / submissions.length) : 0;

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm border-border/50">
          <CardHeader className="text-center">
            <Lock className="mx-auto mb-2 h-10 w-10 text-primary" />
            <CardTitle className="text-xl">🔒 لوحة التحكم</CardTitle>
            <p className="text-sm text-muted-foreground">شركة الشبح للبرمجة</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="ادخل كلمة السر"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="text-center"
            />
            {error && <p className="text-center text-sm text-destructive">{error}</p>}
            <Button onClick={login} className="w-full font-bold">دخول</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <Ghost className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">لوحة تحكم الشبح 👻</h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <Users className="mx-auto mb-1 h-6 w-6 text-primary" />
              <p className="text-2xl font-black text-foreground">{submissions.length}</p>
              <p className="text-xs text-muted-foreground">اختبار</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <TrendingDown className="mx-auto mb-1 h-6 w-6 text-neon-red" />
              <p className="text-2xl font-black text-neon-red">{totalLostCustomers}</p>
              <p className="text-xs text-muted-foreground">عميل ضايع</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <DollarSign className="mx-auto mb-1 h-6 w-6 text-neon-orange" />
              <p className="text-2xl font-black text-neon-orange">{avgLoss.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">متوسط خسارة</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="destructive" size="sm" onClick={handleClear} className="gap-1">
            <Trash2 className="h-4 w-4" /> مسح الكل
          </Button>
        </div>

        {/* Table */}
        {submissions.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">مفيش اختبارات لسه 📭</p>
        ) : (
          <Card className="border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-right">رسائل</TableHead>
                  <TableHead className="text-right">أوردرات</TableHead>
                  <TableHead className="text-right">ردود</TableHead>
                  <TableHead className="text-right">مرتجع</TableHead>
                  <TableHead className="text-right">عملاء ضايعين</TableHead>
                  <TableHead className="text-right">خسارة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="text-xs">
                      {new Date(s.date).toLocaleDateString("ar-EG", {
                        month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </TableCell>
                    <TableCell>{s.dailyMessages}</TableCell>
                    <TableCell>{s.dailyOrders}</TableCell>
                    <TableCell>{s.respondents}</TableCell>
                    <TableCell>{s.returns}</TableCell>
                    <TableCell className="font-bold text-neon-red">{s.lostCustomers}</TableCell>
                    <TableCell className="font-bold text-neon-orange">{s.lostMoney.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </main>
    </div>
  );
}
