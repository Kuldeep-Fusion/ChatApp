import {
  XIcon,
  MailIcon,
  PhoneIcon,
  AtSignIcon,
} from "@animateicons/react/lucide";

const ContactInfo = ({ onClose }) => {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/20
        px-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-md
          rounded-[28px]
          bg-white
          p-5
          shadow-2xl
          sm:p-6
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#181818]">
              Contact information
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Your account contact details
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gray-100
              text-gray-500
              hover:bg-gray-200
            "
          >
            <XIcon
              size={18}
              duration={0.6}
              color="#555"
            />
          </button>
        </div>

        {/* Details */}
        <div className="mt-6 space-y-3">
          
          <InfoRow
            icon={MailIcon}
            label="Email"
            value="user@example.com"
            bg="bg-[#eef4ff]"
            color="#4d7fe8"
          />

          <InfoRow
            icon={PhoneIcon}
            label="Phone"
            value="+91 XXXXX XXXXX"
            bg="bg-[#eef8e8]"
            color="#54b948"
          />

          <InfoRow
            icon={AtSignIcon}
            label="Username"
            value="@kuldeep"
            bg="bg-[#f3efff]"
            color="#8966d5"
          />

        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  icon: Icon,
  label,
  value,
  bg,
  color,
}) => {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#eeeeeb] p-3.5">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}
      >
        <Icon
          size={19}
          duration={0.7}
          color={color}
        />
      </div>

      <div>
        <p className="text-[11px] text-gray-400">
          {label}
        </p>

        <p className="mt-0.5 text-sm font-medium text-[#252525]">
          {value}
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;