import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Catch = () => {
  const [date, setDate] = useState();
  const [customer, setCustomer] = useState();
  const [season, setSeason] = useState();
  const [quantity, setQuantity] = useState();
  const [count, setCount] = useState([]);
  const [pillingcount, setPillingcount] = useState([]);
  const [dcqty, setDcqty] = useState([]);
  const [extraqty, setExtraqty] = useState([]);
  const [marketprice, setMarketprice] = useState([]);
  const [partyprice, setPartyprice] = useState([]);
  const [partyname, setPartyname] = useState([]);
  const [partypaid, setPartypaid] = useState([]);
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);
  const[companyname,setCompanyname]=useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setDate('');
    setCustomer('');
    setSeason('');
    setQuantity('');
    setCount('');
    setPillingcount('');
    setDcqty('');
    setExtraqty('');
    setMarketprice('');
    setPartyprice('');
    setPartyname('');
    setPartypaid('');
  };

  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:5000/addcatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         date:date,
         customer:customer,
         season:season,
         quantity:quantity,
         count:count,
         pillingcount:pillingcount,
         dcqty:dcqty,
         extraqty:extraqty,
         marketprice:marketprice,
         partyprice:partyprice,
         partyname:partyname,
         partypaid:partypaid
        }),
      });

      if (response.ok) {
        toast.success('Company added successfully');
        getproduct();
        setDate('');
     setCustomer('');
     setSeason('');
     setQuantity('');
     setCount('');
     setPillingcount('');
     setDcqty('');
     setExtraqty('');
     setMarketprice('');
     setPartyprice('');
     setPartyname('');
     setPartypaid('');
      } else {
        toast.error('Failed to add company');
        console.error('Failed to add company');
      }
    } catch (error) {
      toast.error('Error adding company');
      console.error('Error adding company:', error);
    }
  };
  useEffect(() => {
    getproduct();
    getcompanyname();
  }, []);

  const getproduct = async () => {
    try {
      const result = await fetch('http://localhost:5000/catchget',{
        
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
      const result = await fetch(`http://localhost:5000/catchdelete/${id}`, {
        
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

      const result = await fetch(`http://localhost:5000/catchupdateget/${id}`, {

      });


      const data = await result.json();


      console.log(data);
     setDate(data.date);
     setCustomer(data.customer);
     setSeason(data.season);
     setQuantity(data.quantity);
     setCount(data.count);
     setPillingcount(data.pillingcount);
     setDcqty(data.dcqty);
     setExtraqty(data.extraqty);
     setMarketprice(data.marketprice);
     setPartyprice(data.partyprice);
     setPartyname(data.partyname);
     setPartypaid(data.partypaid);

      setUpdateItemId(data._id); 
    } catch (error) {

      console.error('Error fetching product details:', error);
    }
  };
  const handleUpdateCustomer = async () => {
    console.log(updateItemId);
    try {
      const response = await fetch(`http://localhost:5000/catchupdate/${updateItemId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date:date,
          customer:customer,
          season:season,
          quantity:quantity,
          count:count,
          pillingcount:pillingcount,
          dcqty:dcqty,
          extraqty:extraqty,
          marketprice:marketprice,
          partyprice:partyprice,
          partyname:partyname,
          partypaid:partypaid
        }),
      });

      if (response.ok) {
        toast.success('Record updated successfully');
        handleDrawerClose(); 
        getproduct(); 
      } else {
        toast.error('Failed to update record');
      }
    } catch (error) {
      toast.error('Error updating record');
    }
  };
  const getcompanyname = async () => {
    try {
      const result = await fetch('http://localhost:5000/userget',{
        
      });
      const data = await result.json();
      console.log(data);
      setCompanyname(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  return (
    <div>
        <div className="mainpages">
        <h2 style={{ textAlign: "center", color: "red", paddingTop: "20px" }}>Catch Details</h2>
        <div class="card mb-4 seccards">
          <div class="card-body">
            <h4>Add|Update Customer Record</h4>
            <div class="container text-start">
              <div class="row">
              <div class="col">
                  <label>Date</label><br></br>
                  <input type="date" style={{ borderRadius: "5px" }} value={date} onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div class="col">
                  <label >Customer</label><br></br>
                  <select  value={customer} onChange={(e) => setCustomer(e.target.value)} >
                                        <option>Select a product</option>
                                        {companyname.map((item) => (
                                            <option key={item._id} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                </div>
                <div class=" col">
                  <label>Season</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={season} onChange={(e) => setSeason(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Quantity</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Count</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={count} onChange={(e) => setCount(e.target.value)}></input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label >pilling count</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={pillingcount} onChange={(e) => setPillingcount(e.target.value)}></input>
                </div>
                <div class=" col">
                  <label>Dc Qty</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={dcqty} onChange={(e) => setDcqty(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Extra qty</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={extraqty} onChange={(e) => setExtraqty(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Market price</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={marketprice} onChange={(e) => setMarketprice(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Party price</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={partyprice} onChange={(e) => setPartyprice(e.target.value)}></input>
                </div>
              </div>
              <div class="row">
              <div class="col-lg-3">
                  <label>Party Name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={partyname} onChange={(e) => setPartyname(e.target.value)}></input>
                </div>
                <div class="col-lg-3">
                  <label>Party Paid</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={partypaid} onChange={(e) => setPartypaid(e.target.value)}></input>
                </div>
                
              </div>

            </div>
            <div className="container text-center mt-4">
            <button className="btn btn-success" onClick={handleAddCustomer} style={{ textAlign: "center", margin: "auto" }}>Add</button>
            </div>


          </div>
        </div>
        <div className='container table-container'>
        <table className='table table-bordered table-striped'>
    <thead>
      <tr>
        <td>SL NO</td>
    <td>Date</td>
    <td>Customer</td>
    <td>Season</td>
    <td>Quantity</td>
    <td>Count</td>
   
    <td>Pilling Count</td>
    <td>Dc Qty</td>
    <td>Extra Qty</td>
    <td>Market price</td>
    <td>Party Price</td>
    <td>Total Price</td>
    <td>Party Name</td>
    <td>Party paid</td>
    <td>Balance</td>
    <td>Operation</td>
   

      </tr>
    </thead>
    <tbody>
    {product.map((item, index) => (
            <tr key={item._id} >
              <td>{index+1}</td>
              <td>{item.date}</td>
              <td>{item.customer}</td>
              <td>{item.season}</td>
              <td>{item.quantity}</td>
              <td>{item.count}</td>
              <td>{item.pillingcount}</td>
              <td>{item.dcqty}</td>
              <td>{item.extraqty}</td>
              <td>{item.marketprice}</td>
              <td>{item.partyprice}</td>
              <td>{item.quantity*item.marketprice}</td>
              <td>{item.partyname}</td>
              <td>{item.partypaid}</td>
              <td>{(item.quantity*item.marketprice)-item.partypaid}</td>
              <td>
              <button className='btn btn-primary' style={{ marginRight: "5px" }} onClick={() => { handleDrawerOpen(); productdetails(item._id); }}>Edit</button>
                <button className='btn btn-danger'onClick={()=>deleteproduct(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
      
    </tbody>
  </table>
        </div>
        <Drawer anchor="right" open={open} onClose={handleDrawerClose} PaperProps={{ style: { width: 400 } }}>
          <List>
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText primary="Close" />

            </ListItem>
            <div class="col">
                  <label>Date</label><br></br>
                  <input type="date" style={{ borderRadius: "5px" }} value={date} onChange={(e) => setDate(e.target.value)}></input>
                </div>
                <div class="col">
                  <label >Customer</label><br></br>
                  <select  >
        <option value="" disabled>Select a product</option>
        {companyname.map((item) => (
          <option key={item._id} value={item.name}>{item.name}</option>
        ))}
      </select>
                </div>
                <div class=" col">
                  <label>Season</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={season} onChange={(e) => setSeason(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Quantity</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Count</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={count} onChange={(e) => setCount(e.target.value)}></input>
                </div>
                <div class="col">
                  <label >pilling count</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={pillingcount} onChange={(e) => setPillingcount(e.target.value)}></input>
                </div>
                <div class=" col">
                  <label>Dc Qty</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={dcqty} onChange={(e) => setDcqty(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Extra qty</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={extraqty} onChange={(e) => setExtraqty(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Market price</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={marketprice} onChange={(e) => setMarketprice(e.target.value)}></input>
                </div>
                <div class="col">
                  <label>Party price</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={partyprice} onChange={(e) => setPartyprice(e.target.value)}></input>
                </div>
                <div class="col-lg-3">
                  <label>Party Name</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={partyname} onChange={(e) => setPartyname(e.target.value)}></input>
                </div>
                <div class="col-lg-3">
                  <label>Party Paid</label><br></br>
                  <input type="text" style={{ borderRadius: "5px" }} value={partypaid} onChange={(e) => setPartypaid(e.target.value)}></input>
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

export default Catch
