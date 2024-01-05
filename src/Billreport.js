import React,{useState,useEffect    } from 'react'

const Billreport = () => {
    const [product, setProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
      };
   
  const handleSearch = async(e) => {
    e.preventDefault();
    try {
       
        const result = await fetch(`http://localhost:5000/searchspotsale/${searchTerm}`, {
  
        });
        const data = await result.json();
        if (data) {
          setProduct(data);
          searchTerm('');
        }
  
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
  };

   
  return (
   
    <div className=' specific'>
        
     <div className=' container specificpage'>
     
     <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",marginBottom:"10px",paddingTop:"20px"}}>
     
      <div>
      <img src="../logologin.png" style={{height:"150px",width:"150px"}} />
      </div>
     
      <div>
      <h5>Name:{product.customer}</h5> 
    <h5>Mobile:{product.mobile}</h5>
   
      </div>
     </div>
     <div className='text-center mb-4'>
        <h3>Customer Report</h3>
      </div>
     <div className='container mb-4' >
                   

                   <form  role="search" style={{ marginTop: "10px",display:"flex",columnGap:"7px",flexWrap:"wrap" }}>
                       <input class="form-control me-2" type="search" placeholder="Search"  value={searchTerm}
       onChange={handleInputChange}aria-label="Search"style={{width:"500px"}} />
                       <button class="btn btn-primary mt-2" type="submit"  onClick={handleSearch}>Search</button>
                   </form>
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
              <th>price</th>

            </tr>
          </thead>
          <tbody>
            {product.map((item, index) => (
              <tr key={item._id} >
                <td>{index + 1}</td>
                <td>{item.billno}</td>
                <td>  {item.date}</td>
                <td>  {item.customer}</td>
                <td>  {item.mobile}</td>
                <td>  {item.selectedOption}</td>
                <td>{item.mrp}</td>
                <td>{item.quantity}</td>
                <td>{item.discount}</td>
                <td>{item.mrp * item.quantity * (100 - item.discount) / 100}</td>

              </tr>
            ))}

          </tbody>
        </table>
       
      </div>  
    
</div>
   </div>
  )
}

export default Billreport
