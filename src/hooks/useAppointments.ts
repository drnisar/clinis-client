import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Appointment {
  _id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  disease: string;
  operation: string;
  comorbids: string;
  socialConnect: string;
  specialNotes: string;
}

const useAppointments = () => {
  const fetchAppointments = async () => {
    const data = await axios
      .get<Appointment[]>("http://localhost:3000/api/appt")
      .then((res) => res.data);
    return data;
  };

  return useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });
};

export default useAppointments;
