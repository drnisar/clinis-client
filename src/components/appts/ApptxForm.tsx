import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateAppointment } from "./queries";

const schema = z.object({
  reg: z.string(),
  apptDate: z.string(),
  duration: z.number(),
  disease: z.string().nonempty({ message: "Disease is required" }),
  apptPlan: z.string().nonempty({ message: "Appointment Plan is required" }),
  comorbids: z.string().nonempty({ message: "Comorbids is required" }),
  socialConnect: z.string().nonempty({ message: "Social Connect is required" }),
  apptNotes: z.string().nonempty({ message: "Special Notes is required" }),
});

type FormData = z.infer<typeof schema>;

interface Appt {
  show: boolean;
  handleClose: () => void;
  reg?: {
    _id: string;
    name: string;
  };
}

const Apptx = ({ show, handleClose, reg }: Appt) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const mutationPost = useCreateAppointment();

  const onSubmit = (data: FormData) => {
    const date = new Date(data.apptDate);
    const endTime =
      new Date(data.apptDate).getTime() + data.duration * 60 * 1000;
    const apptTimeEnd = new Date(endTime);

    data = { ...data, apptTimeEnd: apptTimeEnd, apptDate: date };
    console.log(data);
    mutationPost.mutate(data);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>{reg?.name}</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="datetime-local" {...register("apptDate")} />
              <Form.Text className="text-danger">
                {errors.apptDate?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter duration"
                {...register("duration", { valueAsNumber: true })}
              />
              <Form.Text className="text-danger">
                {errors.duration?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formDisease">
              <Form.Label>Disease</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter disease"
                {...register("disease")}
              />
              <Form.Text className="text-danger">
                {errors.disease?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formOperation">
              <Form.Label>Plan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Plan"
                {...register("apptPlan")}
              />
              <Form.Text className="text-danger">
                {errors.apptPlan?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formComorbids">
              <Form.Label>Comorbids</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter comorbids"
                {...register("comorbids")}
              />
              <Form.Text className="text-danger">
                {errors.comorbids?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formSocialConnect">
              <Form.Label>Social Connect</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter social connect"
                {...register("socialConnect")}
              />
              <Form.Text className="text-danger">
                {errors.socialConnect?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formSpecialNotes">
              <Form.Label>Special Notes</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter special notes"
                {...register("apptNotes")}
              />
              <Form.Text className="text-danger">
                {errors.apptNotes?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formReg">
              <Form.Control
                type="hidden"
                defaultValue={reg?._id}
                {...register("reg")}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default Apptx;
