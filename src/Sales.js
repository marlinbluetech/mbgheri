import React, { useState, useEffect } from 'react'

const Sales = () => {
  const [date, setDate] = useState();
  const [customer, setCustomer] = useState();
  const [season, setSeason] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [mrp, setMrp] = useState();
  const [quantity, setQuantity] = useState();

  const [product, setProduct] = useState([]);

  const [productlist, setProductlist] = useState([]);
  const [localData, setLocalData] = useState([]);
  const [paiditem, setPaiditem] = useState('');
  const [price, setPrice] = useState('')

  const[combinedData,setCombinedData]=useState([]);

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





  const handleAddCustomer = async () => {
    try {
 setSelectedOption('');
      setQuantity('');
      setPaiditem('')

      const inputData = {
        date,
        customer,
        season,
        selectedOption: selectedOption,

        quantity,
        paiditem
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
        const balance = parseFloat(price) - parseFloat(paiditem);
        const response = await fetch('http://localhost:5000/saleadd', {
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
        const result = await fetch('http://localhost:5000/saleget', {});
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
  useEffect(() => {
    if (product.length > 0 && productlist.length > 0) {
      const matchingItems = product.map((item1) => {
        const matchingItem2 = productlist.find((item2) => item2.name === item1.selectedOption);
        return { ...item1, ...(matchingItem2 || {}) };
      });
  
      setCombinedData(matchingItems);
    }
  }, [product, productlist]);

  const handleDeleteData = (index) => {
    const updatedData = [...localData];
    updatedData.splice(index, 1);
    setLocalData(updatedData);
    localStorage.setItem('inputData', JSON.stringify(updatedData));
  };
  return (
    <div className='  mainpages'>
      <h2 style={{ textAlign: "center", color: "blue", paddingTop: "20px" }}> sales Dashboard</h2>
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

                  disabled={localData.length > 0} value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />



              </div>
              <div>
                <label style={{ paddingTop: "10px" }}>Season</label><br></br>
                <input type="text" style={{ borderRadius: "5px", marginTop: "10px" }} disabled={localData.length > 0} value={season} onChange={(e) => setSeason(e.target.value)}></input>

              </div>

            </form>
            <div className="row mt-4">
              <div className='col'>
                <div>
                  <label>Product Name</label><br></br>
                  <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} >
                    <option value="" disabled>Select a product</option>
                    {productlist.map((item) => (
                      <option key={item._id} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='col'>
                <div>
                  <label>Quantity</label><br></br>
                  <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                </div>
              </div>
              <div className='col'>
                <div>
                  <label>paid</label><br></br>
                  <input type="text" value={paiditem} onChange={(e) => setPaiditem(e.target.value)}></input>
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

                          <th>Quantity</th>

                          <th>paid</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {localData.map((data, index) => (
                          <tr key={index}>
                            <td>{data.selectedOption}</td>

                            <td>{data.quantity}</td>
                            <td>{data.paiditem}</td>
                            <td>
                              <button className='btn btn-danger' onClick={() => handleDeleteData(index)}>Delete</button>
                            </td>

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

              <button className='btn btn-success' onClick={handleCheckout}>Check Out</button>


            </div>
          </div>

        </div>
      </div>
     
      
      <div className='container table-container mt-4'>
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Bill No</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Season</th>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Price</th>
              <th>Paid</th>
              <th>Balance</th>
             
            </tr>
          </thead>
          <tbody>
            {combinedData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.billno}</td>
                <td>{item.date}</td>
                <td>{item.customer}</td>
                <td>{item.season}</td>
                <td>{item.selectedOption}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.discount}</td>
                <td>{item.mrp}</td>
                <td>{item.paiditem}</td>
                <td>{(item.quantity*item.mrp*(100-item.discount)/100)-item.paiditem}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  )
};



export default Sales
