import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../components/api-client/apiClient";
import { table } from "console";

export type MedFormData = {
  _id: string;
  name: string;
  brand: string;
  generic: number;
  details: string[];
};

export const useEnterNewMed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MedFormData) => apiClient.post("med", data),
    onSuccess: () => {
      queryClient.invalidateQueries("med");
    },
  });
};

export const useGetMeds = () => {
  return useQuery({
    queryKey: ["med"],
    queryFn: async () => {
      const response = await apiClient.get("med");

      if (response.status !== 200) {
        throw new Error("Error fetching Med List");
      }

      return response.data;
    },
  });
};

export const useTranslate = () => {
  const engWords: { [key: string]: string } = {
    OD: "روزانہ ایک مرتبہ",
    BD: "صبح شام",
    TDS: "صبح ظهر شام",
    QID: "صبح ظهر شام رات",
    HS: "رات",
    SOS: "حسب ضرورت",
    PRN: "حسب ضرورت",
    days: "روز",
    weeks: "هفته",
    months: "ماه",
    years: "سال",
    continue: "ادامه",
    dose: "مقدار",
    duration: "مدت",
    PO: "خوراک ",
    IM: "عضلانی",
    // IV: "وریدی",
    SC: "زیر پوستی",
    AC: "قبل از غذا",
    PC: "بعد از غذا",
    tablet: "(گولی)قرص",
    capsule: "کپسول",
    syrup: "شربت",
    injection: "انجیکشن",
    cream: "کرم",
    ointment: "مرهم",
    drops: "قطره",
    inhaler: "دم کردنی",
    pessary: "درمانی",
    suppository: "مقعدی",
    powder: "پودر",
    lotion: "لوسیون",
    TSF: "چمچہ بھر",
  };
  const translate = (word: string) => engWords[word] || word;

  return translate;
};
