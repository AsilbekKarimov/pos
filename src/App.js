import React from "react";
import { useLocation } from "react-router";

import RouterConfig from "./router/Router";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const location = useLocation()
  const hideSidebarPaths = ['/login'];

  return (
    <>
      <div className="flex"></div>
      <div className="flex-grow flex">
        {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
        <RouterConfig />
      </div>
    </>
  );
}

export default App
