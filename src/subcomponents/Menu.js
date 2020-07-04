import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import '../assets/css/main.css';
import { Link } from 'react-router-dom';

function Menu() {
  const [recordButtonClicked, setRecordButtonClick] = useState(true);
  const [aboutButtonClicked, setAboutButtonClick] = useState(false);

  function handleRecordClick() {
    setRecordButtonClick(true);
    setAboutButtonClick(false);
  }

  function handleAboutClick() {
    setAboutButtonClick(true);
    setRecordButtonClick(false);
  }
  return (
    <div>
      <div className='menuWrapper'>
        <Link className='menuLink' to='/'>
          <Button
            className='menuButton'
            variant={recordButtonClicked ? 'contained' : 'outlined'}
            color='primary'
            onClick={handleRecordClick}
          >
            DO RECORDING
          </Button>
        </Link>
        <Link className='menuLink' to='/about'>
          <Button
            className='menuButton'
            variant={aboutButtonClicked ? 'contained' : 'outlined'}
            color='primary'
            onClick={handleAboutClick}
          >
            KNOW US
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
