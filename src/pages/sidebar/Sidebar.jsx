import React, { useState } from 'react';
import Navbar from './navbar/Navbar';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="drawer drawer-mobile "> {/* добавлен отступ сверху */}
        <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isSidebarOpen} readOnly />
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={toggleSidebar}></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 pt-16">
            {/* Sidebar information */}
            <li className='mt-4'><a>Главная страница</a></li>
            <li>
              <details>
                <summary>Реестр</summary>
                <ul>
                  <li><a>Фиксальный модули</a></li>
                  <li><a>Торговый точки</a></li>
                  <li><a>Список портнеров ЦТО</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar; 