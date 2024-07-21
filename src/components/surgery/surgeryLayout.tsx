import { Outlet, useNavigate } from "react-router-dom";
import { useGetAllAppointments } from "../../hooks/useAppointments";

const SurgeryLayout = () => {
  const { data, error } = useGetAllAppointments();
  const navigate = useNavigate();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="container">
        <div className="row">
          <h3>Surgery List</h3>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="" className="form-label">
                Select Date for creating/ editing OT List
              </label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => {
                  navigate(`/surgery/${e.target.value}`);
                }}
              />
            </div>
          </div>
          <div className="col"></div>

          <div>
            <Outlet context={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurgeryLayout;
