
const loginFetch = async ({username, password, token}) => {
  const response = await fetch('http://127.0.0.1:8000/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
