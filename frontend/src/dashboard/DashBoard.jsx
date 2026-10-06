import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";

const DashBoard = () => {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Page Content */}
      <main className="pb-[10vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashBoard;