import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import RecordTable from "../components/RecordTable";
import recordImage from "../assets/icons8-bill-48.png"
import totalrecordsimg from "../assets/svg4.png"
import sharedrecordsimg from "../assets/svg3.png"
import hospitalsimg from "../assets/scg2.png"
import doctorsimg from "../assets/svg.png"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="flex min-h-screen min-w-screen bg-gradient-to-r from-blue-300 to-purple-300">
      {/* Sidebar - Hidden on small screens */}
      <div className="sm:block w-fit">
        <Sidebar onClick={() => navigate("/signup")} />
      </div>

      {/* Main Content */}
      <div className="flex-col w-full p-4 sm:p-6 rounded-tl-2xl rounded-bl-2xl drop-shadow-2xl shadow-black">
      <Header onClick={() => navigate("/signup")} />

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatsCard icon={totalrecordsimg} title="Total Records" value="124" />
          <StatsCard icon={sharedrecordsimg} title="Shared Records" value="38" />
          <StatsCard icon={hospitalsimg} title="Hospitals" value="12" />
          <StatsCard icon={doctorsimg} title="Doctors" value="8" />
        </div>

        {/* Records Table */}
        <div className="mt-6">
            <RecordTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;