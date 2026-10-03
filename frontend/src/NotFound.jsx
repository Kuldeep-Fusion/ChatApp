import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRightIcon, MessageCircleIcon } from "@animateicons/react/lucide";

const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleBack = () => {
    // Agar history nahi hai (direct link khola), to home pe bhejo
    if (window.history.length > 1) navigate(-1);
    else navigate("/welcome", { replace: true });
  };

  return (
    <main className="flex min-h-dvh flex-col bg-[#10251c] px-5 pt-[max(1.25rem,env(safe-area-inset-top))] text-white">
      <style>{`
        @keyframes nf-pop {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
        .nf-pop { opacity: 0; animation: nf-pop 0.45s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .nf-pop { opacity: 1; animation: none; }
        }
      `}</style>

      {/* Brand */}
      <header className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d9f99d] text-[#10251c]">
          <MessageCircleIcon size={18} duration={0.8} />
        </div>
        <span className="text-[16px] font-semibold tracking-tight">Chatter</span>
      </header>

      {/* Conversation */}
      <section
        className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10"
        aria-labelledby="nf-title"
      >
        {/* Outgoing: the address that was tried */}
        <div className="nf-pop flex flex-col items-end" style={{ animationDelay: "0.1s" }}>
          <div className="max-w-[88%] rounded-[20px] rounded-br-[6px] bg-[#d9f99d] px-4 py-3 text-[#183022]">
            <p className="break-all text-[14px] font-medium">{pathname}</p>
          </div>
          <p className="mt-1.5 pr-1 text-[12px] font-medium text-[#fca5a5]">
            Not delivered
          </p>
        </div>

        {/* Incoming: the explanation */}
        <div
          className="nf-pop mt-5 flex items-end gap-2.5"
          style={{ animationDelay: "0.55s" }}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fde68a] text-[12px] font-semibold text-[#713f12]">
            C
          </div>

          <div className="rounded-[20px] rounded-bl-[6px] bg-white/[0.08] px-4 py-4">
            <p className="text-[44px] font-semibold leading-none tracking-[-0.05em] text-white">
              404
            </p>
            <h1
              id="nf-title"
              className="mt-3 text-[17px] font-semibold tracking-tight text-white"
            >
              This page doesn't exist
            </h1>
            <p className="mt-1.5 text-[14px] leading-6 text-white/55">
              The link may be broken, or the page was moved. Head back to your
              chats to keep talking.
            </p>
          </div>
        </div>
      </section>

      {/* Actions: placed at the bottom for thumb reach */}
      <footer className="mx-auto w-full max-w-md space-y-3 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <Link
          to="/"
          replace
          className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#d9f99d] text-[15px] font-semibold text-[#10251c] transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#d9f99d]/40"
        >
          Go to chats
          <ArrowRightIcon
            size={18}
            duration={0.6}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>

        <button
          type="button"
          onClick={handleBack}
          className="flex h-14 w-full items-center justify-center rounded-2xl border border-white/15 text-[15px] font-medium text-white/80 transition active:scale-[0.98] active:bg-white/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
        >
          Go back
        </button>
      </footer>
    </main>
  );
};

export default NotFound;