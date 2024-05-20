// AuthContext.js
import React, { createContext, useState, useContext, useEffect} from 'react';
import { loginUser } from './AuthService';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('authenticated')??false);
  const [loggedInUserName, setLoggedInUserName] = useState(sessionStorage.getItem("username")??'Guest');

  const login = () => {
    const username = sessionStorage.getItem("username");  
    setLoggedInUserName(username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('access-token');
    setLoggedInUserName('Guest');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loggedInUserName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);