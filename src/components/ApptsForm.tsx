import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { Appointment } from "../hooks/useAppointments";
import "../styles/myStyles.css";

const FormDataSchema = z.object({
  name: z.string().min(3, "Name must be 3 characters long"),
  age: z.number({ message: "Enter a number" }).optional(),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender must be selected",
  }),
  email: z.string().optional(),
  phone: z.string(),
  date: z
    .date()
    .refine(
      (date) => date.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0),
      {
        message: "Date must be today or in the future",
      }
    ),
  time: z.string().optional(),
  operation: z.string(),
  disease: z.string(),
  comorbids: z.string(),
  specialNotes: z.string(),
  socialConnect: z.string(),
});

type FormData = z.infer<typeof FormDataSchema>;

const ApptsForm = () => {
  const [show, setShow] = useState(true);
  const [showAlertData, setShowAlertData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({ resolver: zodResolver(FormDataSchema) });

  useEffect(() => {
    if (selectedDate) {
      let localDate = new Date(selectedDate);
      let timezoneOffset = localDate.getTimezoneOffset() * 60000; // get offset in milliseconds
      let localISOTime = new Date(localDate.getTime() - timezoneOffset)
        .toISOString()
        .slice(0, 10);
      setValue("date", localISOTime);
    }
  }, [selectedDate, setValue]);

  const onChangeDate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let date = new Date(e.target.value).toISOString().slice(0, 10);

    await axios
      .get<Appointment>(`http://localhost:3000/api/appointments/date/${date}`)
      .then((res) => {
        console.log(date);
        setShowAlertData(res.data);
      })
      .catch((errors) => {
        console.error(errors.response.data.message);
      });
  };

  const onSubmit = async (data: FormData) => {
    await axios
      .post<Appointment>("http://localhost:3000/api/appointments", data)
      .then((res) => {
        const latestEntry = res.data;
        navigate("/calendar");
        console.log(latestEntry);
      })
      .catch((errors) => {
        console.error(errors.response.data.message);
      });
  };

  console.log(showAlertData);

  return (
    <>
      <Modal show={show} onHide={() => navigate("/calendar")}>
        <Modal.Header closeButton>
          <Modal.Title>Form Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="p-3 my-form"
            style={{ maxWidth: "30rem" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group controlId="formBasicDate">
              <Form.Label className="small">Date *</Form.Label>
              <Form.Control
                size="sm"
                type="date"
                {...register("date", { valueAsDate: true })}
                onChange={onChangeDate}
              />
              {errors.date && (
                <p className="text-danger">{errors.date.message}</p>
              )}
            </Form.Group>
            {showAlertData.length > 0 && (
              <Alert variant="warning" className="small">
                {" "}
                {showAlertData.map((data) => (
                  <p key={data._id}>
                    {data.name} - {data.operation} - {data.date}
                  </p>
                ))}{" "}
              </Alert>
            )}

            <Form.Group controlId="formBasicName">
              <Form.Label className="small">Name *</Form.Label>
              <Form.Control size="sm" type="text" {...register("name")} />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicAge">
              <Form.Label className="small">Age *</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                {...register("age", { valueAsNumber: true })}
              />
              {errors.age && (
                <p className="text-danger">{errors.age.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicGender">
              <Form.Label className="small">Gender *</Form.Label>
              <Form.Control size="sm" as={"select"} {...register("gender")}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
              {errors.gender && (
                <p className="text-danger">{errors.gender.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="small">Email</Form.Label>
              <Form.Control size="sm" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label className="small">Phone *</Form.Label>
              <Form.Control size="sm" type="tel" {...register("phone")} />
            </Form.Group>

            <Form.Group controlId="formBasicTime">
              <Form.Label className="small">Time</Form.Label>
              <Form.Control size="sm" type="time" {...register("time")} />
            </Form.Group>

            <Form.Group controlId="formBasicOperation">
              <Form.Label className="small">Operation *</Form.Label>
              <Form.Control size="sm" type="text" {...register("operation")} />
            </Form.Group>

            <Form.Group controlId="formBasicDisease">
              <Form.Label className="small">Disease</Form.Label>
              <Form.Control size="sm" type="text" {...register("disease")} />
            </Form.Group>

            <Form.Group controlId="formBasicComorbids">
              <Form.Label className="small">Comorbids</Form.Label>
              <Form.Control size="sm" type="text" {...register("comorbids")} />
            </Form.Group>

            <Form.Group controlId="formBasicSpecialNotes">
              <Form.Label className="small">Special Notes</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                {...register("specialNotes")}
              />
            </Form.Group>

            <Form.Group controlId="formBasicSocialConnect">
              <Form.Label className="small">Social Connect</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                {...register("socialConnect")}
              />
            </Form.Group>

            <Button size="sm" variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => navigate("/calendar")}
              className="mt-3 ms-2"
            >
              Cancel
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Alert variant="warning" className="small">
            Fields marked with * are required
          </Alert>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApptsForm;
