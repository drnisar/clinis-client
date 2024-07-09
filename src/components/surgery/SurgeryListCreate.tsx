import { OT, useGetAllOT } from "../../hooks/useOT";
import { useParams } from "react-router-dom";

type OTData = OT[];
const SurgeryListCreate = () => {
  const { data, error } = useGetAllOT();
  const getAllOTData = data as OTData;
  const params = useParams();
  console.log("params", params);

  const selectedDate = params.date;
  const filteredData = getAllOTData?.filter(
    (ot) =>
      new Date(ot.surgDate).toISOString().split("T")[0] === selectedDate ||
      new Date().toISOString().split("T")[0] === selectedDate
  );

  console.log(getAllOTData, error, selectedDate, filteredData);
  return (
    <div className="p-2">
      <h4>Surgery Schedule for {selectedDate}</h4>
      <div>
        <ul>
          {filteredData?.map((ot) => (
            <li key={ot._id}>
              {ot.surgDate} {ot.surgeon} {ot.otNumber} {ot.surgery}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SurgeryListCreate;
