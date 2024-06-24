import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../components/api-client/apiClient";
import { useEffect, useState } from "react";
import Joi from "joi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { joiResolver } from "@hookform/resolvers/joi";
import { useContext } from "react";

export type OT = {
  _id: string;
  reg: {
    _id: string;
    name: string;
  };
  surgDate: string;
  otNumber: number;
  surgType: string;
  disease: string;
  surgery: string;
  anaesthesia: string;
  surgeon: string;
  ptType: string;
  comments: string;
};

export type FormData = {
  reg: string;
  surgDate: Date;
  otNumber?: number;
  surgType: string;
  disease: string;
  surgery: string;
  anaesthesia: string;
  surgeon: string;
  ptType: string;
  comments?: string;
};

export type SurgeryNotesFormData = {
  procedureName: string;
  surgeon: string;
  surgeryType: string;
  surgeryDate: Date;
  surgeryTimeStart: string;
  surgeryTimeEnd: string;
  assistants: string;
  anesthetist: string;
  anestheticType: string;
  findings: string;
  incision: string;
  procedureDetails: string;
  closure: string;
  drains: string;
  instructions: string;
  reg: {
    name: string;
    age: number;
    gender: string;
    MRN: string;
    _id: string;
  };
};

type uniqueDates = string[];

export const useCreateOT = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => apiClient.post("ot", data),
    onSuccess: () => {
      queryClient.invalidateQueries("ot");
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

export const useEditOT = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => apiClient.put(`ot/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries("ot");
    },
  });
};

export const useDeleteOT = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`ot/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries("ot");
    },
  });
};

export const useUniqueDates = (data: OT[] | undefined) => {
  const [dates, setDates] = useState<uniqueDates>([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      const uniqueDates = Array.from(
        new Set(data.map((item) => item.surgDate))
      );
      setDates(uniqueDates);
    }
  }, [data]);
  return dates;
};

export const useCreateOTNotes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SurgeryNotesFormData) =>
      apiClient.post("surgnotes", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["surgnotes"]); // Update the argument to an array of strings
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetAllSurgeryNotes = () => {
  return useQuery({
    queryKey: ["surgnotes"],
    queryFn: async () => {
      const response = await apiClient.get("surgnotes");

      if (response.status !== 200) {
        throw new Error("Error fetching Surgery Notes");
      }

      return response.data;
    },
  });
};

export const useGetSingleOTNotes = (id: string) => {
  return useQuery({
    queryKey: ["surgnotes", id],
    queryFn: async () => {
      const response = await apiClient.get(`surgnotes/${id}`);

      if (response.status !== 200) {
        throw new Error("Error fetching Surgery Notes");
      }

      return response.data;
    },
  });
};

export const useJoiSchema = Joi.object({
  surgDate: Joi.date()
    .min(new Date().setHours(0, 0, 0, 0))
    .required()
    .messages({
      "date.min": '"Record of surgery in the past cannot be changed',
      "any.required": '"Surgery Date" is a required field',
    }),
  otNumber: Joi.number().optional().min(1).max(20).messages({
    "number.min": "OT Number must be between 1 and 20",
    "number.max": "OT Number must be between 1 and 20",
  }),
  surgType: Joi.string().required(),
  disease: Joi.string().min(3).required(),
  surgery: Joi.string().required(),
  anaesthesia: Joi.string().required(),
  surgeon: Joi.string().required(),
  ptType: Joi.string().required(),
  comments: Joi.string().optional(),
});

export const useSurgeryNotesResolver = joiResolver(
  Joi.object({
    procedureName: Joi.string().required().label("Procedure Name"),
    surgeon: Joi.string().required().label("Surgeon"),
    surgeryType: Joi.string().required().label("Surgery Type"),
    surgeryDate: Joi.date().required().label("Surgery Date"),
    surgeryTimeStart: Joi.string().required().label("Surgery Time Start"),
    surgeryTimeEnd: Joi.string().required().label("Surgery Time End"),
    assistants: Joi.string().required().label("Assistants"),
    anesthetist: Joi.string().required().label("Anesthetist"),
    anestheticType: Joi.string().required().label("Anesthetic Type"),
    findings: Joi.string().required().label("Findings"),
    incision: Joi.string().required().label("Incision"),
    procedureDetails: Joi.string().required().label("Procedure Details"),
    closure: Joi.string().required().label("Closure"),
    drains: Joi.string().required().label("Drains"),
    instructions: Joi.string().required().label("Instructions"),
  })
);
