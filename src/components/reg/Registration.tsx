import { Link, NavLink, useLoaderData } from "react-router-dom";
import { Reg } from "../../layouts/RegistrationLayout";

interface Props {
  registrations: Reg[];
}
const Registration = ({ registrations }: Props) => {
  return (
    <div className="overflow-auto vh-100">
      <ul className="list-group">
        {registrations?.map((reg: any) => {
          return (
            <div key={reg._id}>
              <NavLink
                to={`${reg._id}`}
                key={reg._id}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "list-group-item-warning"
                    : isActive
                    ? "list-group-item list-group-item-action active"
                    : "list-group-item"
                }
                onClick={() => console.log(reg._id)}
              >
                <small>{reg.MRN}</small> <br />
                {reg.name}
              </NavLink>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Registration;
