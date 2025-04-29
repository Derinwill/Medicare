import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import { updatePatient } from "../redux/patientSlice";
import { Card } from "../ui/Card";
import {  CardContent } from "../ui/CardContent";
import { Button } from "../ui/Button";
import { RootState } from "../../store/store";
import { getMe } from "../../composables/auth";

const PatientProfile = () => {
  useEffect(()=>{
    dispatch(getMe())
  }, [])
  const patient = useSelector((state: RootState) => state.auth.profileInfo);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({ ...patient });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  
  const handleSave = () => {
    // dispatch(updatePatient(formData));
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-300 to-purple-400 flex flex-col items-center p-6">
      <Card className="w-full max-w-lg p-6">
        <CardContent>
          <h2 className="text-2xl font-bold text-center text-gray-800">Patient Profile</h2>
          
          <div className="mt-4 space-y-4">
          <div>
              <label className="block text-gray-700">Patient Uniq ID</label>
              <span className="text-black">{formData && formData.patient ? formData.patient.uniqId : 'N/A'}</span>
            </div>
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input 
              
                type="text" 
                name="name" 
                value={formData.patient?.name} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold"
              />
            </div>
            
            <div>
              <label className="block text-gray-700">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold"
              />
            </div>
            
            <div>
              <label className="block text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input 
                type="date" 
                name="dob" 
                value={formData.patient?.dob} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold"
              />
            </div>
            
            <div>
              <label className="block text-gray-700">Address</label>
              <input 
                type="text" 
                name="address" 
                value={formData.patient?.address} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold"
              />
            </div>
            
            <div>
              <label className="block text-gray-700">Phone</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.patient?.phone} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold"
              />
            </div>
          </div>
          
          <Button onClick={handleSave} className="mt-6 w-full bg-blue-500 hover:bg-blue-600">
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientProfile;
