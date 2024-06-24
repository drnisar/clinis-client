import { useQuery } from "@tanstack/react-query";
import SelectInput from "../smallParts/SelectInput";
import { useForm } from "react-hook-form";
import { apiClient } from "../api-client/apiClient";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { cp } from "fs";

const CPTSearch = () => {
  //useForm for getting values from the inputs
  const {
    register,
    formState: { errors },
  } = useForm();
  // get values from the api
  const cptQuery = useQuery({
    queryKey: ["cpt"],
    queryFn: async () => {
      const response = await apiClient.get("cpt");
      return response.data;
    },
  });
  const options = cptQuery?.data?.map((item) => ({
    label: item.Descriptions,
    value: item.CPT,
  }));

  return (
    <div>
      <CreatableSelect options={options} />
    </div>
  );
};

export default CPTSearch;
