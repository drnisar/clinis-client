import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
  OT,
  useDeleteOT,
  useGetAllOT,
  useGetAllSurgeryNotes,
  useUniqueDates,
} from "../../hooks/useOT";
import OTListEditForm from "./OTListEditForm";
import SurgeryNotesModal from "./SurgeryNotesModal";
import SurgeryPerform from "./SurgeryPerform";
import { useNavigate } from "react-router-dom";
import SurgNotesReportModal from "./SurgNotesReportModal";

const OTList = () => {
  const navigate = useNavigate();
  const surgNotes = useGetAllSurgeryNotes();

  const [selectedDate, setSelectedDate] = useState("");
  const [showOTListEditForm, setShowOTListEditForm] = useState(false);
  const [selectedOTEntryData, setSelectedOTEntryData] = useState(null);
  const [showSurgeryPerform, setShowSurgeryPerform] = useState(false);
  const [showSurgeryNotes, setShowSurgeryNotes] = useState(false);
  const [showSurgNotesReportModal, setShowSurgNotesReportModal] =
    useState(false);
  const [selectedOTId, setSelectedOTId] = useState("");
  const [surgNotesData, setSurgNotesData] = useState({});
  const [defaultValues, setDefaultValues] = useState({} as OT);
  const [selectedRegForNotes, setSelectedRegForNotes] = useState({
    _id: "",
    name: "",
  });

  const handleCloseOTListEditForm = () => {
    setShowOTListEditForm(false);
    console.log(selectedOTEntryData);
  };

  const handleCloseSurgeryPerform = () => {
    setShowSurgeryPerform(false);
  };

  const handleCloseSurgeryNotes = () => {
    setShowSurgeryNotes(false);
  };

  const handleCloseSurgNotesReportModal = () => {
    setShowSurgNotesReportModal(false);
  };
  // hooks
  const { data } = useGetAllOT();
  const dates = useUniqueDates(data);

  const groupedData = (data as Array<any>)
    ?.filter((item) => item.surgDate === selectedDate)
    .reduce((groups, item) => {
      const group = groups[item.otNumber] || [];
      group.push(item);
      groups[item.otNumber] = group;
      return groups;
    }, {});

  const deleteOT = useDeleteOT();

  const onDelete = (id: string) => {
    const item = data.find((item) => item._id === id);
    const surgDate = new Date(item.surgDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // set the time to 00:00:00

    if (surgDate < today) {
      alert("Cannot delete records with a surgery date in the past.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this record?")) {
      deleteOT.mutate(id);
    }
  };

  const onPerform = (id: string) => {
    const item = data.find((item) => item._id === id);
    setSelectedOTEntryData(item);
    setShowSurgeryPerform(true);
    console.log(selectedOTEntryData);
  };

  const onSurgeryNotes = async (id: string) => {
    const surgNotesData = surgNotes.data?.find((item) => item.OTId._id === id);

    if (surgNotesData) {
      // console.log("Surgery Notes", surgNotesData);
      setSurgNotesData(surgNotesData);
      setShowSurgNotesReportModal(true);
      return;
    }
    const item = data.find((item) => item._id === id);
    setSelectedOTId(item);
    setShowSurgeryNotes(true);
  };

  return (
    <div className="m-2">
      <SurgNotesReportModal
        show={showSurgNotesReportModal}
        handleClose={handleCloseSurgNotesReportModal}
        surgNotesData={surgNotesData}
      />
      <SurgeryNotesModal
        show={showSurgeryNotes}
        handleClose={handleCloseSurgeryNotes}
        OTId={selectedOTId}
        surgeryNotesData={surgNotes.data}
      />
      <OTListEditForm
        show={showOTListEditForm}
        handleClose={handleCloseOTListEditForm}
        // reg={{ _id: "", name: "" }}
        otEntryData={selectedOTEntryData}
      />

      <SurgeryPerform
        show={showSurgeryPerform}
        handleClose={handleCloseSurgeryPerform}
        surgeryData={selectedOTEntryData}
      />

      <div className="row px-4">
        Select OT Date
        <select
          className="form-select"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        >
          <option value="">Select a date</option>
          {Array.isArray(dates) &&
            dates &&
            dates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
        </select>
      </div>
      {groupedData &&
        Object.keys(groupedData).map((otNumber) => (
          <div key={otNumber} className="m-3">
            <h4 className="">OT Number: {otNumber}</h4>
            <div className="table-responsive">
              <Table style={{ tableLayout: "fixed" }}>
                <colgroup>
                  <col style={{ width: "5%" }} />
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <thead>
                  <tr className="small">
                    <th>#</th>
                    <th>Name</th>
                    <th>Surgery</th>
                    <th>Disease</th>
                    <th>Surgeon</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(groupedData[otNumber]) &&
                    groupedData[otNumber].map(
                      (
                        {
                          _id,
                          reg,
                          surgery,
                          disease,
                          surgeon,
                          surgDate,
                          surgType,
                          anaesthesia,
                          ptType,
                          comments,
                        }: OT,
                        index: number
                      ) => (
                        <tr key={_id} className="small">
                          <td>{index + 1}</td>
                          <td>{reg.name}</td>
                          <td>{surgery}</td>
                          <td>{disease}</td>
                          <td>{surgeon}</td>

                          <td>
                            {new Date(surgDate) < new Date() ? (
                              ""
                            ) : (
                              <Button
                                size="sm"
                                variant="link"
                                className="text-primary"
                                onClick={() => {
                                  setSelectedOTEntryData(
                                    data.find((item) => item._id === _id)
                                  );
                                  setShowOTListEditForm(true);
                                }}
                              >
                                Edit
                              </Button>
                            )}
                            {new Date(surgDate) < new Date() ? (
                              ""
                            ) : (
                              <Button
                                size="sm"
                                variant="link"
                                className="ms-2 text-danger"
                                onClick={() => onDelete(_id)}
                                disabled={new Date(surgDate) < new Date()}
                              >
                                Delete
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="link"
                              className="ms-2 text-success"
                              onClick={() => onPerform(_id)}
                            >
                              Perform
                            </Button>

                            <Button
                              size="sm"
                              variant="link"
                              className="ms-2 text-success"
                              onClick={() => onSurgeryNotes(_id)}
                            >
                              OT Notes{" "}
                            </Button>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </Table>
            </div>
          </div>
        ))}
    </div>
  );
};

export default OTList;
