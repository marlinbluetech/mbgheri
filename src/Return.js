import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Return = () => {
  const [date, setDate] = useState();
  const [customer, setCustomer] = useState();
  const [season, setSeason] = useState();
  const [item, setItem] = useState();
  const [quantity, setQuantity] = useState();
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);
  const [customername, setCustomername] = useState([]);
  const [itemdeatils, setItemdeatils] = useState([]);
  const [error, setError] = useState(false)
  const customernamedetails = async () => {
    try {
      const result = await fetch('http://localhost:5500/userget', {

      });
      const data = await result.json();
      console.log(data);
      setCustomername(data);
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
    setCustomer('');
    setSeason('');
    setItem('');
    setQuantity('')
  };
  const handleAddCustomer = async () => {
    if (!date || !customer ||!season  || !item || !quantity  ) {
      setError(true);
      return false;
    }
    try {
      const response = await fetch('http://localhost:5500/addreturnlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          customer: customer,
          season: season,
          item: item,
          quantity: quantity
        }),
      });

      if (response.ok) {
        toast.success('Return List added successfully');
        setError(false);
        setDate('');
     setCustomer('');
     setSeason('');
     setItem('');
     setQuantity('')
     getproduct();
      } else {
        toast.error('Failed to add Return List');
      }
    } catch (error) {
      toast.error('Error adding Return List');
    }
  };
  useEffect(() => {
    getproduct();
    customernamedetails();
    itemnamedetails();
  }, []);

  const getproduct = async () => {
    try {
      const result = await fetch('http://localhost:5500/returnlistget',{
        
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
      const result = await fetch(`http://localhost:5500/returnlistdelete/${id}`, {
        
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

      const result = await fetch(`http://localhost:5500/returnlistupdateget/${id}`, {

      });


      const data = await result.json();


      console.log(data);
     setDate(data.date);
     setCustomer(data.customer);
     setSeason(data.season);
     setItem(data.item);
     setQuantity(data.quantity)

      setUpdateItemId(data._id); 
    } catch (error) {

      console.error('Error fetching product details:', error);
    }
  };
  const handleUpdateCustomer = async () => {
    console.log(updateItemId);
    try {
      const response = await fetch(`http://localhost:5500/returnlistupdate/${updateItemId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         date:date,
         customer:customer,
         season:season,
         item:item,
         quantity:quantity
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
  const itemnamedetails = async () => {
    try {
        const result = await fetch('http://localhost:5500/purchaseget', {

        });
        const data = await result.json();
        console.log(data);
        setItemdeatils(data);
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
};
  return (
    <div>
      <div className="mainpages">
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Return List</h2>
        <div class="container card mb-4 seccard">
          <div class="card-body">
            <h4 className='mb-4'>Add|Update Return Record</h4>
            <div class="container text-center">
              <div class="row">
                <div class="col">
                  <label >Date</label><br></br>
                  <input type="Date" style={{ borderRadius: "5px" }} value={date}
                    onChange={(e) => setDate(e.target.value)}></input><br></br>
                    {error && !date &&  <span className="error">Enter Date</span>}
                </div>
                <div class="col">
                  <label >Customer Name</label><br></br>
                  <select  value={customer} onChange={(e) => setCustomer(e.target.value)} >
                                        <option>Select a product</option>
                                        {Array.from(new Set(customername.map((item) => item.name))).map((uniqueName) => (
    <option key={uniqueName} value={uniqueName}>
      {uniqueName}
    </option>
  ))}
                                    </select><br></br>
                                    {error && !customer &&  <span className="error">Enter Name</span>}
                </div>
                <div className='col md-5'>
                  <label >Season</label><br></br>
                  <select value={season}
                    onChange={(e) => setSeason(e.target.value)}>
                          <option >select Season</option>
                    <option value="s1">s1</option>
                    <option value="s2">s2</option>
                    <option value="s3">s3</option>
                    <option value="s4">s4</option>
                    <option value="s5">s5</option>
                    <option value="s6">s6</option>
                    <option value="s7">s7</option>
                    <option value="s8">s8</option>
                    <option value="s9">s9</option>
                    <option value="s10">s10</option>
                    <option value="s11">s11</option>
                    <option value="s12">s12</option>

                  </select><br></br>
                  {error && !season &&  <span className="error">Enter Season</span>}
                </div>
                <div class="col">
                <label >Item Name</label><br></br>
                                    <select value={item} onChange={(e) => setItem(e.target.value)}>
                                        <option>Select a product</option>
                                        {Array.from(new Set(itemdeatils.map((item) => item.
                                            itemname
                                        ))).map((uniqueName) => (
                                            <option key={uniqueName} value={uniqueName}>
                                                {uniqueName}
                                            </option>
                                        ))}
                                    </select><br></br>
                                    {error && !item &&  <span className="error">Enter Item</span>}
                </div>
                <div class="col">
                  <label >Quantity</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}></input><br></br>
                    {error && !quantity &&  <span className="error">Enter Quantity</span>}
                </div>
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
        <div className='container table-container'>
        <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Date</th>
        <th>Customer name</th>
        <th>Season</th>
        <th>Item</th>
        <th>Quantity</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
    {product.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
              <td>{item.date}</td>
              <td>{item.customer}</td>
              <td>{item.season}</td>
              <td>{item.item}</td>
              <td>{item.quantity}</td>
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
              <ListItemText primary="Close" className='textdrawer'/>

            </ListItem>
           
            
          <div className='textdrawer'>
          <div class="col">
                  <label >Date</label><br></br>
                  <input type="Date" style={{ borderRadius: "5px" }} value={date}
                    onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div class="col">
                  <label >Customer Name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={customer}
                    onChange={(e) => setCustomer(e.target.value)}></input>
                </div><br></br>
                <div className='col md-5'>
                  <label >Season</label><br></br>
                  <select value={season}
                    onChange={(e) => setSeason(e.target.value)}>
                      <option 
                      
                      >select Season</option>
                    <option value="s1">s1</option>
                    <option value="s2">s2</option>
                    <option value="s3">s3</option>
                    <option value="s4">s4</option>
                    <option value="s5">s5</option>
                    <option value="s6">s6</option>
                    <option value="s7">s7</option>
                    <option value="s8">s8</option>
                    <option value="s9">s9</option>
                    <option value="s10">s10</option>
                    <option value="s11">s11</option>
                    <option value="s12">s11</option>

                  </select>
                </div>
                <div class="col">
                  <label >Item</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={item}
                    onChange={(e) => setItem(e.target.value)}></input>
                </div>
                <div class="col">
                  <label >Quantity</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}></input>
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

export default Return
