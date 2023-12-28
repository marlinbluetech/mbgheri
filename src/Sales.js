import React, { useState, useEffect } from 'react';


const Sales = () => {
  const [date, setDate] = useState('');
  const [customer, setCustomer] = useState('');
  const [season, setSeason] = useState('');
  const [selectedOption, setselectedOption] = useState('');

  const [quantity, setQuantity] = useState('');
  const [paid, setPaid] = useState('');
  const [product, setProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemdeatils, setItemdeatils] = useState([]);
  const [data2, setData2] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const calculatedTotalPrice = product.reduce((acc, item) => {
      const productTotal = (item.mrp * item.quantity * (100 - item.discount)) / 100;
      return acc + productTotal;
    }, 0);

    setTotalPrice(calculatedTotalPrice);
  }, [product]);

  const itemnamedetails = async () => {
    try {
      const result = await fetch('http://localhost:5000/productlistget');
      const data = await result.json();
      setItemdeatils(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:5000/saleadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, customer, season, selectedOption, quantity, paid }),
      });

      if (response.ok) {
        alert('Product Added successfully!');
        setDate('');
        setCustomer('');
        setSeason('');
        setselectedOption('');
        setQuantity('');
        setPaid('');
        getproduct();
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    getproduct();
    itemnamedetails();
  }, []);

  useEffect(() => {
    getproduct2();
  }, [selectedOption, product]);
 

  useEffect(() => {
    if (product.length > 0 && data2.length > 0) {
      const matchingItems = product.map((item1) => {
        const matchingItem2 = data2.find((item2) => item2.name === item1.selectedOption);
        return { ...item1, ...(matchingItem2 || {}) };
      });
  
      setCombinedData(matchingItems);
    }
  }, [product, data2]);
  
  

  const getproduct = async () => {
    try {
      const result = await fetch('http://localhost:5000/saleget');
      const data = await result.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const getproduct2 = async () => {
    try {
      const result = await fetch('http://localhost:5000/productlistget');
      const data = await result.json();
      setData2(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const deleteproduct = async (id) => {
    try {
      const result = await fetch(`http://localhost:5000/saledelete/${id}`, {
        method: 'DELETE',
      });

      const data = await result.json();
      if (data) {
        getproduct();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  return (
    <div>
       <div className='mainpages'>
      <h2 style={{ textAlign: 'center', color: 'blue', paddingTop: '20px' }}>Sales Dashboard</h2>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 col-md-12 col-sm-12'>
            <form style={{ paddingTop: '100px' }} className='container'>
              <div>
                <label style={{ paddingTop: '10px' }}>Date</label>
                <br></br>
                <input
                  type='date'
                  style={{ borderRadius: '5px', marginTop: '10px' }}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                ></input>
              </div>
              <div>
                <label style={{ paddingTop: '10px' }}>Customer Name</label>
                <br></br>
                <input
                  type='text'
                  style={{ borderRadius: '5px', marginTop: '10px' }}
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                ></input>
              </div>
              <div>
                <label style={{ paddingTop: '10px' }}>Season</label>
                <br></br>
                <input
                  type='text'
                  style={{ borderRadius: '5px', marginTop: '10px' }}
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                ></input>
              </div>
            </form>
            <div className='row mt-4'>
              <div className='col'>
                <div>
                  <label>Product Name</label>
                  <br></br>
                  <select
                    value={selectedOption}
                    onChange={(e) =>  setselectedOption((prevSelectedOption) => e.target.value)}
                  >
                    <option>Select a product</option>
                    {itemdeatils.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='col'>
                <div>
                  <label>Quantity</label>
                  <br></br>
                  <input type='text' value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                </div>
              </div>
              <div className='col'>
                <div>
                  <label>Paid</label>
                  <br></br>
                  <input type='text' value={paid} onChange={(e) => setPaid(e.target.value)}></input>
                </div>
              </div>
              <div className='text-center mt-4'>
                <button className='btn btn-success' onClick={handleAddCustomer}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
            <h3 className='mt-4'>Products In Cart</h3>
            <div className='container table-container'>
              <table className='table table-bordered table-striped'>
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Paid</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.selectedOption}</td>
                      <td>{item.quantity}</td>
                      <td>{item.paid}</td>
                      <td>
                        <button className='btn btn-danger' onClick={() => deleteproduct(item._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='container table-container mt-4'>
        <table className='table table-bordered table-striped'>
          <thead>
            <tr>
              <th>Sl No</th>
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
                <td>{item.date}</td>
                <td>{item.customer}</td>
                <td>{item.season}</td>
                <td>{item.selectedOption}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.discount}</td>
                <td>{item.mrp}</td>
                <td>{item.paid}</td>
                <td>{(item.quantity*item.mrp*(100-item.discount)/100)-item.paid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Sales
