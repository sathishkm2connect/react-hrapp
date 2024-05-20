import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import { Link,useNavigate} from 'react-router-dom';
import { saveEmployeeData } from './services/EmployeeService';

function EmployeeForm() {
  const [empNo, setEmpNo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({})

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, like sending data to backend
    console.log('Form submitted:', { empNo, firstName, lastName, gender, birthdate, hireDate });

    const validateData = () => {
      if(empNo === '') {
        setFormErrors({
          'empNo' : 'Employee Number should not be blank'
        })
        return false;
      }
      return true;
    }

    const fetchData = async () => {
      try {
        const data = {
           "empNo" : empNo,
           "firstName" : firstName,
           "lastName" : lastName,
           "gender" : gender,
           "birthDate" : birthdate,
           "hireDate" : hireDate
        }
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
        const jsonResultData = await saveEmployeeData('api/employee/add', jsonData);
        if(jsonResultData.status==='error') {
           //display the error message
           console.log('error occured')
           setFormErrors(jsonResultData.errors)
        } else {
          navigate('/')
        }
      } catch (error) {
        setError(error.message);
      } finally {
      }
    }
    if(validateData()) {
        fetchData();
     }
  };

  return (
    <div>
      <Link to="/">Go Back to List</Link>

      <h2>Create Employee</h2>
      {Object.entries(formErrors).map(([key, value]) => (  
          <p key={key} style={{color:'red'}}>{value}</p>
       ))}
      <form onSubmit={handleSubmit}>
        <label>
          Employee Number:
          <input id="employeeNo" value={empNo} onChange={(e) => setEmpNo(e.target.value)} />
        </label>
        <br />
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Gender:
          <input type="radio" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} /> Male
          <input type="radio" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} /> Female
          <input type="radio" value="Others" checked={gender === 'Others'} onChange={() => setGender('Others')} /> Others
        </label>
        <br />
        <label>
          Birthdate:
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        </label>
        <br />
        <label>
          Hire Date:
          <input type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
