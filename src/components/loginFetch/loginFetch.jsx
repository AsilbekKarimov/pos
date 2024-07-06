
const loginFetch = async ({username, password}) => {
  const response = await fetch('basedjangoapi.pythonanywhere.com/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  const data = await response.json();
  return data;
}

export default loginFetch
