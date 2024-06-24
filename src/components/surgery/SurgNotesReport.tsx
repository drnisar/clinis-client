import { SurgeryNotesFormData } from "../../hooks/useOT";

interface Props {
  surgNotesData: SurgeryNotesFormData;
}

const SurgNotesReport = ({ surgNotesData }: Props) => {
  console.log("SurgNotesReport");

  //   const { state: OTNotes } = useLocation();

  const {
    procedureName,
    surgeon,
    surgeryDate,
    surgeryTimeStart,
    surgeryTimeEnd,
    assistants,
    incision,
    findings,
    procedureDetails,
    closure,
    drains,
    instructions,
    reg,
  } = surgNotesData;
  return (
    <div>
      <div className="container border p-2 shadow">
        <div className="row ">
          <div className="col-md-4">
            <p>
              <strong>Patient Name: </strong>
              <span>{reg.name}</span>
            </p>
          </div>
          <div className="col-md-2">
            <p>
              <strong>Gender: </strong>
              <span>{reg.gender}</span>
            </p>
          </div>
          <div className="col-md-2">
            <p>
              <strong>Age: </strong>
              <span>{reg.age}</span>
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>MRN: </strong>
              <span>{reg.MRN}</span>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <p>
              <strong>Surgery Date: </strong>
              <span>{new Date(surgeryDate).toLocaleDateString()}</span>
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Time Start: </strong>
              <span>{surgeryTimeStart}</span>
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Time End: </strong>
              <span>{surgeryTimeEnd}</span>
            </p>
          </div>
        </div>
        <div className="row">
          <p>
            <strong>Procedure: </strong>
            <span>{procedureName}</span>
          </p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <p>
              <strong>Surgeon: </strong>
              <span>{surgeon}</span>
            </p>
          </div>
          <div className="col-md-8">
            <p>
              <strong>Assistants:</strong> <span>{assistants}</span>
            </p>
          </div>
        </div>
        <div className="row">
          <p>
            <strong>Incision: </strong>
            <span>{incision}</span>
          </p>
        </div>
        <div className="row">
          <p>
            <strong>Findings: </strong>
            <span>{findings}</span>
          </p>
        </div>
        <div className="row">
          <p>
            <strong>Procedure Details: </strong>
            <span>{procedureDetails}</span>
          </p>
        </div>
        <div className="row">
          <p>
            <strong>Drains: </strong>
            <span>{drains}</span>
          </p>
        </div>
        <div className="row">
          <p>
            <strong>Closure: </strong>
            <span>{closure}</span>
          </p>
        </div>
        <div className="row">
          <p>
            <strong>Postoperative Instructions: </strong>
            <span>{instructions}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SurgNotesReport;
