import { createBrowserRouter } from "react-router-dom";
import ApptsReportList from "../components/appts/ApptsReportList";
import HomePage from "../components/home/HomePage";
import AddDr from "../components/hr/AddDr";
import Login from "../components/login/Login";
import MedRegister from "../components/meds/MedRegister";
import MedsModal from "../components/meds/MedsModal";
import Prescription from "../components/meds/Prescription";
import RegDelete from "../components/reg/RegDelete";
import RegError from "../components/reg/RegError";
import RegistrationDetails from "../components/reg/RegistrationDetails";
import RegistrationForm from "../components/reg/RegistrationForm";
import CPTSearch from "../components/surgery/CPTSearch";
import OTEntry from "../components/surgery/OTEntry";
import RegistrationLayout from "../layouts/RegistrationLayout";
import Layout from "./Layout";
import ApptsLayout from "../components/appts/ApptsLayout";
import AppointmentDetails from "../components/appts/AppointmentDetails";
import AppointmentForm from "../components/appts/AppointmentForm";
import SurgeryLayout from "../components/surgery/surgeryLayout";
import SurgeryListCreate from "../components/surgery/SurgeryListCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "registration",
        element: <RegistrationLayout />,
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
        path: "surgery",
        element: <SurgeryLayout />,
        children: [],
      },
      {
        path: "surgery/:date",
        element: <SurgeryListCreate />,
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
        path: "rep",
        element: <ApptsReportList />,
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
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
export default router;
