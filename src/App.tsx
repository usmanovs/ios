import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Support from "./pages/Support.tsx";
import Marketing from "./pages/Marketing.tsx";
import Privacy from "./pages/Privacy.tsx";
import Course from "./pages/Course.tsx";
import Lesson from "./pages/Lesson.tsx";
import Auth from "./pages/Auth.tsx";
import Admin from "./pages/Admin.tsx";
import Instructor from "./pages/Instructor.tsx";
import Retro from "./pages/Retro.tsx";
import CheckoutReturn from "./pages/CheckoutReturn.tsx";
import PayRecordings from "./pages/PayRecordings.tsx";
import Recordings from "./pages/Recordings.tsx";

const queryClient = new QueryClient();

const ADMIN_RELOAD_KEY = "admin.reload.path";

const AdminReloadKeeper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      const raw = window.sessionStorage.getItem(ADMIN_RELOAD_KEY);
      if (!raw) return;

      window.sessionStorage.removeItem(ADMIN_RELOAD_KEY);

      try {
        const saved = JSON.parse(raw) as { path?: string; savedAt?: number };
        const isFresh = Date.now() - (saved.savedAt ?? 0) < 5 * 60 * 1000;
        if (saved.path?.startsWith("/admin") && isFresh) {
          navigate(saved.path, { replace: true });
        }
      } catch {
        // Ignore malformed session storage from older visits.
      }
    } else if (!location.pathname.startsWith("/admin")) {
      window.sessionStorage.removeItem(ADMIN_RELOAD_KEY);
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const rememberAdminRoute = () => {
      if (!location.pathname.startsWith("/admin")) return;

      window.sessionStorage.setItem(
        ADMIN_RELOAD_KEY,
        JSON.stringify({
          path: `${location.pathname}${location.search}${location.hash}`,
          savedAt: Date.now(),
        })
      );
    };

    window.addEventListener("beforeunload", rememberAdminRoute);
    return () => window.removeEventListener("beforeunload", rememberAdminRoute);
  }, [location.hash, location.pathname, location.search]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminReloadKeeper />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/support" element={<Support />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/course/:courseId" element={<Course />} />
          <Route path="/lesson/:lessonId" element={<Lesson />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/retro" element={<Retro />} />
          <Route path="/checkout/return" element={<CheckoutReturn />} />
          <Route path="/pay/recordings" element={<PayRecordings />} />
          <Route path="/recordings" element={<Recordings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
