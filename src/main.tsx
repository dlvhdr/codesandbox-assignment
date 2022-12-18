import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import KanbanLoader from "./components/KanbanLoader/KanbanLoader";
import "./index.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    ),
  },
  {
    path: "/:owner/:name",
    element: (
      <QueryClientProvider client={queryClient}>
        <KanbanLoader />
      </QueryClientProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
