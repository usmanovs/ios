import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Star, MessageCircle, CreditCard } from 'lucide-react';
import mbankQr from '@/assets/mbank-qr.png';
import { CheckoutDialog } from '@/components/CheckoutDialog';

const PricingSection = () => {
  const { t } = useLanguage();
  const [checkout, setCheckout] = useState<{ priceId: string; title: string } | null>(null);




  const recordingsFeatures = ['plan.rec.f1', 'plan.rec.f2', 'plan.rec.f3', 'plan.rec.f4'];
  const liveFeatures = ['plan.live.f1', 'plan.live.f2', 'plan.live.f3', 'plan.live.f4', 'plan.live.f5', 'plan.live.f6'];

  const recordingsValue = [
    { label: 'plan.rec.v1', value: '$400' },
    { label: 'plan.rec.v2', value: '$150' },
  ];
  const liveValue = [
    { label: 'plan.live.v1', value: '$494' },
    { label: 'plan.live.v2', value: '$400' },
    { label: 'plan.live.v3', value: '$300' },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Plans */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('price.plans.title')}
          </h2>
          <p className="text-foreground/50 text-base md:text-lg">{t('price.plans.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recordings Only */}
          <div className="glass-card p-8 md:p-10 flex flex-col">
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">{t('plan.rec.title')}</h3>
            <p className="text-sm text-foreground/50 leading-relaxed mb-8">{t('plan.rec.desc')}</p>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-display text-5xl font-bold text-foreground">$200</span>
              <span className="text-foreground/30 line-through text-lg">$450</span>
            </div>
            <p className="text-xs text-foreground/40 mb-8">{t('plan.oneTime')}</p>

            {/* QR */}
            <div className="relative overflow-hidden group rounded-2xl bg-background/40 border border-foreground/5 p-6 mb-4 text-center transition-colors">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="relative text-[11px] font-bold uppercase tracking-widest text-primary/80 mb-4">{t('plan.scanMbank')}</p>
              <div className="relative inline-block bg-white p-4 rounded-xl shadow-lg shadow-black/40">
                <img src={mbankQr} alt="Mbank QR Code" className="w-32 h-32 rounded-md" />
              </div>
              <p className="relative text-[11px] text-foreground/40 leading-relaxed max-w-[220px] mx-auto mt-4">{t('plan.afterPayment')}</p>
            </div>

            <a
              href="https://wa.me/12402550596"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-accent text-accent-foreground font-bold tracking-tight transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] mb-3"
              style={{ boxShadow: 'var(--shadow-glow-green)' }}
            >
              <MessageCircle className="w-5 h-5" />
              {t('plan.confirmWhatsapp')}
            </a>

            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-foreground/5" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/20 font-medium">{t('plan.or')}</span>
              <div className="flex-1 h-px bg-foreground/5" />
            </div>

            <button
              type="button"
              onClick={() => setCheckout({ priceId: 'ios_course_recorded_onetime', title: `${t('plan.rec.title')} — $200` })}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold tracking-tight transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] mb-8"
              style={{ boxShadow: 'var(--shadow-glow-violet)' }}
            >
              <CreditCard className="w-5 h-5" />
              {t('plan.payCard')}
            </button>

            {/* Value breakdown */}
            <div className="space-y-4 mb-6">
              {recordingsValue.map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-foreground/40">{t(item.label)}</span>
                  <span className="text-foreground/80 font-medium">{item.value}</span>
                </div>
              ))}
              <div className="h-px bg-foreground/10" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/60 font-medium">{t('plan.totalValue')}</span>
                <span className="text-lg text-foreground font-bold">$450</span>
              </div>
              <div className="flex justify-between items-center bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
                <span className="text-sm text-primary/80 font-semibold">{t('plan.youPay')}</span>
                <span className="text-xl text-primary font-black">$200</span>
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="text-xs text-accent/60">{t('plan.savings')}</span>
                <span className="text-sm text-accent font-bold bg-accent/10 px-2 py-0.5 rounded">56%</span>
              </div>
            </div>

            <div className="border-t border-foreground/10 pt-6 space-y-3 mt-auto">
              {recordingsFeatures.map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm text-foreground/80">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Sessions — featured */}
          <div
            className="relative rounded-[2rem] p-8 md:p-10 flex flex-col backdrop-blur-2xl"
            style={{
              background: 'linear-gradient(180deg, hsl(222 49% 17% / 0.7), hsl(240 28% 14% / 0.6))',
              border: '2px solid hsl(252 92% 76% / 0.6)',
              boxShadow: 'var(--shadow-glow-violet)',
            }}
          >
            <div className="absolute -top-3 right-8 flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] bg-primary text-primary-foreground px-4 py-1.5 rounded-full">
              <Star className="w-3 h-3" />
              {t('plan.popular')}
            </div>

            <h3 className="font-display text-2xl font-bold text-primary mb-2">{t('plan.live.title')}</h3>
            <p className="text-sm text-foreground/50 leading-relaxed mb-8">{t('plan.live.desc')}</p>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-display text-5xl font-bold text-foreground">$349</span>
              <span className="text-foreground/30 line-through text-lg">$550</span>
            </div>
            <p className="text-xs text-foreground/40 mb-8">{t('plan.oneTime')}</p>

            {/* QR */}
            <div className="relative overflow-hidden group rounded-2xl bg-background/40 border border-primary/20 p-6 mb-4 text-center transition-colors">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="relative text-[11px] font-bold uppercase tracking-widest text-primary mb-4">{t('plan.scanMbank')}</p>
              <div className="relative inline-block bg-white p-4 rounded-xl shadow-lg shadow-black/40">
                <img src={mbankQr} alt="Mbank QR Code" className="w-32 h-32 rounded-md" />
              </div>
              <p className="relative text-[11px] text-foreground/40 leading-relaxed max-w-[220px] mx-auto mt-4">{t('plan.afterPayment')}</p>
            </div>

            <a
              href="https://wa.me/12402550596"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-accent text-accent-foreground font-bold tracking-tight transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] mb-3"
              style={{ boxShadow: 'var(--shadow-glow-green)' }}
            >
              <MessageCircle className="w-5 h-5" />
              {t('plan.confirmWhatsapp')}
            </a>

            <div className="flex items-center gap-4 my-5">
              <div className="flex-1 h-px bg-foreground/5" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/20 font-medium">{t('plan.or')}</span>
              <div className="flex-1 h-px bg-foreground/5" />
            </div>

            <button
              type="button"
              onClick={() => setCheckout({ priceId: 'ios_course_live_onetime', title: `${t('plan.live.title')} — $349` })}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold tracking-tight transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] mb-8"
              style={{ boxShadow: 'var(--shadow-glow-violet)' }}
            >
              <CreditCard className="w-5 h-5" />
              {t('plan.payCard')}
            </button>

            {/* Value breakdown */}
            <div className="space-y-4 mb-6">
              {liveValue.map((item) => (
                <div key={item.label} className="flex justify-between items-center text-sm">
                  <span className="text-foreground/40">{t(item.label)}</span>
                  <span className="text-foreground/80 font-medium">{item.value}</span>
                </div>
              ))}
              <div className="h-px bg-foreground/10" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground/60 font-medium">{t('plan.totalValue')}</span>
                <span className="text-lg text-foreground font-bold">$1,194</span>
              </div>
              <div className="flex justify-between items-center bg-primary/10 border border-primary/20 rounded-xl px-4 py-3">
                <span className="text-sm text-primary/80 font-semibold">{t('plan.youPay')}</span>
                <span className="text-xl text-primary font-black">$349</span>
              </div>
              <div className="flex justify-between items-center px-4">
                <span className="text-xs text-accent/60">{t('plan.savings')}</span>
                <span className="text-sm text-accent font-bold bg-accent/10 px-2 py-0.5 rounded">37%</span>
              </div>
            </div>

            <div className="border-t border-foreground/10 pt-6 space-y-3 mt-auto">
              {liveFeatures.map((key) => (
                <div key={key} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-sm text-foreground/80">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-foreground/40 mt-10">
          👤 {t('price.ageRec')}
        </p>

        <CheckoutDialog
          open={Boolean(checkout)}
          onOpenChange={(open) => !open && setCheckout(null)}
          priceId={checkout?.priceId ?? null}
          title={checkout?.title ?? ''}
        />
      </div>
    </section>
  );
};

export default PricingSection;
