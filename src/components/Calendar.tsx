import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import { Alert, Button, CloseButton, Spinner } from "react-bootstrap";
import useAppointments from "../hooks/useAppointments";
import { useNavigate, useLocation } from "react-router-dom";
import { end } from "@popperjs/core";

const Calendar = () => {
  const [alertMessage, setAlertMessage] = useState("");
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  const { data, error, isLoading } = useAppointments();

  const calendarEvents = data?.map((appt) => ({
    title: appt.name,
    date: appt.date,
    name: appt.name,
    start: appt.date,
  }));

  if (isLoading) return <Spinner />;
  if (error) return <div>An Error has occured: {error.message}</div>;
  return (
    <>
      {alertMessage && (
        <Alert className="d-flex justify-content-between">
          {alertMessage}
          <CloseButton onClick={() => setAlertMessage("")}></CloseButton>
        </Alert>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        select={(e) => {
          console.log(e);
          // let localDate = new Date(e.startStr).toLocaleDateString();
          //selectedDate = e.start;
          navigate("/form", {
            state: {
              selectedDate: e.start,
              show: true,
            },
          });
        }}
        events={calendarEvents}
        customButtons={{
          openFormButton: {
            text: "Add new",
            click: () => {
              window.location.href = "/form";
            },
          },
        }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,openFormButton",
        }}
        eventClick={(e) =>
          setAlertMessage(e.event.extendedProps.name + " " + e.event.title)
        }
      />
    </>
  );
};

export default Calendar;