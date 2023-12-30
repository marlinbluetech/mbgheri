import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Stock = () => {
    const [itemname, setItemname] = useState();
    const [price, setPrice] = useState();
    const [company, setCompany] = useState();

    

    const [companyname, setCompanyname] = useState([]);
    const [purchase, setPurchase] = useState();
    const [returnlist, setReturnlist] = useState([]);
    const[sale,setSale]=useState([]);
     const[stock,setStock]=useState([]);
    const handleAddCustomer = async () => {
        try {
            const response = await fetch('http://localhost:5000/addstock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                body: JSON.stringify({
                    itemname: itemname,
                    price: price,
                    company: company
                }),
            });

            if (response.ok) {
                toast.success('Stock added successfully');
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
        companynamedetails();
        getpurchase();
        getstock();
       
    }, []);
    const companynamedetails = async () => {
        try {
            const result = await fetch('http://localhost:5000/companyget', {

            });
            const data = await result.json();

            setCompanyname(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };
    const getpurchase = async () => {
        try {
            const result = await fetch('http://localhost:5000/purchaseget', {

            });
            const data = await result.json();

         


            setPurchase(data);
           

        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };
  
    const getstock = async () => {
        try {
            const result = await fetch('http://localhost:5000/stockget', {

            });
            const data = await result.json();

            setStock(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    return (
        <div>
            <div className="mainpages">
                <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Stock Details</h2>
                <div class="card mb-4 seccard">
                    <div class="card-body">
                        <h4 style={{ marginBottom: "15px" }}>Add|Update Customer Record</h4>
                        <div class="container text-start mb-4">
                            <div class="row">
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label >Item Name</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={itemname} onChange={(e) => setItemname(e.target.value)}></input>
                                </div>
                                <div class=" col-lg-4 col-md-12 col-sm-12">
                                    <label>Price</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }} value={price} onChange={(e) => setPrice(e.target.value)}></input>
                                </div>
                                <div class="col-lg-4 col-md-12 col-sm-12">
                                    <label>Company</label><br></br>
                                    <select value={company} onChange={(e) => setCompany(e.target.value)} >
                                        <option>Select a product</option>
                                        {companyname.map((item) => (
                                            <option key={item._id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>                                </div>
                            </div>

                        </div>
                        <div className="container text-center mt-4">
                            <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }} onClick={handleAddCustomer}>Add</button>
                        </div>



                    </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", columnGap: "100px" }}>
                    <div>
                        <select style={{ padding: "7px", marginLeft: "15px", marginTop: "10px" }}>
                            <option>select</option>
                            <option>Item</option>
                            <option>Company</option>
                        </select>
                    </div>

                    <form class="d-flex" role="search" style={{ marginTop: "10px" }}>
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-primary" type="submit">Search</button>
                    </form>
                </div>
                

            </div>
            <ToastContainer />



        </div>
    )
}

export default Stock
