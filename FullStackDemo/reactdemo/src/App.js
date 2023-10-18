import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Login from './login/Login';

function App() {
  const apiUrl = "http://localhost:8080/student";
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(()=>{
    getAllS();
  },[])

  const getAllS = async () =>{
    const response = await fetch(apiUrl);
    const studentData = await response.json();
    setStudents(studentData);
    console.log(students);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to the Spring Boot backend
    const response = await fetch('http://localhost:8080/students/student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName,
            lastName,
        }),
    });

    // Handle the response accordingly (e.g., display a success message)
    const result = await response.text();
    console.log(result);
};

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <button type="submit">Submit</button>
        </form>
           
     {students.length?students.map((estudent,index)=>{
      return(
        <div key={index}>
          <h2>{estudent.firstName}</h2>

        </div>
      )
     }) :
     (
      <div>no studentData</div>
     )
     }
    </div>
  );
}

export default App;
