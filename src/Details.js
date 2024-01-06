import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {  Link } from 'react-router-dom';
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
    const[date,setDate]=useState('');
    const[cashflow,setCashflow]=useState('');
    const[seasons,setSeasons]=useState('');
    const[amount,setAmount]=useState('');
    const[remark,setRemark]=useState('');
    const[payment,setPayment]=useState([]);
    const { _id } = useParams();
    const productdetails = async () => {
        try {
          const result = await fetch(`http://localhost:5500/customerupdateget/${_id}`);
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
        getpaymentdetails();
     
      }, []); 
   

  const adddiscount = async () => {
try {
      const response = await fetch('http://localhost:5500/adddiscount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({
            slno:_id,
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
  const addpayment = async () => {
    try {
          const response = await fetch('http://localhost:5500/adddpaymenthistory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
             
            },
            body: JSON.stringify({
                slno:_id,
             date:date,
             amount:amount,
             seasons:seasons,
             cashflow:cashflow,
             remark:remark
            }),
          });
    
          if (response.ok) {
            toast.success('Discount added successfully');
          getpaymentdetails();
    
           
          } else {
            toast.error('Failed to add Discount');
    
            
          }
        } catch (error) {
          console.error( error);
        }
      };
      const getpaymentdetails = async () => {
        try {
            const result = await fetch('http://localhost:5500/paymenthistoryget');
            const getdataArray = await result.json();
        
            console.log('Received data:', getdataArray);
        
            const matchingObjectid = getdataArray.filter(item => item.slno === _id);
        
            if (matchingObjectid.length > 0) {
              setPayment(matchingObjectid);
            } else {
              console.log('No matching IDs found. Data will not be displayed.');
            }
          } catch (error) {
            console.error('Error fetching discount data:', error);
          }
      };

  const companynamedetails = async () => {
    try {
      const result = await fetch('http://localhost:5500/companyget', {

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
      const result = await fetch('http://localhost:5500/productlistget', {

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
      const result = await fetch('http://localhost:5500/extradiscountget');
      const dataArray = await result.json();
  
      console.log('Received data:', dataArray);
  
      const matchingObjects = dataArray.filter(item => item.slno === _id);
  
      if (matchingObjects.length > 0) {
        setProduct(matchingObjects);
      } else {
        console.log('No matching IDs found. Data will not be displayed.');
      }
    } catch (error) {
      console.error('Error fetching discount data:', error);
    }
  };
  
  return (
    <div>
     <div className='mainpages'>

     <h2 className='text-center'>Details for {name}</h2>
   <div className='text-center'>
   <Link to={`/specific/${_id}`} style={{textDecoration:"none",height:"40px",width:"40px",backgroundColor:"skyblue",color:"white",padding:"6px",borderRadius:"5px"}}>Generate</Link>
   </div>
        <div className='row'>
            <div className='col-lg-5 mt-5'>
            <div className='container table-container'>
        <table className='table table-bordered table-striped'>
        <thead>
    <tr>
      <th scope="col">Item</th>
      <th scope="col">Quantity</th>
      <th scope="col">Amount</th>
     
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Seeds</th>
      <td>0</td>
      <td>0.00</td>
     
    </tr>
    <tr>
      <th scope="row">Feeds</th>
      <td>0</td>
      <td>0.00</td>
    
    </tr>
    <tr>
      <th scope="row">Chemicals</th>
      <td>0</td>
      <td>0.00</td>
    </tr>
     <tr>
      <th scope="row">Mechinery</th>
      <td>0</td>
      <td>0.00</td>
    </tr>
    </tbody>
  </table>
        </div>
           
            </div>
            <div className='col-lg-7'>
            <div >
               
                <div class="card mb-4 seccard"style={{marginTop:"40px"}}>
                    <div class="card-body">
                        <h4 style={{ marginBottom: "15px" }}>Add|Update Customer Record</h4>
                        <div class="container text-start mb-4">
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label >Payment Date</label><br></br>
                                    <input type="date" style={{ borderRadius: "5px" }} value={date} onChange={(e) => setDate(e.target.value)}></input>
                                </div>
                                <div class=" col-lg-4 col-md-12 col-sm-12">
                                   
                                    <label>Season</label><br></br>
                                    <select value={seasons}
                    onChange={(e) => setSeasons(e.target.value)}>
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
                                    <label>Amount</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={amount} onChange={(e) => setAmount(e.target.value)}></input>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label>Casflow</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={cashflow} onChange={(e) => setCashflow(e.target.value)}></input>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label>Remark</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={remark} onChange={(e) => setRemark(e.target.value)}></input>
                                </div>
                            </div>

                        </div>
                        <div className="container text-center mt-4">
                            <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }} onClick={addpayment}>Add</button>
                        </div>



                    </div>
                    
                </div>
                <h4>Customer Payment History</h4>
                <div className='container table-container'>
        <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Date</th>
        <th>Season</th>
        <th>cashflow</th>
        <th>Amount</th>
        <th>Remark</th>
        
      </tr>
    </thead>
    <tbody>
    {payment.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
           <td>{item.date}</td>
           <td>{item.seasons}</td>
           <td>{item.cashflow}</td>
           <td>{item.amount}</td>
           <td>{item.remark}</td>
            </tr>
          ))}
      
    </tbody>
  </table>
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



