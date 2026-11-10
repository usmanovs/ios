import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { pickByProgress } from "@/lib/motivation";

interface Props {
  progressPct: number;
}

export const MotivationBanner = ({ progressPct }: Props) => {
  const bucket = Math.min(5, Math.floor(progressPct / 20));
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTick(0);
  }, [bucket]);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTick((t) => t + 1);
        setVisible(true);
      }, 250);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const message = pickByProgress(progressPct, tick);

  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-3 flex items-center gap-3 rounded-full border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-2.5"
    >
      <Sparkles className="w-4 h-4 text-primary shrink-0" />
      <p
        className={`text-sm text-foreground/80 leading-snug transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {message}
      </p>
    </div>
  );
};
