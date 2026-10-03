
import { Link, useLocation } from "react-router-dom";

import {
  MessageCircleIcon,
  SettingsIcon,
  BellPlus,
  Globe,
} from "@animateicons/react/lucide";

const Footer = () => {
  const location = useLocation();

  const navItems = [
    {
      label: "Messages",
      path: "/messages",
      icon: MessageCircleIcon,
    },
    {
      label: "Notification",
      path: "/friends",
      icon: BellPlus,
    },
    {
      label: "Explore",
      path: "/explore",
      icon: Globe,
    },
    {
      label: "Profile",
      path: "/profile",
      icon: SettingsIcon,
    },
  ];

  return (
   <footer
  className="
    fixed
    inset-x-0
    bottom-0
    z-50
    flex
    h-[10vh]
    w-full
    items-center
    justify-center
    px-0
    sm:px-4
    sm:pb-4
  "
>
  <nav
    className="
      flex
      h-full
      w-full
      items-center
      gap-1
      border-t
      border-[#dfe7e2]
      bg-white
      p-2
      shadow-[0_-8px_30px_rgba(16,37,28,0.10)]
      backdrop-blur-xl
      supports-[backdrop-filter]:bg-white/80

      sm:h-auto
      sm:w-fit
      sm:gap-2
      sm:rounded-[22px]
      sm:border
      sm:p-2
      sm:shadow-[0_14px_45px_rgba(16,37,28,0.15)]
    "
  >
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            location.pathname.startsWith(`${item.path}/`);

          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-label={item.label}
              className={`
                group
                relative
                flex
                min-w-0
                flex-1
                flex-col
                items-center
                justify-center
                rounded-[17px]
                px-3
                py-2
                transition-all
                duration-200

                sm:min-w-[72px]
                sm:flex-none
                sm:flex-initial
                sm:px-4

                ${
                  isActive
                    ? "bg-[#183326] text-[#d9f99d] shadow-[0_4px_14px_rgba(24,51,38,0.18)]"
                    : "text-[#7b8780] hover:bg-[#f2f6f3] hover:text-[#263e30]"
                }
              `}
            >
              <Icon
                size={20}
                duration={0.65}
                className="shrink-0"
              />

              <span
                className={`
                  mt-1
                  text-[10px]
                  font-medium
                  leading-none
                  tracking-[-0.01em]
                  sm:text-[11px]

                  ${
                    isActive
                      ? "text-[#d9f99d]"
                      : "text-[#7b8780]"
                  }
                `}
              >
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <span className="absolute -bottom-[3px] h-[3px] w-4 rounded-full bg-[#d9f99d]" />
              )}
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;

