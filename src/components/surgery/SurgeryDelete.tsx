import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDeleteOT } from "../../hooks/useOT";

const SurgeryDelete = () => {
  const { _id, date } = useLocation().state;
  const surgDate = date.trim().slice(0, 10);
  const navigate = useNavigate();
  console.log(_id, surgDate);
  const { mutate } = useDeleteOT();
  const onDelete = async () => {
    await mutate(_id);
    navigate(`/surgery/${surgDate}`);
  };
  return (
    <div>
      <h3>Are you sure to delete the selected record in OT list?</h3>

      <Button variant="link" onClick={onDelete}>
        Delete
      </Button>

      <Link to={`/surgery/${surgDate}`}>Cancel</Link>
    </div>
  );
};

export default SurgeryDelete;
