import React from 'react';
import Menu from '../../subcomponents/Menu';
import Footer from '../../subcomponents/Footer';
import '../../assets/css/main.css';
import Main from '../Main/Main';

function IndexPage() {
  return (
    <React.Fragment>
      <div className='brandLogo'>
        <img src={require('../../assets/img/logo.png')}></img>
      </div>
      <Menu></Menu>
      <Main></Main>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default IndexPage;
