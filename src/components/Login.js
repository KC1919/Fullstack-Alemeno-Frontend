import React, { useState } from 'react';
import { serverUrl } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate=useNavigate();
    const [isAuthenticated, setAuthenticated] = useState(false);

    const handleFormSubmit = async (e) => {
        try {

            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch(`${serverUrl}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': serverUrl,
                    'Access-Control-Allow-Credentials': true
                },
                body: JSON.stringify({ email: email, password: password })
            });

            const jsonResp = await response.json();
            if(jsonResp.success==true){
                setAuthenticated(true);
                localStorage.setItem('isAuthenticated','true');
                navigate('/');
            }
            else{
                console.log(jsonResp.message);
                alert(jsonResp.message);
            }

        } catch (error) {
            console.log("Failed to login", error);
            alert("Failed to login, server error");
        }
    }

    return (
        <>
            <div style={{ textAlign: "center", width: "100vw", margin: "1rem auto" }}><h2>Sign in</h2></div>
            <div className='form-div' style={{ width: "30vw", margin: "1rem auto" }}>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ margin: "2rem auto" }} onClick={handleFormSubmit}>Sign in</button>
                </form>
                <div className=''>
                    <p><em>Don't have an account?</em></p>
                    <Link to="/register" type="submit" className="btn btn-primary btn-sm" style={{ margin: "1rem auto" }} >Sign up</Link>
                </div>
            </div>
        </>
    )
}

export default Login;