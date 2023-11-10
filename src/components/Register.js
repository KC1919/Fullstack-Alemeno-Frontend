import React, { useState } from 'react';
import { serverUrl } from '../constants';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate=useNavigate();

    const handleFormSubmit = async (e) => {
        try {

            e.preventDefault();
            const name=document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch(`${serverUrl}/auth/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': serverUrl,
                    'Access-Control-Allow-Credentials': true
                },
                body: JSON.stringify({name:name, email: email, password: password })
            });

            const jsonResp = await response.json();
            if(jsonResp.success==true){
                navigate('/login');
            }
            else{
                console.log(jsonResp.message);
                alert(jsonResp.message);
            }

        } catch (error) {
            console.log("Failed to register", error);
            alert("Failed to register, server error");
        }
    }

    return (
        <>
            <div style={{ textAlign: "center", width: "100vw", margin: "1rem auto" }}><h2>Sign up</h2></div>
            <div className='form-div' style={{ width: "30vw", margin: "1rem auto" }}>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Full Name</label>
                        <input type="email" className="form-control" id="name" placeholder="Enter email" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" />
                    </div>
                    <br />
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ margin: "2rem auto" }} onClick={handleFormSubmit}>Sign up</button>
                </form>
                <div className=''>
                    <p><em>Already have an account?</em></p>
                    <Link to="/login" type="submit" className="btn btn-primary btn-sm" style={{ margin: "1rem auto" }} >Sign in</Link>
                </div>
            </div>
        </>
    )
}

export default Register;