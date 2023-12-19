import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Return = () => {
  const [date, setDate] = useState();
  const [customer, setCustomer] = useState();
  const [season, setSeason] = useState();
  const [item, setItem] = useState();
  const [quantity, setQuantity] = useState();
  const [product, setProduct] = useState([]);
  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:5000/addreturnlist', {
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
      } else {
        toast.error('Failed to add Return List');
      }
    } catch (error) {
      toast.error('Error adding Return List');
    }
  };
  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    try {
      const result = await fetch('http://localhost:5000/returnlistget',{
        
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
      const result = await fetch(`http://localhost:5000/returnlistdelete/${id}`, {
        
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
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Return List</h2>
        <div class="card mb-4 seccard">
          <div class="card-body">
            <h4>Add|Update Customer Record</h4>
            <div class="container text-start">
              <div class="row">
                <div class="col">
                  <label >Date</label><br></br>
                  <input type="Date" style={{ borderRadius: "5px" }} value={date}
                    onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div class="col">
                  <label >Customer Name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={customer}
                    onChange={(e) => setCustomer(e.target.value)}></input>
                </div>
                <div className='col md-5'>
                  <label >Season</label><br></br>
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
  )
}

export default Return
