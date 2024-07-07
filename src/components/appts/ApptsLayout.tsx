import { Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import Appointments, { Appointment } from "../Appointments";
import { useGetAllAppointments } from "../../hooks/useAppointments";

const ApptsLayout = () => {
  const { data, error } = useGetAllAppointments();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="container">
        <div className="row">
          <h3>Appointments</h3>
          <Link
            to="/appointments/new"
            state={{
              isEditing: false,
              appointment: {
                reg: "",
                _id: "",
                apptDate: "",
                disease: "",
                apptPlan: "",
                comorbids: "",
                socialConnect: "",
                apptNotes: "",
              },
            }}
          >
            {" "}
            + Add Appointment
          </Link>
          <div className="col-4">
            <Appointments appointments={data as Appointment[]} />
          </div>
          <div className="col-8">
            <Outlet context={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApptsLayout;
