
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

import React, { useState } from 'react';

import Sidebar from './component/Sidebar/Sidebar';
import Navbar from './component/Navabr/Navbar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Sidebar toggleSidebar={toggleSidebar} />
      <Navbar toggleSidebar={toggleSidebar} />
    </>

  );
}

export default App;
