import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "./store/store";
import { UserType } from "./typings/general";
import PatientProfile from "./components/Profile/patient";
import DoctorProfile from "./components/Profile/doctor";



const ProfilePage = () => {
    const navigate = useNavigate();
    const currentUserType = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex min-h-screen min-w-screen bg-gradient-to-r from-blue-300 to-purple-300 ">
    

      {
        currentUserType.userType === UserType.DOCTOR && (
          
          <DoctorProfile/>
          
        )

      
      }

      {
          currentUserType.userType === UserType.PATIENT && (
          
            <PatientProfile/>
            
          )
      }
    </div>
    
  );
};

export default ProfilePage;