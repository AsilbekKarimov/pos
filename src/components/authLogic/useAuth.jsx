import { useEffect, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import { setIsAuth } from "../../store/slices/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const tokenRefreshInterval = useRef(null);

  const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day
    // const expirationTime = new Date().getTime() + 30000; // 10 sec
    localStorage.setItem("expirationTime", expirationTime);
  };

  const clearLocalStorage = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expirationTime");
    dispatch(setIsAuth(false));
    clearInterval(tokenRefreshInterval.current);
  }, [dispatch]);

  const startTokenRefreshInterval = useCallback(() => {
    clearInterval(tokenRefreshInterval.current);
    tokenRefreshInterval.current = setInterval(async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await fetch(
        "https://basedjangoapi.pythonanywhere.com/api/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.access);
      } else {
        clearLocalStorage();
      }
    }, 3000);
  }, [clearLocalStorage]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const expirationTime = localStorage.getItem("expirationTime");

    if (accessToken && refreshToken && expirationTime) {
      const now = new Date().getTime();
      if (now < parseInt(expirationTime)) {
        dispatch(setIsAuth(true));
        startTokenRefreshInterval();
      } else {
        clearLocalStorage();
      }
    }

    return () => clearInterval(tokenRefreshInterval.current);
  }, [startTokenRefreshInterval, clearLocalStorage, dispatch]);

  return {
    saveTokens,
    startTokenRefreshInterval,
    clearLocalStorage,
  };
};

export default useAuth;
