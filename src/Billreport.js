import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Billreport = () => {
  const [product, setProduct] = useState([]);
  const [address, setAddress] = useState('');
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('searchTerm');

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const result = await fetch(`http://localhost:5500/searchspotsale/${searchTerm}`);
        const data = await result.json();

        if (Array.isArray(data)) {
          setProduct(data);
        } else {
          setProduct([]);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        setProduct([]);
      }
    };

    handleSearch();
  }, [searchTerm]);
  const productdetails = async (id) => {
    try {
      const result = await fetch(`http://localhost:5500/customer/${searchTerm}`);
      const data = await result.json();
      console.log(data);

      if (data && data.name && data.mobile && data.address) {
       
        setAddress(data.address);

    
      } else {
        console.error('Incomplete or missing data in the response:', data);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };
  useEffect(() => {
   productdetails();
  }, []);

  return (
    <div className='specific'>
      <div className='container specificpage'>
      <div>
  {product.length > 0 && (
    <div className='d-flex flex-column flex-md-row justify-content-between mb-2 pr-2'>
      <div className='mb-2 mb-md-0 text-center text-md-left'>
      <div style={{textAlign:"left"}}>
      <img src="../logologin.png" alt="Logo" style={{ height: "130px", width: "150px" }} />
        <h4 className='mb-0 mt-2 mt-md-0'>Marlin BlueTech Private Limited</h4>
     
        <h5>GSTIN: XXXXXXXXXX</h5>
        <h5>sales@mbaquatech.com</h5>
        <h5>+91-9438572589</h5>
        </div>
      </div>
      <div className='text-center text-md-right text-sm-right  mt-md-0'>
        <div style={{textAlign:"left"}}>
        <h5 className='mb-1 mt-5'>Customer: {product[0].customer}</h5>
        <h5 className='mb-0'>Mobile: {product[0].mobile}</h5>
        <h5>Address:{address}</h5>
          </div>
      </div>
    </div>
  )}
</div>



        <div className='text-center mb-4'>
          <h3 className='mt-5'>Customer Report</h3>
        </div>

        <div className='container table-container mt-4'>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Bill no</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Mobile</th>
                <th>Name</th>
                <th>MRP</th>
                <th>Quantity</th>
                <th>Discount</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {product.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.billno}</td>
                  <td>{item.date}</td>
                  <td>{item.customer}</td>
                  <td>{item.mobile}</td>
                  <td>{item.selectedOption}</td>
                  <td>{item.mrp}</td>
                  <td>{item.quantity}</td>
                  <td>{item.discount}</td>
                  <td>{item.mrp * item.quantity * (100 - item.discount) / 100}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='text-center mt-5'>
          <button className='btn btn-primary'>Print</button>
        </div>
      </div>
    </div>
  );
};

export default Billreport;
