import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../components/api-client/apiClient";

export type Registration = {
  _id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  MRN: string;
};

export const useGetAllRegistrations = () => {
  return useQuery({
    queryKey: ["reg"],
    queryFn: async () => {
      const response = await apiClient.get("reg");

      if (response.status !== 200) {
        throw new Error("Error fetching Registrations List");
      }

      return response.data;
    },
  });
};

export const useGetRegistrationsForSelect = () => {
  return useQuery({
    queryKey: ["regForSelect"],
    queryFn: async () => {
      const response = await apiClient.get("reg");

      if (response.status !== 200) {
        throw new Error("Error fetching registrations");
      }

      const registrations = response.data;

      const regForSelect = (
        registrations as { _id: string; name: string; MRN: string }[]
      )?.map((reg) => {
        return { value: reg._id, label: reg.name + " - " + reg.MRN };
      });

      return regForSelect;
    },
  });
};
