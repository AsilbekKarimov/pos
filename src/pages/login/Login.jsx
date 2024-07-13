import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import loginImg from "../../assets/images/login-bg.jpeg";
import loginFetch from "../../components/authLogic/loginFetch";
import useAuth from "../../components/authLogic/useAuth";

import { setIsAuth } from "../../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const inputOutlineClass = {
    red: "outline-red-500 placeholder:text-red-700",
    blue: "outline-blue-500 placeholder:text-blue-700",
  };

  const { saveTokens, startTokenRefreshInterval } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [outlineInput, setOutlineInput] = useState(inputOutlineClass.blue);
  const [error, setError] = useState("");

  useEffect(() => {
    if (outlineInput === inputOutlineClass.red) {
      const timer = setTimeout(() => {
        setOutlineInput(inputOutlineClass.blue);
        setError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [outlineInput]);

  const validate = () => {
    let valid = true;

    if (!(login, password)) {
      valid = false;
      setOutlineInput(inputOutlineClass.red);
      setError("Заполните поля ввода.");
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        const data = await loginFetch({ username: login, password: password });
        
        if (!(data.access, data.refresh)) {
          throw new Error(data.error);
        }
        console.log(data)
        saveTokens(data.access, data.refresh);
        dispatch(setIsAuth(true));
        startTokenRefreshInterval();
      } catch (error) {
        setError(error.message);
        setOutlineInput(inputOutlineClass.red);
        setLogin("");
        setPassword("");
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <div className="bg-blue-500 h-screen w-screen flex items-center">
      <div className="container mx-auto flex justify-center items-center h-[80vh] w-full">
        <div className="flex flex-1 h-full bg-white items-center justify-center rounded-s-lg">
          <img
            className="object-cover flex items-center w-[29vw] h-[50vh]"
            src={loginImg}
            alt="login_bg"
          />
        </div>
        <div className="flex-1 bg-white h-full flex items-center justify-center rounded-e-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center px-8 py-4 w-full max-w-md"
          >
            <p className="text-3xl text-blue-700 font-semibold text-center mb-8">
              Вход
            </p>
            <div className="flex flex-col gap-5 items-center">
              {error && <p className="text-red-500">{error}</p>}
              <input
                type="text"
                className={`py-3 rounded-lg px-2 w-full bg-white outline text-black ${outlineInput}`}
                placeholder="Введите ваш логин здесь"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <input
                type="password"
                className={`py-3 rounded-lg px-2 w-full bg-white outline text-black ${outlineInput}`}
                placeholder="Введите ваш пароль здесь"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-9">
              <button className="bg-blue-500 px-[15%] py-[2%] rounded-lg shadow-lg shadow-blue-500 text-white hover:bg-white border duration-300 border-blue-500 hover:text-blue-500">
                {loading ? (
                  <span className="loading loading-spinner loading-sm h-full m-auto"></span>
                ) : (
                  <p>Войти</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
