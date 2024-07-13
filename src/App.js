import React from "react";
import { useLocation } from "react-router-dom";
import RouterConfig from "./router/Router";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./pages/sidebarr/Sidebar"

function App() {
  const location = useLocation();
  const hideSidebarPaths = ["/login", "/register"]; 

  return (
    <div className="flex flex-col h-screen">
      {!hideSidebarPaths.includes(location.pathname) && <Navbar />}
      <div className="flex flex-grow">
        {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
        <div className="flex-grow">
          <RouterConfig />
        </div>
      </div>
    </div>
  );
}

export default App;
