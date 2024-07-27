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
import RegistrationLayout from "../layouts/RegistrationLayout";
import Layout from "./Layout";
import ApptsLayout from "../components/appts/ApptsLayout";
import AppointmentDetails from "../components/appts/AppointmentDetails";
import AppointmentForm from "../components/appts/AppointmentForm";
import SurgeryLayout from "../components/surgery/surgeryLayout";
import SurgeryListCreate from "../components/surgery/SurgeryListCreate";
import SurgeryListForm from "../components/surgery/SurgeryListForm";
import SurgeryDelete from "../components/surgery/SurgeryDelete";
import AppointmentDelete from "../components/appts/AppointmentDelete";

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
        ],
      },

      {
        path: "appointments",
        element: <ApptsLayout />,
        children: [
          { path: ":id", element: <AppointmentDetails /> },
          { path: ":id/edit", element: <AppointmentForm /> },
          { path: "new", element: <AppointmentForm /> },
          { path: ":id/delete", element: <AppointmentDelete /> },
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
        path: "surgery/:date/form",
        element: <SurgeryListForm />,
      },

      {
        path: "surgery/:id/delete",
        element: <SurgeryDelete />,
      },
      {
        path: "surgery/:id/edit",
        element: <SurgeryListForm />,
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
