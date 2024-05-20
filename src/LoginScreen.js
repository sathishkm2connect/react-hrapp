import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { loginUser } from './services/AuthService';
import { useAuth } from './services/AuthContext';

function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        "username" : username,
        "password" : password
      }
      const jsonData = JSON.stringify(data);
      const resultJson =  await loginUser(jsonData);
      sessionStorage.setItem("access-token",resultJson.accessToken);
      sessionStorage.setItem("authenticated",true);
      sessionStorage.setItem("username",username);
      login();
      navigate('/');
    }catch(error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginScreen;
