import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Mainpage from './Mainpage';
import Customer from './Customer';
import Return from './Return';
import Employee from './Employee';

function Indexpage() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showNav, setShowNav] = useState(true);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Mainpage />;
      case 'customer':
        return <Customer />;
      case 'employee':
        return <Employee />;
      case 'return':
        return <Return />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className={`body-area${showNav ? ' body-pd' : ''}`}>
      <header className={`header${showNav ? ' body-pd' : ''}`}>
        <div className="header_toggle">
          <i className={`bi ${showNav ? 'bi-x' : 'bi-list'}`} onClick={() => setShowNav(!showNav)} />
        </div>
        <div className="header_img">
          <img src="../logologin.png" className="headimg" alt="Logo" />
        </div>
      </header>
      <div className={`l-navbar${showNav ? ' show' : ''}`}>
        <nav className="nav">
          <div>
            <a href="#" onClick={() => setCurrentPage('home')} className="nav_link">
              <i className="bi bi-people nav_icon" /><span className="nav_name">Home</span>
            </a>
            <a href="#" onClick={() => setCurrentPage('customer')} className="nav_link">
              <i className="bi bi-people nav_icon" /><span className="nav_name">Customer</span>
            </a>
            <a href="#" onClick={() => setCurrentPage('employee')} className="nav_link">
              <i className="bi bi-people nav_icon" /><span className="nav_name">Employee</span>
            </a>
            <a href="#" onClick={() => setCurrentPage('return')} className="nav_link">
              <i className="bi bi-people nav_icon" /><span className="nav_name">Return</span>
            </a>
            <a href="#" className="nav_link">
              <i className="bi bi-person-check nav_icon" /><span className="nav_name">Role</span>
            </a>
          </div>
          <a href="#" className="nav_link">
            <i className="bi bi-box-arrow-left nav_icon" /><span className="nav_name">SignOut</span>
          </a>
        </nav>
      </div>
      <div className="pt-4 pb-4 mt-4">
        {renderContent()}
      </div>
    </div>
  );
}

export default Indexpage;
