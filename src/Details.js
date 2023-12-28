import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Details = () => {
    const[name,setName]=useState();
    const[category,setCategory]=useState('');
    const [company, setCompany] = useState('');
    const[categorydetails,setCategorydeatils]=useState([]);
    const[companydeatils,setCompanydeatils]=useState([]);
    const[product,setProduct]=useState([]);
    const[season,setSeason]=useState('');
    const[discount,setDiscount]=useState('');
    const { _id } = useParams();
    const productdetails = async () => {
        try {
          const result = await fetch(`http://localhost:5000/customerupdateget/${_id}`);
          const data = await result.json();
          console.log(data);
          setName(data.name);
          
        } catch (error) {
          console.error('Error fetching product details:', error);
       
        }
      };
    
      useEffect(() => {
        productdetails();
        companynamedetails();
        categorynamedetails();
        getproduct();
     
      }, []); 
   

  const adddiscount = async () => {
try {
      const response = await fetch('http://localhost:5000/adddiscount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({
            id:_id,
         category:category,
         company:company,
         season:season,
         discount:discount
        }),
      });

      if (response.ok) {
        toast.success('Discount added successfully');
      
setCategory('');
setCompany('');
setSeason('');
setDiscount('');
       
      } else {
        toast.error('Failed to add Discount');

        
      }
    } catch (error) {
      console.error( error);
    }
  };

  const companynamedetails = async () => {
    try {
      const result = await fetch('http://localhost:5000/companyget', {

      });
      const data = await result.json();
      console.log(data);
      setCompanydeatils(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const categorynamedetails = async () => {
    try {
      const result = await fetch('http://localhost:5000/productlistget', {

      });
      const data = await result.json();
      console.log(data);
      setCategorydeatils(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const getproduct = async () => {
    try {
      const result = await fetch('http://localhost:5000/extradiscountget', {

      });
      const data = await result.json();
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  return (
    <div>
     <div className='mainpages'>

     <h2 className='text-center'>Details for {name}</h2>
   <div className='text-center'>
   <Link to={`/indexpage/specific/${_id}`}>Generate</Link>
   </div>
        <div className='row'>
            <div className='col-lg-5'>

            </div>
            <div className='col-lg-7'>
            <div className="">
               
                <div class="card mb-4 seccard">
                    <div class="card-body">
                        <h4 style={{ marginBottom: "15px" }}>Add|Update Customer Record</h4>
                        <div class="container text-start mb-4">
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label >Payment Date</label><br></br>
                                    <input type="date" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class=" col-lg-4 col-md-12 col-sm-12">
                                    <label>Season</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label>Amount</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label>Casflow</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label>Remark</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}></input>
                                </div>
                            </div>

                        </div>
                        <div className="container text-center mt-4">
                            <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }}>Add</button>
                        </div>



                    </div>
                </div>
                

            </div>  
            <h4 className="text-center mt-5">Extra Discount To Customer</h4>
            <div className="">
               
                <div class="card mb-4 seccard" style={{marginTop:"7px"}}>
                    <div class="card-body">
                        
                        <div class="container text-start mb-4">
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label >Category</label><br></br>
                                    <select  value={category} onChange={(e) => setCategory(e.target.value)} >
                                        <option>Select a product</option>
                                        {categorydetails.map((item) => (
                                            <option key={item._id} value={item.category}>{item.category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div class=" col-lg-4 col-md-12 col-sm-12">
                                    <label>Company Name</label><br></br>
                                    <select  value={company} onChange={(e) => setCompany(e.target.value)} >
                                        <option>Select a product</option>
                                        {companydeatils.map((item) => (
                                            <option key={item._id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>

                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
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
                    <option value="s10">s10</option>
                    <option value="s11">s11</option>
                    <option value="s12">s11</option>

                  </select>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label>Discount</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={discount}
                    onChange={(e) => setDiscount(e.target.value)}></input>
                                </div>
                               
                            </div>

                        </div>
                        <div className="container text-center mt-4">
                            <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }} onClick={adddiscount}>Add</button>
                        </div>



                    </div>
                </div>
                

            </div> 
            <h3>Extra Discount Details</h3>
            <div className='container table-container'>
        <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Category</th>
        <th>Company</th>
        <th>Season</th>
        <th>Discount</th>
        
      </tr>
    </thead>
    <tbody>
    {product.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
           <td>{item.category}</td>
           <td>{item.company}</td>
           <td>{item.season}</td>
           <td>{item.discount}</td>
            </tr>
          ))}
      
    </tbody>
  </table>
        </div>
            </div>
           
        </div>
     </div>
     <ToastContainer></ToastContainer>
   
    </div>
  )
}

export default Details



