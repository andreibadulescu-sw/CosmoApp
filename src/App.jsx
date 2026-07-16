import React from 'react';
import { CosmoQuery } from './form/QueryForm'
import { useState } from 'react'
import './App.css'

export const APIDataContext = React.createContext();

function App() {
  const [apiData, setAPIData] = useState([]);
  const val = {apiData, setAPIData};

  return (
    <APIDataContext.Provider value={val}>
      <CosmoQuery/>
    </APIDataContext.Provider>
  )
}

export default App;
