import React from 'react'




const Mainpage = () => {
  
 
  return (
    <div>
      <div className="mainpages">
     <div className='container'>
     <div class="row">
    <div class=" col-sm-6 col-md-6">
        <h4 className='m-3'>customer collection pending

        </h4>
        <div class="  card mb-4 cards">
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
     </div>
  <div className='container'>
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
  </div>
</div> 
    </div>
  )
}

export default Mainpage
