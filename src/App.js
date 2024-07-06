import React from "react";
import RouterConfig from "./router/Router";
import Sidebar from "./components/sidebar/Sidebar";

const App = () => {
  return (
    <>
      <div className="flex"></div>
      <div className="flex-grow flex">
        <Sidebar />
        <RouterConfig isAuth={isAuth} />
      </div>
    </>
  );
}

export default App
