import { Link, Outlet } from "react-router-dom";
import { useGetAllAppointments } from "../../hooks/useAppointments";

const SurgeryLayout = () => {
  const { data, error } = useGetAllAppointments();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="container">
        <div className="row">
          <h3>Surgery List</h3>
          <Link
            to="/surgery/new"
            state={{
              isEditing: false,
            }}
          >
            {" "}
            + Create OT List
          </Link>
          <div className="row">
            <label htmlFor="otDate">Select Date</label>
            <select name="" id="otDate"></select>
          </div>
          <div>
            <Outlet context={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurgeryLayout;
