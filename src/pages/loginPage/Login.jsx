import React, { useState } from 'react';
import loginImg from '../assets/images/login-bg.jpeg';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ login: '', password: '' });

  const validate = () => {
    let valid = true;
    let errors = { login: '', password: '' };

    if (!login) {
      errors.login = 'Введите ваш логин';
      valid = false;
    }
    if (!password) {
      errors.password = 'Введите ваш пароль';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login, password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          console.log('Form submitted and tokens saved');
        } else {
          // Handle errors from the server
          const errorData = await response.json();
          console.error('Login error', errorData);
        }
      } catch (error) {
        console.error('Fetch error', error);
      }
    }
  };

  return (
    <div className="bg-blue-500 h-screen flex items-center">
      <div className="container mx-auto flex justify-center items-center h-[80vh] w-full">
        <div className="flex flex-1 h-full bg-white items-center justify-center rounded-s-lg">
          <img className="object-cover flex items-center w-[29vw] h-[50vh]" src={loginImg} alt="login_bg" />
        </div>
        <div className="flex-1 bg-white h-full flex items-center justify-center rounded-e-lg">
          <form onSubmit={handleSubmit} className="flex flex-col justify-center px-8 py-4 w-full max-w-md">
            <p className="text-3xl text-blue-700 font-semibold text-center mb-12">Вход</p>
            <div className="flex flex-col gap-5 items-center">
              <input
                type="text"
                className="py-3 rounded-lg px-2 w-full bg-white outline text-black outline-blue-500 placeholder:text-blue-700"
                placeholder="Введите ваш логин здесь"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              {errors.login && <p className="text-red-500">{errors.login}</p>}
              <input
                type="password"
                className="py-3 rounded-lg px-2 w-full bg-white outline text-black outline-blue-500 placeholder:text-blue-700"
                placeholder="Введите ваш пароль здесь"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <div className="flex justify-center mt-9">
              <button className="bg-blue-500 px-16 py-2 rounded-lg shadow-lg shadow-blue-500 text-white hover:bg-white border duration-300 border-blue-500 hover:text-blue-500">
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
