import { createBrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import Layout from "../components/Layout/Layout";
import Session from "./session/Session";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/session/:action", element: <Session /> },
    ],
  },
]);
