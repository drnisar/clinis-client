import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAppointments from "../hooks/useAppointments";

const ApptsReport = () => {
  const { data, error } = useAppointments();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Appointments</h1>

      <Link to={"/form"}>Add New Appointment</Link>

      <ListGroup>
        {data?.map((appt) => (
          <ListGroup.Item key={appt._id}>{appt.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ApptsReport;
