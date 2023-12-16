import React from 'react'

const Gheri = () => {
  return (
    <div>
        <div className="mainpages">
                <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Gheri Expenditure Details</h2>
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
                                    <label>Company</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class="col">
                                    <label>Quality</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class="col">
                                    <label >Price</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class=" col">
                                    <label>Catagory</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class=" col">
                                    <label>Paid</label><br></br>
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

export default Gheri
