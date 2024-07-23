import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useEditRegistration,
  usePostRegistration,
  Registration,
} from "../../hooks/useRegistration";
import { refineMRN } from "../../functions/mrn";

const RegistrationForm = () => {
  const location = useLocation();
  const { isEditing, reg } = location.state as any;
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<Registration>({
    defaultValues: isEditing
      ? {
          _id: reg._id,
          name: reg.name,
          age: reg.age,
          gender: reg.gender,
          email: reg.email,
          phone: reg.phone,
          MRN: reg.MRN,
        }
      : undefined,
  });

  const { mutate: postMutate } = usePostRegistration();
  const { mutate: editMutate } = useEditRegistration();

  const onSubmit = (data: Registration) => {
    if (isEditing) {
      editMutate(data);
      navigate(`/registration/${reg._id}`);
      console.log("edit data", data);
      return;
    } else {
      postMutate(data);
      navigate(`/registration`);
    }
  };
  return (
    <div style={{ maxWidth: "568px" }} className="mx-auto">
      <h3 className="mx-auto">
        {isEditing ? "Edit Registration" : "Add Registration"}
      </h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label htmlFor="name" className="small text-muted">
            Name
          </Form.Label>
          <Form.Control size="sm" type="text" {...register("name")} id="name" />
          {/* {errors.name && <p>{errors.name.message}</p>} */}
        </Form.Group>
        <div className="row">
          <div className="col">
            <Form.Group>
              <Form.Label htmlFor="age" className="small text-muted">
                Age
              </Form.Label>
              <Form.Control
                id="age"
                size="sm"
                type="number"
                {...register("age", { valueAsNumber: true })}
              />
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group>
              <Form.Label htmlFor="gender" className="small text-muted">
                Gender
              </Form.Label>
              <Form.Control
                id="gender"
                size="sm"
                as="select"
                {...register("gender")}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other"> Other</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group>
              <Form.Label htmlFor="MRN" className="small text-muted">
                MRN
              </Form.Label>
              <Form.Control
                id="MRN"
                size="sm"
                type="text"
                {...register("MRN")}
                onBlur={(e) => {
                  setValue("MRN", refineMRN(e.target.value) || e.target.value);
                }}
              />
            </Form.Group>
          </div>
        </div>

        <Form.Group>
          <Form.Label htmlFor="email" className="small text-muted">
            Email
          </Form.Label>
          <Form.Control
            id="email"
            size="sm"
            type="email"
            {...register("email")}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="phone" className="small text-muted">
            Phone
          </Form.Label>
          <Form.Control
            id="phone"
            size="sm"
            type="tel"
            {...register("phone")}
          />
        </Form.Group>

        <div className="mt-3">
          <Button variant="link" type="submit">
            {isEditing ? "Update" : "Save"}
          </Button>

          <Link
            to={isEditing ? `/registration/${reg._id}` : `/registration`}
            className="btn btn-link"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationForm;
