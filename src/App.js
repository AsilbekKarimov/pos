import React from "react";
import RouterConfig from "./router/Router";
import Sidebar from "./components/sidebar/Sidebar";
import Buttons from "./components/buttons/Buttons";

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
