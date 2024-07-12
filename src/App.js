import React, { useState } from "react";
import RouterConfig from "./router/Router";
import Sidebar from "./pages/sidebar/Sidebar";
import Navbar from './pages/sidebar/navbar/Navbar';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isAuth = false;

  return (
    <>
      <div className="flex"></div>
      <div className="flex-grow flex">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <RouterConfig isAuth={isAuth} />
      </div>
    </>
  );
}

export default App;
