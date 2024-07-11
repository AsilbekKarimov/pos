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
