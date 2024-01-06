import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Payment = () => {

    const [date, setDate] = useState();

    const [category, setCategory] = useState();
    const [employeename, setEmployeename] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState([]);
    const [product, setProduct] = useState([]);
    const [open, setOpen] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [employee, setEmployee] = useState([]);
  const [error, setError] = useState(false)

  const employeenamedetails = async () => {
    try {
      const result = await fetch('http://localhost:5500/employeeget',{
        
      });
      const data = await result.json();
      console.log(data);
      setEmployee(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setDate('');
    setCategory('');
    setEmployeename('');
    setAmount('');
    setDescription('');
          
  };

    const handleAddCustomer = async () => {
      if(!date || !employeename || !amount  || !category || !description)
      {
          setError(true);
          return false;
      } 
        try {
            const response = await fetch('http://localhost:5500/addpayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    date: date,
                    category: category,
                    employeename: employeename,
                    amount: amount,
                    description: description,

                }),
            });

            if (response.ok) {
                toast.success('Payment Details added successfully');
                setDate('');
    setCategory('');
    setEmployeename('');
    setAmount('');
    setDescription('');
          
                getproduct();
            } else {
                toast.error('Failed to add Payment Details');
            }
        } catch (error) {
            toast.error('Error adding payment Details');
        }
    };
    useEffect(() => {
        getproduct();
        employeenamedetails();
      }, []);
    
      const getproduct = async () => {
        try {
          const result = await fetch('http://localhost:5500/paymentget',{
            
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
          const result = await fetch(`http://localhost:5500/paymentdelete/${id}`, {
            
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
    
          const result = await fetch(`http://localhost:5500/paymentupdateget/${id}`, {
    
          });
    
    
          const data = await result.json();
    
    
          console.log(data);
    
    setDate(data.date);
    setCategory(data.category);
    setEmployeename(data.employeename);
    setAmount(data.amount);
    setDescription(data.description);
          
         
    setUpdateItemId(data._id);
          
        } catch (error) {
    
          console.error('Error fetching product details:', error);
        }
      };
      const handleUpdateCustomer = async () => {
        console.log(updateItemId);
        try {
          const response = await fetch(`http://localhost:5500/paymentupdate/${updateItemId}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              date: date,
              category: category,
              employeename: employeename,
              amount: amount,
              description: description,

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
                <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Payment Details</h2>
                <div class="container card mb-4 seccard">
                    <div class="card-body">
                        <h4 style={{ marginBottom: "25px" }}>Add|Update Payment Record</h4>
                        <div class="container text-start">
                            <div class="row">
                                <div class="col">
                                    <label >Date</label><br></br>
                                    <input type="Date" style={{ borderRadius: "5px", padding: "3px" }} value={date}
                                        onChange={(e) => setDate(e.target.value)}></input>
                                                          {error && !date &&  <span className="error">Enter Date</span>}

                                </div>
                                <div class=" col">
                                    <label>Catagory</label><br></br>
                                    <select name="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Select">Select Category</option>

                                        <option value="salry">Salary</option>
                                        <option value="others">Others</option>
                                        
                                    </select><br>
                                    
                                    
                                    
                                    
                                    </br>
                                    {error && !category &&  <span className="error">Enter Category</span>}


                                </div>
                                <div class="col">
                                    <label>Employee Name</label><br></br>
                                    <select  value={employeename} onChange={(e) => setEmployeename(e.target.value)} >
                                        <option>Select a product</option>
                                        {Array.from(new Set(employee.map((item) => item.name))).map((uniqueName) => (
    <option key={uniqueName} value={uniqueName}>
      {uniqueName}
    </option>
  ))}
                                    </select>
                                    {error && !employeename &&  <span className="error">Enter Employee Name</span>}

                                </div>
                                <div class="col">
                                    <label >Amount</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={amount}
                                        onChange={(e) => setAmount(e.target.value)}></input>
                                                          {error && !amount &&  <span className="error">Enter Amount</span>}

                                </div>
                                <div class=" col">
                                    <label>Description</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={description}
                                        onChange={(e) => setDescription(e.target.value)}></input>
                                                          {error && !description &&  <span className="error">Enter Description</span>}

                                </div>


                            </div>


                        </div>
                        <div className="container text-center mt-4">
                            <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }} onClick={handleAddCustomer}>Add</button>
                        </div>

                    </div>
                </div>
             <div className='container table-container'>
             <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Date</th>
        <th>Category</th>
        <th>Employee Name</th>
        <th>Amount</th>
        <th>Description</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
    {product.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
              <td>{item.date}</td>
              <td>{item.category}</td>
              <td>{item.employeename}</td>
              <td>{item.amount}</td>
              <td>{item.description}</td>
              <td style={{display:"flex",columnGap:"7px",justifyContent:"center"}}>
              <button className='btn btn-primary' style={{ marginRight: "5px" }} onClick={() => { handleDrawerOpen(); productdetails(item._id); }}>Edit</button>
                <button className='btn btn-danger'onClick={()=>deleteproduct(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
      
    </tbody>
  </table>
             </div>
             <Drawer anchor="right" open={open} onClose={handleDrawerClose} PaperProps={{ style: { width: 400 , marginLeft:"50px"} }}>
          <List>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText primary="Close" className='textdrawer' />

            </ListItem>
           <div className='textdrawer'>
           <div class="col">
                                    <label >Date</label><br></br>
                                    <input type="Date" style={{ borderRadius: "5px", padding: "3px" }} value={date}
                                        onChange={(e) => setDate(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>Catagory</label><br></br>
                                    <select name="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Select">Select Category</option>

                                        <option value="salry">Salary</option>
                                        <option value="others">Others</option>
                                        
                                    </select>

                                </div>
                                <div class="col">
                                    <label>Employee Name</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={employeename}
                                        onChange={(e) => setEmployeename(e.target.value)}></input>
                                </div>
                                <div class="col">
                                    <label >Amount</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={amount}
                                        onChange={(e) => setAmount(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>Description</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={description}
                                        onChange={(e) => setDescription(e.target.value)}></input>
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

export default Payment
