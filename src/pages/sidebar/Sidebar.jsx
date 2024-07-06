import React from 'react';

const Sidebar = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Content inside the page */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar information  */}
          <li><a>Главная страница</a></li>
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
  );
}

export default Sidebar;
