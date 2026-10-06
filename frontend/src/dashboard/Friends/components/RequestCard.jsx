
import { motion } from "framer-motion";
import { GooeyToaster, gooeyToast } from 'goey-toast'

import {
  Check,
  X,
} from "@animateicons/react/lucide";


const RequestCard = ({ request , handleAccept ,  handleReject }) => {
  const sender = request?.sender;

  if (!sender) return null;


  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="rounded-[20px] border border-[#E7DFD2] bg-[#FFFDF8] p-3.5 shadow-[0_4px_20px_rgba(52,45,35,0.04)] sm:p-4"
    >
     
      {/* User */}
      <div className="flex items-center gap-3">
       <div>
          <GooeyToaster position="top-center" description={false} />
       </div>

        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src={sender.avatar}
            alt={sender.name}
            className="h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12"
          />

          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#FFFDF8] bg-[#D9F99D]" />
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">

          <h3 className="truncate text-[13px] font-bold text-[#163B2A] sm:text-[14px]">
            {sender.name}
          </h3>

          <p className="mt-0.5 truncate text-[11px] text-[#8A8276] sm:text-xs">
            @{sender.username}
          </p>

          <p className="mt-1 text-[10px] text-[#A19A8E]">
            Wants to connect with you
          </p>

        </div>
      </div>

      {/* Actions */}
      <div className="mt-3.5 grid grid-cols-2 gap-2">

        <button
          type="button"
          onClick={ () => {handleAccept}}
          className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#163B2A] text-[11px] font-semibold text-white transition hover:bg-[#1D4A35] active:scale-[0.98] sm:h-11 sm:text-xs"
        >
          <Check size={14} />
          Accept
        </button>

        <button
          type="button"
          onClick={ () => {handleReject}}
          className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#DED5C7] bg-[#F8F3EA] text-[11px] font-semibold text-[#665F54] transition hover:bg-[#F0E9DE] active:scale-[0.98] sm:h-11 sm:text-xs"
        >
          <X size={14} />
          Reject
        </button>

      </div>
    </motion.article>
  );
};

export default RequestCard;