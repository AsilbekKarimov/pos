import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const isAdmin = useSelector((state) => state.user.user.is_admin);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      toggleSidebar();
    }
  }, [location.pathname]);

  return (
    <aside className={`drawer ${isOpen ? "lg:drawer-open w-1/6" : "w-0"} z-50`}>
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={toggleSidebar}
      />
      <div className="drawer-side min-h-screen">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={toggleSidebar}
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
          <li>
            <Link to="/">Главная страница</Link>
          </li>
          <li>
            <details>
              <summary>Реестр</summary>
              <ul>
                <li>
                  <Link to="/modules">Фискальные модули</Link>
                </li>
                <li>
                  <Link to="/application">Торговый точки</Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link to="/payment">Список партнеров ЦТО</Link>
                  </li>
                )}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
