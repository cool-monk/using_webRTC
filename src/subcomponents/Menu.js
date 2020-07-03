import React from 'react';
import Button from '@material-ui/core/Button';
import '../assets/css/main.css';

function Menu() {
  return (
    <div>
      <div className='menuWrapper'>
        <Button className='menuButton' variant='contained' color='primary'>
          DO RECORDING
        </Button>
        <Button className='menuButton' variant='outlined' color='primary'>
          KNOW US
        </Button>
      </div>
    </div>
  );
}

export default Menu;
