import { Plus, Search } from "@animateicons/react/lucide";
import {  useNavigate } from "react-router-dom";


const Header = () => {

    const navigate = useNavigate();

    
  return (
    <header className="w-full bg-green-950 px-5 pt-5 pb-4">
      <div className="flex items-center justify-between">

        {/* Left - Logo + App Name */}
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex h-12 w-full items-center justify-center">
            <img
              src="/logo4.png"
              alt="Milan"
              className="h-30 w-30 object-contain"
            />
          </div>

          {/* App Name
          <h1 className="text-[34px] font-semibold tracking-[-1.5px] text-white">
            Milan
          </h1> */}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">

          {/* Search */}
          <button
            type="button"
            onClick={() => navigate("/search")}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white bg-white/10 transition hover:bg-white/10 active:scale-95"
            aria-label="Search"
          >
            <Search size={22}/>
          </button>

          {/* Add */}
          <button
            type="button"
             onClick={() => navigate("/friends")}
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#baff3b] text-[#07140d] shadow-[0_4px_20px_rgba(186,255,59,0.15)] transition hover:scale-105 active:scale-95"
            aria-label="Add"
          >
            <Plus size={15}/>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;