import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import { useEnterNewMed } from "../../hooks/useMeds";

type MedFormData = {
  _id: string;
  name: string;
  brand: string;
  generic: number;
  details: string[];
};

const MedRegister = () => {
  const [list, setList] = useState([]);

  const submitData = useEnterNewMed();

  const onSubmit = (data: FieldValues) => {
    data.details = list;
    const { drugForm, strength, dose, ...rest } = data;

    rest.name = rest.brand + " " + (rest.generic && "( " + rest.generic + " )");
    console.log(rest);
    submitData.mutate(rest as MedFormData); // Explicitly type 'rest' as 'MedFormData'
    reset();
    setList([]);
  };

  const { register, handleSubmit, watch, reset, setValue, setFocus } =
    useForm();

  const watchDetails =
    watch("drugForm") +
    " " +
    watch("strength") +
    " " +
    watch("dose") +
    (watch("drugForm") === "syrup" ? "/5ml" : "");

  return (
    <>
      <Form className="m-3 col-lg-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <Form.Group className="mb-3" controlId="formBrand">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control size="sm" type="text" {...register("brand")} />
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group className="mb-3" controlId="formGeneric">
              <Form.Label>Generic Name</Form.Label>
              <Form.Control size="sm" type="text" {...register("generic")} />
            </Form.Group>
          </div>
        </div>
        <h2>Details</h2>
        <div>
          <ul>
            {list.map((item, index) => (
              <li
                key={index}
                className="d-flex justify-content-between align-items-center col-sm-8 p-2 "
              >
                {item}{" "}
                <Button
                  size="sm"
                  variant="link"
                  className="text-danger p-0"
                  onClick={() =>
                    setList(list.filter((listItem) => listItem !== item))
                  }
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="row">
          <div className="col">
            <Form.Group className="mb-3" controlId="formForm">
              <Form.Control size="sm" as="select" {...register("drugForm")}>
                <option value="">Drug Form</option>
                <option value="tablet">Tablet</option>
                <option value="capsule">Capsule</option>
                <option value="syrup">Syrup</option>
                <option value="injection">Injection</option>
                <option value="drop">Drop</option>
                <option value="cream">Cream</option>
                <option value="gel">Gel</option>
                <option value="ointment">Ointment</option>
                <option value="lotion">Lotion</option>
                <option value="solution">Solution</option>
                <option value="suppository">Suppository</option>
                <option value="inhaler">Inhaler</option>
                <option value="spray">Spray</option>
                <option value="patch">Patch</option>
                <option value="husk">Husk</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group className="mb-3" controlId="formStrength">
              <Form.Control
                size="sm"
                type="number"
                {...register("strength")}
                placeholder="Strength"
              />
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group className="mb-3" controlId="formUnit">
              <Form.Control size="sm" as="select" {...register("dose")}>
                <option value="">Select Unit</option>
                <option value="mg">mg</option>
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="unit">unit</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group className="mb-3" controlId="formFrequency">
              <Button
                size="sm"
                variant="outline-secondary"
                onClick={() => {
                  setList([watchDetails, ...list]);
                  setValue("drugForm", "");
                  setValue("strength", "");
                  setValue("dose", "");
                  setFocus("drugForm");
                }}
                disabled={!watch("drugForm")}
              >
                Add Detail
              </Button>
            </Form.Group>
          </div>
        </div>

        <Button size="sm" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default MedRegister;
