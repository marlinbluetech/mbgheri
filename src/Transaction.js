import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Transaction = () => {
    const [date, setDate] = useState();

    const [cashflow, setCashflow] = useState();
    const [amount, setAmount] = useState();
    const [purpose, setPurpose] = useState([]);
    const [type, setType] = useState([]);
   
    const [description, setDescription] = useState([]);
    const [product, setProduct] = useState([]);
    const handleAddCustomer = async () => {
        try {
          const response = await fetch('http://localhost:5000/addtransaction', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             date:date,
             cashflow:cashflow,
             amount:amount,
             purpose:purpose,
             type:type,
             description:description
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
      useEffect(() => {
        getproduct();
      }, []);
    
      const getproduct = async () => {
        try {
          const result = await fetch('http://localhost:5000/transactionget',{
            
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
          const result = await fetch(`http://localhost:5000/transactiondelete/${id}`, {
            
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
                <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Transaction Details</h2>
                <div class="card mb-4 seccard">
                    <div class="card-body">
                        <h4 style={{ marginBottom: "25px" }}>Add|Update Customer Record</h4>
                        <div class="container text-start">
                            <div class="row">
                                <div class="col">
                                    <label >Date</label><br></br>
                                    <input type="Date" style={{ borderRadius: "5px", padding: "3px" }}value={date}
                    onChange={(e)=>setDate(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>Cash flow</label><br></br>
                                    <select name="Category" value={cashflow} onChange={(e) => setCashflow(e.target.value)}>
                                    <option value="Select">Select</option>

                                        <option value="salry">Receive</option>
                                        <option value="paid">Paid</option>
                                        
                                    </select>                            
                                       </div>
                                <div class="col">
                                    <label>Amount</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={amount}
                    onChange={(e)=>setAmount(e.target.value)}></input>
                                </div>
                                <div class="col">
                                    <label >Purpose</label><br></br>
                                   <select name="Category" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
                                    <option value="Select">Select</option>

                                        <option value="diesel">Diesel</option>
                                        <option value="Engine oil">Engine oil</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Salary">Salary</option>
                                        <option value="feed purchase">Feed Purchase</option>
                                        <option value="medicine purchase">Madicine purchase</option>
                                        <option value="chemical purchase">Chemical Purchase</option>
                                        <option value="machinery">Mechinery</option>
                                        <option value="maintainance">maintainance</option>
                                        <option value="grocery vegetable">Grocery Vegetable</option>
                                        <option value="home">home</option>
                                        <option value="catch">catch</option>
                                        <option value="farmer">Farmer</option>
                                        <option value="other">other</option>
                                        
                                        
                                    </select>
                                </div>
                                <div class=" col">
                                    <label>Type</label><br></br>
                                    <select name="Category" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="Select">Select Category</option>

                                        <option value="gheri">Gheri</option>
                                        <option value="poultry">poultry</option>
                                        <option value="personal">Personal</option>
                                        
                                    </select>
                                </div>
                                <div class=" col">
                                    <label>Description</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={description} onChange={(e) => setDescription(e.target.value)}></input>
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
        <th>cashflow</th>
     
        <th>Amount</th>
        <th>Purpose</th>
        <th>Type</th>
        <th>Description</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
    {product.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
              <td>{item.date}</td>
              <td>{item.cashflow}</td>
              <td>{item.amount}</td>
              <td>{item.purpose}</td>
              <td>{item.type}</td>
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
            <ToastContainer/>
    </div>
  )
}

export default Transaction
