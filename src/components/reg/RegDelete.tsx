import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../api-client/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const RegDelete = () => {
  const { _id } = useLocation().state as any;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (_id: string) => apiClient.delete(`reg/${_id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reg"] });
      navigate(`/registration`);
    },
    onError: (error: any) => {
      alert(error);
    },
  });
  const onDelete = async (_id: string) => {
    await deleteMutation.mutate(_id);
  };

  return (
    <div>
      <h3>Are you sure to delete the selected record?</h3>

      <Button variant="link" onClick={() => onDelete(_id)}>
        Delete
      </Button>

      <Link to={`/registration/${_id}`}>Cancel</Link>
    </div>
  );
};

export default RegDelete;
