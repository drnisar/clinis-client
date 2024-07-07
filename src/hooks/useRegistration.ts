import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../components/api-client/apiClient";

export const useGetAllRegistrations = () => {
  return useQuery({
    queryKey: ["reg"],
    queryFn: async () => {
      const response = await apiClient.get("reg");

      if (response.status !== 200) {
        throw new Error("Error fetching Appointment List");
      }

      return response.data;
    },
  });
};
