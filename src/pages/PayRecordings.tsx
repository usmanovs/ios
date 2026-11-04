import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { StripeEmbeddedCheckout } from '@/components/StripeEmbeddedCheckout';
import { PaymentTestModeBanner } from '@/components/PaymentTestModeBanner';

const PayRecordings = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PaymentTestModeBanner />

      <header className="px-6 py-5 flex items-center justify-between max-w-3xl w-full mx-auto">
        <Link to="/" className="font-display font-bold text-foreground text-lg">
          iOS Vibe Coding
        </Link>
        <span className="text-xs uppercase tracking-widest text-foreground/40">Только Записи — $200</span>
      </header>

      <main className="flex-1 px-6 pb-16">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Оплата курса «Только Записи»
            </h1>
            <p className="text-sm text-foreground/50">
              Единоразовый платеж $200 · полный доступ ко всем записям уроков
            </p>
          </div>

          <div className="glass-card p-4 md:p-6">
            <StripeEmbeddedCheckout priceId="ios_course_recorded_onetime" />
          </div>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-foreground/10" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-medium">или</span>
            <div className="flex-1 h-px bg-foreground/10" />
          </div>

          <a
            href="https://wa.me/12402550596?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B8%D1%82%D1%8C%20%D0%BA%D1%83%D1%80%D1%81%20%C2%AB%D0%A2%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%97%D0%B0%D0%BF%D0%B8%D1%81%D0%B8%C2%BB"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-accent text-accent-foreground font-bold tracking-tight transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]"
            style={{ boxShadow: 'var(--shadow-glow-green)' }}
          >
            <MessageCircle className="w-5 h-5" />
            Оплатить через Mbank / WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
};

export default PayRecordings;
