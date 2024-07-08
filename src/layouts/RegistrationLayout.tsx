import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "react-router-dom";
import { apiClient } from "../components/api-client/apiClient";
import Registration from "../components/reg/Registration";

export interface Reg {
  _id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  MRN: string;
}
const RegistrationLayout = () => {
  const { data: registrations } = useQuery<Reg[]>({
    queryKey: ["reg"],
    queryFn: async () => {
      const response = await apiClient.get<Reg[]>("reg");
      return response.data;
    },
  });

  return (
    <>
      <div className="container">
        <div className="row p-2 bg-light">
          <h1>Registration</h1>
          <div className="w-200">
            <Link to="/addregistration" state={{ isEditing: false }}>
              Add New Record
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <Registration registrations={registrations ?? []} />
          </div>
          <div className="col-8">
            <Outlet context={registrations ?? []} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationLayout;
