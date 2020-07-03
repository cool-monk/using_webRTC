import React from 'react';
import Menu from '../../subcomponents/Menu';
import Footer from '../../subcomponents/Footer';
import { Button } from '@material-ui/core';
import StartRecord from '@material-ui/icons/FiberManualRecord';
import StopIcon from '@material-ui/icons/Stop';
import '../../assets/css/main.css';

function Main() {
  return (
    <React.Fragment>
      <div className='brandLogo'>
        <img src={require('../../assets/img/logo.png')}></img>
      </div>
      <Menu></Menu>
      <div className='playButtons'>
        <Button
          variant='contained'
          color='secondary'
          className='startRecordButton'
          startIcon={<StartRecord />}
        >
          Start Recording
        </Button>
        <Button
          variant='contained'
          color='primary'
          className='startRecordButton'
          startIcon={<StopIcon />}
        >
          Stop Recording
        </Button>
      </div>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default Main;
