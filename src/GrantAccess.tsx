import React, { useEffect, useState } from "react";
import { useGlobalErrorHandler } from "./composables/error";
import { useRequest } from "./composables/http";
import toast from "react-hot-toast";

const GrantAccessScreen = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [role, setRole] = useState("");
  const [doctors, setDoctors] = useState<Array<{id: string; hospital_name:string; name: string; speciality: string}>>([])


  const handleGrantAccess = async() => {
    if (!selectedDoctor) {
      toast.error("Please select a doctor to grant access.");
      return;
    }
    try{
      const payload = {
        doctorId: selectedDoctor,
        role: role
      }
     await useRequest({
        method: 'POST',
        url: 'medical-record/grant-access',
        data: payload
      })

      toast.success(`Successfully Granted accesss`)
    }catch(error){
     useGlobalErrorHandler(error)
    }
  };



  useEffect(()=>{
    const fetchAllDoctors = async ()=>{
      try{
        const fetchDoctors = await useRequest({
          method: 'GET',
          url:'medical-record/doctors'
        })
        console.log('log', fetchDoctors.data)
        setDoctors(fetchDoctors.data)
        return fetchDoctors.data
      }catch(error){
        console.error('Error fetching patients:', error);
      }
    }

    fetchAllDoctors()
  }, [])
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">Grant Access</h2>
        <p className="text-gray-600 text-center mt-2">Select a doctor to grant access to your profile</p>
        
        <div className="mt-4">
          <label className="block text-gray-700">Select Doctor</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">-- Select a Doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.speciality}
              </option>
            ))}
          </select>
        </div>
        

        <div className="mt-4">
          <label className="block text-gray-700">Role</label>
          <select
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Select a Role --</option>
            <option value="EDITOR">Editor</option>
            <option value="VIEWER">Viewer</option>
          </select>
        </div>
        <button
          onClick={handleGrantAccess}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Grant Access
        </button>
      </div>
    </div>
  );
};

export default GrantAccessScreen;
