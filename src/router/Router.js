import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Loadable from "../layouts/full/Loadable";

const Home = Loadable(lazy(() => import("../pages/home/Home")));
const Application = Loadable(lazy(() => import("../pages/application/Application")));
const Payment = Loadable(lazy(() => import("../pages/fmPayment/Payment")));
const Reestr = Loadable(lazy(() => import("../pages/reestr/Reestr")));

const RouterConfig = () => {
  const routes = useRoutes([
    { path: "/", element: <Navigate to="home" /> },
    { path: "home", element: <Home /> },
    { path: "application", element: <Application /> },
    { path: "payment", element: <Payment /> },
    { path: "reestr", element: <Reestr /> },
    { path: "*", element: <div>404 Not Found</div> },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default RouterConfig;
