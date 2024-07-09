import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export type Appointment = {
  reg: {
    _id: string;
    name: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    MRN: string;
    regDate: string;
  };
  _id: string;
  apptDate: string;
  apptTimeEnd: string;
  duration: number;
  disease: string;
  comorbids: string;
  apptPlan: string;
  apptNotes: string;
  socialConnect: string;
};

interface Props {
  appointments: Appointment[];
}

const Appointments = ({ appointments }: Props) => {
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
        {appointments ? (
          appointments.map((appt) =>
            appt.reg ? (
              <NavLink
                to={`/appointments/${appt._id}`}
                key={appt._id}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "list-group-item-warning"
                    : isActive
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item"
                }
              >
                <strong>
                  {dayNames[new Date(appt.apptDate).getDay()]}
                  {", "}
                  {new Date(appt.apptDate).toLocaleDateString()}
                </strong>
                <p>
                  {appt.reg.name} <strong>{appt.reg.MRN}</strong>
                </p>
              </NavLink>
            ) : undefined
          )
        ) : (
          <p>No appointments available</p>
        )}
      </ListGroup>
    </div>
  );
};

export default Appointments;

// if no reg then p. no reg found against the appointment
