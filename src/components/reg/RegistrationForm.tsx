import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  Link,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { apiClient } from "../api-client/apiClient";

interface FormData {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  MRN: string;
}

const RegistrationForm = () => {
  const location = useLocation();
  const { isEditing, reg } = location.state as any;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: isEditing
      ? {
          name: reg.name,
          age: reg.age,
          gender: reg.gender,
          email: reg.email,
          phone: reg.phone,
          MRN: reg.MRN,
        }
      : undefined,
  });

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: (data: FormData) => apiClient.post("reg", data),
    onSuccess: (newReg) => {
      queryClient.invalidateQueries("reg");
      //   navigate(`/registration/${newReg?.data?._id}`);
      //   console.log(newReg.data._id);
    },
    onError: (error: any) => {
      alert(error);
    },
    onSettled(data, error) {
      if (data) {
        navigate(`/registration/${data.data._id}`);
      }
      if (error) {
        alert("Error adding patient");
      }
    },
  });

  const editMutation = useMutation({
    mutationFn: (data: FormData) => apiClient.put(`reg/${reg._id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries("reg");
    },
    onError: (error: any) => {
      alert(error);
    },
  });

  const onSubmit = (data: FormData) => {
    // data.MRN = refineMRN(data.MRN);

    if (isEditing) {
      editMutation.mutate(data);
      navigate(`/registration/${reg._id}`);
      return;
    } else {
      postMutation.mutate(data);
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
