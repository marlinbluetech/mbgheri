import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Stock = () => {
    const [itemname, setItemname] = useState();
    const [price, setPrice] = useState();
    const [company, setCompany] = useState();

    const [purchase, setPurchase] = useState();
    const [returnlist, setReturnlist] = useState([]);
    const [sale, setSale] = useState([]);
    const [stock, setStock] = useState([]);
    const [itemdeatils, setItemdeatils] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async(e) => {
    e.preventDefault();
    try {
       
        const result = await fetch(`http://localhost:5500/stocksearch/${searchTerm}`, {
  
        });
        const data = await result.json();
        if (data) {
          setStock(data);
        }
  
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
  };

    const handleAddCustomer = async () => {
        try {
            const response = await fetch('http://localhost:5500/addstock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    itemname: itemname,
                    price: price,
                    company: company
                }),
            });

            if (response.ok) {
                toast.success('Stock added successfully');
                getstock();
                setItemname('');
                setPrice('');
                setCompany('');

            } else {
                toast.error('Failed to add stock');

            }
        } catch (error) {
            toast.error('Error adding Stock');

        }
    };
    useEffect(() => {

        getpurchase();
        getstock();
        itemnamedetails();
        getreturnlist();
        getsaledetails();

    }, []);

    const getpurchase = async () => {
        try {
            const result = await fetch('http://localhost:5500/purchaseget', {

            });
            const data = await result.json();

            setPurchase(data);


        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const getstock = async () => {
        try {
            const result = await fetch('http://localhost:5500/stockget', {

            });
            const data = await result.json();

            setStock(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };
    const getreturnlist = async () => {
        try {
            const result = await fetch('http://localhost:5500/returnlistget', {

            });
            const data = await result.json();
            console.log(data);
            setReturnlist(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };
    const itemnamedetails = async () => {
        try {
            const result = await fetch('http://localhost:5500/purchaseget', {

            });
            const data = await result.json();
            console.log(data);
            setItemdeatils(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };
    const getsaledetails = async () => {
        try {
            const result = await fetch('http://localhost:5500/saleget', {

            });
            const data = await result.json();
            console.log(data);
            setSale(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };
    const calculateTotalQuantity = (itemName) => {

        const matchingItems = purchase.filter((item) => item.itemname === itemName);


        const totalQuantity = matchingItems.reduce((total, item) => total + item.quantity, 0);

        return totalQuantity;
    };
    const calculateTotalQuantity2 = (itemName) => {

        const matchingItems = returnlist.filter((item) => item.item === itemName);


        const totalQuantity = matchingItems.reduce((total, item) => total + item.quantity, 0);

        return totalQuantity;
    };
    const calculateTotalQuantity3 = (itemName) => {

        const matchingItems = sale.filter((item) => item.
            selectedOption
            === itemName);


        const totalQuantity = matchingItems.reduce((total, item) => total + item.quantity, 0);

        return totalQuantity;
    };
    const deleteproduct = async (id) => {
        try {
            const result = await fetch(`http://localhost:5500/stock/${id}`, {

                method: 'DELETE',
            });

            const data = await result.json();
            console.log(data);
            if (data) {
                getstock();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    return (
        <div>
            <div className="mainpages">
                <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Stock Details</h2>
                <div class="container card mb-4 seccard">
                    <div class="card-body">
                        <h4 style={{ marginBottom: "25px" }}>Add|Update Stock Record</h4>
                        <div class="container text-center mb-4">
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label >Item Name</label><br></br>
                                    <select value={itemname} onChange={(e) => setItemname(e.target.value)}>
                                        <option>Select a product</option>
                                        {Array.from(new Set(itemdeatils.map((item) => item.
                                            itemname
                                        ))).map((uniqueName) => (
                                            <option key={uniqueName} value={uniqueName}>
                                                {uniqueName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div class=" col-lg-4 col-md-12 col-sm-12">
                                    <label>Price</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={price} onChange={(e) => setPrice(e.target.value)}></input>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label>Company</label><br></br>
                                    <select value={company} onChange={(e) => setCompany(e.target.value)} >
                                        <option>Select a product</option>
                                        {Array.from(new Set(itemdeatils.map((item) => item.
                                            company
                                        ))).map((uniqueName) => (
                                            <option key={uniqueName} value={uniqueName}>
                                                {uniqueName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="container text-center mt-4">
                            <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }} onClick={handleAddCustomer}>Add</button>
                        </div>
                    </div>
                </div>
                <div className='container' >
                   

                    <form  role="search" style={{ marginTop: "10px",display:"flex",columnGap:"7px",flexWrap:"wrap" }}>
                        <input class="form-control me-2" type="search" placeholder="Search"  value={searchTerm}
        onChange={handleInputChange}aria-label="Search"style={{width:"500px"}} />
        <div className=''>
        <button className="btn btn-primary mt-2 " type="submit"  onClick={handleSearch}>Search</button>

        </div>
                    </form>
                </div>
                <div className='container table-container mt-5'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Sl No</th>


                                <th>Item Name</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Total Purchase</th>
                                <th>Total Sale</th>
                                <th>Total Return</th>
                                <th>Balance</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stock.map((item, index) => {

                                return (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>

                                        <td>{item.itemname}</td>
                                        <td>{item.company}</td>

                                        <td>{item.price}</td>
                                        <td>{calculateTotalQuantity(item.itemname)}</td>
                                        <td>{calculateTotalQuantity3(item.itemname)}</td>
                                        <td>{calculateTotalQuantity2(item.itemname)}</td>

                                        <td>{parseInt(calculateTotalQuantity(item.itemname)) - parseInt(calculateTotalQuantity3(item.itemname)) + parseInt(calculateTotalQuantity2(item.itemname))}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => deleteproduct(item._id)}>Delete</button>

                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </div>





            </div>
            <ToastContainer />



        </div>
    )
}

export default Stock
