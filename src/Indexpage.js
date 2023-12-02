import React, { useState } from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';


function Indexpage() {

  const [showNav, setShowNav] = useState(true)

  return <div className={`body-area${showNav ? ' body-pd' : ''}`}>
    <header className={`header${showNav ? ' body-pd' : ''}`}>
      <div className="header_toggle">
        <i
          className={`bi ${showNav ? 'bi-x' : 'bi-list'}`}
          onClick={() => setShowNav(!showNav)} />
      </div>
{/*       
      <a href="" target="_blank" className="nav_links">dashboard
            
            </a>
            <a href="" target="_blank" className="nav_links">
             dashboard
            </a>
            <a href="" target="_blank" className="nav_links">
              dashboard
            </a> */}
            <div className="header_img">
        <img
          src="../logologin.png" className='headimg'
           ></img>
          
      </div>
    </header>
    <div className={`l-navbar${showNav ? ' show' : ''}`}>
      <nav className="nav">
        <div>
          <a href="" target="_blank" className="nav_logo">
            {/* <i className='bi bi-alexa nav_logo-icon' /> <span className="nav_logo-name">Clue Mediator</span> */}
          </a>
          <div className="nav_list">
            <a href="" target="_blank" className="nav_link">
              <i className='bi bi-people nav_icon' /><span className="nav_name">Home</span>
            </a>
            <a href="" target="_blank" className="nav_link">
              <i className='bi bi-people nav_icon' /><span className="nav_name">Home</span>
            </a>
            <a href="" target="_blank" className="nav_link">
              <i className='bi bi-people nav_icon' /><span className="nav_name">Home</span>
            </a>
            <a href="" target="_blank" className="nav_link">
              <i className='bi bi-people nav_icon' /><span className="nav_name">Home</span>
            </a>
            <a href="" target="_blank" className="nav_link">
              <i className='bi bi-people nav_icon' /><span className="nav_name">Home</span>
            </a>
            <a href="" target="_blank" className="nav_link">
              <i className='bi bi-person-check nav_icon' /><span className="nav_name">Role</span>
            </a>
          </div>
        </div>
        <a href="" target="_blank" className="nav_link">
          <i className='bi bi-box-arrow-left nav_icon' /><span className="nav_name">SignOut</span>
        </a>
      </nav>
    </div>
    <div className="pt-4 pb-4 mt-4">
    {/* <div className="mainpage">
      <div class="row">
    <div class="col-sm-6 col-md-6">
        <h4 className='m-3'>customer collection pending

        </h4>
        <div class="card mb-4 cards">
  <div class="card-body">
    <div className='d-flex amount'>
        <h5>Customer Name</h5>
        <h5>Amount</h5>
    </div>
  </div>
</div>
      


    </div>
    <div class="col-sm-6 col-md-6">
    <h4 className='m-3'>Total Debt
</h4>
<div class="card cards">
  <div class="card-body">
  <div className='d-flex amount'>
        <h5>Bank/Investor</h5>
        <h5>Amount</h5>
    </div>
  </div>
</div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-sm-6 col-md-6-6">
        
      


    </div>
    <div class="col-sm-6 col-md-6">
    <h4 className='m-3'>customer collection pending
</h4>
<div class="card cards">
  <div class="card-body">
  <div className='d-flex amount'>
        <h5>Company/Thirdparty</h5>
        <h5>Amount</h5>
    </div>
  </div>
</div>
    </div>
  </div>
</div> */}
<div className="mainpages">
    <h2 style={{textAlign:"center",color:"red"}}>Customer Details</h2>
    <div class="card mb-4 seccard">
  <div class="card-body">
    <h4>Add|Update Customer Record</h4>
    <div class="container text-start">
  <div class="row">
    <div class="col-lg-4 col-md-12 col-sm-12">
        <label >Name</label><br></br>
      <input type="text" style={{borderRadius:"5px"}}></input>
    </div>
    <div class=" col-lg-4 col-md-12 col-sm-12">
    <label>Mobile</label><br></br>
      <input type="text"style={{borderRadius:"5px"}}></input>
    </div>
    <div class="col-lg-4 col-md-12 col-sm-12">
    <label>Address</label><br></br>
      <input type="text"style={{borderRadius:"5px"}}></input>
    </div>
  </div>
 
</div>
<div className="container text-center mt-4">
<button className="btn btn-success" style={{textAlign:"center",margin:"auto"}}>Add</button>
</div>

    
  </div>
</div>
      
</div>

      </div>
    </div>
 
}

export default  Indexpage;