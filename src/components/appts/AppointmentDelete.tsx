import { useParams, useNavigate } from "react-router-dom";
import { FaUndo, FaTrashAlt } from "react-icons/fa";
const AppointmentDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const onDelete = () => {
    alert("deleting " + id);
  };
  return (
    <div>
      <h4>Are you sure to delete the appointment?</h4>
      <button onClick={() => navigate(-1)} className="btn btn-link">
        <FaUndo />
      </button>
      <button onClick={onDelete} className="btn btn-link">
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default AppointmentDelete;
