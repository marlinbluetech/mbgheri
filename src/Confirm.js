import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Confirm = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      
      const result = await fetch('http://localhost:5500/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mobile: mobile,
        newPassword: password, 
        confirmPassword: confirmPassword, 
          }),
      });

      const data = await result.json();
      console.log(data);

      if (data.success) {
       
        navigate('/loginn');
      } else {
       
        alert('Password reset failed. Please check your mobile number and try again.');
      }
    } catch (error) {
      console.error('Error submitting forgot password form:', error);
    }
  };

  return (
    <div className='signpage text-white'>
      <div className='text-center text-white signup mb-5'>
        <h1><b>Forgot Password</b></h1>
      </div>
      <div className='signbody'>
        <div className="signcard">
          <form onSubmit={handleForgotPassword}>
            <div className="signform">
              <label>
                Mobile:
                <input
                  className='formtext'
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </label>
              <label className='mt-3'>
                New Password:
                <input
                  className='formtext'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <label className='mt-3'>
                Confirm Password:
                <input
                  className='formtext'
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
              <button className='signbtn mt-3' type="submit">Submit</button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
