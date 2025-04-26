import { useSelector } from "react-redux";
import { Card, CardContent } from "./components/ui/Record/Card";
import { useEffect, useState } from "react";
import { useRequest } from "./composables/http";

const PatientRecord = () => {
const [records, setRecords] = useState<Array<{
  condition: string;
  createdAt: string;
  note: string;
  doctor: {
    id: string;
    name: string
  }
}>>([])


  useEffect( ()=>{
    const fetchAllRecord = async () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const allRecords = await useRequest({
        method: 'GET',
        url: 'medical-record'
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
          <h2 className="text-2xl font-bold text-center text-gray-800">Patient Records</h2>
          
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Doctor Name</th>
             
                  <th className="border border-gray-300 px-4 py-2">Condition</th>
                  <th className="border border-gray-300 px-4 py-2">Date Created</th>
                  <th className="border border-gray-300 px-4 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((record, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">{record.doctor.name}</td>
                     
                      <td className="border border-gray-300 px-4 py-2">{record.condition}</td>
                      <td className="border border-gray-300 px-4 py-2">{record.createdAt}</td>
                      <td className="border border-gray-300 px-4 py-2">{record.note}</td>
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

export default PatientRecord;
