import { createBrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import Layout from "../components/Layout/Layout";
import Session from "./session/Session";
import AuthotizedUser from "./AuthotizedUser";
import Account from "./Account/Account";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/session/:action", element: <Session /> },
      {
        element: <AuthotizedUser />,
        children: [{ path: "/account", element: <Account /> }],
      },
    ],
  },
]);
