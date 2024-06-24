import { createBrowserRouter, useLoaderData } from "react-router-dom";
import Layout from "./Layout";
import ApptsForm from "../components/ApptsForm";
import RegReport from "../components/reg/RegReport";
import RegModalForm from "../components/reg/RegModalForm";
import ApptsReportList from "../components/appts/ApptsReportList";
import ApptsCalendar from "../components/appts/ApptsCalendar";
import OTList from "../components/surgery/OTList";
import CPTSearch from "../components/surgery/CPTSearch";
import MedRegister from "../components/meds/MedRegister";
import Prescription from "../components/meds/Prescription";
import HomePage from "../components/home/HomePage";
import MedsModal from "../components/meds/MedsModal";
import SurgeryNotesModal from "../components/surgery/SurgeryNotesModal";
import AddDr from "../components/hr/AddDr";
import SurgNotesReport from "../components/surgery/SurgNotesReport";
import SurgNotesReportModal from "../components/surgery/SurgNotesReportModal";
import RegistrationLayout from "../layouts/RegistrationLayout";
import Registration from "../components/reg/Registration";
import RegistrationDetails from "../components/reg/RegistrationDetails";
import { apiClient } from "../components/api-client/apiClient";
import RegError from "../components/reg/RegError";
import RegistrationForm from "../components/reg/RegistrationForm";
import ApptsReport from "../components/ApptsReport";
import RegDelete from "../components/reg/RegDelete";
import OTListForm from "../components/surgery/OTListForm";
import OTEntry from "../components/surgery/OTEntry";

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
    ],
  },
]);
export default router;
