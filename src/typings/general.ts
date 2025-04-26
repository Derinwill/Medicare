export enum GenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
  }

  export enum UserRole {
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR',
    ADMIN = 'ADMIN',
  }
  

  export enum UserType{
    PATIENT = 'PATIENT',
    DOCTOR = 'DOCTOR',
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    NURSE = 'NURSE',
    LABORATORY_TECHNICIAN = 'LABORATORY_TECHNICIAN',
  }

  export interface Patient {
    id:      string;
    userId:  string;
    name:    string;
    dob:     string;
    address: null;
    phone:   null;
}

export interface Doctor {
  id:      string;
  userId:  string;
  hospital_name: null;
  name: string;
  speciality:   null;
}

  export type ProfileInfo = {
    id:        string;
    email:     string;
    password:  string;
    
    role:      string;
    createdAt: Date;
    gender:    string;
    patient:   Patient;
    doctor:    Doctor;
  }


  export type SearchRecordType = {
    name: string;
    uniqId: string;
    user: {
      email: string;
      role: string;
      createdAt: string;
      gender: string;
    }

    address: string;
    records: {
      id:string;
      condition: string;
      note: string;
      createdAt: string;
    }[]
  }