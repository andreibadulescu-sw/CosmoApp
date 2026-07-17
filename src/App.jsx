import React from 'react';
import { CosmoQuery } from './form/QueryForm'
import { useState, useEffect } from 'react'
import './App.css'
import { ResultViewer } from './form/ResultViewer';

export const APIDataContext = React.createContext();

function App() {
  const [apiData, setAPIData] = useState([]);
  const val = {apiData, setAPIData};

  function pageSwitcher() {
    if (apiData.length < 1) {
      return <CosmoQuery/>;
    } else {
      return <ResultViewer/>;
    }
  }

  return (
    <APIDataContext.Provider value={val}>
      {pageSwitcher()}
    </APIDataContext.Provider>
  )
}

export default App;
