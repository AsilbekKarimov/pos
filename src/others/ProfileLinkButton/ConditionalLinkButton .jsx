import React from "react";
import { Link, useLocation } from "react-router-dom";

const ConditionalLinkButton = () => {
  const location = useLocation();

  const isProfileFiscals = location.pathname === "/profile/fiscals";

  return (
    <Link to={isProfileFiscals ? "/profile" : "/profile/fiscals"}>
      <button className="px-4 border-2 bg-primary border-primary text-white rounded-md h-[50px]">
        {isProfileFiscals ? "Профили" : "Фискальные Модули"}
      </button>
    </Link>
  );
};

export default ConditionalLinkButton;
