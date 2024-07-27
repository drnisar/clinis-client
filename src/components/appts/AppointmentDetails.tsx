import { Link, useOutletContext, useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AppointmentDetails = () => {
  const appointmentData = useOutletContext() as Array<{
    _id: string;
    reg: {
      name: string;
      age: number;
      gender: string;
      email: string;
      phone: string;
      MRN: string;
    };
    apptDate: string;
    disease: string;
    apptPlan: string;
    comorbids: string;
    socialConnect: string;
    apptNotes: string;
  }>; // Update type assertion
  //   const detail = JSON.stringify(appointmentData);
  const { id } = useParams<{ _id?: string; id?: string }>(); // Update type assertion

  const appointment = appointmentData?.find((appt) => appt._id === id);

  if (!appointment) return <div>Appointment not found</div>;
  const {
    reg,
    apptDate,
    disease,
    apptPlan,
    comorbids,
    socialConnect,
    apptNotes,
  } = appointment;

  return (
    <div>
      <dl>
        {reg && (
          <div className="bg-light">
            <dt>Name:</dt>
            <dd>{reg.name}</dd>
            <div className="row">
              <div className="col">
                <dt>Age:</dt>
                <dd>{reg.age}</dd>
              </div>
              <div className="col">
                <dt>Gender</dt>
                <dd>{reg.gender}</dd>
              </div>
              <div className="col">
                <dt>MRN</dt>
                <dd>{reg.MRN}</dd>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <dt>Email</dt>
                <dd>{reg.email}</dd>
              </div>
              <div className="col">
                <dt>Phone</dt>
                <dd>{reg.phone}</dd>
              </div>
              <div className="col">
                <dt>Appointment Date</dt>
                <dd>{new Date(apptDate).toLocaleDateString()}</dd>
              </div>
            </div>
          </div>
        )}
        <dt>Disease</dt>
        <dd>{disease}</dd>
        <dt>Co-morbids</dt>
        <dd>{comorbids}</dd>
        <dt>Appointment Plan</dt>
        <dd>{apptPlan}</dd>
        <dt>Social Connect</dt>
        <dd>{socialConnect}</dd>
        <dt>Appointment Notes</dt>
        <dd>{apptNotes}</dd>
      </dl>
      <Link to={`edit`} state={{ isEditing: true, appointment: appointment }}>
        <FaEdit />
      </Link>
      <Link to={`delete`} className="link link-danger mx-3">
        <FaTrashAlt />
      </Link>
    </div>
  );
};

export default AppointmentDetails;
