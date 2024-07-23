import { Link, useOutletContext, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const RegistrationDetails = () => {
  const { id } = useParams<{ id: string }>();

  const data: any[] = useOutletContext();

  const reg = data?.find((reg: any) => reg._id === id);
  const { _id, name, age, gender, email, phone, MRN, regDate } = reg || {};

  if (!_id) return <div>Registration not found</div>;

  const dateTimeLocal = new Date(regDate).toLocaleString();
  return (
    <div style={{ maxWidth: "568px" }} className="mx-auto">
      <h3>Registration Details</h3>
      <dl>
        <dt>Name:</dt>
        <dd>{name}</dd>
        <div className="row">
          <div className="col">
            <dt>Age:</dt>
            <dd>{age}</dd>
          </div>
          <div className="col">
            <dt>Gender</dt>
            <dd>{gender}</dd>
          </div>
          <div className="col">
            <dt>MRN</dt>
            <dd>{MRN}</dd>
          </div>
        </div>

        <dt>Email</dt>
        <dd>{email}</dd>
        <dt>Phone</dt>
        <dd>{phone}</dd>

        <dt>Registration Date</dt>
        <dd>{dateTimeLocal}</dd>
      </dl>
      <Link
        to={`/registration/${_id}/edit`}
        state={{ isEditing: true, reg: reg }}
      >
        <FaEdit />
      </Link>
      <Link
        to={`/registration/${_id}/delete`}
        state={{ _id: _id }}
        className="mx-2 text-danger"
      >
        <FaTrashAlt />
      </Link>
    </div>
  );
};

export default RegistrationDetails;
