import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Modal } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { apiClient } from "../api-client/apiClient";
import { useEffect, useState } from "react";
import { refineMRN } from "../../functions/mrn";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  age: z.number().int().positive({ message: "Age is required" }),
  gender: z
    .string()
    .refine((value) => ["male", "female", "other"].includes(value), {
      message: "Invalid gender",
    }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().min(10, { message: "Invalid phone number" }),
  MRN: z.string().nonempty({ message: "MRN is required" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  handleClose: () => void;
  show: boolean;
  reg?: {
    _id: string;
    name: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    MRN: string;
  };
  isEditing: boolean;
}

const RegModalForm = ({ show, handleClose, reg, isEditing }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: isEditing
      ? {
          name: reg?.name,
          age: reg?.age,
          gender: reg?.gender,
          phone: reg?.phone,
          email: reg?.email,
          MRN: reg?.MRN,
        }
      : undefined,
  });

  useEffect(() => {
    reset({
      name: reg?.name,
      age: reg?.age,
      gender: reg?.gender,
      phone: reg?.phone,
      email: reg?.email,
      MRN: reg?.MRN,
    });
  }, [reg, reset]);

  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: (data: FormData) => apiClient.post("reg", data),
    onSuccess: () => {
      queryClient.invalidateQueries("reg");
    },
    onError: (error: any) => {
      alert(error);
    },
    onSettled(data, error) {
      if (data) {
        alert("Patient added successfully");
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
    data.MRN = refineMRN(data.MRN);

    if (isEditing) {
      editMutation.mutate(data);
      handleClose();
      reset();
      return;
    } else {
      postMutation.mutate(data);
      handleClose();
      reset();
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Patient Details" : "Add New Patient"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label htmlFor="name" className="small text-muted">
                Name
              </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                {...register("name")}
                id="name"
              />
              {errors.name && <p>{errors.name.message}</p>}
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
              <Button size="sm" variant="primary" type="submit">
                {isEditing ? "Edit" : "Add Patient"}
              </Button>
              <Button
                size="sm"
                className="mx-2"
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default RegModalForm;
