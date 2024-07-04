import React from "react";
import RouterConfig from "./router/Router";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <RouterConfig />
      </div>
    </>
  );
}

export default App;
