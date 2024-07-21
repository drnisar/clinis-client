import { Link, useLocation, useParams } from "react-router-dom";
import { OT, useGetAllOT } from "../../hooks/useOT";

type OTData = OT[];

const SurgeryListCreate = () => {
  const { data } = useGetAllOT();
  const getAllOTData = data as OTData;
  const params = useParams();
  const { pathname } = useLocation();

  const selectedDate = params.date;
  const filteredData = getAllOTData?.filter(
    (ot) =>
      new Date(ot.surgDate).toISOString().split("T")[0] === selectedDate ||
      new Date().toISOString().split("T")[0] === selectedDate
  );

  return (
    <div className="p-5">
      <div className="col">
        <h4>Surgery Schedule for {selectedDate}</h4>
      </div>
      <div className="col">
        <Link to={pathname + "/form"} className="mx-2">
          + ADD PATIENT TO LIST
        </Link>
        <Link to={`/surgery`} className="mx-2">
          BACK
        </Link>
      </div>

      <div>
        <table className="table table-bordered table-sm table-responsive">
          <thead>
            <th>S. No</th>
            <th>MRN</th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Disease</th>
            <th>Surgery</th>
            <th>OT Number</th>
            <th>Comments</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {filteredData?.map((record, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{record.reg?.MRN}</td>
                <td>{record.reg?.name}</td>
                <td>{record.reg?.age}</td>
                <td>{record.disease}</td>
                <td>{record.surgery}</td>
                <td>{record.otNumber}</td>
                <td>{record.comments}</td>
                <td>
                  <button className="btn btn-link">edit</button>
                  <Link
                    to={`/surgery/${record._id}/delete`}
                    state={{ _id: record._id, date: record.surgDate }}
                  >
                    delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurgeryListCreate;
