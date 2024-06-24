import React from "react";
import ModalComponent from "../smallParts/ModalComponent";
import SurgNotesReport from "./SurgNotesReport";
import { SurgeryNotesFormData } from "../../hooks/useOT";

interface SurgNotesReportModalProps {
  show: boolean;
  handleClose: () => void;
  surgNotesData?: SurgeryNotesFormData;
}

const SurgNotesReportModal = ({
  show,
  handleClose,
  surgNotesData,
}: SurgNotesReportModalProps) => {
  return (
    <ModalComponent
      heading={"Procedure Notes"}
      show={show}
      handleClose={handleClose}
    >
      <SurgNotesReport surgNotesData={surgNotesData} />
    </ModalComponent>
  );
};

export default SurgNotesReportModal;