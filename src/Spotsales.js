import React from 'react'

const Spotsales = () => {
    return (
        <div className='  mainpages'>
            <h2 style={{ textAlign: "center", color: "blue", paddingTop: "20px" }}>Spot sales Dashboard</h2>
            <form style={{ paddingTop: "100px" }} className='container'>
                <div>
                    <label style={{ paddingTop: "10px" }}>Date</label><br></br>
                    <input type="date" style={{ borderRadius: "5px", marginTop: "10px",border:"2px solid black" }}></input>

                </div>
                <div>
                    <label style={{ paddingTop: "10px" }} >Customer Name</label><br></br>
                    <input type="text" style={{ borderRadius: "5px", marginTop: "10px" ,border:"2px solid black"}}></input>

                </div>
                <div>
                    <label style={{ paddingTop: "10px" }}>Mobile</label><br></br>
                    <input type="text" style={{ borderRadius: "5px", marginTop: "10px",border:"2px solid black" }}></input>

                </div>

            </form>
        </div>
    )
}

export default Spotsales
