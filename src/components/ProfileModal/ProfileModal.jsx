import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const ProfileModal = ({ id }) => {
  const token = useSelector((state) => state.auth.accessToken);

  return (
    <div>
      <Link to={`/profile/${id}`}>
        <button className="mx-auto my-auto py-2 active:scale-90 transition duration-300 hover:bg-blue-700 flex items-center gap-1 bg-primary rounded-md text-white px-3">
          <CgProfile className="text-xl" />
          Профиль
        </button>
      </Link>
    </div>
  );
};

export default ProfileModal;
