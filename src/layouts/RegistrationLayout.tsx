import React, { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import Registration from "../components/reg/Registration";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../components/api-client/apiClient";
import { Button } from "react-bootstrap";

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
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: registrations,
    isLoading,
    isError,
    error,
  } = useQuery<Reg[]>({
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
          <div className="col-3">
            <Registration registrations={registrations} />
          </div>
          <div className="col-9">
            <Outlet context={registrations} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationLayout;
