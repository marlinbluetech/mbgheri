import React from 'react'

const Spotsales = () => {
    return (
        <div className='  mainpages'>
            <h2 style={{ textAlign: "center", color: "blue", paddingTop: "20px" }}>Spot sales Dashboard</h2>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8 col-md-12 col-sm-12'>
                        <form style={{ paddingTop: "100px" }} className='container'>
                            <div>
                                <label style={{ paddingTop: "10px" }}>Date</label><br></br>
                                <input type="date" style={{ borderRadius: "5px", marginTop: "10px", border: "2px solid black" }}></input>

                            </div>
                            <div>
                                <label style={{ paddingTop: "10px" }} >Customer Name</label><br></br>
                                <input type="text" style={{ borderRadius: "5px", marginTop: "10px", border: "2px solid black" }}></input>

                            </div>
                            <div>
                                <label style={{ paddingTop: "10px" }}>Mobile</label><br></br>
                                <input type="text" style={{ borderRadius: "5px", marginTop: "10px", border: "2px solid black" }}></input>

                            </div>

                        </form>
                        <div className='row'>
    <div className='col-lg-2'>
        <div>
            <label style={{ paddingTop: "10px" }}>Date</label><br></br>
            <input type="text" style={{ borderRadius: "5px", marginTop: "10px", border: "2px solid black", marginRight: "4px" }}></input>
        </div>
    </div>
    <div className='col-lg-2'>
        <div>
            <label style={{ paddingTop: "10px" }}>Date</label><br></br>
            <input type="text" style={{ borderRadius: "5px", marginTop: "10px", border: "2px solid black", marginRight: "4px" }}></input>
        </div>
    </div>
    <div className='col-lg-2'>
        <div>
            <label style={{ paddingTop: "10px" }}>Date</label><br></br>
            <input type="text" style={{ borderRadius: "5px", marginTop: "10px", border: "2px solid black", marginRight: "40px" }}></input>
        </div>
    </div>
    <div className='col-lg-2'>
        <div>
            <label style={{ paddingTop: "10px" }}>Date</label><br></br>
            <input type="text" style={{ borderRadius: "5px", marginTop: "10px", border: "2px solid black", marginRight: "40px" }}></input>
        </div>
    </div>
    <div className='col-lg-2'>
        <div>
            <button className="btn btn-success">Add</button>
        </div>
    </div>
</div>

                    </div>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <form style={{ paddingTop: "100px" }} className='container'>
                            <div>
                                <label style={{ paddingTop: "10px" }}>Date</label><br></br>
                                <input type="date" style={{ borderRadius: "5px", marginTop: "10px", border: "2px solid black" }}></input>

                            </div>
                            <div>
                                <label style={{ paddingTop: "10px" }} >Customer Name</label><br></br>
                                <input type="text" style={{ borderRadius: "5px", marginTop: "10px", border: "2px solid black" }}></input>

                            </div>
                            <div>
                                <label style={{ paddingTop: "10px" }}>Mobile</label><br></br>
                                <input type="text" style={{ borderRadius: "5px", marginTop: "10px", border: "2px solid black" }}></input>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Spotsales
