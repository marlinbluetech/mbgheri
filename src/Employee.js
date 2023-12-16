import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employee = () => {
  const [name, setName] = useState();
  const[doj,setDoj]=useState();
  const [designation, setDesignation] = useState();
  const [salary, setSalary] = useState();
  const [mobile, setMobile] = useState();
  const [worklocation, setWorklocation] = useState();
  const [address, setAddress] = useState();

  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:5000/addemployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          doj:doj,
          designation:designation,
          salary:salary,
          mobile: mobile,
          address: address,
          worklocation:worklocation,
         address:address
        }),
      });

      if (response.ok) {
        toast.success('Employee added successfully');
      } else {
        toast.error('Failed to add Employee');
      }
    } catch (error) {
      toast.error('Error adding Employee');
    }
  };
  return (
    <div>
      <div className="mainpages">
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Employee Details</h2>
        <div class="card mb-4 seccard">
          <div class="card-body">
            <h4>Add|Update Customer Record</h4>
            <div class="container text-center">
              <div class="row">
              <div class="col-lg-3 col-md-12 col-sm-12">
                  <label >Employee name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={name}
                    onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div class="col-lg-3 col-md-12 col-sm-12">
                  <label >Date</label><br></br>
                  <input type="Date" style={{ borderRadius: "5px" }} value={doj}
                    onChange={(e)=>setDoj(e.target.value)}></input>
                </div>
                <div class=" col-lg-3 col-md-12 col-sm-12">
                  <label>Designation</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={designation}
                    onChange={(e)=>setDesignation(e.target.value)}></input>
                </div>
                <div class="col-lg-3 col-md-12 col-sm-12">
                  <label>salary</label><br></br>
                  <input type="number" style={{ borderRadius: "5px" }} value={salary}
                    onChange={(e)=>setSalary(e.target.value)}></input>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-3 col-md-12 col-sm-12">
                  <label >mobile</label><br></br>
                  <input type="number" style={{ borderRadius: "5px" }} value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}></input>
                </div>
                <div class=" col-lg-3 col-md-12 col-sm-12">
                  <label>worklocation</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={worklocation}
                    onChange={(e)=>setWorklocation(e.target.value)}></input>
                </div>
                <div class="col-lg-3 col-md-12 col-sm-12">
                  <label>Address</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={address}
                    onChange={(e)=>setAddress(e.target.value)}></input>
                </div>
              </div>
              <div className="container text-center mt-4">
              <button
                className="btn btn-success"
                onClick={handleAddCustomer}
                style={{ textAlign: "center", margin: "auto" }}
              >
                Add
              </button>
            </div>

            </div>


          </div>
        </div>

      </div>
      <ToastContainer />

    </div>
  )
}

export default Employee
