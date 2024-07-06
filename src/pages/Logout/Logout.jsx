import React from 'react'

const Logout = () => {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log('Logged out');
      };
      
  return (
    <div>
      Logout
    </div>
  )
}

export default Logout
