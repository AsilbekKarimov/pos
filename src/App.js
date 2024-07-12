import React from "react";
import { useLocation } from "react-router-dom";
import RouterConfig from "./router/Router";

import Navbar from "./components/Navabr/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const location = useLocation();
  const hideSidebarPaths = ["/login"];

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
        <div className="flex-grow p-4">
          <RouterConfig />
        </div>
      </div>
    </div>
  );
}

export default App;
