// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";


// import Contact from "./pages/Contact";
import { ThemeProvider } from "./Components/theme-provider";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import EmploymentDetails from "./Pages/EmploymentDetails";
import Dashboard from "./Pages/Admin/Dashboard";
import MasterList from "./Pages/Admin/MasterList/MasterList";
import AdminLogin from "./Pages/Admin/AdminLogin";
import Archive from "./Pages/Admin/Archive/Archive"
import axios from "axios";
import { LogIn } from "lucide-react";
import ViewAlumni from "./Pages/Admin/ViewAlumni";
import EmploymentForm from "./Pages/EmploymentForm";

import HomeCalendar from "./Pages/Admin/Calendar";

import { API_BASE_URL } from "./Components/api";
import AppRoutes from "./AppRoutes";
const App = () => {


  const[user, setUser] = useState(localStorage.getItem('user'));
  const[admin, setAdmin] = useState(localStorage.getItem('admin'));

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // If token exists, fetch the user profile
    if (token) {
      axios
        .get(`${API_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // setUser(response.data); 
          // Assuming response.data is the object you want to store
          localStorage.setItem('user', JSON.stringify(response.data));
          // console.log(response.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);

        });
    } else {

    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("admin_access_token");

    // If token exists, fetch the user profile
    if (token) {
      axios
        .get(`${API_BASE_URL}/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // setUser(response.data); 
          // Assuming response.data is the object you want to store
          localStorage.setItem('admin', JSON.stringify(response.data));
          // console.log(response.data);
          // setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);

        });
    } else {

    }
  }, []);

  return (
    <div>
      {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/" />}
          />
          <Route path="/employmentform" element={<EmploymentForm />} />
          <Route path="/employment-details" element={<EmploymentDetails />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={admin ? <Dashboard /> : <Navigate to="/admin/login" />}/>
          <Route path="/admin/masterlist" element={<MasterList />} />
          <Route path="/admin/archive" element={<Archive />} />
          <Route path="/admin/view-alumni/:id" element={<ViewAlumni />} />
          <Route path="/admin/calendar" element={<HomeCalendar/>}/>
        </Routes>
      </ThemeProvider> */}
      <AppRoutes user={user} admin={admin}/>
    </div>
  );
};

export default App;
