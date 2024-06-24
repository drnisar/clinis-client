import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Props {
  heading: string;
  show: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}
const ModalComponent = ({ heading, show, handleClose, children }: Props) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
