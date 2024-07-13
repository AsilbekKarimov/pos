import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import ThemeToggle from "../../others/ThemeToggle";
import useAuth from "../authLogic/useAuth";

const Navbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const [user, setUser] = useState({
    role: "root",
    userName: "Bekzod Mirzaaliyev",
    profileImage:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1881",
  });

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
            <a className="btn btn-ghost normal-case text-xl">OOO R I G</a>
          </div>
          <div className="navbar-end flex items-center gap-4">
            <ThemeToggle className="text-sm" />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" src={user.profileImage} />
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <div className="flex flex-col">
                <h1>{user.userName}</h1>
                <p>{user.role}</p>
              </div>
              <IoIosLogOut
                className="size-[35px] cursor-pointer"
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
