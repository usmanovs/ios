import { useLanguage } from '@/contexts/LanguageContext';
import { useCountdown } from '@/hooks/useCountdown';
import { COURSE_START_DATE } from '@/lib/course';

const StickyCtaBar = () => {
  const { t } = useLanguage();
  const countdown = useCountdown(COURSE_START_DATE);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-t border-foreground/5 py-3 px-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-sm text-foreground/60">{t('sticky.text')}</span>
          <div className="flex gap-2 text-sm font-display font-bold tabular-nums">
            <span className="text-primary">{countdown.days}d</span>
            <span className="text-foreground/30">:</span>
            <span className="text-primary">{String(countdown.hours).padStart(2, '0')}h</span>
            <span className="text-foreground/30">:</span>
            <span className="text-primary">{String(countdown.minutes).padStart(2, '0')}m</span>
          </div>
        </div>
        <a
          href="https://wa.me/996771002840"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-6 py-2.5 text-sm font-bold rounded-xl text-primary-foreground transition-all hover:scale-105 sm:ml-auto"
          style={{ background: 'var(--gradient-violet)', boxShadow: 'var(--shadow-glow-violet)' }}
        >
          {t('sticky.cta')}
        </a>
      </div>
    </div>
  );
};

export default StickyCtaBar;
