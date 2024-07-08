import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../components/api-client/apiClient";
import { FormData } from "../components/appts/AppointmentForm";

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

// export const useGetAllAppointments = () => {
//   const fetchAppointments = async () => {
//     const data = await axios
//       .get<Appointment[]>("http://localhost:3000/api/appt")
//       .then((res) => res.data);
//     return data;
//   };

//   return useQuery({
//     queryKey: ["appointments"],
//     queryFn: fetchAppointments,
//   });
// };

export const useGetAllAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await apiClient.get("appt");

      if (response.status !== 200) {
        throw new Error("Error fetching Appointment List");
      }

      return response.data;
    },
  });
};

export const useEditAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const { _id, ...rest } = data;
      const response = await apiClient.put(`appt/${_id}`, rest);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiClient.post("appt", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
  return mutation;
};

// export default useAppointments;
