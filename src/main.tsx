import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Root from "./routes/Root";
import "./index.module.css";

const Wow = () => {
  const { owner, repo } = useParams();
  return (
    <div>
      Hi from {owner}/{repo}
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/:owner/:repo",
    element: <Wow />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
