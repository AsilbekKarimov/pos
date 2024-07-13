import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const hideSidebarPaths = ["/login"];

  return (
    <aside>
      <div className={`drawer ${isOpen ? 'lg:drawer-open' : ''} h-screen`}>
        <input 
          id="my-drawer-2" 
          type="checkbox" 
          className="drawer-toggle" 
          checked={isOpen} 
          onChange={toggleSidebar} 
        />
        
        <div className="drawer-side overflow-hidden mt-16">
          <label 
            htmlFor="my-drawer-2" 
            aria-label="close sidebar" 
            className="drawer-overlay" 
            onClick={toggleSidebar}>
          </label>
          <ul className="menu bg-base-200 text-base-content min-h-full pt-16 w-60 p-4">
            <li><a>Главная страница</a></li>
            <li>
              <details>
                <summary>Реестр</summary>
                <ul>
                  <li><Link to={"/modules"}>Фискальные модули</Link></li>
                  <li><Link to={"/application"}>Торговые точки</Link></li>
                  <li><Link to={"/payment"}>Список партнеров ЦТО</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
