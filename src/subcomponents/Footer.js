import React from 'react';
import '../assets/css/main.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className='footerWrapper'>
      <p>©Copyright RecordBox {currentYear}</p>
    </div>
  );
}

export default Footer;
