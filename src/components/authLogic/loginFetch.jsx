const loginFetch = async ({ login, password }) => {
  const response = await fetch(
    "https://verified-gorilla-yearly.ngrok-free.app/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        password,
      }),
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    return { error: "Ошибка в логине или пароле. Повторите попытку!" };
  }
};

export default loginFetch;
