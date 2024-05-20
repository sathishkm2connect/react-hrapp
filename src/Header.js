import React, { useState } from 'react';
import {useAuth} from './services/AuthContext';
import { useNavigate} from 'react-router-dom';

function Header() {

  const { isAuthenticated, loggedInUserName, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    logout();
    navigate('/login')
  }

  // Styles
const headerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    verticalAlign: 'middle'
  };
  
  const titleStyle = {
     fontSize: '50px',
  };
  
  const userInfoStyle = {
    marginRight: '10px',
  };

  
  return (
    <div style={headerStyle}>
      <div style={titleStyle}>HR Application</div>
      {loggedInUserName && (
        <div style={userInfoStyle}>Logged in as: {loggedInUserName}</div>
      )}
      {isAuthenticated && (
        <button style={userInfoStyle} onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};


export default Header;
