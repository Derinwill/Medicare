import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/Card";
import {CardContent} from "../ui/CardContent"
import { Button } from "../ui/Button";
import { FaUserMd, FaPills, FaCalendarAlt, FaNotesMedical } from "react-icons/fa";
import { getMe } from "../../composables/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [patientName] = useState("John Doe");

  useEffect(()=>{
    dispatch(getMe())
  }, [])
  const patient = useSelector((state: RootState) => state.auth.profileInfo);
  const dispatch = useDispatch();
  const [appointments] = useState([
    { date: "March 20, 2025", doctor: "Dr. Smith", status: "Confirmed" },
    { date: "April 5, 2025", doctor: "Dr. Williams", status: "Pending" },
  ]);
  const [medications] = useState([
    { name: "Ibuprofen", dosage: "200mg", time: "Morning & Night" },
    { name: "Metformin", dosage: "500mg", time: "After Meals" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-purple-400 flex flex-col items-center p-6 w-full">
      {/* Header */}
      <header className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Welcome, {patient && patient?.patient ? patient?.patient.name : 'N/A'}!</h1>
        <Button onClick={() => navigate("/profile")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Profile</Button>
      </header>
      
      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-6">
        {/* Upcoming Appointments */}
        <Card className="bg-white p-4 rounded-lg shadow-md">
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-700 flex items-center"><FaCalendarAlt className="mr-2" /> Upcoming Appointments</h2>
            <ul className="mt-2">
              {appointments.map((appt, index) => (
                <li key={index} className="mt-2 text-gray-600">
                  📅 {appt.date} - {appt.doctor} (<span className="text-blue-500">{appt.status}</span>)
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Medication Reminders */}
        <Card className="bg-white p-4 rounded-lg shadow-md">
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-700 flex items-center"><FaPills className="mr-2" /> Medication Reminders</h2>
            <ul className="mt-2">
              {medications.map((med, index) => (
                <li key={index} className="mt-2 text-gray-600">💊 {med.name} - {med.dosage} ({med.time})</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Medical Records & More */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-6">
        {/* Medical History */}
        <Card className="bg-white p-4 rounded-lg shadow-md">
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-700 flex items-center"><FaNotesMedical className="mr-2" /> Medical Records</h2>
            <p className="mt-2 text-gray-600">View your past diagnoses, prescriptions, and lab test results.</p>
            <Button onClick={() => navigate("/precords")} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">View Records</Button>
          </CardContent>
        </Card>

        {/* Book Appointment */}
        <Card className="bg-white p-4 rounded-lg shadow-md">
          <CardContent>
            <h2 className="text-lg font-semibold text-gray-700 flex items-center"><FaUserMd className="mr-2" /> Book an Appointment</h2>
            <p className="mt-2 text-gray-600">Schedule a visit with a doctor based on your needs.</p>
            {/* <Button onClick={() => navigate("/book-appointment")} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">Book Now</Button> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
