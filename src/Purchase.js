import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Purchase = () => {
    const[date,setDate]=useState();
    const[itemname,setItemname]=useState();
    const[company,setCompany]=useState();

    const[quantity,setQuantity]=useState();
    const[price,setPrice]=useState();
    const[category,setCategory]=useState();
    const [paid, setPaid] = useState([]);
     const [product, setProduct] = useState([]);

   
    const handleAddCustomer = async () => {
      try {
        const response = await fetch('http://localhost:5000/addpurchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date:date,
            itemname:itemname,
            company:company,
            quantity:quantity,
            price:price,
            category:category,
            paid:paid
          }),
        });
    
        if (response.ok) {
          toast.success('Purchase Details added successfully');
  
          console.log('Customer added successfully');
        } else {
          toast.error('Failed to add Purchase Details');
  
          console.error('Failed to add Purchase Details');
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
          const result = await fetch('http://localhost:5000/purchaseget',{
            
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
          const result = await fetch(`http://localhost:5000/purchasedelete/${id}`, {
            
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
                <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Purchase Details</h2>
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
                                    <label>Item Name</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={itemname}
                    onChange={(e)=>setItemname(e.target.value)}></input>
                                </div>
                                <div class="col">
                                    <label>Company Name</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={company}
                    onChange={(e)=>setCompany(e.target.value)}></input>
                                </div>
                                <div class="col">
                                    <label>Quantity</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}></input>
                                </div>
                                <div class="col">
                                    <label >Price/unit</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={price}
                    onChange={(e)=>setPrice(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>Catagory</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={category}
                    onChange={(e)=>setCategory(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>Paid</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={paid}
                    onChange={(e)=>setPaid(e.target.value)}></input>
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
        <th>Date</th>
        
        <th>Item Name</th>
        <th>Company</th>
        <th>Quantity</th>
        <th>Price/Unit</th>
        <th>Category</th>
        <th>Paid</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
    {product.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
              <td>{item.date}</td>
              <td>{item.itemname}</td>
              <td>{item.company}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.paid}</td>
   
              <td>
              <button className='btn btn-primary'style={{marginRight:"5px"}}>Edit</button>
                <button className='btn btn-danger' onClick={()=>deleteproduct(item._id)}>Delete</button>
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

export default Purchase
