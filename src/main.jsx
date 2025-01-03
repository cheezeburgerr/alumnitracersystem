// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


import React, { useEffect } from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from "./App";

// Create a root using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));




root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);
