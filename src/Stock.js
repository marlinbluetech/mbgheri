import React from 'react'

const Stock = () => {
    return (
        <div>
            <div className="mainpages">
                <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Stock Details</h2>
                <div class="card mb-4 seccard">
                    <div class="card-body">
                        <h4 style={{ marginBottom: "15px" }}>Add|Update Customer Record</h4>
                        <div class="container text-start mb-4">
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label >Name</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class=" col-lg-4 col-md-12 col-sm-12">
                                    <label>Mobile</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label>Address</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                            </div>

                        </div>
                        <div className="container text-center mt-4">
                            <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }}>Add</button>
                        </div>



                    </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", columnGap: "100px" }}>
                    <div>
                        <select style={{ padding: "7px", marginLeft: "15px", marginTop: "10px" }}>
                            <option>select</option>
                            <option>Item</option>
                            <option>Company</option>
                        </select>
                    </div>

                    <form class="d-flex" role="search" style={{ marginTop: "10px" }}>
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-primary" type="submit">Search</button>
                    </form>
                </div>

            </div>



        </div>
    )
}

export default Stock
