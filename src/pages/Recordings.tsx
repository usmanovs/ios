import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { Apple, Check, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Share2, Pencil, Trash2, Plus, Save, X, LogOut, BookOpen, ClipboardList } from "lucide-react";
import { MotivationBanner } from "@/components/recordings/MotivationBanner";
import { LessonVideoPlayer } from "@/components/recordings/LessonVideoPlayer";
import { MilestoneCelebration } from "@/components/recordings/MilestoneCelebration";
import { TOPIC_CHEERS, randomFrom } from "@/lib/motivation";

interface Lesson {
  id: string;
  lesson_number: number;
  title: string;
  description: string;
  homework_md: string;
}
interface Topic {
  id: string;
  lesson_id: string;
  title: string;
  position: number;
}
interface Video {
  id: string;
  lesson_id: string;
  part_label: string;
  title: string;
  drive_url: string;
  position: number;
}

type LessonStatus = "completed" | "in-progress" | "not-started";

// Cycled by position rather than a fixed lesson_number map, since the
// iOS cohort's lesson count isn't fixed the way android's 7-lesson
// cohort was.
const LESSON_EMOJIS = ["🚀", "⚙️", "🎨", "⚡", "🗄️", "🤖", "🎓", "📱"];

const SHARE_URL = "https://ios.getforce.org/recordings";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const Recordings = () => {
  useEffect(() => {
    document.title = "Записи занятий — iOS Vibe Coding";
  }, []);

  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (!session?.user) {
        setAuthLoading(false);
        return;
      }
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      setIsAdmin(!!roles?.some((r: { role: string }) => r.role === "admin"));
      setAuthLoading(false);
    })();
    return () => sub.subscription.unsubscribe();
  }, []);

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [progress, setProgress] = useState<Record<string, "yes" | "no" | undefined>>({});

  const [openLessonId, setOpenLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<Lesson>>({});
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [addingLesson, setAddingLesson] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: l }, { data: t }, { data: v }, { data: p }] = await Promise.all([
        supabase.from("recording_lessons").select("*").order("lesson_number"),
        supabase.from("recording_topics").select("*").order("position"),
        supabase.from("recording_lesson_videos").select("*").order("position"),
        supabase.from("recording_topic_progress").select("topic_id, completed, status").eq("user_id", user.id),
      ]);
      const loadedLessons = (l as Lesson[]) || [];
      const loadedTopics = (t as Topic[]) || [];
      const loadedVideos = (v as Video[]) || [];
      setLessons(loadedLessons);
      setTopics(loadedTopics);
      setVideos(loadedVideos);
      const map: Record<string, "yes" | "no" | undefined> = {};
      (p || []).forEach((row: { topic_id: string; completed: boolean; status: string | null }) => {
        if (row.status === "yes" || row.status === "no") map[row.topic_id] = row.status;
        else if (row.completed) map[row.topic_id] = "yes";
      });
      setProgress(map);

      const topicsByLessonLookup = (lid: string) => loadedTopics.filter((tp) => tp.lesson_id === lid);
      const firstUncompleted = loadedLessons.find((lesson) => {
        const lt = topicsByLessonLookup(lesson.id);
        if (lt.length === 0) return true;
        const done = lt.filter((tp) => map[tp.id] === "yes").length;
        return done < lt.length;
      });
      const saved = localStorage.getItem("recordings:openLessonId");
      const savedValid = saved && loadedLessons.some((ls) => ls.id === saved) ? saved : null;
      setOpenLessonId((cur) =>
        cur && loadedLessons.some((ls) => ls.id === cur)
          ? cur
          : savedValid || firstUncompleted?.id || loadedLessons[0]?.id || null
      );
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    if (openLessonId) localStorage.setItem("recordings:openLessonId", openLessonId);
  }, [openLessonId]);

  const topicsByLesson = useMemo(() => {
    const m: Record<string, Topic[]> = {};
    topics.forEach((t) => {
      (m[t.lesson_id] ||= []).push(t);
    });
    return m;
  }, [topics]);

  const videosByLesson = useMemo(() => {
    const m: Record<string, Video[]> = {};
    videos.forEach((v) => {
      (m[v.lesson_id] ||= []).push(v);
    });
    return m;
  }, [videos]);

  const lessonStatus = useMemo(() => {
    const map: Record<string, LessonStatus> = {};
    lessons.forEach((l) => {
      const lt = topicsByLesson[l.id] || [];
      if (lt.length === 0) {
        map[l.id] = "not-started";
        return;
      }
      const done = lt.filter((t) => progress[t.id] === "yes").length;
      if (done === lt.length) map[l.id] = "completed";
      else if (done > 0) map[l.id] = "in-progress";
      else map[l.id] = "not-started";
    });
    return map;
  }, [lessons, topicsByLesson, progress]);

  const completedLessonsCount = useMemo(() => {
    return lessons.filter((l) => lessonStatus[l.id] === "completed").length;
  }, [lessons, lessonStatus]);

  const overallPct = useMemo(() => {
    if (!topics.length) return 0;
    const done = topics.filter((t) => progress[t.id] === "yes").length;
    return Math.round((done / topics.length) * 100);
  }, [topics, progress]);

  const [celebration, setCelebration] = useState<{ title: string; message: string } | null>(null);
  const milestoneKey = user ? `recordings-milestones-${user.id}` : null;

  const getMilestones = (): { first?: boolean; half?: boolean; full?: boolean } => {
    if (!milestoneKey) return {};
    try {
      return JSON.parse(localStorage.getItem(milestoneKey) || "{}");
    } catch {
      return {};
    }
  };
  const setMilestone = (k: "first" | "half" | "full") => {
    if (!milestoneKey) return;
    const m = getMilestones();
    m[k] = true;
    localStorage.setItem(milestoneKey, JSON.stringify(m));
  };

  useEffect(() => {
    if (loading || !user || !lessons.length) return;
    const m = getMilestones();
    const total = lessons.length;
    if (completedLessonsCount >= total && total > 0 && !m.full) {
      setMilestone("full");
      setCelebration({
        title: "Курс пройден! 🎓",
        message: "Ты прошёл все уроки. Теперь самое время применять знания на практике.",
      });
      return;
    }
    if (completedLessonsCount / total >= 0.5 && !m.half && !m.full) {
      setMilestone("half");
      setCelebration({
        title: "Половина пути позади! 🔥",
        message: "Ты уже прошёл больше половины курса. Финиш ближе, чем кажется — продолжай в том же духе!",
      });
      return;
    }
    if (completedLessonsCount >= 1 && !m.first) {
      setMilestone("first");
      setCelebration({
        title: "Первый урок пройден! 🚀",
        message: "Самый сложный шаг — начать. Ты его сделал. Дальше будет только интереснее.",
      });
    }
  }, [completedLessonsCount, loading, user, lessons.length]);

  const setTopicStatus = async (topicId: string, next: "yes" | "no" | undefined) => {
    if (!user) return;
    const prev = progress[topicId];
    setProgress((p) => ({ ...p, [topicId]: next }));
    const { error } = await supabase.from("recording_topic_progress").upsert(
      {
        user_id: user.id,
        topic_id: topicId,
        status: next ?? null,
        completed: next === "yes",
        completed_at: next === "yes" ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,topic_id" }
    );
    if (error) {
      setProgress((p) => ({ ...p, [topicId]: prev }));
      toast.error("Не удалось сохранить");
    } else if (next === "yes" && prev !== "yes") {
      toast.success(randomFrom(TOPIC_CHEERS));
    }
  };

  const startEdit = (l: Lesson) => {
    setEditingLessonId(l.id);
    setDraft(l);
  };
  const cancelEdit = () => {
    setEditingLessonId(null);
    setDraft({});
    setNewTopicTitle("");
  };

  const saveLesson = async () => {
    if (!editingLessonId) return;
    const { error } = await supabase
      .from("recording_lessons")
      .update({
        title: draft.title ?? "",
        description: draft.description ?? "",
        homework_md: draft.homework_md ?? "",
      })
      .eq("id", editingLessonId);
    if (error) return toast.error(error.message);
    setLessons((arr) => arr.map((l) => (l.id === editingLessonId ? { ...l, ...(draft as Lesson) } : l)));
    toast.success("Сохранено");
    cancelEdit();
  };

  const addLesson = async () => {
    setAddingLesson(true);
    const nextNumber = lessons.length ? Math.max(...lessons.map((l) => l.lesson_number)) + 1 : 1;
    const { data, error } = await supabase
      .from("recording_lessons")
      .insert({ lesson_number: nextNumber, title: `Урок ${nextNumber}` })
      .select()
      .single();
    setAddingLesson(false);
    if (error) return toast.error(error.message);
    setLessons((arr) => [...arr, data as Lesson]);
    setOpenLessonId((data as Lesson).id);
    toast.success("Урок добавлен");
  };

  const addTopic = async (lessonId: string) => {
    const title = newTopicTitle.trim();
    if (!title) return;
    const pos = topicsByLesson[lessonId]?.length || 0;
    const { data, error } = await supabase
      .from("recording_topics")
      .insert({ lesson_id: lessonId, title, position: pos })
      .select()
      .single();
    if (error) return toast.error(error.message);
    setTopics((arr) => [...arr, data as Topic]);
    setNewTopicTitle("");
  };

  const deleteTopic = async (topicId: string) => {
    const { error } = await supabase.from("recording_topics").delete().eq("id", topicId);
    if (error) return toast.error(error.message);
    setTopics((arr) => arr.filter((t) => t.id !== topicId));
  };

  const renameTopic = async (topicId: string, title: string) => {
    const { error } = await supabase.from("recording_topics").update({ title }).eq("id", topicId);
    if (error) return toast.error(error.message);
    setTopics((arr) => arr.map((t) => (t.id === topicId ? { ...t, title } : t)));
  };

  const addVideo = async (lessonId: string) => {
    const existing = videosByLesson[lessonId] || [];
    const pos = existing.length ? Math.max(...existing.map((video) => video.position)) + 1 : 0;
    const { data, error } = await supabase
      .from("recording_lesson_videos")
      .insert({ lesson_id: lessonId, part_label: `Часть ${pos + 1}`, title: "Новое видео", drive_url: "", position: pos })
      .select()
      .single();
    if (error) return toast.error(error.message);
    setVideos((arr) => [...arr, data as Video]);
  };

  const updateVideo = async (videoId: string, patch: Partial<Video>) => {
    const { error } = await supabase.from("recording_lesson_videos").update(patch).eq("id", videoId);
    if (error) return toast.error(error.message);
    setVideos((arr) => arr.map((v) => (v.id === videoId ? { ...v, ...patch } : v)));
  };

  const deleteVideo = async (videoId: string) => {
    const { error } = await supabase.from("recording_lesson_videos").delete().eq("id", videoId);
    if (error) return toast.error(error.message);
    setVideos((arr) => arr.filter((v) => v.id !== videoId));
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      toast.success("Ссылка скопирована");
    } catch {
      /* clipboard unavailable */
    }
  };

  const statusLabel = (status: LessonStatus) => {
    switch (status) {
      case "completed":
        return "Пройдено";
      case "in-progress":
        return "В процессе";
      case "not-started":
        return "Не начато";
    }
  };

  const statusClasses = (status: LessonStatus) => {
    switch (status) {
      case "completed":
        return "border-l-4 border-emerald-500 bg-emerald-500/[0.12]";
      case "in-progress":
        return "border-l-4 border-amber-500 bg-amber-500/[0.12]";
      case "not-started":
        return "border-l-4 border-border/40 bg-card";
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full" />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md w-full">
          <div className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <Apple className="w-14 h-14 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold">Записи занятий</h2>
            <p className="text-muted-foreground mt-2">Войдите, чтобы смотреть записи и отмечать пройденные темы</p>
          </div>
          <CardContent>
            <Button className="w-full gap-2" asChild>
              <a href={`/auth?next=${encodeURIComponent("/recordings")}`}>Войти</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/50 sticky top-0 z-30 bg-background/80 backdrop-blur">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Apple className="w-8 h-8 text-primary" />
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold truncate">
              👋 Привет, {capitalize(user?.email?.split("@")[0] || "студент")}!
            </h1>
            <p className="text-xs text-muted-foreground truncate">Записи занятий · продолжай в том же духе</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
            <Share2 className="w-4 h-4" /> Поделиться
          </Button>
          <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()} className="gap-2">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
        <div className="container max-w-6xl mx-auto px-4 pb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">
              {completedLessonsCount} из {lessons.length} уроков пройдено
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">{overallPct}%</span>
          </div>
          <div className="flex gap-1 h-1.5">
            {lessons.map((l) => {
              const status = lessonStatus[l.id];
              return (
                <div
                  key={l.id}
                  className={`flex-1 rounded-full transition-colors ${
                    status === "completed"
                      ? "bg-emerald-500"
                      : status === "in-progress"
                      ? "bg-amber-500/70"
                      : "bg-muted"
                  }`}
                />
              );
            })}
          </div>
          <MotivationBanner progressPct={overallPct} />
        </div>
      </header>

      <MilestoneCelebration
        open={!!celebration}
        title={celebration?.title || ""}
        message={celebration?.message || ""}
        onClose={() => setCelebration(null)}
      />

      <main className="container max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center text-muted-foreground py-20">Загрузка…</div>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson, idx) => {
              const lt = topicsByLesson[lesson.id] || [];
              const done = lt.filter((t) => progress[t.id] === "yes").length;
              const status = lessonStatus[lesson.id];
              const isOpen = openLessonId === lesson.id;
              const isEditing = editingLessonId === lesson.id;

              return (
                <div
                  key={lesson.id}
                  className={`rounded-xl border border-border/60 bg-card overflow-hidden transition-shadow hover:shadow-sm ${statusClasses(status)}`}
                >
                  <button
                    onClick={() => setOpenLessonId(isOpen ? null : lesson.id)}
                    className="w-full flex items-center gap-4 px-4 py-4 text-left"
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 text-lg ${
                        status === "completed"
                          ? "bg-emerald-500 text-white"
                          : status === "in-progress"
                          ? "bg-amber-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {status === "completed" ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        LESSON_EMOJIS[idx % LESSON_EMOJIS.length]
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-base">{lesson.title || `Урок ${lesson.lesson_number}`}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            status === "completed"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : status === "in-progress"
                              ? "bg-amber-500/15 text-amber-400"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {statusLabel(status)}
                        </span>
                      </div>
                      {lesson.description && (
                        <p className="text-sm text-muted-foreground/90 mt-1 line-clamp-2 text-left">{lesson.description}</p>
                      )}
                      {lt.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {done} из {lt.length} тем пройдено
                        </p>
                      )}
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 pt-1 border-t border-border/40">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          {isEditing ? (
                            <div className="space-y-2">
                              <Input
                                value={draft.title ?? ""}
                                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                                placeholder="Название урока"
                              />
                              <Textarea
                                rows={2}
                                value={draft.description ?? ""}
                                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                                placeholder="Краткое описание"
                              />
                            </div>
                          ) : (
                            lesson.description && (
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{lesson.description}</p>
                            )
                          )}
                        </div>
                        {isAdmin &&
                          (isEditing ? (
                            <div className="flex gap-2 shrink-0">
                              <Button size="sm" onClick={saveLesson} className="gap-1">
                                <Save className="w-4 h-4" />
                                Сохранить
                              </Button>
                              <Button size="sm" variant="ghost" onClick={cancelEdit}>
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => startEdit(lesson)} className="gap-1 shrink-0">
                              <Pencil className="w-4 h-4" />
                              Редактировать
                            </Button>
                          ))}
                      </div>

                      {isEditing ? (
                        <div className="mb-5 space-y-4">
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Видео урока</h4>
                            {(videosByLesson[lesson.id] || []).map((v) => (
                              <div key={v.id} className="flex flex-col sm:flex-row gap-2 p-3 rounded-lg border border-border/60 bg-card/40">
                                <Input
                                  className="sm:w-28"
                                  value={v.part_label}
                                  onChange={(e) => updateVideo(v.id, { part_label: e.target.value })}
                                  placeholder="Часть 1"
                                />
                                <Input
                                  className="flex-1"
                                  value={v.title}
                                  onChange={(e) => updateVideo(v.id, { title: e.target.value })}
                                  placeholder="Название"
                                />
                                <Input
                                  className="flex-[2]"
                                  value={v.drive_url}
                                  onChange={(e) => updateVideo(v.id, { drive_url: e.target.value })}
                                  placeholder="Ссылка Google Drive"
                                />
                                <Button size="sm" variant="ghost" onClick={() => deleteVideo(v.id)} className="shrink-0">
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            ))}
                            <Button size="sm" variant="outline" onClick={() => addVideo(lesson.id)} className="gap-1">
                              <Plus className="w-4 h-4" />
                              Добавить видео
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-5 space-y-3">
                          {videosByLesson[lesson.id]?.length > 0 && <LessonVideoPlayer parts={videosByLesson[lesson.id]} />}
                          {!videosByLesson[lesson.id]?.length && (
                            <div className="p-4 rounded-lg bg-muted/40 border border-dashed border-border text-muted-foreground text-sm">
                              Ссылка на запись пока не добавлена
                            </div>
                          )}
                        </div>
                      )}

                      <section className="mb-5">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-sm">Темы урока</h3>
                          <span className="text-xs text-muted-foreground">отмечайте, что вы освоили</span>
                        </div>
                        <div className="space-y-2">
                          {lt.map((t) => {
                            const tStatus = progress[t.id];
                            return (
                              <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card/40">
                                {isAdmin && isEditing ? (
                                  <>
                                    <Input
                                      defaultValue={t.title}
                                      onBlur={(e) => e.target.value !== t.title && renameTopic(t.id, e.target.value)}
                                      className="flex-1"
                                    />
                                    <Button size="sm" variant="ghost" onClick={() => deleteTopic(t.id)}>
                                      <Trash2 className="w-4 h-4 text-destructive" />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <span className={`flex-1 text-sm ${tStatus === "yes" ? "line-through text-muted-foreground" : ""}`}>
                                      {t.title}
                                    </span>
                                    <div className="flex items-center gap-2 shrink-0">
                                      <Button
                                        size="sm"
                                        variant={tStatus === "yes" ? "default" : "outline"}
                                        onClick={() => setTopicStatus(t.id, tStatus === "yes" ? undefined : "yes")}
                                        className={`gap-1 ${
                                          tStatus === "yes"
                                            ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500"
                                            : "hover:border-emerald-500/60 hover:text-emerald-500"
                                        }`}
                                      >
                                        <Check className="w-3.5 h-3.5" /> Пройдено
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </div>
                            );
                          })}
                          {lt.length === 0 && <p className="text-sm text-muted-foreground">Темы пока не добавлены</p>}
                          {isAdmin && isEditing && (
                            <div className="flex gap-2 pt-2">
                              <Input
                                placeholder="Новая тема"
                                value={newTopicTitle}
                                onChange={(e) => setNewTopicTitle(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addTopic(lesson.id)}
                              />
                              <Button size="sm" onClick={() => addTopic(lesson.id)} className="gap-1">
                                <Plus className="w-4 h-4" />
                                Добавить
                              </Button>
                            </div>
                          )}
                        </div>
                      </section>

                      <section>
                        <div className="flex items-center gap-2 mb-3">
                          <ClipboardList className="w-4 h-4 text-primary" />
                          <h3 className="font-semibold text-sm">Домашнее задание</h3>
                        </div>
                        {isEditing ? (
                          <Textarea
                            rows={8}
                            value={draft.homework_md ?? ""}
                            onChange={(e) => setDraft({ ...draft, homework_md: e.target.value })}
                            placeholder="Опишите домашнее задание (можно несколько пунктов)"
                          />
                        ) : lesson.homework_md ? (
                          <div className="p-4 rounded-lg bg-card/40 border border-border/60 whitespace-pre-wrap text-sm leading-relaxed">
                            {lesson.homework_md}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">Домашнее задание пока не добавлено</p>
                        )}
                      </section>
                    </div>
                  )}
                </div>
              );
            })}
            {lessons.length === 0 && (
              <div className="text-center text-muted-foreground py-16 border border-dashed border-border rounded-xl">
                Уроки пока не добавлены
              </div>
            )}
            {isAdmin && (
              <Button variant="outline" onClick={addLesson} disabled={addingLesson} className="gap-2 w-full">
                <Plus className="w-4 h-4" />
                Добавить урок
              </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Recordings;
