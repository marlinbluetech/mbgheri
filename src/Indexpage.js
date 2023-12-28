import React, { useState,useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Mainpage from './Mainpage';
import Customer from './Customer';
import Return from './Return';
import Employee from './Employee';
import Spotsales from './Spotsales';
import Stock from './Stock';
import Payment from './Payment';
import Purchase from './Purchase';
import Transaction from './Transaction';
import Credit from './Credit';
import Gheri from './Gheri';
import Company from './Company';
import Catch from './Catch';
import Sales from './Sales';
import Product from './Product';
import Techdashboard from './Techdashboard';
import Details from './Details';
import Specific from './Specific'
import { useNavigate } from 'react-router-dom';

function Indexpage() {
  const [showNav, setShowNav] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
      
      const hasToken = !!localStorage.getItem('token');
  
     
      if (!hasToken) {
        navigate('/loginn');
      }
    }, [navigate]);

  return (
    
      <div className={`body-area${showNav ? ' body-pd' : ''}`}>
        <header className={`header${showNav ? ' body-pd' : ''}`}>
          <div className="header_toggle">
            <i className={`bi ${showNav ? 'bi-x' : 'bi-list'}`} onClick={() => setShowNav(!showNav)} />
          </div>
          <Link to="/" className="nav_links">
                Home
              </Link> 
              <Link to="http://www.mbaquatech.com/" className="nav_links">
                Site
              </Link> 
              <Link to="/tech" className="nav_links">
           Technical Dashboard
              </Link> 
              <Link to="/" className="nav_links">
          signout
              </Link>
          
          <div className="header_img">
            
            <img src="../logologin.png" className="headimg" alt="Logo" />
          </div>
        </header>
        <div className={`l-navbar${showNav ? ' show' : ''}`}>
          <nav className="nav">
            <div>
            <div className="text-center" >
            
            <img src="../logologin.png" style={{width:"100px",height:"100px",textAlign:"center"}} alt="Logo" />
          </div>
              <Link to="/indexpage/mainpage" className="nav_link">
                <i className="bi bi-people nav_icon" /><span className="nav_name">Home</span>
              </Link>
              <Link to="/indexpage/customer" className="nav_link">
                <i className="bi bi-people nav_icon" /><span className="nav_name">Customer</span>
              </Link>
              <Link to="/indexpage/spotsales" className="nav_link">
                <i className="bi bi-person-check nav_icon" /><span className="nav_name">Spotsales</span>
              </Link>
              <Link to="/indexpage/company" className="nav_link">
              <i class="bi bi-building"></i><span className="nav_name">Company</span>
              </Link>
              <Link to="/indexpage/employee" className="nav_link">
                <i className="bi bi-people nav_icon" /><span className="nav_name">Employee</span>
              </Link>
              <Link to="/indexpage/product" className="nav_link">
                <i className="bi bi-person-check nav_icon" /><span className="nav_name">Product List</span>
              </Link>
              <Link to="/indexpage/stock" className="nav_link">
                <i className="bi bi-person-check nav_icon" /><span className="nav_name">Stock</span>
              </Link>
              <Link to="/indexpage/sales" className="nav_link">
              <i class="bi bi-receipt"></i><span className="nav_name">Sales</span>
              </Link>
              <Link to="/indexpage/return" className="nav_link">
                <i className="bi bi-people nav_icon" /><span className="nav_name">Return</span>
              </Link>
              <Link to="/indexpage/purchase" className="nav_link">
                <i className="bi bi-person-check nav_icon" /><span className="nav_name">Purchase</span>
              </Link>
              <Link to="/indexpage/catch" className="nav_link">
                <i className="bi bi-person-check nav_icon" /><span className="nav_name">Catch</span>
              </Link>
             
              <Link to="/indexpage/payment" className="nav_link">
              <i class="bi bi-credit-card"></i><span className="nav_name">Payment</span>
              </Link>
              <Link to="/indexpage/gheri" className="nav_link">
                <i className="bi bi-person-check nav_icon" /><span className="nav_name">Gheri-Expenditure List</span>
              </Link>
              
              
              <Link to="/indexpage/transaction" className="nav_link">
                <i className="bi bi-person-check nav_icon" /><span className="nav_name">Transaction</span>
              </Link>
              
              <Link to="/indexpage/credit" className="nav_link">
                <i className="bi bi-person-check nav_icon" /><span className="nav_name">Credit-pending List</span>
              </Link>
              
              <Link to="/indexpage/tech" className="nav_link">
                <i className="bi bi-person-check nav_icon" /><span className="nav_name">Technical Dashboard</span>
              </Link>
            
              <Link to="/loginn" className="nav_link">
              <i className="bi bi-box-arrow-left nav_icon" /><span className="nav_name">SignOut</span>
            </Link>
             
              
            </div>
           

          </nav>
        </div>
        <div className="pt-4 pb-4 mt-4">
          <Routes>
            <Route path="/mainpage" element={<Mainpage />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/return" element={<Return />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/spotsales" element={<Spotsales />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/purchase" element={<Purchase />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/credit" element={<Credit/>} />
            <Route path="/gheri" element={<Gheri/>} />
            <Route path="/company" element={<Company/>} />
            <Route path="/catch" element={<Catch/>} />
            <Route path="/sales" element={<Sales/>} />
            <Route path="/product" element={<Product/>} />
            <Route path="/tech" element={<Techdashboard/>} />
            <Route path="details/:_id" element={<Details />} />

            <Route path="/specific/:_id" element={<Specific />} />
       

          </Routes>
        </div>
      </div>
   
  );
}

export default Indexpage;
