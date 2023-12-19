import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = () => {

    const [date, setDate] = useState();

    const [category, setCategory] = useState();
    const [employeename, setEmployeename] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState([]);
    const [product, setProduct] = useState([]);

    const handleAddCustomer = async () => {
        try {
            const response = await fetch('http://localhost:5000/addpayment', {
                method: 'POST',
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
                toast.success('Payment Details added successfully');
            } else {
                toast.error('Failed to add Payment Details');
            }
        } catch (error) {
            toast.error('Error adding payment Details');
        }
    };
    useEffect(() => {
        getproduct();
      }, []);
    
      const getproduct = async () => {
        try {
          const result = await fetch('http://localhost:5000/paymentget',{
            
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
          const result = await fetch(`http://localhost:5000/paymentdelete/${id}`, {
            
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
                <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Payment Details</h2>
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

export default Payment
