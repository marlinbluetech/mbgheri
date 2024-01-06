import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const Bill = () => {
    const [product, setProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(searchTerm);
      };
   
  const handleSearch = async(e) => {
    e.preventDefault();
    try {
       
        const result = await fetch(`http://localhost:5500/billsearch/${searchTerm}`, {
  
        });
        const data = await result.json();
        if (data) {
          setProduct(data);
         
        }
  
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
  };

    
     
  return (
    <div>
        <div className='container mb-4' >
                   

                   <form  role="search" style={{ marginTop: "10px",display:"flex",columnGap:"7px",flexWrap:"wrap" }}>
                       <input class="form-control me-2" type="search" placeholder="Search"  value={searchTerm}
       onChange={handleInputChange}aria-label="Search"style={{width:"500px"}} />
                       <button class="btn btn-primary mt-2" type="submit"  onClick={handleSearch}>Search</button>
                   </form>
               </div>
               <Link
  to={{
    pathname: '/billreport',
    search: `?searchTerm=${searchTerm}`,
  }}
  className='billbtn ms-2'
  style={{
    textDecoration: 'none',
    height: '150px',
    width: '180px',
    backgroundColor: 'orange',
    color: 'white',
    padding: '12px',
    borderRadius: '5px',
    marginTop: '40px',
    textAlign: 'center',
    marginBottom: '15px',
  }}
>
  Bill Report
</Link>
               <div className='container table-container mt-5'>
  {product.length > 0 ? (
    <table className='table table-bordered table-striped'>
      <thead>
        <tr>
          <th>Sl No</th>
          <th>MbNo</th>
          <th>date</th>
          <th>Name</th>
          <th>Paid</th>
          <th>balance</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {product.map((item, index) => (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td>{item.billno}</td>
            <td>{item.date}</td>
            <td>{item.customer}</td>
            <td>{item.paiditem}</td>
            <td>{item.balance}</td>
            <td><button className='btn btn-danger'>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    null
  )}
</div>

    </div>
  )
}

export default Bill
