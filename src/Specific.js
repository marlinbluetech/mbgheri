import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Specific = () => {

  const { _id } = useParams();
  const[name,setName]=useState();
  const[mobile,setMobile]=useState();
  const[address,setAddress]=useState();
  
  const [customerData, setCustomerData] = useState(null);
  const [catchData, setCatchData] = useState(null)
  const[discount,setDiscount]=useState([]);
  const productdetails = async () => {
    try {
      const result = await fetch(`http://localhost:5000/customerupdateget/${_id}`);
      const data = await result.json();
      console.log(data);
      setName(data.name);
      setMobile(data.mobile);
      setAddress(data.address);
    } catch (error) {
      console.error('Error fetching product details:', error);
   
    }
  };
  const getproduct = async () => {
    try {
      const result = await fetch(`http://localhost:5000/user/${_id}`);
      const data = await result.json();
      console.log(data);
      setCustomerData(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const getcatchproduct = async () => {
    try {
      const result = await fetch(`http://localhost:5000/catch/${_id}`);
      const data = await result.json();
      console.log(data);
      setCatchData(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  useEffect(() => {
    productdetails();
    getproduct();
    getcatchproduct();
    getdiscountdetails();
  }, []); 
  const getdiscountdetails = async () => {
    try {
      const result = await fetch('http://localhost:5000/extradiscountget', {

      });
      const data = await result.json();
      console.log(data);
      setDiscount(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  return (
    <div>
     <h3>Name:{name}</h3> 
    <h3>Mobile:{mobile}</h3>
    <h3>Address:{address}</h3>
    <h4 className='text-center'>Return List</h4>
    <div className='container table-container'>
        <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Date</th>
        <th>Customer name</th>
      
        <th>Item</th>
        <th>Quantity</th>
      
      </tr>
    </thead>
    <tbody>
   
    {customerData && customerData.customer && customerData.returnDetails && (
  <>
    {customerData.returnDetails.map((item, index) => (
      <React.Fragment key={index}>
        <td>{index+1}</td>
       
        <td>{item.date}</td>
        <td>{item.customer}</td>
        <td>{item.item}</td>
        <td>{item.quantity}</td>
      </React.Fragment>
    ))}
  </>
)}

       
    </tbody>
  </table>
        </div>
       <h4 className='text-center'>Catch Details</h4>
        <div className='container table-container'>
        <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Date</th>
        <th>Quantity</th>
        <th> Pilling Quantity</th>
        <th> Dc Qty</th>
        <th>Count</th>
      
        <th>Market price</th>
      
        {/* <th>Operation</th> */}
      </tr>
    </thead>
    <tbody>
   
    {catchData && catchData.customer && catchData.catchDetails && (
  <tr>
    {catchData.catchDetails.map((item, index) => (
      <React.Fragment key={index}>
        <td>{index+1}</td>
       
        <td>{item.date}</td>
        <td>{item.quantity}</td>
        <td>{item.pillingcount}</td>
        <td>{item.dcqty}</td>

        <td>{item.count}</td>
        <td>{item.marketprice}</td>
       
      </React.Fragment>
    ))}
  </tr>
)}

       
    </tbody>
  </table>
        </div>
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
    {discount.map((item, index) => (
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

  );
};

export default Specific;
