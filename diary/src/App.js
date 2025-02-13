import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main_Page from './Main_Page';
import Diarypage from './Diarypage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Main_Page />} />
        <Route path="/diarypage" element={<Diarypage />} />
      </Routes>
  );
}

export default App;