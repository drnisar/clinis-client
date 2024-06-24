import { joiResolver } from "@hookform/resolvers/joi";
import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useJoiSchema, useEditOT } from "../../hooks/useOT";

type FormData = {
  _id: string;
  surgDate: string;
  disease: string;
  surgery: string;
  surgeon: string;
  anaesthesia: string;
  surgType: string;
  ptType: string;
  otNumber: string;
  comments: string;
};

interface OTListEditFormProps {
  show: boolean;
  handleClose: () => {
    setShow: false;
  };

  otEntryData: {
    _id: string;
    reg?: {
      _id: string;
      name: string;
    };
    surgDate: string;
    disease: string;
    surgery: string;
    surgeon: string;
    anaesthesia: string;
    surgType: string;
    ptType: string;
    otNumber: string;
    comments: string;
  };
}

const OTListEditForm = ({
  show,
  handleClose,
  otEntryData,
}: OTListEditFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(useJoiSchema),
  });

  React.useEffect(() => {
    if (otEntryData) {
      reset({
        surgDate: new Date(otEntryData.surgDate).toISOString().slice(0, 10),
        disease: otEntryData.disease,
        surgery: otEntryData.surgery,
        surgeon: otEntryData.surgeon,
        anaesthesia: otEntryData.anaesthesia,
        surgType: otEntryData.surgType,
        ptType: otEntryData.ptType,
        otNumber: otEntryData.otNumber,
        comments: otEntryData.comments,
      });
    }
  }, [otEntryData, reset]);

  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  const handleCloseAndReset = () => {
    reset();
    handleClose();
  };

  const editOTEntry = useEditOT(otEntryData?._id);

  const onSubmit = async (data: FormData) => {
    const surgDate = new Date(data.surgDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set the time to 00:00:00

    if (surgDate < today) {
      alert("Cannot edit records with a surgery date in the past.");
      return;
    }
    data = { ...data, reg: otEntryData?.reg?._id };
    console.log(data);

    try {
      await editOTEntry.mutateAsync(data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert("Error: " + error.response.status.toString());
      } else {
        alert("Error: " + error.message);
      }
    }
    handleCloseAndReset();
  };

  return (
    <Modal show={show} onHide={handleCloseAndReset}>
      <Modal.Header closeButton>{otEntryData?.reg?.name}</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formSurgDate">
            <Form.Label className="small text-muted">Date</Form.Label>
            <Form.Control size="sm" type="date" {...register("surgDate")} />
            <Form.Text className="text-danger">
              {errors && errors.surgDate?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formDisease">
            <Form.Label className="small text-muted">Disease</Form.Label>
            <Form.Control size="sm" type="text" {...register("disease")} />
            <Form.Text className="text-danger">
              {errors && errors.disease?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="surgery">
            <Form.Label className="small text-muted">Surgery</Form.Label>
            <Form.Control size="sm" type="text" {...register("surgery")} />
            <Form.Text className="text-danger">
              {errors.surgery?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="surgeon">
            <Form.Label className="small text-muted">Surgeon</Form.Label>
            <Form.Control size="sm" type="text" {...register("surgeon")} />
            <Form.Text className="text-danger">
              {errors.surgeon?.message}
            </Form.Text>
          </Form.Group>
          <div className="row">
            <div className="col-sm-3">
              <Form.Group controlId="anaesthesia">
                <Form.Label className="small text-muted">
                  Anaesthesia
                </Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  {...register("anaesthesia")}
                />
                <Form.Text className="text-danger">
                  {errors.anaesthesia?.message}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="col-sm-3">
              <Form.Group controlId="surgType">
                <Form.Label className="small text-muted">
                  Surgery Type
                </Form.Label>
                <Form.Control size="sm" as="select" {...register("surgType")}>
                  <option value="elective">Elective</option>
                  <option value="emergency">Emergency</option>
                </Form.Control>
                <Form.Text className="text-danger">
                  {errors.surgType?.message}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="col-sm-3">
              <Form.Group controlId="ptType">
                <Form.Label className="small text-muted">
                  Patient Type
                </Form.Label>
                <Form.Control size="sm" as="select" {...register("ptType")}>
                  <option value="regular">Regular</option>
                  <option value="ibp">IBP</option>
                </Form.Control>
                <Form.Text className="text-danger">
                  {errors.ptType?.message}
                </Form.Text>
              </Form.Group>
            </div>
            <div className="col-sm-3">
              <Form.Group controlId="otNumber">
                <Form.Label className="small text-muted">OT Number</Form.Label>
                <Form.Control size="sm" type="text" {...register("otNumber")} />

                <Form.Text className="text-danger">
                  {errors.otNumber?.message}
                </Form.Text>
              </Form.Group>
            </div>
          </div>

          <Form.Group controlId="comments">
            <Form.Label className="small text-muted">Comments</Form.Label>
            <Form.Control type="text" {...register("comments")} />
            <Form.Text className="text-danger">
              {errors.comments?.message}
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Edit
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default OTListEditForm;
function parse(surgDate: Date, arg1: string, arg2: Date) {
  throw new Error("Function not implemented.");
}
