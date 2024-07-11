const loginFetch = async ({ username, password }) => {
  const response = await fetch(
    "https://basedjangoapi.pythonanywhere.com/login/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    return { error: "Network response was not ok" };
  }
};

export default loginFetch;