import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Send, Instagram } from 'lucide-react';

const FooterSection = () => {
  const { t } = useLanguage();

  const links = [
    { href: 'https://wa.me/996771002840', icon: MessageCircle, label: t('footer.whatsapp'), color: 'text-accent' },
    { href: 'https://t.me/ai_bootcamp', icon: Send, label: t('footer.telegram'), color: 'text-primary' },
    { href: 'https://www.instagram.com/getforce_bootcamp/', icon: Instagram, label: t('footer.instagram'), color: 'text-foreground' },
  ];

  return (
    <footer className="pt-24 pb-12 px-6 border-t border-foreground/5">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
          {t('footer.title')}
        </h2>
        <p className="text-foreground/50 mb-12">{t('footer.question')}</p>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {links.map(({ href, icon: Icon, label, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-card/40 border border-foreground/10 backdrop-blur-xl text-sm font-bold tracking-wide hover:bg-card/60 transition-all ${color}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </a>
          ))}
        </div>

        <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/30 font-bold">
          {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
