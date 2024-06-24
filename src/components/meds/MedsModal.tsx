import React, { useState } from "react";
import ModalComponent from "../smallParts/ModalComponent";
import Prescription from "./Prescription";
import { Button } from "react-bootstrap";

const MedsModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>Show Modal</Button>
      <ModalComponent
        heading="Prescription"
        show={show}
        handleClose={handleClose}
        children={<Prescription />}
      />
    </>
  );
};

export default MedsModal;
