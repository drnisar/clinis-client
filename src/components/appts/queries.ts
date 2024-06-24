import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client/apiClient";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => apiClient.post("appt", data),
    onSuccess: () => {
      queryClient.invalidateQueries("appt");
    },
  });
};

export const useGetAllAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await apiClient.get("appt");

      if (response.status !== 200) {
        throw new Error("Error fetching appointments");
      }

      return response.data;
    },
  });
};
