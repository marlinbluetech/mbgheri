import React from 'react'

const Return = () => {
  return (
    <div>
      <div className="mainpages">
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Return List</h2>
        <div class="card mb-4 seccard">
          <div class="card-body">
            <h4>Add|Update Customer Record</h4>
            <div class="container text-start">
              <div class="row">
                <div class="col">
                  <label >Date</label><br></br>
                  <input type="Date" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class=" col">
                  <label>Mobile</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
                <div class="col">
                  <label>Address</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}></input>
                </div>
              </div>

            </div>

            <div className="container text-start mt-4">
              <div classname=" row">
                <div classname="col">
                  <select value="season">
                    <option value="1">s1</option>
                    <option value="1">s2</option>
                    <option value="1">s3</option>
                    <option value="1">s4</option>
                    <option value="1">s5</option>
                    <option value="1">s6</option>
                    <option value="1">s7</option>
                    <option value="1">s8</option>
                    <option value="1">s9</option>
                    <option value="1">s10</option>
                    <option value="1">s11</option>
                    <option value="1">s11</option>

                  </select>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Return
