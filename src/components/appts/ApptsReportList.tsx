import React from "react";
import { useGetAllAppointments } from "./queries";
import { Accordion, Button, ListGroup } from "react-bootstrap";

interface Appointment {
  reg: {
    name: string;
    age: number;
  };
  appt: {
    apptDate: string;
    apptPlan: string;
  };
}

const ApptsReportList = () => {
  const tab = "\u00A0\u00A0\u00A0\u00A0";
  const { data, isLoading, isError, error } = useGetAllAppointments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  console.log(data);

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <ListGroup>
        {(data as any)?.map(({ _id, apptPlan, reg, apptDate }: any) => (
          <ListGroup.Item key={_id}>
            <strong>
              {" "}
              {dayNames[new Date(apptDate).getDay()]}{" "}
              {new Date(apptDate).toLocaleDateString()}
            </strong>
            <p>
              {reg.name}
              {tab}
              {apptPlan}
            </p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ApptsReportList;
