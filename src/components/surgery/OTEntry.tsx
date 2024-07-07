import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormData, useCreateOT, useJoiSchema } from "../../hooks/useOT";
import TextInput from "../smallParts/TextInput";
import { joiResolver } from "@hookform/resolvers/joi";
import SelectInput from "../smallParts/SelectInput";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const OTEntry = () => {
  const navigate = useNavigate();
  const { _id } = useLocation().state as any;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: joiResolver(useJoiSchema),
  });

  const createOTEntry = useCreateOT();

  const onSubmit = (data: FormData) => {
    data = { ...data, reg: _id };
    createOTEntry.mutate(data);
    navigate(`/registration/${_id}`);
  };

  return (
    <div style={{ maxWidth: "568px" }} className="mx-auto">
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
          <div className="col-lg-3">
            <TextInput
              label={"Anaesthesia"}
              register={register}
              name={"anaesthesia"}
              errors={errors}
              inputType={"text"}
              controlId={"anaesthesia"}
            />
          </div>
          <div className="col-lg-3">
            <SelectInput
              controlId={"surgType"}
              label={"Surgery Type"}
              register={register}
              errors={errors}
              name={"surgType"}
              options={["elective", "emergency"]}
            />
          </div>
          <div className="col-lg-3">
            <SelectInput
              controlId={"ptType"}
              label={"Patient Type"}
              register={register}
              errors={errors}
              name={"ptType"}
              options={["regular", "IBP", "emergency"]}
            />
          </div>
          <div className="col-lg-3">
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
    </div>
  );
};

export default OTEntry;
