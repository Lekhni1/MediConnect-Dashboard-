import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Messages from "./components/Messages";
import AddNewDoctor from "./components/AddNewDoctor";
import AddNewAdmin from "./components/AddNewAdmin";
import Login from "./components/Login";
import Doctors from "./components/Doctors";
import Sidebar from "./components/Sidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "./main"; // Changed context name
import axios from "axios";
import Loading from "./components/Loading";

import "./App.css";

const App = () => {
  const { loggedIn, setLoggedIn, setUserInfo } = useContext(AuthContext);
  const [appLoading, setAppLoading] = useState(true);

  // 👇 Fetch logged-in admin info on app mount
  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setLoggedIn(true);
        setUserInfo(data.user);
      } catch (err) {
        setLoggedIn(false);
        setUserInfo(null);
      } finally {
        setAppLoading(false);
      }
    };

    fetchAdminInfo();
  }, [setLoggedIn, setUserInfo]);

  // ⏳ Show loader while checking login
  if (appLoading) return <Loading />;

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/addnew" element={<AddNewDoctor />} />
          <Route path="/admin/addnew" element={<AddNewAdmin />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
      </Router>
    </>
  );
};

export default App;
