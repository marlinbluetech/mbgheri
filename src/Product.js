import React,{useState} from 'react'
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
                            <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }}>Add</button>

                        </div>

                    </div>
                </div>

            </div>
            <ToastContainer />
    </div>
  )
}

export default Product
