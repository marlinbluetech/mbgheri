import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Headd = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
  
  const handlechange = () =>{
    if(mail==="smruti@gmail.com" && password==="smruti123"){
        navigate('/indexpage/mainapge');
      
       alert("sucessfully Login")
      
      

    }
    else{
      alert("invalid mail or password")
    }
  }
  return (
    <div>
  <Router>
  <div className="container" >
    <div className="login" >
      <img src="../logologin.png" className="logo"></img>
    <form className="smruti">
    
  <div className=" mail">
    
    <input type="email" value={mail} onChange={(e)=>setMail(e.target.value)} class="form-control" id="exampleInputEmail1" placeholder="Enter Email" aria-describedby="emailHelp"></input>
    
  </div>
  <div class="mb-2" className="mail">
    
    <input type="password"value={password}onChange={(e)=>setPassword(e.target.value)} class="form-control" placeholder="Enter Password" id="exampleInputPassword1"></input>
  </div>
  <div class="mb-2">
  <button type="submit" class="btn submit" onClick={handlechange}>Submit</button>
 
  </div>
</form>
    </div>
   </div>
  </Router>
      
    </div>
  )
}

export default Headd
