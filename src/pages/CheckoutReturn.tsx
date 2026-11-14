import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";

const CheckoutReturn = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-card max-w-lg w-full p-10 text-center">
        {sessionId ? (
          <>
            <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-5" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Оплата получена!
            </h1>
            <p className="text-foreground/60 text-sm leading-relaxed mb-8">
              Спасибо! Мы отправим вам детали доступа к курсу на email. Если у вас есть вопросы —
              напишите нам в WhatsApp.
            </p>
          </>
        ) : (
          <>
            <AlertCircle className="w-12 h-12 text-primary mx-auto mb-5" />
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Информация об оплате не найдена
            </h1>
            <p className="text-foreground/60 text-sm leading-relaxed mb-8">
              Попробуйте оформить оплату ещё раз или свяжитесь с нами в WhatsApp.
            </p>
          </>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm"
          >
            На главную
          </Link>
          <a
            href="https://wa.me/996771002840"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl border border-foreground/10 text-sm font-bold text-foreground/80"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
};

export default CheckoutReturn;
