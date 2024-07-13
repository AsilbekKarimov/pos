import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <aside>
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            {/* Page content here */}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
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
                    <li>
                      <Link to="/payment">Список партнеров ЦТО</Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
<<<<<<< HEAD
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
            <li><p>Главная страница</p></li>
            <li>
              <details>
                <summary>Реестр</summary>
                <ul>

                  <li> <Link to={"/modules"}>
                    Фискальные модули
                  </Link></li>
                  <li><Link to={"/application"}>Торговый точки</Link></li>
                  <li><Link to={"/payment"}>Список портнеров ЦТО</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </aside>
=======
      </aside>
    </>
>>>>>>> 43fa829a42ba760a7cc17e6ee35914f2aa2a92dd
  );
};

export default Sidebar;
