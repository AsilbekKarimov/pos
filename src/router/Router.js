import React, { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";

const Home = lazy(() => import("../pages/home/Home"));
const Application = lazy(() => import("../pages/application/Application"));
const Payment = lazy(() => import("../pages/fmPayment/Payment"));
const Reestr = lazy(() => import("../pages/reestr/Reestr"));

const RouterConfig = () => {
  const routes = useRoutes([
    { path: "/", element: <Navigate to="/" /> },
    { path: "home", element: <Home /> },
    { path: "application", element: <Application /> },
    { path: "payment", element: <Payment /> },
    { path: "reestr", element: <Reestr /> },
    { path: "*", element: <div>404 Not Found</div> },
  ]);

  return <Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>;
};

export default RouterConfig;
