import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


const Spotsales = () => {
  const [date, setDate] = useState();
  const [customer, setCustomer] = useState();
  const [mobile, setMobile] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [mrp, setMrp] = useState();
  const [quantity, setQuantity] = useState();
  const [discount, setDiscount] = useState([]);
  const [product, setProduct] = useState([]);
 const [productlist, setProductlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductPrice, setSelectedProductPrice] = useState('');
  const [localData, setLocalData] = useState([]);
  const [paiditem, setPaiditem] = useState('');
  const [price, setPrice] = useState('')
const[customername,setCustomername]=useState([]);
const [selectedname, setSelectedname] = useState('');
const [selectedmobile, setSelectedmobile] = useState('');
const [error, setError] = useState(false)

  const calculateTotalPrice = () => {
    const newTotalPrice = localData.reduce((total, data) => {
      const productTotal = data.mrp * data.quantity * (100 - data.discount) / 100;
      return total + productTotal;
    }, 0).toFixed(2);


    setPrice(newTotalPrice);
  }

  React.useEffect(() => {
    calculateTotalPrice();
  }, [localData]);
 const searchprod = async (e) => {
    try {
      let key = e.target.value;
      const result = await fetch(`http://localhost:5500/searchspotsale/${key}`, {

      });
      const data = await result.json();
      if (data) {
        setProduct(data);
      }

    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleAddCustomer = async () => {
    
    if (!date || !selectedProduct || !quantity || !discount|| !selectedname) {
      setError(true);
      return false;
    }
    try {

      setSelectedOption('');
      setQuantity('');
      setMrp('');
      setDiscount('');

      const inputData = {
        date,
        customer:selectedname,
        mobile:selectedmobile,
        selectedOption: selectedProduct,
        mrp: selectedProductPrice,
        quantity,
        discount,
      };

      const existingData = JSON.parse(localStorage.getItem('inputData')) || [];
      existingData.push(inputData);

      localStorage.setItem('inputData', JSON.stringify(existingData));


      setLocalData(prevData => [...prevData, inputData]);

      getproduct();

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('inputData')) || [];
    setLocalData(storedData);
  }, []);

  const generateBillNo = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');


    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const billno = `MB${year}${month}${day}${seconds}`;
    return billno;
  };

  const handleCheckout = async () => {
    try {
      for (const entry of localData) {
        const billno = generateBillNo();
        const balance = price - paiditem;
        const response = await fetch('http://localhost:5500/spotsalesecond', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...entry, billno, balance }),
        });

        if (!response.ok) {
          console.error('Error adding product to the database:', response.status);

        }
      }
      setPaiditem('');
      setCustomer('');
      setDate('');
      setMobile('');
      setSelectedOption('');
      localStorage.removeItem('inputData');
      setLocalData([]);
      getproduct();
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again later.');
    }
  };

  const handleCheckouts = async () => {
    try {
      const entry = localData[0];

      if (!entry) {
        console.error('No data to post.');
        return;
      }

      const billno = generateBillNo();
      const balance = price - paiditem;

      const { date, customer, } = entry;

      const response = await fetch('http://localhost:5500/spotsale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, customer, billno, balance,paiditem }),
      });

      if (!response.ok) {
        console.error('Error adding product to the database:', response.status);


      }

      localStorage.removeItem('inputData');
      setLocalData([]);
      getproduct();
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again later.');
    }
  };


  useEffect(() => {

    productlistdetails();
    getproduct();
    getname();
  }, []);
  useEffect(() => {

    const existingData = JSON.parse(localStorage.getItem('inputData')) || [];

    if (existingData.length === 0) {

      getproduct();
    } else {

      setLocalData(existingData);
    }
  }, []);

  const getproduct = async () => {
    try {

      const existingData = JSON.parse(localStorage.getItem('inputData')) || [];
      if (existingData.length === 0) {
        const result = await fetch('http://localhost:5500/spotsalesecondget', {});
        const data = await result.json();
        console.log(data);
        setProduct(data);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const productlistdetails = async () => {
    try {
      const result = await fetch('http://localhost:5500/productlistget', {

      });
      const data = await result.json();
      console.log(data);
      setProductlist(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const handleProductChange = (e) => {
    const selectedProductName = e.target.value;
    setSelectedProduct(selectedProductName);


    const selectedProductData = productlist.find(product => product.name === selectedProductName);

    if (selectedProductData) {

      setSelectedProductPrice(selectedProductData.mrp);
    } else {
      setSelectedProductPrice('');
    }
  };
  const handleProductChanges = (e) => {
    const selectedProductNames = e.target.value;
    console.log('Selected Product Name:', selectedProductNames);
  
    setSelectedname(selectedProductNames);
   const selectedCustomerData = customername.find((customer) => customer.name === selectedProductNames);
  
    if (selectedCustomerData) {
      setSelectedmobile(selectedCustomerData.mobile);
    } else {
      setSelectedmobile('');
    }
  };
  
  
  
  const handleDeleteData = (index) => {
    const updatedData = [...localData];
    updatedData.splice(index, 1);
    setLocalData(updatedData);
    localStorage.setItem('inputData', JSON.stringify(updatedData));
  };
  const getname = async () => {
    try {
      const result = await fetch('http://localhost:5500/userget', {
 headers: {
          'Content-Type': 'application/json',
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      });
      const data = await result.json();
      console.log(data);
      setCustomername(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  return (
    <div className='  mainpages'>
      <h2 style={{ textAlign: "center", color: "blue", paddingTop: "20px" }}>Spot Sales Dashboard</h2>
      <div className='container'>
        <div className='row '>
          <div className='col'>
            <form style={{ paddingTop: "60px" }} className='container'>
              <div>
                <label style={{ paddingTop: "10px" }}>Date</label><br></br>
                <input
                  type="date"
                  style={{ borderRadius: "5px", marginTop: "10px" }}
                  disabled={localData.length > 0} value={date}
                  defaultValue={localData.length > 0 ? localData[0].date : date}
                  onChange={(e) => setDate(e.target.value)}
                /><br></br>
   {error && !date &&  <span className="error">Enter Date</span>}
              </div>
              <div>
                <label style={{ paddingTop: "10px" }} >Customer Name</label><br></br>
                <select
  value={selectedname}
  disabled={localData.length > 0}
  onChange={handleProductChanges}
>
  <option>Select Product</option>
  {customername.map((item) => (
    <option key={item.name} value={item.name}>
      {item.name}
    </option>
  ))}
</select><br></br>
{error && !selectedname &&  <span className="error">Enter valid Name</span>}
              </div>
              <div>
                <label style={{ paddingTop: "10px" }}>Mobile</label><br></br>
                <input type="text"disabled={localData.length > 0}style={{ borderRadius: "5px", marginTop: "10px" }} value={selectedmobile} readOnly />

              </div>

            </form>
            <div className="row mt-4 ms-1">
              <div className='col'>
                <div>
                  <label>Product Name</label><br></br>

                  <select value={selectedProduct} onChange={handleProductChange}>
                    <option>Select Product</option>
                    {Array.from(new Set(productlist.map((item) => item.name))).map((uniqueName) => (
                      <option key={uniqueName} value={uniqueName}>
                        {uniqueName}
                      </option>
                    ))}

                  </select><br></br>
                  {error && !selectedProduct &&  <span className="error">Enter product</span>}
                </div>
              </div>
              <div className='col'>
                <div>
                  <label>Product Price</label><br></br>
                  <input type="text" value={selectedProductPrice} readOnly />
                </div>
              </div>

              <div className='col'>
                <div>
                  <label>Quantity</label><br></br>
                  <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input><br></br>
                  {error && !quantity &&  <span className="error">Enter Quantity</span>}
                </div>
              </div>
              <div className='col'>
                <div>
                  <label>price/Discount(%)</label><br></br>
                  <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value)}></input>
                  {error && !discount &&  <span className="error">Enter Discount</span>}
                </div>
              </div>
              <div className='text-center mt-4'>
                <button className='btn btn-success' onClick={handleAddCustomer}>Add</button>
              </div>

            </div>
          </div>
          <div className='col-lg-7
                    
                    col-md-12 col-sm-12'>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
            <h3 className='mt-5 '>Products In Cart</h3>
            <Link to='/indexpage/bill' className='billbtn' style={{textDecoration:"none",height:"45px",width:"170px",backgroundColor:"blue",color:"white",paddingTop:"10px",borderRadius:"5px",marginTop:"40px",textAlign:"center"}}>Bill Generate</Link>

            </div>
            <h5 className='mt-4'>Customer:{customer}</h5>
            <div className='container table-container'>
              <div className='table-responsive'>
                <table className='table table-bordered table-striped'>
                  {localData.length > 0 ? (
                    <table className='table'>
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Mrp</th>
                          <th>Quantity</th>
                          <th>Discount</th>
                          <th>price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {localData.map((data, index) => (
                          <tr key={index}>
                            <td>{data.selectedOption}</td>
                            <td>{data.mrp}</td>
                            <td>{data.quantity}</td>
                            <td>{data.discount}</td>
                            <td>{data.mrp * data.quantity * (100 - data.discount) / 100}</td>
                            <td>  <button className='btn btn-danger' onClick={() => handleDeleteData(index)}>Delete</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No data available.</p>
                  )}
                </table>
              </div>
            </div>

            <div className='mt-4' style={{ display: "flex", columnGap: "30px", flexWrap: "wrap" }}>

              <h3>Total Price: {price}</h3>
              <h3>Paid</h3>
              <input type="text" value={paiditem} onChange={(e) => setPaiditem(e.target.value)}>

              </input>
              <button
                className='btn btn-primary mt-2'
                style={{ marginRight: "5px" }}
                onClick={() => {
                  handleCheckout();
                  handleCheckouts();
                }}
              >
                ckeck out
              </button>


            </div>
          </div>

        </div>
      </div>
      <div className='container tex-center mt-5'>
        <input type="text" onChange={searchprod} placeholder='Search Product'></input>

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
  )
};

export default Spotsales
