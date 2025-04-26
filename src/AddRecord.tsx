import React, { useEffect, useState } from "react";
import { useRequest } from "./composables/http";
import { useGlobalErrorHandler } from "./composables/error";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const AddRecord = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [patients, setPatients] = useState<Array<{
    doctor: {
      id: string;
      userId: string;
      name: string;
      speciality: string;
    };
    patient: {
      name: string;
      id: string;
    };
  }>>([]);

  const navigate = useNavigate();

  const grantedPatients = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Emily White" },
  ];



  

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const allAccessiblePatient = await useRequest({
          method: 'GET',
          url: 'medical-record/patients'
        });
        console.log(allAccessiblePatient);
        setPatients(allAccessiblePatient.data) // Do something with the data
        return allAccessiblePatient.data;
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleSubmit = async(e) => {
    console.log('log', selectedPatient)
    e.preventDefault();
    if (!selectedPatient || !condition || !notes) {
      alert("All fields are required");
      return;
    }
    const payload = {
      patientId: selectedPatient,
      condition,
      note: notes
    }
    try{
    await useRequest({
      method: 'POST',
      url: 'medical-record',
      data:payload
    })
    toast.success('Successfully created medical record for patient')
    navigate('/records')
  }catch(error){
    useGlobalErrorHandler(error)
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex flex-col items-center p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Medical Record</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div>
            <label className="block text-gray-700">Select Patient</label>
            <select
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              required
            >
              <option value="">-- Select a Patient --</option>
              {patients.map((patient) => (
                <option key={patient.patient.id} value={patient.patient.id}>
                  {patient.patient.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Condition</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Notes</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            ></textarea>
          </div>
       
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Record
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecord;
