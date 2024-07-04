import React from "react";
import RouterConfig from "./router/Router";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <>
      <div className="flex">
        
      </div>
      <div className="flex-grow flex">
        <Sidebar />
        <RouterConfig />
      </div>
    </>
  );
}

export default App;
