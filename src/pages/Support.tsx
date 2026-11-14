import { Smartphone, MessageCircle, Send, Instagram, Mail, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Support = () => {
  const shareUrl = `https://ios.getforce.org/support`;

  const sharePage = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      toast.success('Link copied: ' + shareUrl);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = shareUrl;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); toast.success('Link copied: ' + shareUrl); }
      catch { toast.error('Copy failed — ' + shareUrl); }
      document.body.removeChild(ta);
    }
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <button
          onClick={sharePage}
          className="group inline-flex items-center gap-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all mb-12"
        >
          <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-foreground/10 transition-colors">
            <Share2 className="w-4 h-4" />
          </div>
          Share this page
        </button>
      </div>

        <div className="flex items-center gap-3 mb-6">
          <Smartphone className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">iOS Vibe Coding — Support</h1>
        </div>

        <p className="text-muted-foreground mb-12 text-lg">
          Need help? We're here for you. Reach out through any of the channels below and we'll get back to you as soon as possible.
        </p>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <div className="space-y-3">
            <a
              href="https://wa.me/996771002840"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              <div>
                <div className="font-medium">WhatsApp</div>
                <div className="text-sm text-muted-foreground">+996 771 002 840</div>
              </div>
            </a>
            <a
              href="https://t.me/ai_bootcamp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <Send className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-medium">Telegram</div>
                <div className="text-sm text-muted-foreground">Message us on Telegram</div>
              </div>
            </a>
            <a
              href="https://www.instagram.com/getforce_bootcamp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <Instagram className="w-5 h-5 text-pink-400" />
              <div>
                <div className="font-medium">Instagram</div>
                <div className="text-sm text-muted-foreground">DM us on Instagram</div>
              </div>
            </a>
            <a
              href="mailto:support@getforce.dev"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
            >
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">support@getforce.dev</div>
              </div>
            </a>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How do I get started with the program?', a: "After enrolling, you'll receive access to our community and course materials via WhatsApp and Telegram. Our team will guide you through the onboarding process." },
              { q: 'What if I have technical issues with the app?', a: 'Reach out via WhatsApp or Telegram and our support team will help you troubleshoot any issues.' },
              { q: 'Can I get a refund?', a: 'Please contact us within 7 days of enrollment to discuss refund options.' },
              { q: 'Do I need prior coding experience?', a: 'No! The program is designed for anyone who wants to build an iOS app using AI — no prior coding experience required.' },
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} iOS Vibe Coding. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Support;
