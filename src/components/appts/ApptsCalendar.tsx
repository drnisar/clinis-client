import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list"; // Import the listPlugin
import interactionPlugin from "@fullcalendar/interaction";
import { useGetAllAppointments } from "./queries";
import { useRef } from "react";
import { DateInput, DateRangeInput } from "@fullcalendar/core/index.js";

const ApptsCalendar = () => {
  const {
    data: appointments,
    isLoading,
    isError,
    error,
  } = useGetAllAppointments();

  const calendarRef = useRef<FullCalendar>(null); // Add type FullCalendar to useRef

  const handleDateClick = (arg) => {
    // Handle date click
    const calendarApi = calendarRef.current?.getApi(); // Add null check
    if (calendarApi) {
      calendarApi.changeView("timeGridDay", arg.date);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const renderEventContent = (eventInfo) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi?.view.type === "listWeek") {
      return (
        <>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
          <p>Disease: {eventInfo.event.extendedProps.disease}</p>
          <p>Plan: {eventInfo.event.extendedProps.plan}</p>
          <p>Comorbids: {eventInfo.event.extendedProps.comorbids}</p>
        </>
      );
    } else {
      return (
        <>
          <b>{eventInfo.timeText}</b>
          <i>{eventInfo.event.title}</i>
        </>
      );
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        headerToolbar={{
          // Add headerToolbar to switch between views
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        initialView="dayGridMonth"
        events={
          appointments?.map((appt) => ({
            title: appt.apptPlan,
            date: appt.apptDate,
            start: appt.apptDate,
            end: appt.endApptDate,
            Disease: appt.disease,
            Comorbids: appt.comorbids,
          })) || []
        }
        dateClick={() => alert("clicked")}
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default ApptsCalendar;
