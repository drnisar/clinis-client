import React, { useEffect, useState } from "react";
import { Button, Form, ListGroup, ListGroupItem } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { useGetMeds, useTranslate } from "../../hooks/useMeds";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

const Prescription = () => {
  const [medList, setMedList] = useState<any[]>([]);
  const [medObj, setMedObj] = useState({ details: [] });

  const { handleSubmit, setFocus, control, reset } = useForm();

  useEffect(() => {
    setFocus("medName");
    console.log(medList);
  }, [medList]);
  const onSubmit = (data: any) => {
    data = {
      ...data,
      medName: data.medName.label,
      dose: data.dose.label,
      amount: data.amount.label,
      frequency: data.frequency.value,
      route: data.route.value,
      duration: data.duration.label,
      interval: data.interval.value,
    };
    // console.log(data);
    setMedList([...medList, data]);
    reset({
      medName: "",
      dose: "",
      frequency: "",
      route: "",
      duration: "",
      interval: "",
      notes: "",
    });
    setFocus("medName");
  };

  const tr = useTranslate();

  const meds = useGetMeds();
  //   console.log(medObj);

  const options = (meds.data as any[])?.map((med: any) => ({
    value: med._id,
    label: med.name,
  }));

  //   console.log(options);

  return (
    <div>
      <div className="bordered p-2 m-2">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (
              event.key === "Enter" &&
              (event.target as HTMLElement).nodeName !== "BUTTON"
            ) {
              event.preventDefault();
            }
          }}
        >
          <div className="row">
            <div className="col-md">
              <Form.Group className="mb-3" controlId="medName">
                <Form.Label>Medicine</Form.Label>
                <Controller
                  name="medName"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Select
                      {...field}
                      inputId="medName"
                      options={options}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        const selectedMed =
                          (meds.data as any[])?.find(
                            (med: any) => med._id === selectedOption.value
                          ) || {};
                        setMedObj(selectedMed);
                        setFocus("dose");
                      }}
                    />
                  )}
                />
              </Form.Group>
            </div>
            <div className="col-md">
              <Form.Group className="mb-3" controlId="dose">
                <Form.Label>Dose</Form.Label>
                <Controller
                  name="dose"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Select
                      inputId="dose"
                      options={medObj?.details?.map((detail: string) => ({
                        value: detail,
                        label: detail,
                      }))}
                      {...field}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setFocus("amount");
                      }}
                    />
                  )}
                />
              </Form.Group>
            </div>
          </div>
          <div className="row">
            <div className="col-md">
              <Form.Group className="mb-3" controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <CreatableSelect
                      inputId="amount"
                      options={[
                        { value: null, label: "Select Amount" },
                        { value: 1, label: 1 },
                        { value: 2, label: 2 },
                        { value: 3, label: 3 },
                        { value: 4, label: 4 },
                        { value: 5, label: 5 },
                        { value: 6, label: 6 },
                      ]}
                      {...field}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setFocus("frequency");
                      }}
                      onCreateOption={(inputValue) => {
                        field.onChange({
                          value: inputValue,
                          label: inputValue,
                        });
                      }}
                    />
                  )}
                />
              </Form.Group>
            </div>
            <div className="col-md">
              <Form.Group className="mb-3" controlId="frequency">
                <Form.Label>Frequency</Form.Label>
                <Controller
                  name="frequency"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Select
                      inputId="frequency"
                      options={[
                        { value: "OD", label: "OD" },
                        { value: "BD", label: "BD" },
                        { value: "TDS", label: "TDS" },
                        { value: "QID", label: "QID" },
                        { value: "HS", label: "HS" },
                        { value: "PRN", label: "PRN" },
                      ]}
                      {...field}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setFocus("route");
                      }}
                    />
                  )}
                />
              </Form.Group>
            </div>
            <div className="col-md">
              <Form.Group className="mb-3" controlId="route">
                <Form.Label>Route</Form.Label>
                <Controller
                  name="route"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Select
                      inputId="route"
                      options={[
                        { value: "PO", label: "PO" },
                        { value: "IM", label: "IM" },
                        { value: "IV", label: "IV" },
                        { value: "SC", label: "SC" },
                        { value: "PR", label: "PR" },
                        { value: "ID", label: "ID" },
                        { value: "OD", label: "OD" },
                      ]}
                      {...field}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setFocus("duration");
                      }}
                    />
                  )}
                />
              </Form.Group>
            </div>
            <div className="col-md">
              <Form.Group className="mb-3" controlId="duration">
                <Form.Label>Duration</Form.Label>
                <Controller
                  name="duration"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Select
                      inputId="duration"
                      options={[
                        { value: null, label: "Select Amount" },
                        { value: 1, label: 1 },
                        { value: 2, label: 2 },
                        { value: 3, label: 3 },
                        { value: 4, label: 4 },
                        { value: 5, label: 5 },
                        { value: 6, label: 6 },
                        { value: 7, label: "Continue" },
                      ]}
                      {...field}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setFocus("interval");
                      }}
                    />
                  )}
                />
              </Form.Group>
            </div>
            <div className="col-md">
              <Form.Group className="mb-3" controlId="interval">
                <Form.Label>Interval</Form.Label>
                <Controller
                  name="interval"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Select
                      inputId="interval"
                      options={[
                        { value: null, label: "Select Amount" },
                        { value: "days", label: "days" },
                        { value: "weeks", label: "weeks" },
                        { value: "months", label: "months" },
                        { value: "dose", label: "dose" },
                      ]}
                      {...field}
                      onChange={(selectedOption) => {
                        field.onChange(selectedOption);
                        setFocus("submitBtn");
                      }}
                    />
                  )}
                />
              </Form.Group>
            </div>
            <div className="col-md">
              <Form.Group className="mb-3" controlId="submitBtn">
                <Form.Label>Add Medicine</Form.Label>
                <br />
                <Button
                  id="submitBtn"
                  name="submitBtn"
                  type="submit"
                  variant="outline-success"
                >
                  Add to List
                </Button>
              </Form.Group>
            </div>
          </div>
        </Form>
      </div>
      <div>
        {/* {JSON.stringify(medList)} */}
        <ListGroup>
          {medList.map((med: any, index: number) => (
            <ListGroupItem key={index}>
              <h6>
                {index + 1}. {med.medName} {med.dose}
              </h6>
              <p dir="rtl">
                {med.amount}{" "}
                {tr(
                  med.dose?.split(" ")[0] === "syrup"
                    ? "TSF"
                    : med.dose?.split(" ")[0]
                )}{" "}
                ---
                {tr(med.route)}--- {tr(med.frequency)}--- {med.duration}{" "}
                {tr(med.interval)}
              </p>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default Prescription;
