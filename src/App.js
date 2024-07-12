import React from "react";
import { useLocation } from "react-router-dom";
import RouterConfig from "./router/Router";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const location = useLocation();
  const hideSidebarPaths = ["/login"];

  return (
    <div className="flex flex-col h-screen">
      {!hideSidebarPaths.includes(location.pathname) && <Navbar />}
      <div className="flex flex-grow">
        {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
        <div>
          <RouterConfig />
        </div>
      </div>
    </div>
  );
}

export default App;
