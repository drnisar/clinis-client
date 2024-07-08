import { useQuery } from "@tanstack/react-query";
import CreatableSelect from "react-select/creatable";
import { apiClient } from "../api-client/apiClient";

const CPTSearch = () => {
  // get values from the api
  const cptQuery = useQuery({
    queryKey: ["cpt"],
    queryFn: async () => {
      const response = await apiClient.get("cpt");
      return response.data;
    },
  });
  const options = (cptQuery?.data as Array<any>)?.map((item) => ({
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
