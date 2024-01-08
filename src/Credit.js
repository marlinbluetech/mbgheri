import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
const Credit = () => {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [amount, setAmount] = useState();
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [error, setError] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setName('');
    setType('');
    setAmount('');
    getproduct();
  };

  const handleAddCustomer = async () => {
    if (!name || !type || !amount ) {
      setError(true);
      return false;
    }
    try {
      const response = await fetch('http://localhost:5500/addcreditpending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        name:name,
        type:type,
        amount:amount
        }),
      });

      if (response.ok) {
        toast.success('credit added successfully');
        setName('');
        setType('');
        setAmount('');
        getproduct();
      } else {
        toast.error('Failed to add credit');
      }
    } catch (error) {
      toast.error('Error adding credit');
    }
  };
  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    try {
      const result = await fetch('http://localhost:5500/creditpendingget',{
        
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
      const result = await fetch(`http://localhost:5500/creditpendingdelete/${id}`, {
        
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

      const result = await fetch(`http://localhost:5500/creditpendingupdateget/${id}`, {

      });


      const data = await result.json();


      console.log(data);
      setName(data.name);
      setType(data.type);
      setAmount(data.amount);

      setUpdateItemId(data._id); 
    } catch (error) {

      console.error('Error fetching product details:', error);
    }
  };
  const handleUpdateCustomer = async () => {
    console.log(updateItemId);
    try {
      const response = await fetch(`http://localhost:5500/creditpendingupdate/${updateItemId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:name,
          type:type,
          amount:amount
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
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Credit & Collection PendingList</h2>
        <div class="container card mb-4 seccard">
          <div class="card-body">
            <h4 className='mb-4'>Add Credit/Loan Details</h4>
            <div class="container text-center">
              <div class="row">
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <label >Name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}value={name}
                    onChange={(e)=>setName(e.target.value)}></input>
                                      {error && !name &&  <span className="error">Enter valid Name</span>}

                </div>
                <div class=" col-lg-4 col-md-12 col-sm-12">
                  <label>Type</label><br></br>
                  <select name="Category" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="Select">Select Category</option>

                                        <option value="credit">credit</option>
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="receive">Receive</option>
                                    
                                        
                                    </select>
                                    {error && !type &&  <span className="error">Enter valid Type</span>}

                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <label>Amount</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}value={amount}
                    onChange={(e)=>setAmount(e.target.value)}></input>
                                      {error && !amount &&  <span className="error">Enter valid Amount</span>}

                </div>
              </div>



            </div>
            <div className="container text-center mt-4">
              <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }}onClick={handleAddCustomer}>Add</button>
            </div>


          </div>
        </div>
        <div className='container table-container'>
        <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Name</th>
        <th>Type</th>
        <th>Amount</th>
      
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
    {product.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.amount}</td>
             
              <td style={{display:"flex",columnGap:"7px",justifyContent:"center"}}>
              <button className='btn btn-primary' style={{ marginRight: "5px" }} onClick={() => { handleDrawerOpen(); productdetails(item._id); }}>Edit</button>

                <button className='btn btn-danger'onClick={()=>deleteproduct(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
      
    </tbody>
  </table>
        </div>
        <Drawer anchor="right" open={open} onClose={handleDrawerClose} PaperProps={{ style: { width: 400 } }}>
          <List>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText primary="Close" />

            </ListItem>
            <div class="col-lg-4 col-md-12 col-sm-12">
                  <label >Name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}value={name}
                    onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div class=" col-lg-4 col-md-12 col-sm-12">
                  <label>Type</label><br></br>
                  <select name="Category" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="Select">Select Category</option>

                                        <option value="credit">credit</option>
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="receive">Receive</option>
                                    
                                        
                                    </select>
                </div>
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <label>Amount</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }}value={amount}
                    onChange={(e)=>setAmount(e.target.value)}></input>
                </div>
            <div>
              <button className='btn btn-success' onClick={handleUpdateCustomer}>Update</button>
            </div>
           
          </List>
        </Drawer>

      </div>
      <ToastContainer/>
    </div>
  )
}

export default Credit
