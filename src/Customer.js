import React from 'react'

const Customer = () => {
  return (
    <div>
    <div className="mainpages">
    <h2 style={{textAlign:"center",color:"red"}}>Customer Details</h2>
    <div class="card mb-4 seccard">
  <div class="card-body">
    <h4>Add|Update Customer Record</h4>
    <div class="container text-start">
  <div class="row">
    <div class="col">
        <label >Name</label><br></br>
      <input type="text" style={{borderRadius:"5px"}}></input>
    </div>
    <div class="col">
    <label>Mobile</label><br></br>
      <input type="text"style={{borderRadius:"5px"}}></input>
    </div>
    <div class="col">
    <label>Address</label><br></br>
      <input type="text"style={{borderRadius:"5px"}}></input>
    </div>
  </div>
 
</div>
<div className="container text-center mt-4">
<button className="btn btn-success" style={{textAlign:"center",margin:"auto",border:"none"}}>Add</button>
</div>

    
  </div>
</div>
      
</div>
    </div>
  )
}

export default Customer
