import React from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { addProfileId } from "../../store/slices/userSlice";

const ProfileButton = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Link to={`/profile`}>
        <button
          className="mx-auto my-auto py-2 active:scale-90 transition duration-300 hover:bg-blue-700 flex items-center gap-1 bg-primary rounded-md text-white px-3"
          onClick={() => dispatch(addProfileId(id))}
        >
          <CgProfile className="text-xl" />
          Профиль
        </button>
      </Link>
    </div>
  );
};

export default ProfileButton;
