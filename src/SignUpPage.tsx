import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "./store/auth";
import { RegisterPayload, registerUser } from "./composables/auth";
import { GenderEnum, UserRole } from "./typings/general";

const SignupPage = () => {
  const navigate = useNavigate();
  type InputsType = {
    firstName: string
    lastName: string
    gender: GenderEnum
    email: string
    password: string
    confirmPassword: string
    hospitalName: string;
    dob:string
    address: string
    phone: string
    specialty: string
  }
  const { register, handleSubmit, watch, formState: { errors } } = useForm<InputsType>();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const dispatch = useAppDispatch();
  const onSubmit = async(data: InputsType) => {
    
    console.log('log', data)
    const formattedPayload: RegisterPayload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      dob: data.dob,
      address: data.address,
      gender: data.gender,
      // phoneNumber: data.phone,
      hospitalName: data.hospitalName,
      speciality: data.specialty,
      userType: role.toLowerCase() === 'patient' ? UserRole.PATIENT : UserRole.DOCTOR,
    }
    const result = await dispatch(registerUser(formattedPayload));
    console.log(result);
    if (registerUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
   
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-300 to-purple-400">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        
        {step === 1 && (
          <form onSubmit={handleSubmit(() => setStep(2))} className="mt-4">
            <label className="block text-gray-700">First Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold" {...register("firstName", { required: "First Name is required" })} />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            
            <label className="block text-gray-700 mt-2">Last Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold" {...register("lastName", { required: "Last Name is required" })} />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}


            <label className="block text-gray-700 mt-2">Gender</label>
            <select className="w-full p-2 border rounded mt-1 border-gray-300 text-black"  {...register("gender", { required: "Gender is required" })}>
              <option class="text-black" value="">Select Gender</option>
              <option class="text-black" value={GenderEnum.MALE}>Male</option>
              <option class="text-black" value={GenderEnum.FEMALE}>Female</option>
             
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
            
            
            <label className="block text-gray-700 mt-2">Email</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            
            <label className="block text-gray-700 mt-2">Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold" {...register("password", { required: "Password is required" })} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            
            <label className="block text-gray-700 mt-2">Confirm Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold" {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: value => value === watch("password") || "Passwords do not match"
            })} />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            
            <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Next</button>
          </form>
        )}
        
        {step === 2 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-center">Choose Your Role</h3>
            <div className="flex justify-around mt-4">
              <button onClick={() => { setRole("Patient"); setStep(3); }} className={`p-3 border rounded-lg ${role === "Patient" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>Patient</button>
              <button onClick={() => { setRole("Doctor"); setStep(3); }} className={`p-3 border rounded-lg ${role === "Doctor" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>Doctor</button>
            </div>
          </div>
        )}
        
        {step === 3 && role === "Patient" && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <label className="block text-gray-700">Date of Birth</label>
            <input type="date" className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold" {...register("dob", { required: "Date of Birth is required" })} />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
            
            <label className="block text-gray-700 mt-2">Address</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold" {...register("address", { required: "Address is required" })} />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            
            <label className="block text-gray-700 mt-2">Phone</label>
            <input type="tel" className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold" {...register("phone", { required: "Phone number is required" })} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            
            <button type="submit" className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Sign Up</button>
          </form>
        )}
        
        {step === 3 && role === "Doctor" && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <label className="block text-gray-700">Specialty</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold" {...register("specialty", { required: "Specialty is required" })} />
            {errors.specialty && <p className="text-red-500 text-sm">{errors.specialty.message}</p>}


            <label className="block text-gray-700">Hospital Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1 text-black font-bold" {...register("hospitalName", { required: "Hospital Name is required" })} />
            {errors.hospitalName && <p className="text-red-500 text-sm">{errors.hospitalName.message}</p>}
            
            <button type="submit" className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
