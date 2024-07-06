
const loginFetch = async ({username, password}) => {
  try{
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

  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const data = await response.json();
  return data;

  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

export default loginFetch
