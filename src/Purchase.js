import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Purchase = () => {
 
    const[date,setDate]=useState();
    const[itemname,setItemname]=useState();
    const[company,setCompany]=useState();
     const[quantity,setQuantity]=useState();
    const[price,setPrice]=useState();
    const[category,setCategory]=useState();
    const [paid, setPaid] = useState([]);
     const [product, setProduct] = useState([]);
     const [open, setOpen] = useState(false);
     const [error, setError] = useState(false)
   const [updateItemId, setUpdateItemId] = useState(null);
  const[itemdeatils,setItemdeatils]=useState([]);
  const[companydeatils,setCompanydeatils]=useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const[remaining,setRemaining]=useState(0);
  useEffect(() => {
    
    let calculatedTotalPaid = 0;
    product.forEach((item) => {
      calculatedTotalPaid += item.paid;
    });
    setTotalPaid(calculatedTotalPaid);
  }, [product]);
  useEffect(() => {
    
    let calculatedTotalremain = 0;
    product.forEach((item) => {
      calculatedTotalremain += item.quantity*item.price-item.paid;
    });
    setRemaining(calculatedTotalremain);
  }, [product]);
  const companynamedetails = async () => {
    try {
      const result = await fetch('http://localhost:5000/companyget', {

      });
      const data = await result.json();
      console.log(data);
      setCompanydeatils(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const itemnamedetails = async () => {
    try {
      const result = await fetch('http://localhost:5000/productlistget', {

      });
      const data = await result.json();
      console.log(data);
      setItemdeatils(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setDate('');
    setItemname('');
    setCompany('');
    setQuantity('');
    setPrice('');
    setCategory('');
    setPaid('');
  };
  const handleUpdateCustomer = async () => {
    console.log(updateItemId);
    try {
      const response = await fetch(`http://localhost:5000/purchaseupdate/${updateItemId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date:date,
          itemname:itemname,
          company:company,
          quantity:quantity,
          price:price,
          category:category,
          paid:paid,
          product:product
       
        }),
      });

      if (response.ok) {
        toast.success('Record updated successfully');
        setDate('');
        setItemname('');
        setCompany('');
        setQuantity('');
        setPrice('');
        setCategory('');
        setPaid('');
        handleDrawerClose(); 
        getproduct(); 
      } else {
        toast.error('Failed to update record');
      }
    } catch (error) {
      toast.error('Error updating record');
    }
  };


   
    const handleAddCustomer = async () => {
      if (!itemname || !date || !company||!quantity|| !price || !category || !paid  ) {
        setError(true);
        return false;
      }
      try {
        const response = await fetch('http://localhost:5000/addpurchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date:date,
            itemname:itemname,
            company:company,
            quantity:quantity,
            price:price,
            category:category,
            paid:paid
          }),
        });
    
        if (response.ok) {
          toast.success('Purchase Details added successfully');
  
         getproduct();
        } else {
          toast.error('Failed to add Purchase Details');
  
          console.error('Failed to add Purchase Details');
        }
      } catch (error) {
        console.error('Error adding customer:', error);
      }
    };
    useEffect(() => {
        getproduct();
        itemnamedetails();
        companynamedetails();
      }, []);
    
      const getproduct = async () => {
        try {
          const result = await fetch('http://localhost:5000/purchaseget',{
            
          });
          const data = await result.json();
          console.log(data);
          setProduct(data);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
      const deleteproduct = async (id) => {
        try {
          const result = await fetch(`http://localhost:5000/purchasedelete/${id}`, {
            
            method: 'DELETE', 
          });
      
          const data = await result.json();
          console.log(data);
          if(data){
            getproduct();
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };
      const productdetails = async (id) => {
        try {
    
          const result = await fetch(`http://localhost:5000/purchaseupdateget/${id}`, {
    
          });
    
    
          const data = await result.json();
    setDate(data.date);
    setItemname(data.itemname);
    setCompany(data.company);
    setQuantity(data.quantity);
    setPrice(data.price);
    setCategory(data.category);
    setPaid(data.paid);
    setUpdateItemId(data._id);

          console.log(data);
    
        } catch (error) {
    
          console.error('Error fetching product details:', error);
        }
      };
      
  return (
    <div>
       <div className="mainpages">
                <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Purchase Details</h2>
                <div class="card mb-4 seccard">
                    <div class="card-body">
                        <h4 style={{ marginBottom: "25px" }}>Add|Update Customer Record</h4>
                        <div class="container text-start">
                            <div class="row">
                                <div class="col">
                                    <label >Date</label><br></br>
                                    <input type="Date" style={{ borderRadius: "5px", padding: "3px" }}value={date}
                    onChange={(e)=>setDate(e.target.value)}></input>
                                                        {error && !date &&  <span className="error">Enter Date</span>}

                                </div>
                                <div class=" col">
                                    <label>Item Name</label><br></br>
                                    <select  value={itemname} onChange={(e) => setItemname(e.target.value)} >
                                        <option>Select a product</option>
                                        {itemdeatils.map((item) => (
                                            <option key={item._id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                    {error && !itemname &&  <span className="error">Enter valid Name</span>}

                                </div>
                                <div class="col">
                                    <label>Company Name</label><br></br>
                                    <select  value={company} onChange={(e) => setCompany(e.target.value)} >
                                        <option>Select a product</option>
                                        {companydeatils.map((item) => (
                                            <option key={item._id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select><br></br>
                                    {error && !company &&  <span className="error">Enter Company Name</span>}

                                </div>
                                <div class="col">
                                    <label>Quantity</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}></input>
                                                        {error && !quantity &&  <span className="error">Enter Quantity</span>}

                                </div>
                                <div class="col">
                                    <label >Price/unit</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={price}
                    onChange={(e)=>setPrice(e.target.value)}></input>
                                                        {error && !price &&  <span className="error">Enter Price</span>}

                                </div>
                                <div class=" col">
                                    <label>Catagory</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={category}
                    onChange={(e)=>setCategory(e.target.value)}></input>
                                                        {error && !category &&  <span className="error">Enter  Catagory</span>}

                                </div>
                                <div class=" col">
                                    <label>Paid</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={paid}
                    onChange={(e)=>setPaid(e.target.value)}></input>
                                                        {error && !paid &&  <span className="error">Enter Paid Details</span>}

                                </div>


                            </div>


                        </div>
                        <div className="container text-center mt-4">
                            <button className="btn btn-success" style={{ textAlign: "center", margin: "auto" }}onClick={handleAddCustomer}>Add</button>
                        </div>

                    </div>
                </div>
                <h5>Total Paid: {totalPaid}</h5>
                <h5>Balance:{remaining}</h5>
                <div className='container table-container'>
             <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <th>Sl No</th>
        <th>Date</th>
        
        <th>Item Name</th>
        <th>Company</th>
        <th>Quantity</th>
        <th>Price/Unit</th>
        <th>Category</th>
        <th>Paid</th>
        <th>Balance</th>
        <th>Operation</th>
      </tr>
    </thead>
    <tbody>
    {product.map((item, index) => {
          //  const remaining = item.quantity * item.price - item.paid;
     
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.date}</td>
                <td>{item.itemname}</td>
                <td>{item.company}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.paid}</td>
                <td>{remaining}</td>
                <td>
                  <button
                    className='btn btn-primary'
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                      handleDrawerOpen();
                      productdetails(item._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteproduct(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      
    </tbody>
  </table>
             </div>
             <Drawer anchor="right" open={open} onClose={handleDrawerClose} PaperProps={{ style: { width: 400 } }}>
          <List>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText primary="Close" />

            </ListItem>
           
            <div class="col">
                                    <label >Date</label><br></br>
                                    <input type="Date" style={{ borderRadius: "5px", padding: "3px" }}value={date}
                    onChange={(e)=>setDate(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>Item Name</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={itemname}
                    onChange={(e)=>setItemname(e.target.value)}></input>
                                </div>
                                <div class="col">
                                    <label>Company Name</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={company}
                    onChange={(e)=>setCompany(e.target.value)}></input>
                                </div>
                                <div class="col">
                                    <label>Quantity</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={quantity}
                    onChange={(e)=>setQuantity(e.target.value)}></input>
                                </div>
                                <div class="col">
                                    <label >Price/unit</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={price}
                    onChange={(e)=>setPrice(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>Catagory</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={category}
                    onChange={(e)=>setCategory(e.target.value)}></input>
                                </div>
                                <div class=" col">
                                    <label>Paid</label><br></br>
                                    <input type="text" style={{ borderRadius: "5px" }}value={paid}
                    onChange={(e)=>setPaid(e.target.value)}></input>
                                </div>
                                <div>
              <button className='btn btn-success' onClick={handleUpdateCustomer}>Update</button>
            </div>

          </List>
        </Drawer>


            </div>
            <ToastContainer/>
    </div>
  )
}

export default Purchase
