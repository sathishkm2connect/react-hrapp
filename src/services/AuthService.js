import React from 'react';

const BASE_URL = process.env.REACT_APP_API_URL;

export async function loginUser(data) {
    const response = await fetch(`${BASE_URL}/api/login`,{
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: data
      });
  if (!response.ok) {
    throw new Error('Invalid username or password');
  }
  return response.json();
}