import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link} from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
const Customer = () => {
  const [name, setName] = useState();
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState();
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
    setMobile('');
    setAddress('');

  };

  const handleAddCustomer = async () => {

    if (!name || !mobile || !address || mobile.length > 10 || mobile.length < 10) {
      setError(true);
      return false;
    }
    try {
      const response = await fetch('http://localhost:5500/adduser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
        body: JSON.stringify({
          name: name,
          mobile: mobile,
          address: address,
        }),
      });

      if (response.ok) {
        toast.success('User added successfully');
        getproduct();
        setName('');
        setMobile('');
        setAddress('');

        console.log('Customer added successfully');
      } else {
        toast.error('Failed to add user');

        console.error('Failed to add customer');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };
  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    try {
      const result = await fetch('http://localhost:5500/userget', {
 headers: {
          'Content-Type': 'application/json',
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
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
      const result = await fetch(`http://localhost:5500/userdelete/${id}`, {

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
      const result = await fetch(`http://localhost:5500/customerupdateget/${id}`);
      const data = await result.json();
      console.log(data);

      if (data && data.name && data.mobile && data.address) {
        setName(data.name);
        setMobile(data.mobile);
        setAddress(data.address);

        setUpdateItemId(data._id);
      } else {
        console.error('Incomplete or missing data in the response:', data);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };



  const handleUpdateCustomer = async () => {
    console.log(updateItemId);
    try {
      const response = await fetch(`http://localhost:5500/customerupdate/${updateItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          name: name,
          mobile: mobile,
          address: address,
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
  console.log('First product item:', product[0]);


  return (
    <div>
      <div className=" mainpages">
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Customer Details</h2>
        <div className=" container card mb-4 seccard">
          <div className="card-body">
            <h4 className='mb-4'>Add|Update Customer Record</h4>
            <div className="container text-center">
              <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <label>Name</label><br />
                  <input
                    type="text"
                    name="name"
                    autocomplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ borderRadius: "5px" }}
                  />
               {error && !name &&  <span className="error">Enter valid Name</span>}

                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <label>Mobile</label><br />
                  <input
                    type="text"
                    name="mobile"
                    autocomplete="off"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    style={{ borderRadius: "5px" }}
                  />
                 {error && !mobile  && mobile!==10 &&  <span className="error">Enter valid Number</span>}

                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <label>Address</label><br />
                  <input
                    type="text"
                    name="address"
                    autocomplete="off"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ borderRadius: "5px" }}
                  />
                 {error && !address &&  <span className="error">Enter Address</span>}

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
                <th>Name</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (

                <tr key={item._id} >
                  <td>{index + 1}</td>
                  <td>  <Link to={`/indexpage/details/${item._id}`}style={{textDecoration:"none"}}>{item.name}</Link>
</td>
                  <td>{item.mobile}</td>
                  <td>{item.address}</td>
                  <td style={{display:"flex",columnGap:"7px",justifyContent:"center"}}>
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
              <ListItemText primary="Close" className='textdrawer' />

            </ListItem>
            <div className='textdrawer'>
            <div >
              <label>Name</label><br />
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ borderRadius: "5px" ,textAlign:"center"}}
              />
              {error && !name && <span className="error">Enter valid Name</span>}

            </div>
            <div>
              <label>Mobile</label><br />
              <input
                type="text"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                style={{ borderRadius: "5px",textAlign:"center" }}
              />
              {error && (!mobile || mobile.length !== 10) && <span className="error">Enter valid Mobile Number</span>}

            </div>
            <div>
              <label>Address</label><br />
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ borderRadius: "5px",textAlign:"center" }}
              />
              {error && !address && <span className="error">Enter valid Address</span>}

            </div>
            <div className='mt-4 '>
              <button className='btn btn-success' onClick={handleUpdateCustomer}>Update</button>
            </div>
            </div>

          </List>
        </Drawer>
      </div>
      <ToastContainer />

    </div>
  );
};

export default Customer;
