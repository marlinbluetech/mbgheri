import React from 'react'

const Catch = () => {
  return (
    <div>
        <div className="mainpages">
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Customer Details</h2>
        <div class="card mb-4 seccards">
          <div class="card-body">
            <h4>Add|Update Customer Record</h4>
            <div class="container text-start">
              <div class="row">
              <div class="col">
                  <label>Date</label><br></br>
                  <input type="date" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class="col">
                  <label >Customer</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class=" col">
                  <label>Season</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class="col">
                  <label>Quantity</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class="col">
                  <label>Count</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label >pilling count</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class=" col">
                  <label>Dc Qty</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class="col">
                  <label>Extra qty</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class="col">
                  <label>Market price</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class="col">
                  <label>Party price</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
              </div>
              <div class="row">
              <div class="col-lg-3">
                  <label>Party Name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class="col-lg-3">
                  <label>Party Paid</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                
              </div>

            </div>
            <div className="container text-center mt-4">
              <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }}>Add</button>
            </div>


          </div>
        </div>

      </div>
    </div>
  )
}

export default Catch
