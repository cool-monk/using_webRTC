import React from 'react';
import './App.css';
import IndexPage from './components/IndexPage/IndexPage';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <IndexPage></IndexPage>
      </div>
    </Router>
  );
}

export default App;
