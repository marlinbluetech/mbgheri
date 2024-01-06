import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';

const Loginn = () => {
    
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const result = await fetch('http://localhost:5500/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mobile, password }),
        });
  
        const data = await result.json();
        console.log(data);
        if (data.auth) {
            localStorage.setItem('user',JSON.stringify(data.user));
            localStorage.setItem('token',JSON.stringify(data.auth));
            navigate('/indexpage/mainpage');  
       
          } else {
            alert("invalid Input");
          }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
   
  
  return (
 <div className='signpage text-white'>
     <div className='text-center  text-white signup mb-5'>
            <h1><b>Login Form</b></h1>
        </div>
     <div className='signbody'>
      <div className="signcard">
      <div className=" text-center logoimg">
            
            <img src="../logologin.png"  style={{width:"150px",height:"100px"}} />
          </div>
        <form  onSubmit={handleSubmit}>
            <div className="signform">
        
          <label>
            mobile:
            <input
              className='formtext'
              type="mobile"
              autocomplete="off"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </label>
          <label className='mt-3'>
            Password:
            <input
              className='formtext'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <Link to="/confirm" className='text-left link' style={{textDecoration:"none"}}>
            Forgot Password
            </Link>
          <button className='signbtn mt-3' type="submit">Login</button>
          <Link to="/" className='text-center mt-4 link'style={{textDecoration:"none"}}>
            No Account
            </Link>
        </div>
        
        </form>
      </div>
    </div>
 </div>
  )
}

export default Loginn
