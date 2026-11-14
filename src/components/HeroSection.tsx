import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCountdown } from '@/hooks/useCountdown';
import { COURSE_START_DATE } from '@/lib/course';
import avatar1 from '@/assets/avatar1.jpg';
import avatar2 from '@/assets/avatar2.jpg';
import avatar3 from '@/assets/avatar3.jpg';
import avatar4 from '@/assets/avatar4.jpg';

const HeroSection = () => {
  const { t } = useLanguage();
  const countdown = useCountdown(COURSE_START_DATE);

  const stats = [
    { val: t('hero.stat1.val'), label: t('hero.stat1.label') },
    { val: t('hero.stat2.val'), label: t('hero.stat2.label') },
    { val: t('hero.stat3.val'), label: t('hero.stat3.label') },
    { val: t('hero.stat4.val'), label: t('hero.stat4.label') },
  ];

  const countdownItems = [
    { val: countdown.days, label: t('countdown.days') },
    { val: countdown.hours, label: t('countdown.hours') },
    { val: countdown.minutes, label: t('countdown.minutes') },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 md:pt-28 pb-14 md:pb-20">
      {/* Aurora layers */}
      <div
        aria-hidden
        className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full pointer-events-none"
        style={{ background: 'hsl(238 83% 55% / 0.22)', filter: 'blur(140px)' }}
      />
      <div
        aria-hidden
        className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full pointer-events-none"
        style={{ background: 'hsl(263 70% 50% / 0.22)', filter: 'blur(130px)' }}
      />
      <div
        aria-hidden
        className="absolute top-[10%] right-[15%] w-[40%] h-[40%] rounded-full pointer-events-none"
        style={{ background: 'hsl(160 84% 45% / 0.12)', filter: 'blur(120px)' }}
      />
      <div aria-hidden className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-xl mb-10 transition-transform hover:scale-105 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-[10px] font-black tracking-[0.2em] text-accent uppercase">
            {t('hero.badge')}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[0.95] mb-8 animate-slide-up">
          {t('hero.title1')} {t('hero.title2')}{' '}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage:
                'linear-gradient(135deg, hsl(160 84% 65%), hsl(174 84% 55%), hsl(190 90% 55%))',
            }}
          >
            {t('hero.title3')}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-foreground/60 max-w-2xl mb-3 leading-relaxed font-medium animate-slide-up"
          style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}
        >
          {t('hero.subtitle')}
        </p>
        <p
          className="text-base md:text-lg font-semibold text-accent max-w-2xl mb-6 animate-slide-up"
          style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
        >
          {t('hero.subtitleAccent')}
        </p>

        {/* Discount banner */}
        <div
          className="mb-12 animate-slide-up"
          style={{ animationDelay: '0.25s', animationFillMode: 'backwards' }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-5 py-3 rounded-2xl bg-accent/10 border border-accent/30 backdrop-blur-2xl shadow-[0_0_30px_rgba(45,212,191,0.15)]">
            <span className="text-2xl sm:text-3xl font-black text-foreground/40 line-through decoration-2">
              $499
            </span>
            <span className="text-2xl sm:text-3xl font-black text-accent">→ $349</span>
            <span className="text-sm sm:text-base font-bold text-foreground/80 text-center sm:text-left">
              {t('hero.discountBanner')}
            </span>
          </div>
        </div>

        {/* Social proof + revenue pill */}
        <div
          className="flex flex-col md:flex-row items-center gap-6 mb-16 animate-fade-in"
          style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}
        >
          <div className="flex -space-x-3">
            {[avatar1, avatar2, avatar3, avatar4].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                loading="lazy"
                className="w-11 h-11 rounded-full border-2 border-background object-cover"
              />
            ))}
            <div className="w-11 h-11 rounded-full border-2 border-background bg-accent/90 flex items-center justify-center text-[10px] font-black text-accent-foreground">
              +300
            </div>
          </div>

          <div className="px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl flex items-center gap-3 shadow-2xl">
            <div className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full bg-accent"
                style={{ boxShadow: '0 0 8px hsl(160 84% 45%)' }}
              />
              <span className="text-[10px] md:text-xs font-bold text-foreground/50 uppercase tracking-widest">
                {t('hero.students')}
              </span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-sm font-black text-foreground">300+</span>
          </div>
        </div>

        {/* Revenue callout */}
        <div
          className="max-w-3xl mb-14 animate-slide-up"
          style={{ animationDelay: '0.35s', animationFillMode: 'backwards' }}
        >
          <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
            {t('hero.revenue')}
          </p>
        </div>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-16 animate-slide-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="group p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:bg-white/[0.05] transition-all hover:border-white/20"
            >
              <div className="font-display text-3xl md:text-4xl font-black text-foreground mb-2 tracking-tighter group-hover:scale-105 transition-transform">
                {s.val}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-black">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/996771002840"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group px-12 py-5 md:py-6 rounded-2xl overflow-hidden transition-all active:scale-95 mb-4 animate-slide-up"
          style={{
            background: 'var(--gradient-violet)',
            boxShadow: 'var(--shadow-glow-violet)',
            animationDelay: '0.45s',
            animationFillMode: 'backwards',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative z-10 font-black text-lg md:text-xl tracking-tight text-primary-foreground uppercase">
            {t('hero.cta')}
          </span>
        </a>

        {/* Start Learning — routes to /auth */}
        <Link
          to="/auth"
          className="relative inline-flex items-center justify-center px-10 py-4 md:py-5 rounded-2xl border-2 border-accent/40 bg-accent/10 text-accent-foreground backdrop-blur-2xl font-bold text-base md:text-lg tracking-tight transition-all hover:bg-accent/20 hover:border-accent/60 active:scale-95 mb-4 animate-slide-up"
          style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
        >
          {t('hero.startLearning')}
        </Link>

        {/* CTA subtext */}
        <p
          className="text-sm md:text-base font-bold text-accent mb-14 animate-slide-up"
          style={{ animationDelay: '0.55s', animationFillMode: 'backwards' }}
        >
          {t('hero.ctaSubtext')}
        </p>

        {/* Countdown */}
        <div
          className="flex flex-col items-center gap-3 animate-fade-in"
          style={{ animationDelay: '0.55s', animationFillMode: 'backwards' }}
        >
          <div className="text-[10px] uppercase tracking-[0.25em] font-black text-foreground/50">
            {t('hero.countdownTitle')}
          </div>
          <div className="flex items-center gap-2 md:gap-3 font-mono text-foreground/90">
            {countdownItems.map((item, i, arr) => (
              <div key={i} className="flex items-center gap-2 md:gap-3">
                <span className="text-2xl md:text-3xl font-bold leading-none tabular-nums">
                  {String(item.val).padStart(2, '0')}
                  <span className="text-sm md:text-base font-bold text-foreground/50 ml-0.5">
                    {item.label}
                  </span>
                </span>
                {i < arr.length - 1 && (
                  <span className="text-xl md:text-2xl text-foreground/30">:</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
