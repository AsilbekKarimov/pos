import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import RouterConfig from "./router/Router";

function App() {
  const location = useLocation();
  const hideSidebarPaths = ["/login"];

  return (
    <div className="flex">
      {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
      <div className="flex-grow">
        <RouterConfig />
      </div>
    </div>
  );
}

export default App;
