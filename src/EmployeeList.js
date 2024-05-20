import React, { useState, useEffect } from 'react';
import { fetchEmployeeData } from './services/EmployeeService';
import styles from './css/styles.css'
import { Link} from 'react-router-dom';

function EmployeeList() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const jsonData = await fetchEmployeeData('api/employee');
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
          <h1 style={{color: 'red'}}>Employee List</h1>
          <Link to="/employee-form">Create Employee</Link>
          <table>
            <thead>
                <tr>
                    <th>Employee No</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Gender</th>
                    <th>BirthDate</th>
                    <th>HireDate</th>
                </tr>
            </thead>
            <tbody>
                {data.map(employee => (
                     <tr key={employee.empNo}>
                        <td><Link to={{ pathname: `/employee-details/${employee.empNo}`}}>{employee.empNo}</Link></td>
                        <td>{employee.firstName}</td> 
                        <td>{employee.lastName}</td> 
                        <td>{employee.gender}</td> 
                        <td>{employee.birthDate}</td> 
                        <td>{employee.hireDate}</td> 
                    </tr>
                ))}
            </tbody>
          </table>

        </div>
      );
}

export default EmployeeList;