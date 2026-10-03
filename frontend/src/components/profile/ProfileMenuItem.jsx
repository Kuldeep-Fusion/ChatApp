import {
  ChevronRightIcon,
} from "@animateicons/react/lucide";

const ProfileMenuItem = ({
  icon: Icon,
  title,
  description,
  iconBg = "bg-gray-100",
  iconColor = "#555555",
  onClick,
}) => {
  return (
    <button type="button" onClick={onClick} className="
        group
        flex
        w-full
        items-center
        gap-4
        rounded-2xl
        border
        border-[#eeeeeb]
        bg-white
        px-4
        py-3.5
        text-left
        transition
        duration-200
        hover:-translate-y-[1px]
        hover:border-[#e4e4e0]
        hover:shadow-[0_5px_20px_rgba(0,0,0,0.04)]
      "
    >
      {/* Icon */}
      <div
        className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          ${iconBg}
        `}
      >
        <Icon
          size={20}
          duration={0.7}
          color={iconColor}
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#222]">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-gray-400">
          {description}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRightIcon
        size={18}
        duration={0.6}
        color="#a5a5a0"
        className="shrink-0 transition-transform group-hover:translate-x-0.5"
      />
    </button>
  );
};

export default ProfileMenuItem;