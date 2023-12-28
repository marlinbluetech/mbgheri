import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';




const Gheri = () => {

  const [date, setDate] = useState();
  const [name, setName] = useState();
  const [season, setSeason] = useState();
  const [amount, setAmount] = useState();
  const [purpose, setPurpose] = useState();
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);
  const[customer,setCustomer]=useState([]);
  const customernamedetails = async () => {
    try {
      const result = await fetch('http://localhost:5000/userget', {

      });
      const data = await result.json();
      console.log(data);
      setCustomer(data);
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
    setName('');
    setSeason('');
    setAmount('');
    setPurpose('');

  };

  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:5000/addgheriexpenditure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          name: name,

          season: season,
          amount: amount,
          purpose: purpose
        }),
      });

      if (response.ok) {
        toast.success('Employee added successfully');
       
      setDate('');
      setName('');
      setSeason('');
      setAmount('');
      setPurpose('');

      } else {
        toast.error('Failed to add Employee');
      }
    } catch (error) {
      toast.error('Error adding Employee');
    }
  };

  useEffect(() => {
    getproduct();
    customernamedetails();
  }, []);

  const getproduct = async () => {
    try {
      const result = await fetch('http://localhost:5000/gheriexpenditureget', {

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
      const result = await fetch(`http://localhost:5000/gheriexpendituredelete/${id}`, {

        method: 'DELETE',
      });

      const data = await result.json();
      console.log(data);
      if (data) {
        getproduct();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const productdetails = async (id) => {
    try {

      const result = await fetch(`http://localhost:5000/gheriexpenditureupdateget/${id}`, {

      });


      const data = await result.json();


      console.log(data);


      setDate(data.date);
      setName(data.name);
      setSeason(data.season);
      setAmount(data.amount);
      setPurpose(data.purpose);
      setUpdateItemId(data._id); 
    } catch (error) {

      console.error('Error fetching product details:', error);
    }
  };

  
  const handleUpdateCustomer = async () => {
    console.log(updateItemId);
    try {
      const response = await fetch(`http://localhost:5000/gheriexpenditureupdate/${updateItemId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          name: name,
          season: season,
          amount: amount,
          purpose: purpose,
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
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Gheri Expenditure Details</h2>
        <div class="card mb-4 seccard">
          <div class="card-body">
            <h4 style={{ marginBottom: "25px" }}>Add|Update Customer Record</h4>
            <div class="container text-start">
              <div class="row">
                <div class="col">
                  <label >Date</label><br></br>
                  <input type="Date" style={{ borderRadius: "5px", padding: "3px" }} value={date}
                    onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div class=" col">
                  <label>Customer Name</label><br></br>
                  <select  value={name} onChange={(e) => setName(e.target.value)} >
                                        <option>Select a product</option>
                                        {customer.map((item) => (
                                            <option key={item._id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                </div>
                <div class="col">
                  <label>Season</label><br></br>
                  <select value={season}
                    onChange={(e) => setSeason(e.target.value)}>
                    <option value="s1">s1</option>
                    <option value="s2">s2</option>
                    <option value="s3">s3</option>
                    <option value="s4">s4</option>
                    <option value="s5">s5</option>
                    <option value="s6">s6</option>
                    <option value="s7">s7</option>
                    <option value="s8">s8</option>
                    <option value="s9">s9</option>


                  </select>
                </div>
                <div class="col">
                  <label >Amount</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={amount}
                    onChange={(e) => setAmount(e.target.value)}></input>
                </div>
                <div class=" col">
                  <label>Purpose</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}></input>
                </div>


              </div>


            </div>
            <div className="container text-center mt-4">
              <button className='btn btn-success'
                style={{ textAlign: "center", margin: "auto" }} onClick={handleAddCustomer}>Add</button>
            </div>

          </div>
        </div>
        <div className='container table-container'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Date</th>
                <th>Gheri Name</th>
                <th>Season</th>
                <th>Amount</th>
                <th>Purpose</th>

                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr key={item._id} >
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.name}</td>

                  <td>{item.season}</td>
                  <td>{item.amount}</td>

                  <td>{item.purpose}</td>

                  <td>
                    <button className='btn btn-primary' style={{ marginRight: "5px" }} onClick={() => { handleDrawerOpen(); productdetails(item._id); }}>Edit</button>
                    <button className='btn btn-danger' onClick={() => deleteproduct(item._id)}>Delete</button>
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
            <div class="col">
              <label >Date</label><br></br>
              <input type="Date" style={{ borderRadius: "5px", padding: "3px" }} value={date}
                onChange={(e) => setDate(e.target.value)}></input>
            </div>
            <div class=" col">
              <label>Customer Name</label><br></br>
              <input type="text" style={{ borderRadius: "5px" }} value={name}
                onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div class="col">
              <label>Season</label><br></br>
              <select value={season}
                onChange={(e) => setSeason(e.target.value)}>
                <option value="s1">s1</option>
                <option value="s2">s2</option>
                <option value="s3">s3</option>
                <option value="s4">s4</option>
                <option value="s5">s5</option>
                <option value="s6">s6</option>
                <option value="s7">s7</option>
                <option value="s8">s8</option>
                <option value="s9">s9</option>


              </select>
            </div>
            <div class="col">
              <label >Amount</label><br></br>
              <input type="text" style={{ borderRadius: "5px" }} value={amount}
                onChange={(e) => setAmount(e.target.value)}></input>
            </div>
            <div class=" col">
              <label>Purpose</label><br></br>
              <input type="text" style={{ borderRadius: "5px" }} value={purpose}
                onChange={(e) => setPurpose(e.target.value)}></input>
            </div>
            <div>
              <button className='btn btn-success' onClick={handleUpdateCustomer}>Update</button>
            </div>
           
          </List>
        </Drawer>

      </div>
      <ToastContainer />
    </div>
  )
              }
  
export default Gheri
