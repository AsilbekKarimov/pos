import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import RouterConfig from "./router/Router";
import { useSelector } from "react-redux";

function App() {
  const isAuth = useSelector(state => state.auth.isAuth)

  return (
    <div className="flex">
      {!isAuth   && <Sidebar />}
      <div className="flex-grow">
        <RouterConfig />
      </div>
    </div>
  );
}

export default App;
