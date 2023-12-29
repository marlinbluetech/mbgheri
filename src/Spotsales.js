import React, { useState, useEffect } from 'react'

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
  const[paiditem,setPaiditem]=useState('');
  const[price,setPrice]=useState('')


  const calculateTotalPrice = () => {
    const newTotalPrice = localData.reduce((total, data) => {
      const productTotal = data.mrp * data.quantity * (100 - data.discount) / 100;
      return total + productTotal;
    }, 0).toFixed(2);

    // Update the state with the new total price
    setPrice(newTotalPrice);
  }

  // Call calculateTotalPrice when the component mounts or when localData changes
  React.useEffect(() => {
    calculateTotalPrice();
  }, [localData]);

      

    const searchprod = async (e) => {
        try {
            let key = e.target.value;
            const result = await fetch(`http://localhost:5000/searchspotsale/${key}`, {

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
        try {
           
    
         
                
    
                setSelectedOption('');
                setQuantity('');
                setMrp('');
                setDiscount('');
    
                const inputData = {
                    date,
                    customer,
                    mobile,
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
        // const hours = currentDate.getHours().toString().padStart(2, '0');
        // const minutes = currentDate.getMinutes().toString().padStart(2, '0');



         const seconds = currentDate.getSeconds().toString().padStart(2, '0');

        const billno = `MB${year}${month}${day}${seconds}`;
        return billno;
      };
      
      const handleCheckout = async () => {
        try {
          for (const entry of localData) {
            const billno = generateBillNo();
      const balance=price-paiditem;
            const response = await fetch('http://localhost:5000/spotsalesecond', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...entry, billno,balance}),
            });
      
            if (!response.ok) {
              console.error('Error adding product to the database:', response.status);
              setPaiditem('');
              setCustomer('');
              setDate('');
              setMobile('');
              setSelectedOption('');
            }
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
                const result = await fetch('http://localhost:5000/spotsalesecondget', {});
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
            const result = await fetch('http://localhost:5000/productlistget', {

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
    const handleDeleteData = (index) => {
        const updatedData = [...localData];
        updatedData.splice(index, 1); 
        setLocalData(updatedData);
      
      




        localStorage.setItem('inputData', JSON.stringify(updatedData));
      };
    return (
        <div className='  mainpages'>
            <h2 style={{ textAlign: "center", color: "blue", paddingTop: "20px" }}>Spot sales Dashboard</h2>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-4 col-md-12 col-sm-12'>
                        <form style={{ paddingTop: "100px" }} className='container'>
                            <div>
                                <label style={{ paddingTop: "10px" }}>Date</label><br></br>
                                <input
    type="date"
    style={{ borderRadius: "5px", marginTop: "10px" }}
    disabled={localData.length > 0} value={date}
    defaultValue={localData.length > 0 ? localData[0].date : date}
    onChange={(e) => setDate(e.target.value)}
/>

                            </div>
                            <div>
                                <label style={{ paddingTop: "10px" }} >Customer Name</label><br></br>
                                <input
    type="text"
    style={{ borderRadius: "5px", marginTop: "10px" }}
   
    disabled={localData.length > 0}  value={customer}
    onChange={(e) => setCustomer(e.target.value)}
/>



                            </div>
                            <div>
                                <label style={{ paddingTop: "10px" }}>Mobile</label><br></br>
                                <input type="text" style={{ borderRadius: "5px", marginTop: "10px" }}  disabled={localData.length > 0}  value={mobile} onChange={(e) => setMobile(e.target.value)}></input>

                            </div>

                        </form>
                        <div className="row mt-4">
                            <div className='col'>
                                <div>
                                    <label>Product Name</label>
                                    <select value={selectedProduct} onChange={handleProductChange}>
                                        <option value="" disabled>Select a product</option>
                                        {productlist.map((item) => (
                                            <option key={item._id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='col'>
                                <div>
                                    <label>Product Price</label>
                                    <input type="text" value={selectedProductPrice} readOnly />
                                </div>
                            </div>

                            <div className='col'>
                                <div>
                                    <label>Quantity</label>
                                    <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                                </div>
                            </div>
                            <div className='col'>
                                <div>
                                    <label>price/Discount(%)</label>
                                    <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value)}></input>
                                </div>
                            </div>
                            <div className='text-center mt-4'>
                                <button className='btn btn-success' onClick={handleAddCustomer}>Add</button>
                            </div>

                        </div>
                    </div>
                    <div className='col-lg-8
                    
                    col-md-12 col-sm-12'>
                        <h3 className='mt-5 mb-5'>Products In Cart</h3>
                        <h3>Customer:{customer}</h3>
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
                <td>  <button className='btn btn-danger' onClick={() => handleDeleteData(index)}/>Delete</td>
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

                        <div className='mt-4'style={{display:"flex",columnGap:"30px",flexWrap:"wrap"}}>

                        <h3>Total Price: {price}</h3>
                            <h3>Paid</h3>
                            <input type="text" value={paiditem} onChange={(e) => setPaiditem(e.target.value)}>

                            </input>
                            <button className='btn btn-success' onClick={handleCheckout}>Check Out</button>


                        </div>
                    </div>

                </div>
            </div>
            <div className='container tex-center mt-5'>
                <input type="text" onChange={searchprod} placeholder='Search Product' style={{ width: "200px" }}></input>

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
