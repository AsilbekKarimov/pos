import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { setIsAuth } from "../../store/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();

  const saveTokens = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day
    localStorage.setItem("expirationTime", expirationTime);
    dispatch(setIsAuth({token: accessToken, time: expirationTime}))
  };

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirationTime");
    dispatch(setIsAuth({isAuth: false, token: "", time: 0}));
  }, [dispatch]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const expirationTime = localStorage.getItem("expirationTime");

    if (accessToken && expirationTime) {
      const now = new Date().getTime();
      if (now < parseInt(expirationTime)) {
        dispatch(setIsAuth({isAuth: true}));
      } else {
        logout();
      }
    }
  }, [logout, dispatch]);

  return { saveTokens, logout };
};

export default useAuth;
