import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../src/module/admin/Dashboard/AdminDashboard";
import Layout from "./layout/Layout";
import VendorDashboard from "./module/vendor/Dashboard/VendorDashboard";
import ApplicationForm from "./module/vendor/Applicationform/Applicationform";
import Signup from "./pages/Signup/Signup";
import VendorList from "./module/admin/Vendorlist/Vendorlist";
import Login from "./pages/Login/Login";
import AdminPayment from "./module/admin/Payment/AdminPayment";
import VendorPayment from "./module/admin/VendorPayment/VendorPayment";
import RegistrationSuccessfully from "./module/vendor/RegistrationSuccessfully/RegistrationSuccessfully";
import OTP from "./pages/OTP/OTP";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import OrdersList from "./module/admin/Orders/OrdersList";
import VendorOrder from "./module/vendor/Orders/VendorOrder";
import WaterCansProduct from "./module/admin/WaterCansProduct/WaterCansProduct";
import ApprovedVendors from "./module/admin/ApprovedVendor/ApprovedVendors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/applicationform" element={<ApplicationForm />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/registration-successfully" element={<RegistrationSuccessfully />} />  
        {/* Layout wraps all child routes */}
        <Route path="/" element={<Layout />}>
          {/* Admin Dashboard Route */}
          <Route path="admin" element={<AdminDashboard />} />
        

        {/* Optional: 404 Route */}
        <Route path="vendor" element={<VendorDashboard />} />
        <Route path="/vendor/Orders" element={<VendorOrder />} />

        {/* Vendor List Route */}
        <Route path="/admin/vendorlist" element={<VendorList />} />
        <Route path="/admin/payment" element={<AdminPayment />} />
        {/* <Route path="/admin/Orders" element={<OrdersList />} /> */}
        <Route path="/admin/waterCan" element={<WaterCansProduct />} />
        <Route path="/admin/approvedVendor" element={<ApprovedVendors />} />
        
        

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



