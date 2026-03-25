import { ReactNode } from "react";
import { Ghost, ArrowRight, Share2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { shareForAccuracy, openWhatsApp } from "@/lib/share";

interface ToolLayoutProps {
  title: string;
  emoji: string;
  children: ReactNode;
  toolPath: string;
  showShare?: boolean;
}

export default function ToolLayout({ title, emoji, children, toolPath, showShare = false }: ToolLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/")} className="text-muted-foreground">
            <ArrowRight className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <Ghost className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-foreground">شركة الشبح</span>
          </div>
          <div className="w-5" />
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6 space-y-5">
        <div className="text-center">
          <h2 className="text-xl font-black text-foreground">{emoji} {title}</h2>
        </div>

        {children}

        {showShare && (
          <div className="space-y-3 pt-2">
            <Button
              onClick={() => shareForAccuracy(title, toolPath)}
              variant="outline"
              size="lg"
              className="w-full gap-2 border-primary/50 text-primary font-bold"
            >
              <Share2 className="h-5 w-5" /> 🔥 شارك مع صاحبك عشان نتيجة أدق
            </Button>
            <Button
              onClick={() => openWhatsApp("محتاج استشارة مجانية من شركة الشبح 👻")}
              size="lg"
              className="w-full gap-2 bg-[hsl(142,70%,45%)] text-foreground font-bold"
            >
              <MessageCircle className="h-5 w-5" /> تواصل معانا على واتساب
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
