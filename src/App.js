import React from "react";
import RouterConfig from "./router/Router";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./pages/sidebar/navbar/Navbar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
        <Navbar />
        <RouterConfig />
      </div>
  
  );
}

export default App;