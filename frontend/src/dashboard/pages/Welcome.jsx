import { useNavigate } from "react-router-dom";
import { ArrowRightIcon, CheckIcon, MessageCircleIcon } from "@animateicons/react/lucide";
import { useAuth } from "../../context/AuthContext";

const points = [
  { title: "Chat in real time", text: "Send messages instantly to anyone on Chatter." },
  { title: "Find people", text: "Explore and connect with new people." },
  { title: "You're in control", text: "Block users and manage your profile anytime." },
];

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNext = () => {
    localStorage.setItem(`welcome_seen_${user._id}`, "true");
    navigate("/explore", { replace: true });
  };


  return (
    <main className="flex min-h-dvh flex-col bg-[#10251c] px-5 pt-[max(1.5rem,env(safe-area-inset-top))] text-white">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9f99d] text-[#10251c]">
          <MessageCircleIcon size={22} duration={0.8} />
        </div>

        <h1 className="mt-6 text-[34px] font-semibold leading-tight tracking-[-0.04em]">
          Welcome{user?.name || user?.username ? `, ${user.name || user.username}` : ""}
        </h1>
        <p className="mt-2 text-[15px] leading-7 text-white/55">
          Chatter helps you stay connected with the people you care about.
        </p>

        <ul className="mt-8 space-y-5">
          {points.map((p) => (
            <li key={p.title} className="flex gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d9f99d] text-[#10251c]">
                <CheckIcon size={13} duration={0.5} />
              </span>
              <div>
                <p className="text-[15px] font-medium">{p.title}</p>
                <p className="text-[14px] leading-6 text-white/50">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto w-full max-w-md pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          onClick={handleNext}
          className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#d9f99d] text-[15px] font-semibold text-[#10251c] transition active:scale-[0.98]"
        >
          Next
          <ArrowRightIcon size={18} duration={0.6} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </main>
  );
};

export default Welcome;