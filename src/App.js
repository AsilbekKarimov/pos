import React from "react";
import RouterConfig from "./router/Router";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./pages/sidebar/navbar/Navbar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Navbar />
        <RouterConfig />
      </div>
    </div>
  );
}

export default App;