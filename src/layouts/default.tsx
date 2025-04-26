
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

const DefaultLayout = () => {
  return (
    <div className="flex min-h-screen min-w-screen bg-gradient-to-r from-blue-300 to-purple-300 ">
      {/* Sidebar - Hidden on small screens */}
      <div className="sm:block w-fit">
        <Sidebar />
      </div>

     <div className="w-full">
        <Outlet />
     </div>
    
    </div>
    
  );
};

export default DefaultLayout;