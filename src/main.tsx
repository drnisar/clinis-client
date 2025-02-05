import React from "react";
import ReactDOM from "react-dom/client";
import "react-bootstrap";
import "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./main.css";

import router from "./routing/router";
import { AuthProvider } from "./components/login/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
