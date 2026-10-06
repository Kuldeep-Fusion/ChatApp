import { Bot } from "lucide-react";
import MessageList from "../../components/messages/MessageList";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/header";

const Message = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative
        mx-auto
        flex
        h-[90vh]
        w-full
        flex-col
        overflow-hidden
               bg-green-950

        sm:max-w-[520px]
        sm:rounded-[36px]
        sm:border
        sm:border-[#d9d9d1]
        sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >
      {/* ================= HEADER ================= */}
      <Header/>

      {/* ================= AI BUTTON ================= */}
      <button
        type="button"
        onClick={() => navigate("/chatwithai")}
        aria-label="Chat with AI"
        className="
          group
          absolute
          right-5
          bottom-15
          z-50

          flex
          h-14
          w-14
          items-center
          justify-center

          rounded-2xl
          bg-green-950
          text-white

          border
          border-white/10

          shadow-[0_10px_30px_rgba(0,0,0,0.20)]

          transition-all
          duration-300
          hover:-translate-y-1
          hover:scale-105
          hover:bg-green-900
          active:scale-95
        "
      >
        <img src="/favicon.png" alt="Milan Chat" className="rounded-sm w-full" />

        {/* Online indicator */}
        <span
          className="
            absolute
            right-1
            top-1
            h-3
            w-3
            rounded-full
            border-2
            border-green-950
            bg-emerald-400
          "
        />
      </button>

      {/* ================= MESSAGE LIST ================= */}
      <main className="min-h-0 flex-1 overflow-hidden rounded-t-4xl bg-white">
        <MessageList />
      </main>
    </div>
  );
};

export default Message;