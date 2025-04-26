import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { Card } from "../ui/Card";
import {  CardContent } from "../ui/CardContent";
import { Button } from "../ui/Button";

import { getMe } from "../../composables/auth";
import { RootState } from "../../store/store";
import { useRequest } from "../../composables/http";
import { useGlobalErrorHandler } from "../../composables/error";
import toast from "react-hot-toast";
const DoctorProfile = () => {
  const doctor = useSelector((state: RootState) => state.auth.profileInfo);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(getMe())
  }, [])
  const [formData, setFormData] = useState({ name: doctor && doctor.doctor ? doctor?.doctor.name : '', gender: doctor?.gender, speciality: doctor && doctor.doctor ? doctor?.doctor.speciality : '', email: doctor?.email });
  const handleChange = (e) => {
    console.log('log', e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  
  const handleSave = async() => {
    // Update doctor profile in the database here
    // Reset form data

    // Show success message
    try{
      const response = await useRequest({
        method: "PUT",
        url: "auth/me",
        data: {
          firstName: formData.name?.split(' ')[0],
          lastName: formData.name?.split(' ')[1] || '',
           ...formData
        }
    })

    const successResponseCode = [200, 201, 204]
       
    if(successResponseCode.includes(response.status)){
        toast.success('Update successful')
    }
    }catch(e){
      useGlobalErrorHandler(e, false)
    }
   
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-300 to-purple-400 flex flex-col items-center p-6">
      <Card className="w-full max-w-lg p-6">
        <CardContent>
          <h2 className="text-2xl font-bold text-center text-gray-800">Doctor Profile</h2>
          
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData?.name} 
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
              <label className="block text-gray-700">Specialty</label>
              <input 
                type="text" 
                name="speciality" 
                value={formData?.speciality} 
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

export default DoctorProfile;
