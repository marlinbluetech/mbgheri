import React from 'react'

const Credit = () => {
  return (
    <div>
      <div className="mainpages">
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Credit & Collection PendingList</h2>
        <div class="card mb-4 seccard">
          <div class="card-body">
            <h4>Add|Update Customer Record</h4>
            <div class="container text-start">
              <div class="row">
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <label >Name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class=" col-lg-4 col-md-12 col-sm-12">
                  <label>Type</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <label>Amount</label><br></br>
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

export default Credit
