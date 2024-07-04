import React from "react";
import RouterConfig from "./router/Router";
import Sidebar from "./pages/sidebar/Sidebar";


function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <RouterConfig />
      </div>
    </div>
  );
}

export default App;
