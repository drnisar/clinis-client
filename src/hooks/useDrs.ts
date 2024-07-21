import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../components/api-client/apiClient";

export type AddDrProps = {
  name: string;
  email: string;
  designation: string;
  department: string;
  phone: string;
};

export const useAddDr = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddDrProps) => apiClient.post("drs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drs"] });
    },
    onError: (context: any) => {
      queryClient.setQueryData(["drs"], context.previousDrs);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["drs"] });
    },
  });
};

export const useGetAllDrs = () => {
  return useQuery({
    queryKey: [["drs"]],
    queryFn: async () => {
      const response = await apiClient.get("drs");
      if (response.status !== 200) {
        throw new Error("Error fetching Dr List");
      }
      return response.data;
    },
  });
};

export const useGetDrsForSelect = () => {
  return useQuery({
    queryKey: ["drsForSelect"],
    queryFn: async () => {
      const response = await apiClient.get("drs");

      if (response.status !== 200) {
        throw new Error("Error fetching registrations");
      }

      const drs = response.data;

      const drsForSelect: { value: string; label: string }[] = (
        drs as { _id: string; name: string; designation: string }[]
      )?.map((dr) => {
        return {
          value: dr.name,
          label: dr.name + " - " + dr.designation.toUpperCase(),
        };
      });

      return drsForSelect;
    },
  });
};

export const useGetAllOT = () => {
  return useQuery({
    queryKey: ["ot"],
    queryFn: async () => {
      const response = await apiClient.get("ot");

      if (response.status !== 200) {
        throw new Error("Error fetching OT List");
      }

      return response.data;
    },
  });
};

export const useDrsResolver = joiResolver(
  Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().optional().label("Email"),
    designation: Joi.string().required().label("Designation"),
    department: Joi.string().optional().label("Department"),
    phone: Joi.string().optional().label("Phone"),
  })
);
