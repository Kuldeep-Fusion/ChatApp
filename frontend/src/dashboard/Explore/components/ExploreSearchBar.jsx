
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExploreSearchBar = ({
  value = "",
  onChange,
  onClear,
}) => {
  const navigate = useNavigate();

  const handleFocus = () => {
    navigate("/search");
  };

  return (
    <div className="relative w-full">
      <Search
        size={19}
        strokeWidth={1.8}
        className="
          pointer-events-none
          absolute left-4 top-1/2
          -translate-y-1/2
          text-[#9b9e9e]
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={handleFocus}
        placeholder="Search people..."
        className="
          h-12 w-full
          rounded-2xl
          border border-[#deded7]
          bg-white
          pl-11 pr-10
          text-sm text-[#222]
          placeholder:text-[#a4a7a7]
          outline-none
          transition
          focus:border-[#52c55a]
          focus:ring-4
          focus:ring-[#52c55a]/10
        "
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="
            absolute right-3 top-1/2
            flex h-7 w-7
            -translate-y-1/2
            items-center justify-center
            rounded-full
            text-[#999]
            hover:bg-[#f1f1ed]
          "
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default ExploreSearchBar;
