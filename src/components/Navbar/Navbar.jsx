import React from "react";
import { useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";

import userImg from "../../assets/images/avatar.png";
import ThemeToggle from "../../others/themeToggle/ThemeToggle";
import useAuth from "../authLogic/useAuth";

const Navbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const user = useSelector((state) => state.user.user);

  return (
    <div className="w-full z-50 shadow-lg">
      <div className="navbar bg-base-100">
        <div className="container mx-auto max-w-[95%]">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                onClick={toggleSidebar}
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-lg md:text-xl">
              OOO R I G
            </a>
          </div>
          <div className="navbar-end flex items-center gap-3 md:gap-4">
            <ThemeToggle className="text-xs md:text-sm" />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 md:w-10 rounded-full">
                  <img alt="User Avatar" src={userImg} />
                </div>
              </div>
            </div>
            <div className="flex gap-3 md:gap-5 items-center text-xs md:text-sm">
              <div className="flex flex-col items-end">
                <h1>{user.username}</h1>
                {user.is_admin ? <p>Админ</p> : <p>Партнер</p>}
              </div>
              <IoIosLogOut
                className="text-lg md:text-xl cursor-pointer"
                onClick={() => logout()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
