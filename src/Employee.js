import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const Employee = () => {
  const [name, setName] = useState();
  const[doj,setDoj]=useState();
  const [designation, setDesignation] = useState();
  const [salary, setSalary] = useState();
  const [mobile, setMobile] = useState();
  const [worklocation, setWorklocation] = useState();
  const [address, setAddress] = useState();
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);
  const[error,setError]=useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setName('');
    setDoj('');
    setDesignation('');
    setSalary('');
    setWorklocation('');
    setAddress('');
    setMobile('');
  };

  const handleAddCustomer = async () => {
    
    if(!name || !doj || !designation || !address||mobile.length > 10 || mobile.length < 10 || !salary )
    {
        setError(true);
        return false;
    } 
    try {
      const response = await fetch('http://localhost:5500/addemployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

        },
        body: JSON.stringify({
          name: name,
          doj:doj,
          designation:designation,
          salary:salary,
          mobile: mobile,
          address: address,
          worklocation:worklocation,
        
        }),
      });

      if (response.ok) {
        toast.success('Employee added successfully');
        setName('');
setDoj('');
setDesignation('');
setSalary('');
setWorklocation('');
setAddress('');
setMobile('');
        getproduct();
      } else {
        toast.error('Failed to add Employee');
      }
    } catch (error) {
      toast.error('Error adding Employee');
    }
  };
  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    try {
      const result = await fetch('http://localhost:5500/employeeget',{
        
      });
      const data = await result.json();
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const deleteproduct = async (id) => {
    try {
      const result = await fetch(`http://localhost:5500/employeedelete/${id}`, {
        
        method: 'DELETE', 
      });
  
      const data = await result.json();
      console.log(data);
      if(data){
        getproduct();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const productdetails = async (id) => {
    try {

      const result = await fetch(`http://localhost:5500/employeeupdateget/${id}`, {

      });


      const data = await result.json();


      console.log(data);

setName(data.name);
setDoj(data.doj);
setDesignation(data.designation);
setSalary(data.salary);
setWorklocation(data.worklocation);
setAddress(data.address);
setMobile(data.mobile);
    
      setUpdateItemId(data._id); 
    } catch (error) {

      console.error('Error fetching product details:', error);
    }
  };

  
  const handleUpdateCustomer = async () => {
    console.log(updateItemId);
    try {
      const response = await fetch(`http://localhost:5500/employeeupdate/${updateItemId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify({
         name:name,
         doj:doj,
         designation:designation,
         salary:salary,
         mobile:mobile,
         address:address,
         worklocation:worklocation

        }),
      });

      if (response.ok) {
        toast.success('Record updated successfully');
        handleDrawerClose(); 
        getproduct(); 
      } else {
        toast.error('Failed to update record');
      }
    } catch (error) {
      toast.error('Error updating record');
    }
  };

  return (
    <div>
      <div className="mainpages">
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Employee Details</h2>
        <div class="container card mb-4 seccard">
          <div class="card-body">
            <h4 className='mb-4'>Add|Update Employee Record</h4>
            <div class="container text-center">
              <div class="row">
              <div class="col-lg-3 col-md-12 col-sm-12">
                  <label >Employee name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={name}
                    onChange={(e)=>setName(e.target.value)}></input>
                      {error && !name && <span className="error">Enter valid Name</span>}
                </div>
                <div class="col-lg-3 col-md-12 col-sm-12">
                  <label >Date</label><br></br>
                  <input type="Date" style={{ borderRadius: "5px" }} value={doj}
                    onChange={(e)=>setDoj(e.target.value)}></input>
                      {error && !doj  && <span className="error">Enter valid DOJ</span>}
                </div>
                <div class=" col-lg-3 col-md-12 col-sm-12">
                  <label>Designation</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={designation}
                    onChange={(e)=>setDesignation(e.target.value)}></input>
                      {error && !designation && <span className="error">Enter valid Designation</span>}
                </div>
                <div class="col-lg-3 col-md-12 col-sm-12">
                  <label>salary</label><br></br>
                  <input type="number" style={{ borderRadius: "5px" }} value={salary}
                    onChange={(e)=>setSalary(e.target.value)}></input>
                      {error && !salary && <span className="error">Enter valid Salary</span>}
                </div>
              </div>
              <div class="row">
                <div class="col-lg-3 col-md-12 col-sm-12">
                  <label >mobile</label><br></br>
                  <input type="number" style={{ borderRadius: "5px" }} value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}></input>
                     {error && !mobile && mobile.length!=10 && <span className="error">Enter valid Address</span>}
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
                   {error && !address &&  <span className="error">Enter valid Address</span>}
                   {error && !address && mobile.length!=10 && <span className="error">Enter valid Address</span>}

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
        <div className='container table-container'>
        <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Name</th>
        <th>DOJ</th>
        <th>Designation</th>
        <th>Salary</th>
        <th>Mobile</th>
        <th>Work Location</th>
        <th>Address</th>
        
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
    {product.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.doj}</td>
              <td>{item.designation}</td>
              <td>{item.salary}</td>
           
              <td>{item.mobile}</td>
              <td>{item.worklocation}</td>
              <td>{item.address}</td>
              <td style={{display:"flex",columnGap:"7px",justifyContent:"center"}}>
              <button className='btn btn-primary' style={{ marginRight: "5px" }} onClick={() => { handleDrawerOpen(); productdetails(item._id); }}>Edit</button>
                <button className='btn btn-danger' onClick={()=>deleteproduct(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
      
    </tbody>
  </table>
        </div>
        <Drawer anchor="right" open={open} onClose={handleDrawerClose} PaperProps={{ style: { width: 400 } }}>
          <List>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText primary="Close" className='textdrawer'/>

            </ListItem>
            <div className='textdrawer'> 
            <div class="col">
                  <label >Employee Name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={name}
                    onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div class="col">
                  <label >Date</label><br></br>
                  <input type="Date" style={{ borderRadius: "5px" }} value={doj}
                    onChange={(e)=>setDoj(e.target.value)}></input>
                </div>
                <div class=" col">
                  <label>Designation</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={designation}
                    onChange={(e)=>setDesignation(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>salary</label><br></br>
                  <input type="number" style={{ borderRadius: "5px" }} value={salary}
                    onChange={(e)=>setSalary(e.target.value)}></input>
                </div>
              
                <div class="col">
                  <label >mobile</label><br></br>
                  <input type="number" style={{ borderRadius: "5px" }} value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}></input>
                </div>
                <div class=" col">
                  <label>worklocation</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={worklocation}
                    onChange={(e)=>setWorklocation(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Address</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={address}
                    onChange={(e)=>setAddress(e.target.value)}></input>
                </div>
            <div>
              <button className='btn btn-success' onClick={handleUpdateCustomer}>Update</button>
            </div>
          
            </div>
          </List>
        </Drawer>


      </div>
      <ToastContainer />

    </div>
  )
}

export default Employee
