import React, { useState } from 'react';
import './Sign.css'; 
import {Link ,useNavigate} from 'react-router-dom';

const Sign = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email,mobile, password }),
      });

      const data = await result.json();
      console.log(data);
      localStorage.setItem('user',JSON.stringify(data.user));
       localStorage.setItem('token',JSON.stringify(data.auth));
       navigate('/indexpage/mainpage');  
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='signpage text-white'>
        <div className='text-center text-white signup mb-5'>
            <h1><b>Sign up Form</b></h1>
        </div>
    <div className='signbody'>
        
      <div className="signcard">
        <form  onSubmit={handleSubmit}>
            <div className="signform">
        <label>
            Username:
            <input
              className='formtext'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              className='formtext'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
           Mobile:
            <input
              className='formtext'
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              className='formtext'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className='signbtn' type="submit">Sign Up</button>
          <Link to="/loginn" className='text-center mt-4 link'>
            Already have Account
            </Link>
        </div>
        
        </form>
      </div>
    </div>
    </div>
  );
};

export default Sign;
