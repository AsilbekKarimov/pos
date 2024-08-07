import React, { useEffect, useState } from "react";

import loginImg from "../../assets/images/login-bg.jpeg";
import loginFetch from "../../components/authLogic/loginFetch";
import useAuth from "../../components/authLogic/useAuth";
import Toast from "../../others/toastNotification/Toast";

const Login = () => {
  const colorClass = {
    red: "text-black outline-red-500 placeholder:text-red-700",
    blue: "text-black outline-blue-500 placeholder:text-blue-700",
    gray: "text-slate-500 outline-slate-400",
    btnOnLodaing:
      "bg-slate-500 shadow-slate-500 border-slate-500 hover:text-slate-500 cursor-not-allowed",
    defaultBtn:
      "bg-blue-500 shadow-blue-500 border-blue-500 hover:text-blue-500 cursor-pointer",
  };

  const { saveTokens } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [outlineInput1, setOutlineInput1] = useState(colorClass.blue);
  const [outlineInput2, setOutlineInput2] = useState(colorClass.blue);
  const [btnStyle, setBtnStyle] = useState(colorClass.defaultBtn);

  useEffect(() => {
    if (loading) {
      setOutlineInput1(colorClass.gray);
      setOutlineInput2(colorClass.gray);
      setBtnStyle(colorClass.btnOnLodaing);
    } else {
      if (
        outlineInput1 === colorClass.red ||
        outlineInput2 === colorClass.red
      ) {
        const timer = setTimeout(() => {
          setOutlineInput1(colorClass.blue);
          setOutlineInput2(colorClass.blue);
          setBtnStyle(colorClass.defaultBtn);
          setError("");
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [outlineInput1, outlineInput2, loading]);

  const validate = () => {
    let valid = true;

    if (!login & !password) {
      valid = false;
      setOutlineInput1(colorClass.red);
      setOutlineInput2(colorClass.red);
    }
    if (!login) {
      valid = false;
      setOutlineInput1(colorClass.red);
    }
    if (!password) {
      valid = false;
      setOutlineInput2(colorClass.red);
    }
    if (valid === false) {
      setError("Заполните поля ввода");
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        const data = await loginFetch({ username: login, password: password });

        if (!data.token) {
          throw new Error(data.error);
        }

        saveTokens(data.token, data.user);
      } catch (error) {
        setError(error.message);
        setOutlineInput1(colorClass.red);
        setOutlineInput2(colorClass.red);
        setBtnStyle(colorClass.defaultBtn);
        setLogin("");
        setPassword("");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-blue-500 h-screen w-screen flex items-center">
      {error && <Toast message={error} error={true} />}
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
              <input
                type="text"
                className={`py-3 rounded-lg px-2 w-full bg-white outline ${outlineInput1}`}
                placeholder="Введите ваш логин здесь"
                value={login}
                disabled={loading}
                onChange={(e) => setLogin(e.target.value)}
              />
              <input
                type="password"
                className={`py-3 rounded-lg px-2 w-full bg-white outline ${outlineInput2}`}
                placeholder="Введите ваш пароль здесь"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-9">
              <button
                className={`px-[15%] py-[2%] rounded-lg shadow-lg text-white hover:bg-white border duration-300 ${btnStyle}`}
                disabled={loading}
              >
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
