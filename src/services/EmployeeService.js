import React from 'react';

const BASE_URL = process.env.REACT_APP_API_URL;

export async function fetchEmployeeData(endpoint) {
  const apiToken = sessionStorage.getItem("access-token");
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: {'Authorization': `Bearer ${apiToken}`},
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export async function saveEmployeeData(endpoint, data) {
  const apiToken = sessionStorage.getItem("access-token");
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {'content-type': 'application/json', 'Authorization': `Bearer ${apiToken}`},
    body: data
  });
  return response.json();
}

export async function fetchEmployeeDetailsById(endpoint) {
  const apiToken = sessionStorage.getItem("access-token");
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: {'Authorization': `Bearer ${apiToken}`},
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}