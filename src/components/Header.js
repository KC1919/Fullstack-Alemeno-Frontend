import React from 'react'
import { Link } from 'react-router-dom';
import { serverUrl } from '../constants';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {

  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await fetch(`${serverUrl}/auth/logout`, {
        method: "GET",
        credentials: 'include'
      });

      const jsonResp = await response.json();

      if (jsonResp.success === true) {
        alert(jsonResp.message);
        localStorage.setItem('isAuthenticated','false');
        navigate('/login');
      }
      else{
        alert(`${jsonResp.message}\n${jsonResp.error}`);
      }
    } catch (error) {
      console.log("failed to logout, server error");
      alert("Failed to logout");
    }
  }

  return (
    <div className='header-div' style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.5rem" }}>
      <h2> </h2>
      <h2>{props.content}</h2>
      <div>
      {localStorage.getItem('isAuthenticated')=='false'?
        <Link to='/login' className='btn btn-primary'>Sign in</Link>
        :<button className='btn btn-primary' onClick={logout}>Sign out</button>
      }
      </div>
    </div>
  )
}

export default Header;