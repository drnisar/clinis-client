import ModalComponent from "../smallParts/ModalComponent";
import SurgeryNotes from "./SurgeryNotes";

interface Props {
  show: boolean;
  handleClose: () => void;
  OTId: string;
  surgeryNotesData?: any;
}

const SurgeryNotesModal = ({
  show,
  handleClose,
  OTId,
  surgeryNotesData,
}: Props) => {
  return (
    <>
      <ModalComponent
        heading={"Surgery Notes " + OTId.reg?.name}
        show={show}
        handleClose={handleClose}
        children={
          <SurgeryNotes
            OTId={OTId}
            handleClose={handleClose}
            surgNotesData={surgeryNotesData}
          />
        }
      />
    </>
  );
};

export default SurgeryNotesModal;
