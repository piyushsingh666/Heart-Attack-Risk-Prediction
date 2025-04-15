import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeartAttack from './components/heartAttack'; 

function App() {
  return (
    <Router>
      <div className='content'>
        <Routes>
          <Route path="/" element={<HeartAttack />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
