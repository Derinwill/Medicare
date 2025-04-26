import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { UserType } from "../typings/general";
import DoctorDashboard from "../components/Dashboard/doctor"
import PatientDashboard from "../components/Dashboard/patient";
import Sidebar from "../components/SideBar";

const Dashboard = () => {
    const navigate = useNavigate();
    const currentUserType = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex min-h-screen min-w-screen bg-gradient-to-r from-blue-300 to-purple-300 ">
      
   



      {
        currentUserType.userType === UserType.DOCTOR && (
          
          <DoctorDashboard/>
          
        )

      
      }

      {
          currentUserType.userType === UserType.PATIENT && (
          
            <PatientDashboard/>
            
          )
      }
    </div>
    
  );
};

export default Dashboard;