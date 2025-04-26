import { useSelector } from "react-redux";
import { Card, CardContent } from "./components/ui/Record/Card";
import { useEffect, useState } from "react";
import { useRequest } from "./composables/http";
import { useGlobalErrorHandler } from "./composables/error";
import toast from "react-hot-toast";
const ManageAccess = () => {
const [records, setRecords] = useState<Array<{
  role: string;
  doctor: {
    id: string;
    name: string
  }
}>>([])


const revokeAccess = async(doctorId: string) => {
  try{
    const payload = {
      doctorId: doctorId,
    }
   await useRequest({
      method: 'PUT',
      url: 'medical-record/revoke',
      data: payload
    })
    toast.success(`Successfully Revoked accesss`)
    window.location.reload()
  }catch(error){
   useGlobalErrorHandler(error)
  }
};



  useEffect( ()=>{
    const fetchAllRecord = async () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const allRecords = await useRequest({
        method: 'GET',
        url: 'medical-record/all-doctor'
      });
      console.log(allRecords);
      // Do something with the data
      setRecords(allRecords.data)
      return allRecords.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }

  fetchAllRecord()
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex flex-col items-center p-6">
      <Card className="w-full max-w-5xl p-6">
        <CardContent>
          <h2 className="text-2xl font-bold text-center text-gray-800">Manage Access</h2>
          
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Doctor Name</th>
             
                  <th className="border border-gray-300 px-4 py-2">Role</th>
                  <th className="border border-gray-300 px-4 py-2">**</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((record, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{record.doctor.name}</td>
                     
    
                      <td className="border border-gray-300 px-4 py-2">{record.role}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button type="button" className="text-red-100"  onClick={()=>revokeAccess(record.doctor && record.doctor.id)} >Revoke Access</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center border border-gray-300 px-4 py-2">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAccess;
