import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom';

const Loginn = () => {
    
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      if ( !password ||!mobile || mobile.length > 10 || mobile.length < 10) {
        setError(true);
        return false;
      }
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
 <div className='container signpage'>
     <div className='text-center text-white  signup mb-5'>
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
            Mobile:</label>
            <input
              className='formtext'
              type="mobile"
              autocomplete="off"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {error && !mobile  && mobile!==10 &&  <span className="error">Enter valid Number</span>}
          <label className='mt-3'>
            Password:</label>
            <input
              className='formtext'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          {error && !password &&  <span className="error">Enter password</span>}
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
