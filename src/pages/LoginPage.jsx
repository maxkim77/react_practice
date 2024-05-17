import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './Menu';
import '../assets/LoginPage.css'; // LoginPage.css 파일을 import

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginSuccess(false);

    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        })
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        document.cookie = `authToken=${data.token};max-age=${60 * 30};path=/`;
        setLoginSuccess(true);
        navigate('/mypage'); // 로그인 성공 후 리디렉션
      }
    } catch (error) {
    }
  };

  return (
    <div className="cover-screen">
      <Menu />
      <div className="login-page">
        <h1>🔐Login Page</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <br></br>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br></br>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {loginSuccess && <p className="success">Login Successful!</p>}
      </div>
    </div>
  );
}

export default LoginPage;
