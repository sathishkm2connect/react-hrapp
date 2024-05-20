import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { fetchEmployeeDetailsById } from './services/EmployeeService';

function EmployeeDetails() {

  const routeParams = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const jsonData = await fetchEmployeeDetailsById('api/employee/get/' + routeParams.id);
          setData(jsonData); // Set data state with fetched data
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div>
      <Link to="/">Go Back to List</Link>
      <h2>Employee Details</h2>
      <p><strong>Employee Number:</strong> {data.empNo}</p>
      <p><strong>First Name:</strong> {data.firstName}</p>
      <p><strong>Last Name:</strong> {data.lastName}</p>
      <p><strong>Gender:</strong> {data.gender}</p>
      <p><strong>Birthdate:</strong> {data.birthDate}</p>
      <p><strong>Hire Date:</strong> {data.hireDate}</p>
    </div>
  );
}

export default EmployeeDetails;
