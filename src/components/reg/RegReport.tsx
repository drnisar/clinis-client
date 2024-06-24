import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client/apiClient";
import {
  Accordion,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
  Modal,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import RegModalForm from "./RegModalForm";
import ApptsForm from "../appts/ApptxForm";
import { set } from "react-hook-form";
import OTListForm from "../surgery/OTListForm";

interface Reg {
  _id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  MRN: string;
}

const RegReport = () => {
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Reg | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showApptsForm, setShowApptsForm] = useState(false);
  const [showOTListForm, setShowOTListForm] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedReg(null);
  };

  const handleShowApptsForm = () => {
    setShowApptsForm(true);
  };

  const handleCloseApptsForm = () => {
    setShowApptsForm(false);
  };

  const handleShowOTListForm = () => {
    setShowOTListForm(true);
    setIsEditing(false);
    setSelectedReg(null);
  };

  const handleCloseOTListForm = () => {
    setShowOTListForm(false);
  };

  const { data, isLoading, isError, error } = useQuery<Reg[]>({
    queryKey: ["reg"],
    queryFn: async () => {
      const response = await apiClient.get<Reg[]>("reg");
      return response.data;
    },
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    data: regData,
    isLoading: regIsLoading,
    isError: regIsError,
  } = useQuery<Reg>({
    queryKey: ["reg", selectedId],
    queryFn: async () => {
      const response = await apiClient.get<Reg>(`reg/${selectedId}`);
      return response.data;
    },
    enabled: !!selectedId,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`reg/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries("reg");
    },
  });

  // Button Functions
  const onDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      mutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <Button variant="success" onClick={handleShowModal} className="ms-4">
        Add New Patient
      </Button>
      <RegModalForm
        key={Date.now()}
        show={showModal}
        handleClose={handleCloseModal}
        reg={selectedReg}
        isEditing={isEditing}
      />
      <ApptsForm
        show={showApptsForm}
        handleClose={handleCloseApptsForm}
        reg={selectedReg}
      />

      <OTListForm
        show={showOTListForm}
        handleClose={handleCloseOTListForm}
        reg={selectedReg}
      />

      <Accordion style={{ maxWidth: "30rem" }} className="m-4">
        {data?.map((reg, index) => (
          <Accordion.Item eventKey={index.toString()} key={reg._id}>
            <Accordion.Header>
              <p className="">{reg.name}</p>
            </Accordion.Header>
            <Accordion.Body>
              {regIsLoading ? (
                "Loading..."
              ) : regIsError ? (
                "Error loading data"
              ) : (
                <div className="container">
                  <div className="row">
                    <dt className="col-sm-2">Age</dt>
                    <dd className="col-sm-10">{reg.age}</dd>
                  </div>
                  <div className="row">
                    <dt className="col-sm-2">Gender</dt>
                    <dd className="col-sm-10">{reg.gender}</dd>
                  </div>
                  <div className="row">
                    <dt className="col-sm-2">Phone</dt>
                    <dd className="col-sm-10">{reg.phone}</dd>
                  </div>
                  <div className="row">
                    <dt className="col-sm-2">Email</dt>
                    <dd className="col-sm-10">{reg.email}</dd>
                  </div>
                  <div className="row">
                    <dt className="col-sm-2">MRN</dt>
                    <dd className="col-sm-10">{reg.MRN}</dd>
                  </div>

                  <div>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="mt-3 mx-1"
                      onClick={() => onDelete(reg._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-warning"
                      className="mt-3 mx-1"
                      onClick={() => {
                        setSelectedReg(reg);
                        setIsEditing(true);
                        handleShowModal();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-success"
                      className="mt-3 mx-1"
                      onClick={() => {
                        setSelectedReg(reg);
                        setShowApptsForm(true);
                      }}
                    >
                      Appointment
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="mt-3 mx-1"
                      onClick={() => {
                        setSelectedReg(reg);
                        setShowOTListForm(true);
                      }}
                    >
                      OT List
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-info"
                      className="mt-3 mx-1"
                    >
                      History and Exam
                    </Button>
                  </div>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default RegReport;
