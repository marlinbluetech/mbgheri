import React from 'react'

const Sales = () => {
  return (
    <div>
      <div className='  mainpages'>
            <h2 style={{ textAlign: "center", color: "blue", paddingTop: "20px" }}>Spot sales Dashboard</h2>
            <form style={{ paddingTop: "100px" }} className='container'>
                <div>
                    <label style={{ paddingTop: "10px" }}>Date</label><br></br>
                    <input type="date" style={{ borderRadius: "5px", marginTop: "10px",border:"1px solid grey" }}></input>

                </div>
                <div>
                    <label style={{ paddingTop: "10px" }} >Customer Name</label><br></br>
                    <input type="text" style={{ borderRadius: "5px", marginTop: "10px" ,border:"1px solid grey"}}></input>

                </div>
                <div>
                    <label style={{ paddingTop: "10px" }}>Mobile</label><br></br>
                    <input type="text" style={{ borderRadius: "5px", marginTop: "10px",border:"1px solid grey" }}></input>

                </div>

            </form>
        </div>
    </div>
  )
}

export default Sales
