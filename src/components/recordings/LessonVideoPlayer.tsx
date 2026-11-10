import { useEffect, useState } from "react";
import { PlayCircle } from "lucide-react";

export interface LessonVideoPart {
  id: string;
  part_label: string;
  title: string;
  drive_url: string;
  position: number;
}

const isGoogleDriveUrl = (url: string) => /drive\.google\.com\/file\/d\//.test(url);
const getGoogleDriveEmbedUrl = (url: string) => {
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
};

interface Props {
  parts: LessonVideoPart[];
}

/**
 * Universal lesson video block: one main player + part switcher.
 * Works for any lesson — just add rows to recording_lesson_videos.
 */
export const LessonVideoPlayer = ({ parts }: Props) => {
  const playable = parts
    .filter((p) => isGoogleDriveUrl(p.drive_url))
    .sort((a, b) => a.position - b.position);

  const [activeId, setActiveId] = useState<string | null>(playable[0]?.id ?? null);

  useEffect(() => {
    if (!playable.length) {
      setActiveId(null);
      return;
    }
    if (!activeId || !playable.some((p) => p.id === activeId)) {
      setActiveId(playable[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parts]);

  const active = playable.find((p) => p.id === activeId) ?? playable[0];

  if (!playable.length) {
    return (
      <div className="p-4 rounded-lg bg-muted/40 border border-dashed border-border text-muted-foreground text-sm">
        Ссылка на запись пока не добавлена
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-primary/25 bg-card/50 overflow-hidden">
      {/* Main player */}
      <div className="relative bg-black aspect-video">
        <iframe
          key={active.id}
          src={getGoogleDriveEmbedUrl(active.drive_url)}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title={`${active.part_label} — ${active.title}`}
        />
      </div>

      {/* Now playing */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60 bg-primary/5">
        <span className="px-2 py-0.5 rounded-md bg-primary/15 text-primary text-xs font-semibold uppercase tracking-wider shrink-0">
          {active.part_label}
        </span>
        <span className="text-sm font-medium text-foreground truncate">{active.title}</span>
      </div>

      {/* Part switcher */}
      {playable.length > 1 && (
        <div className="p-2 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {playable.map((p) => {
            const isActive = p.id === active.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveId(p.id)}
                aria-current={isActive}
                className={`flex items-center gap-2 text-left px-3 py-2 rounded-lg border transition ${
                  isActive
                    ? "border-primary/50 bg-primary/15 text-foreground"
                    : "border-border/50 bg-background/40 hover:bg-muted/50 text-muted-foreground"
                }`}
              >
                <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-primary/80">
                    {p.part_label}
                  </span>
                  <span className="block text-sm truncate">{p.title}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
