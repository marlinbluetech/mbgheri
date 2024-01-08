import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Confirm = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if ( !password ||!mobile || mobile.length > 10 || mobile.length < 10 || !confirmPassword) {
      setError(true);
      return false;
    }

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
    <div className='signpage '>
      <div className='text-center  signup mb-5'>
        <h1><b>Forgot Password</b></h1>
      </div>
      <div className='signbody'>
        <div className="signcard">
          <form onSubmit={handleForgotPassword}>
            <div className="signform">
              <label>
                Mobile:  </label>
                <input
                  className='formtext'
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                    {error && !mobile  && mobile!==10 &&  <span className="error">Enter valid Number</span>}
            
              <label className='mt-3'>
                New Password:  </label>
                <input
                  className='formtext'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  {error && !password &&  <span className="error">Enter password</span>}
            
              <label className='mt-3'>
                Confirm Password:  </label>
                <input
                  className='formtext'
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              {error && !confirmPassword &&  <span className="error">Enter Confirm password</span>}
              <button className='signbtn mt-3' type="submit">Submit</button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
