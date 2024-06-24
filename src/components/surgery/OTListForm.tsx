import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormData, useCreateOT, useJoiSchema } from "../../hooks/useOT";
import TextInput from "../smallParts/TextInput";
import SelectInput from "../smallParts/SelectInput";
import { useState } from "react";

interface OTListFormProps {
  show: boolean;
  handleClose: () => {
    setShow: false;
  };

  reg?: {
    _id: string;
    name: string;
  };
}

const OTListForm = ({ show, handleClose, reg }: OTListFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(useJoiSchema),
  });

  const createOTEntry = useCreateOT();

  const onSubmit = (data: FormData) => {
    data = { ...data, reg: reg?._id };
    createOTEntry.mutate(data);
    console.log(data);
    reset();
    handleClose();
  };

  const handleCloseAndReset = () => {
    reset();
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleCloseAndReset}>
        <Modal.Header closeButton>{reg?.name}</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label={"Date"}
              register={register}
              name={"surgDate"}
              errors={errors}
              inputType={"date"}
              controlId={"formsurgDate"}
            />

            <TextInput
              label={"Disease"}
              register={register}
              name={"disease"}
              errors={errors}
              inputType={"text"}
              controlId={"formDisease"}
            />

            <TextInput
              label={"Surgery"}
              register={register}
              name={"surgery"}
              errors={errors}
              inputType={"text"}
              controlId={"surgery"}
            />

            <TextInput
              label={"Surgeon"}
              register={register}
              name={"surgeon"}
              errors={errors}
              inputType={"text"}
              controlId={"surgeon"}
            />

            <div className="row">
              <div className="col-sm-3">
                <TextInput
                  label={"Anaesthesia"}
                  register={register}
                  name={"anaesthesia"}
                  errors={errors}
                  inputType={"text"}
                  controlId={"anaesthesia"}
                />
              </div>
              <div className="col-sm-3">
                <SelectInput
                  controlId={"surgType"}
                  label={"Surgery Type"}
                  register={register}
                  errors={errors}
                  name={"surgType"}
                  options={["elective", "emergency"]}
                />
              </div>
              <div className="col-sm-3">
                <SelectInput
                  controlId={"ptType"}
                  label={"Patient Type"}
                  register={register}
                  errors={errors}
                  name={"ptType"}
                  options={["regular", "IBP", "emergency"]}
                />
              </div>
              <div className="col-sm-3">
                <TextInput
                  controlId={"otNumber"}
                  label={"OT Number"}
                  register={register}
                  name={"otNumber"}
                  errors={errors}
                  inputType={"text"}
                />
              </div>
            </div>
            <TextInput
              controlId={"comments"}
              label={"Comments"}
              register={register}
              name={"comments"}
              errors={errors}
              inputType={"text"}
            />

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

export default OTListForm;
