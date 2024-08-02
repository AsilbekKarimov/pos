import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { setIsAuth } from "../../store/slices/authSlice";
import { addUser, deleteUser } from "../../store/slices/userSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const saveTokens = (accessToken, user) => {
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("expirationTime", expirationTime);
    dispatch(
      setIsAuth({ isAuth: true, token: accessToken, time: expirationTime })
    );
    dispatch(addUser({ user: user }));
  };

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    dispatch(setIsAuth({ isAuth: false, token: "", time: 0 }));
    dispatch(deleteUser());
  }, [dispatch]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const expirationTime = localStorage.getItem("expirationTime");
    const user = localStorage.getItem("user");

    if (accessToken && expirationTime && user) {
      const now = new Date().getTime();
      if (now < parseInt(expirationTime, 10)) {
        dispatch(
          setIsAuth({
            isAuth: true,
            token: accessToken,
            time: parseInt(expirationTime, 10),
          })
        );
        dispatch(addUser({ user: JSON.parse(user) }));
      } else {
        logout();
      }
    }
  }, [logout, dispatch]);

  return { saveTokens, logout };
};

export default useAuth;
