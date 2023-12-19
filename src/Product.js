import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
    const [name, setName] = useState();
  const[category,setCategory]=useState();
  const [packsize, setPacksize] = useState();
  const [mrp, setMrp] = useState();
  const [purprice, setPurprice] = useState();
  const [discount, setDiscount] = useState();
  const [companyname, setCompanyname] = useState();
  const [dealername, setDealername] = useState();
  const [product, setProduct] = useState([]);

  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:5000/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          category:category,
          packsize:packsize,
          mrp:mrp,
          purprice:purprice,
          discount:discount,
          companyname:companyname,
          dealername:dealername

        }),
      });

      if (response.ok) {
        toast.success('Product added successfully');
      } else {
        toast.error('Failed to add Product');
      }
    } catch (error) {
      toast.error('Error adding Product');
    }
  };
  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    try {
      const result = await fetch('http://localhost:5000/productlistget',{
        
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
      const result = await fetch(`http://localhost:5000/productlistdelete/${id}`, {
        
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
                                    <label >Product Name</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px", padding: "3px" }}value={name}
                    onChange={(e)=>setName(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>Catagory</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={category}
                    onChange={(e)=>setCategory(e.target.value)}></input>
                                </div>
                                <div class="col">
                                    <label>pack size</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={packsize}
                    onChange={(e)=>setPacksize(e.target.value)}></input>
                                </div>
                                <div class="col">
                                    <label >MRP</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={mrp}
                    onChange={(e)=>setMrp(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>Purchase Price</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={purprice}
                    onChange={(e)=>setPurprice(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>MB Discount</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={discount}
                    onChange={(e)=>setDiscount(e.target.value)}></input>
                                </div>


                            </div>
                            <div class="row">
                                <div class="col-lg-2 col-md-12 col-sm-12">
                                    <label >Company Name</label><br></br>
                    
                                    <input type="text" style={{ borderRadius: "5px", padding: "3px" }}value={companyname}
                    onChange={(e)=>setCompanyname(e.target.value)}></input>
                                </div>
                                <div class=" col-lg-2 col-md-12 col-sm-12">
                                    <label>Dealer Name</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={dealername}
                    onChange={(e)=>setDealername(e.target.value)}></input>
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
        <th>Category</th>
        <th>Pack Size</th>
        <th>MRP</th>
        <th>Purchase Price</th>
        <th>Discount</th>
        <th>Company name</th>
        <th>Dealer name</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
    {product.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.packsize}</td>
              <td>{item.mrp}</td>
           
              <td>{item.purprice}</td>
              <td>{item.discount}</td>
              <td>{item.companyname}</td>
              <td>{item.dealername}</td>
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

export default Product
