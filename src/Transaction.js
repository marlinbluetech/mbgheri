import React from 'react'

const Transaction = () => {
  return (
    <div>
      <div className="mainpages">
                <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Transaction Details</h2>
                <div class="card mb-4 seccard">
                    <div class="card-body">
                        <h4 style={{ marginBottom: "25px" }}>Add|Update Customer Record</h4>
                        <div class="container text-start">
                            <div class="row">
                                <div class="col">
                                    <label >Date</label><br></br>
                                    <input type="Date" style={{ borderRadius: "5px", padding: "3px" }}></input>
                                </div>
                                <div class=" col">
                                    <label>Cash flow</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class="col">
                                    <label>Amount</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class="col">
                                    <label >Purpose</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class=" col">
                                    <label>Type</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class=" col">
                                    <label>Description</label><br></br>
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

export default Transaction
