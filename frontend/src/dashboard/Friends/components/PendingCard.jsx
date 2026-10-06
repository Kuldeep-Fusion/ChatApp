import { motion } from "framer-motion";
import { ClockIcon, X } from "@animateicons/react/lucide";

const PendingCard = ({
  item,
  rejected = false,
  onDelete,
}) => {
  const user = item?.user;

  return (
    <motion.article
      whileHover={{ y: -2 }}
      className="rounded-[20px] border border-[#E7DFD2] bg-[#FFFDF8] p-3.5 shadow-[0_4px_20px_rgba(52,45,35,0.04)] sm:p-4"
    >
      <div className="flex items-center gap-3">

        <img
          src={user?.avatar}
          alt={user?.username}
          className={`h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12 ${
            rejected ? "grayscale" : ""
          }`}
        />

        <div className="min-w-0 flex-1">

          <h3 className="truncate text-[13px] font-bold text-[#163B2A] sm:text-[14px]">
            {user?.name || user?.username}
          </h3>

          <p className="mt-0.5 truncate text-[11px] text-[#8A8276] sm:text-xs">
            {user?.username}
          </p>

        </div>

        <span
          className={`
            flex shrink-0 items-center gap-1 rounded-full px-2 py-1
            text-[9px] font-semibold
            ${
              rejected
                ? "bg-[#F5E4DE] text-[#A45D50]"
                : "bg-[#F0E8D7] text-[#8A6C32]"
            }
          `}
        >
          {rejected ? (
            "Rejected"
          ) : (
            <>
              <ClockIcon size={10} />
              Pending
            </>
          )}
        </span>

      </div>

      {!rejected && (
        <button
          type="button"
          onClick={() => onDelete(item.relationshipId)}
          className="mt-3.5 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#DED5C7] bg-[#F8F3EA] text-[11px] font-semibold text-[#665F54] transition hover:bg-[#F0E9DE] active:scale-[0.98] sm:h-11 sm:text-xs"
        >
          <X size={14} />
          Cancel Request
        </button>
      )}

      {rejected && (
        <div className="mt-3.5 flex h-10 w-full items-center justify-center rounded-xl bg-[#F5E4DE] text-[11px] font-semibold text-[#A45D50] sm:h-11 sm:text-xs">
          Request Rejected
        </div>
      )}
    </motion.article>
  );
};

export default PendingCard;