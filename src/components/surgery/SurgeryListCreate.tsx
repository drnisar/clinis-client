import { useState } from "react";
import { OT, useGetAllOT } from "../../hooks/useOT";

type OTData = OT[];
const SurgeryListCreate = () => {
  const { data, error } = useGetAllOT();
  const getAllOTData = data as OTData;

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const filteredData = getAllOTData?.filter(
    (ot) =>
      new Date(ot.surgDate).toISOString().split("T")[0] === selectedDate ||
      new Date().toISOString().split("T")[0] === selectedDate
  );

  console.log(getAllOTData, error, selectedDate, filteredData);
  return (
    <div className="p-2">
      <div className="mb-3 col-md-4 mx-auto">
        <label htmlFor="surgeryDate" className="form-label">
          Surgery Date
        </label>
        <input
          type="date"
          className="form-control"
          id="surgeryDate"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
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
