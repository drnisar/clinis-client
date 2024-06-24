import React from "react";
import { Card } from "react-bootstrap";

interface Props {
  reg: {
    name: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    MRN: string;
  };

  appt: {
    apptDate: string;
    duration: number;
    disease: string;
    apptPlan: string;
    comorbids: string;
    socialConnect: string;
    apptNotes: string;
  };
}

const ApptsCard = ({
  reg: { name, age, gender, email, phone, MRN },
  appt: {
    apptDate,
    duration,
    disease,
    apptPlan,
    comorbids,
    socialConnect,
    apptNotes,
  },
}: Props) => {
  return (
    <Card className="my-1">
      <Card.Header>
        <div style={{ display: "flex", justifyContent: "space-between " }}>
          <div>{apptPlan}</div>
          <div>{new Date(apptDate).toLocaleString()}</div>
        </div>
      </Card.Header>
      <Card.Body>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "15rem",
          }}
        >
          <dt>Name</dt> <dd>{name}</dd>
        </div>
        <dt>Age</dt> <dd>{age}</dd>
        <dt> Gender</dt>
        <dd>{gender}</dd>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card>
  );
};

export default ApptsCard;
