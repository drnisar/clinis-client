import React from "react";
import { useGetAllAppointments } from "./queries";
import { Accordion } from "react-bootstrap";

const ApptsReportList = () => {
  const { data, isLoading, isError, error } = useGetAllAppointments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  console.log(data);
  return (
    <div>
      <h1>Appointments Report List</h1>
      <Accordion>
        {(data as any)?.map(
          (
            appt: {
              _id: React.Key | null | undefined;
              reg: {
                name: string;
                age: number;
                gender: string;
                phone: string;
                email: string;
                MRN: string;
              };
              apptDate: any;
              apptPlan: string;
              disease: string;
              comorbids: string;
              socialConnect: string;
              apptNotes: string;
            },
            index: { toString: () => string }
          ) => (
            <Accordion.Item eventKey={index.toString()} key={appt._id}>
              <Accordion.Header>{appt.apptPlan}</Accordion.Header>
              <Accordion.Body>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="row">
                        <dt className="col-sm-2">Name</dt>
                        <dd className="col-sm-10">{appt.reg?.name}</dd>
                      </div>
                      <div className="row">
                        <dt className="col-sm-2">Age</dt>
                        <dd className="col-sm-10">{appt.reg?.age}</dd>
                      </div>
                      <div className="row">
                        <dt className="col-sm-2">Gender</dt>
                        <dd className="col-sm-10">{appt.reg?.gender}</dd>
                      </div>
                      <div className="row">
                        <dt className="col-sm-2">Phone</dt>
                        <dd className="col-sm-10">{appt.reg?.phone}</dd>
                      </div>
                      <div className="row">
                        <dt className="col-sm-2">Email</dt>
                        <dd className="col-sm-10">{appt.reg?.email}</dd>
                      </div>
                      <div className="row">
                        <dt className="col-sm-2">MRN</dt>
                        <dd className="col-sm-10">{appt.reg?.MRN}</dd>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <dt className="col-sm-2">Disease:</dt>
                        <dd className="col-sm-10">{appt.disease}</dd>
                      </div>
                      <div className="row">
                        <dt className="col-sm-2">Plan</dt>
                        <dd className="col-sm-10">{appt.apptPlan}</dd>
                      </div>
                      <div className="row">
                        <dt className="col-sm-2">Comorbids: </dt>
                        <dd className="col-sm-10">{appt.comorbids}</dd>
                      </div>
                      <div className="row">
                        <dt className="col-sm-2">Notes:</dt>
                        <dd className="col-sm-10">{appt.apptNotes}</dd>
                      </div>
                      <div className="row">
                        <dt className="col-sm-2">Reference: </dt>
                        <dd className="col-sm-10">{appt.socialConnect}</dd>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          )
        )}
      </Accordion>
    </div>
  );
};

export default ApptsReportList;
