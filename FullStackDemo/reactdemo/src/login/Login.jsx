import { useEffect, useState } from 'react';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import SignUp from './SignUp';

const Login = () =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        // Send a POST request to the Spring Boot backend
        const response = await fetch(`http://localhost:8080/ehome/username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });

        // Handle the response accordingly (e.g., display a success message)
        
        const result = await response.json();
        console.log(result);
        // console.log(result.username, result.password);

        // check if username and password match
        if(username!==result.username){
            alert("username not exists!");
        }else if(password!==result.password){
            alert("invalid password!");
        }
        else{
            result.isAdmin ? navigate("/ehome_admin/admin_management_page" ) : navigate(`/ehome/${result.userId}` );
        }

    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text"
                        id="firstName"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                    {/* {renderErrorMessage("uname")} */}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="text"
                        id="lastName"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    {/* {renderErrorMessage("pass")} */}
                </div>
                    <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
            
            <li>
              <Link to="/signup">Signup</Link>
            </li>
        
        </div>
    )
}

export default Login;