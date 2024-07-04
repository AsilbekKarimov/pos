import React from 'react';

const Sidebar = () => {
  return (
    <aside>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
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
    </aside>
  );
}

export default Sidebar;
