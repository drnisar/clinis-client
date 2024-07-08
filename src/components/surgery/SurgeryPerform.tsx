import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Clock from "../smallParts/Clock";

interface SurgeryPerformProps {
  show: boolean;
  handleClose: () => {
    setShow: false;
  };
  surgeryData?: {
    _id: string;
    reg?: {
      _id: string;
      name: string;
      age: number;
      gender: string;
    };
    disease: string;
    surgery: string;
    surgeon: string;
  };
}

const SurgeryPerform: React.FC<SurgeryPerformProps> = ({
  handleClose,
  show,
  surgeryData,
}) => {
  const [startSurgery, setStartSurgery] = useState("");
  const name = surgeryData?.reg?.name;
  const gender = surgeryData?.reg?.gender;
  const age = surgeryData?.reg?.age;
  const disease = surgeryData?.disease;
  const surgery = surgeryData?.surgery;
  const surgeon = surgeryData?.surgeon;

  useEffect(() => {
    console.log("Surgery Data", startSurgery);
  }, [startSurgery]);

  const handleStartSurgery = () => {
    setStartSurgery(new Date().toLocaleTimeString());
  };

  const handleModalClose = () => {
    setStartSurgery("");
    handleClose();
  };

  return (
    <Modal fullscreen show={show} onHide={handleModalClose} className="bg-dark">
      {/* <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <div className="row bg-dark text-white vh-100">
          <div className="col-4">
            <h4>{name}</h4>
            <dl className="row">
              <dt className="col-sm-3">Age</dt>
              <dd className="col-sm-9">{age}</dd>

              <dt className="col-sm-3">Gender</dt>
              <dd className="col-sm-9">{gender}</dd>

              <dt className="col-sm-3">Surgery</dt>
              <dd className="col-sm-9">{surgery}</dd>

              <dt className="col-sm-3">Disease</dt>
              <dd className="col-sm-9">{disease}</dd>

              <dt className="col-sm-3">Surgeon</dt>
              <dd className="col-sm-9">{surgeon}</dd>

              <dt className="col-sm-3">Start</dt>
              <dd className="col-sm-9">{startSurgery}</dd>
            </dl>
            <div>
              <Button
                size="lg"
                variant="outline-danger"
                onClick={handleStartSurgery}
                hidden={startSurgery !== ""}
              >
                Start Surgery
              </Button>
            </div>
          </div>
          <div className="col-8  d-none d-md-block">
            <p className="w-100">
              <Clock />
            </p>
            <h1 className="display-6 align-items-center">
              {startSurgery && "Surgery Start Time " + startSurgery}
            </h1>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default SurgeryPerform;
