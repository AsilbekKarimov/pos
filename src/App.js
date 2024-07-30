import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector } from "react-redux";


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const isAdmin = useSelector(state => state.user.user.is_admin);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isAdmin={isAdmin} />
        <div className={`${isSidebarOpen ? 'w-5/6' : 'w-full'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
