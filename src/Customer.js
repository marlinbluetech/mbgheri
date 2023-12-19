import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customer = () => {
  const[name,setName]=useState();
  const[mobile,setMobile]=useState();
  const[address,setAddress]=useState();
  const [product, setProduct] = useState([]);
  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:5000/adduser', {
        method: 'POST',
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
        toast.success('User added successfully');

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
      const result = await fetch('http://localhost:5000/userget',{
        
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
      const result = await fetch(`http://localhost:5000/userdelete/${id}`, {
        
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
  

  return (
    <div>
      <div className="mainpages">
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Customer Details</h2>
        <div className="card mb-4 seccard">
          <div className="card-body">
            <h4>Add|Update Customer Record</h4>
            <div className="container text-center">
              <div className="row">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <label>Name</label><br />
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    style={{ borderRadius: "5px" }}
                  />
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <label>Mobile</label><br />
                  <input
                    type="text"
                    name="mobile"
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                    style={{ borderRadius: "5px" }}
                  />
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <label>Address</label><br />
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}
                    style={{ borderRadius: "5px" }}
                  />
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
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.mobile}</td>
              <td>{item.address}</td>
              <td>
              <button className='btn btn-primary'style={{marginRight:"5px"}}>Edit</button>
                <button className='btn btn-danger'onClick={()=>deleteproduct(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
      
    </tbody>
  </table>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default Customer;
