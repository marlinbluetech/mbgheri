import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Credit = () => {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [amount, setAmount] = useState();
  const [product, setProduct] = useState([]);

  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:5000/addcreditpending', {
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
      const result = await fetch('http://localhost:5000/creditpendingget',{
        
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
      const result = await fetch(`http://localhost:5000/creditpendingdelete/${id}`, {
        
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
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Credit & Collection PendingList</h2>
        <div class="card mb-4 seccard">
          <div class="card-body">
            <h4>Add|Update Customer Record</h4>
            <div class="container text-start">
              <div class="row">
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

export default Credit
