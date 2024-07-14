import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import RouterConfig from "./router/Router";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const location = useLocation();
  const hideSidebarPaths = ["/login"];
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {!hideSidebarPaths.includes(location.pathname) && <Navbar toggleSidebar={toggleSidebar} />}
      <div className="flex flex-grow">
        {!hideSidebarPaths.includes(location.pathname) && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className={`${isSidebarOpen ? 'w-5/6' : 'w-full'} p-5`}>
          <RouterConfig />
        </div>
      </div>
    </div>
  );
}

export default App;
