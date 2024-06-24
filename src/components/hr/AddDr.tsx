import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AddDrProps, useDrsResolver, useAddDr } from "../../hooks/useDrs";
import { useNavigate } from "react-router-dom";

const AddDr = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate: AddDr } = useAddDr();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddDrProps>({
    resolver: useDrsResolver,
  });

  const navigate = useNavigate();
  const onSubmit = (data: AddDrProps) => {
    AddDr(data, {
      onSuccess: () => {
        alert("Doctor Added Successfully");
        navigate(-1);
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });
  };

  const onReset = () => {
    reset();
  };

  const onCancel = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>Add Doctor</h1>
      <form className="m-3 p-3 bordered" onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <div className="mb-2">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            {...register("name")}
          />
          <p className="text-danger">{errors && errors.name?.message}</p>
        </div>
        <div className="mb-2">
          <label htmlFor="designation" className="form-label">
            Designation
          </label>
          <select
            className="form-select"
            id="designation"
            {...register("designation")}
          >
            <option value="">Select One</option>
            <option value="professor">Professor</option>
            <option value="associate professor">Associate Professor</option>
            <option value="assistant professor">Assistant Professor</option>
            <option value="senior resident">Senior Resident</option>
            <option value="house officer">House officer</option>
          </select>
          <p className="text-danger">{errors && errors.designation?.message}</p>
        </div>
        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
        <button
          type="button"
          className="ms-3 btn btn-outline-secondary"
          onClick={onReset}
        >
          Reset
        </button>
        <button
          className="ms-3 btn btn-outline-success"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddDr;
