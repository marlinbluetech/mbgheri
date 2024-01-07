import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Specific = () => {

  const { _id } = useParams();
  const[name,setName]=useState();
  const[mobile,setMobile]=useState();
  const[address,setAddress]=useState();
  const[payment,setPayment]=useState([]);
  const [customerData, setCustomerData] = useState(null);
  const [catchData, setCatchData] = useState(null)
  const[discount,setDiscount]=useState([]);
  const [gheridata, setGheridata] = useState([]);
  const handlePrintClick = (event) => {
    event.preventDefault();
    window.print();
  };
  
  const productdetails = async () => {
    try {
      const result = await fetch(`http://localhost:5500/customerupdateget/${_id}`);
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
      const result = await fetch(`http://localhost:5500/return/${_id}`);
      const data = await result.json();
      console.log(data);
      setCustomerData(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const getcatchproduct = async () => {
    try {
      const result = await fetch(`http://localhost:5500/catch/${_id}`);
      const data = await result.json();
      console.log(data);
      setCatchData(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const getgheridetails = async () => {
    try {
      const result = await fetch(`http://localhost:5500/gheriexpenditure/${_id}`);
      const data = await result.json();
      console.log(data); 
      setGheridata(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  
  useEffect(() => {
    productdetails();
    getproduct();
    getcatchproduct();
    getdiscountdetails();
    getpaymentdetails();
    getgheridetails();
  }, []); 
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

  const getdiscountdetails = async () => {
    try {
      const result = await fetch('http://localhost:5500/extradiscountget');
      const dataArray = await result.json();
  
      console.log('Received data:', dataArray);
  
      const matchingObjects = dataArray.filter(item => item.slno === _id);
  
      if (matchingObjects.length > 0) {
        setDiscount(matchingObjects);
      } else {
        console.log('No matching IDs found. Data will not be displayed.');
      }
    } catch (error) {
      console.error('Error fetching discount data:', error);
    }
  };
 return (
   <div className=' specific'>
     <div className=' container specificpage'>
     <div className='d-flex flex-column flex-md-row justify-content-between mb-2 pr-2'>
     <div className='mb-2 mb-md-0 text-center text-md-left'>
        <div style={{ textAlign: 'left' }}>
          <img
            src="../logologin.png"
            alt="Logo"
            className='text-sm-center'
            style={{ height: '130px', width: '150px' }}
          />
          <h4 className='mb-0 mt-2 mt-md-0'>Marlin BlueTech Private Limited</h4>
          <h5>GSTIN: XXXXXXXXXX</h5>
          <h5>sales@mbaquatech.com</h5>
          <h5>+91-9438572589</h5>
        </div>
      </div>
      <div className='text-center text-md-right text-sm-right  mt-md-0 mt-lg-2'>
        <div style={{textAlign:"left"}}>
        <h5 className='mb-1 mt-5'>Name: {name}</h5>
        <h5 className='mb-0'>Mobile: {mobile}</h5>
        </div>
      </div>
    </div>
    <h3 className='text-center mt-5'>Return List</h3>
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
    {customerData &&
      customerData.customer &&
      customerData.returnDetails &&
      customerData.returnDetails.map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.date}</td>
          <td>{item.customer}</td>
          <td>{item.item}</td>
          <td>{item.quantity}</td>
        </tr>
      ))}
  </tbody>
</table>

        </div>
       <h3 className='text-center'>Catch Details</h3>
        <div className='container table-container'>
        <table className='table table-bordered table-striped'>
  <thead>
    <tr>
      <th>Sl No</th>
      <th>Date</th>
      <th>Quantity</th>
      <th>Pilling Quantity</th>
      <th>Dc Qty</th>
      <th>Count</th>
      <th>Market price</th>
    </tr>
  </thead>
  <tbody>
    {catchData && catchData.customer && catchData.catchDetails && (
      <>
        {catchData.catchDetails.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.date}</td>
            <td>{item.quantity}</td>
            <td>{item.pillingcount}</td>
            <td>{item.dcqty}</td>
            <td>{item.count}</td>
            <td>{item.marketprice}</td>
          </tr>
        ))}
      </>
    )}
  </tbody>
</table>

        </div>
        <h3 className='text-center'>Extra Discount</h3>
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
        <h3 className='text-center'>Payment</h3>
        <div className='container table-container'>
        <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
       <th>Date</th>
       <th>Amount</th>
       <th>Remark</th>
        
      </tr>
    </thead>
    <tbody>
    {payment.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
           <td>{item.date}</td>
           <td>{item.amount}</td>
           <td>{item.remark}</td>
           
            </tr>
          ))}
      
    </tbody>
  </table>
        </div>
       
<h3 className='text-center'>Gheri Details</h3>
<div className='container table-container'>
  <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Name</th>
        <th>Purpose</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
    {gheridata && gheridata.customer && gheridata.gheridetails && (
  <tr>
    {gheridata.gheridetails.map((item, index) => (
      <React.Fragment key={index}>
        <td>{index+1}</td>
       
       <td>{item.name}</td>
       <td>{item.purpose}</td>
       <td>{item.amount}</td>
      </React.Fragment>
    ))}
  </tr>
)}

    </tbody>
  </table>
</div>
<button className='btn btn-primary text-center d-print-none mt-5' onClick={ handlePrintClick }>
          Print
        </button>
</div>
   </div>

  );
};

export default Specific;
