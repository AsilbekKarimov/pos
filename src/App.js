import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import RouterConfig from "./router/Router";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector } from "react-redux";


function App() {
  const location = useLocation();
  const hideSidebarPaths = ["/login"];
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const token = useSelector(state => state.auth.accessToken)
  const time = useSelector(state => state.auth.expirationTime)
  const userData = useSelector(state => state.user.user)
  // console.log("token", token);
  // console.log("time", time);
  // console.log("userData", userData);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {!hideSidebarPaths.includes(location.pathname) && <Navbar toggleSidebar={toggleSidebar} />}
      <div className="flex flex-grow">
        {!hideSidebarPaths.includes(location.pathname) && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className={`${isSidebarOpen ? 'w-5/6' : 'w-full'}`}>
          <RouterConfig />
        </div>
      </div>
    </div>
  );
}

export default App;
