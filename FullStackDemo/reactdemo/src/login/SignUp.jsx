import { useEffect, useState } from 'react';
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import Login from './Login';
import ECommerceHome from './ECommerceHome';

const SignUp = () =>{
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // Check if passwords match when the password is updated
        setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // Check if passwords match when the confirm password is updated
        setPasswordsMatch(password === e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!passwordsMatch){
            alert("password not match!")
        }else{

            // Send a POST request to the Spring Boot backend
            const response = await fetch('http://localhost:8080/ehome/store', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            // Handle the response accordingly (e.g., display a success message)
            const result = await response.json();
            console.log(result.isStore);
            if (result.isStore) {
                navigate(`/ehome/${result.userId}` );
            }else{
                //if username exists in the db
                alert("username already exists, please change another one!");
            }
        }

    };

    

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input
                        type="email"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Repeat Password </label>
                    <input 
                        type="password" 
                        name="pass" 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange}
                        required 
                    />
                </div>
                    <div className="button-container">
                    <button type="submit">Submit</button>
                </div>
            </form>
            <li>
              <Link to="/">Login</Link>
            </li>
        </div>
    )
}

export default SignUp;