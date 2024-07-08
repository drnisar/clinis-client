import { Card } from "react-bootstrap";

interface Props {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  MRN: string;
  apptDate: string;
  disease: string;
  apptPlan: string;
  comorbids: string;
  socialConnect: string;
  apptNotes: string;
}

const ApptsCard = ({ name, age, gender, apptDate, apptPlan }: Props) => {
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
