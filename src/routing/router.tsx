import { createBrowserRouter } from "react-router-dom";
import ApptsForm from "../components/ApptsForm";
import ApptsCalendar from "../components/appts/ApptsCalendar";
import ApptsReportList from "../components/appts/ApptsReportList";
import HomePage from "../components/home/HomePage";
import AddDr from "../components/hr/AddDr";
import Login from "../components/login/Login";
import MedRegister from "../components/meds/MedRegister";
import MedsModal from "../components/meds/MedsModal";
import Prescription from "../components/meds/Prescription";
import RegDelete from "../components/reg/RegDelete";
import RegError from "../components/reg/RegError";
import RegModalForm from "../components/reg/RegModalForm";
import RegReport from "../components/reg/RegReport";
import RegistrationDetails from "../components/reg/RegistrationDetails";
import RegistrationForm from "../components/reg/RegistrationForm";
import CPTSearch from "../components/surgery/CPTSearch";
import OTEntry from "../components/surgery/OTEntry";
import OTList from "../components/surgery/OTList";
import SurgNotesReportModal from "../components/surgery/SurgNotesReportModal";
import RegistrationLayout from "../layouts/RegistrationLayout";
import Layout from "./Layout";
import ApptsLayout from "../components/appts/ApptsLayout";
import AppointmentDetails from "../components/appts/AppointmentDetails";
import AppointmentForm from "../components/appts/AppointmentForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "registration",
        element: <RegistrationLayout />,
        // loader: async () => {
        //   const data = await apiClient.get("reg");
        //   return data;
        // },
        children: [
          {
            path: ":id",
            element: <RegistrationDetails />,
            errorElement: <RegError />,
          },
          {
            path: ":id/edit",
            element: <RegistrationForm />,
          },
          {
            path: ":id/delete",
            element: <RegDelete />,
          },
          {
            path: ":id/ot",
            element: <OTEntry />,
          },
        ],
      },

      {
        path: "appointments",
        element: <ApptsLayout />,
        children: [
          { path: ":id", element: <AppointmentDetails /> },
          { path: ":id/edit", element: <AppointmentForm /> },
          { path: "new", element: <AppointmentForm /> },
        ],
      },
      {
        path: "addregistration",
        element: <RegistrationForm />,
      },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "form",
        element: <ApptsForm />,
      },
      {
        path: "rep",
        element: <ApptsReportList />,
      },
      {
        path: "calendar",
        element: <ApptsCalendar />,
      },
      {
        path: "reg",
        element: <RegReport />,
      },
      {
        path: "addpt",
        element: <RegModalForm />,
      },
      {
        path: "otlist",
        element: <OTList />,
      },
      {
        path: "cpt",
        element: <CPTSearch />,
      },
      {
        path: "meds",
        element: <MedRegister />,
      },
      {
        path: "prescription",
        element: <Prescription />,
      },
      {
        path: "medsmodal",
        element: <MedsModal />,
      },
      // {
      //   path: "surgnotes",
      //   element: <SurgeryNotesModal />,
      // },
      {
        path: "addnewdr",
        element: <AddDr />,
      },
      {
        path: "surgnotes",
        element: <SurgNotesReportModal />,
      },
      {
        path: "test",
        element: <RegistrationForm />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
export default router;
