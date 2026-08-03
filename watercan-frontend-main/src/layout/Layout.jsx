import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { PageWrapper, ContentWrapper } from "../layout/Layout.styles";
import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import VendorSidebar from "../components/VendorSidebar/VendorSidebar";
import VendorHeader from "../components/vendorHeader/vendorHeader";
import VendorBreadcrumb from "../components/VendorBreadcrumb/VendorBreadcrumb";

const Layout = () => {
  const [title, setTitle] = useState("Home"); // Default title
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Get the current route path
  const location = useLocation();

  // Check if the path contains 'vendor' for vendor dashboard
  const isVendorDashboard = location.pathname.startsWith("/vendor");

  return (
    <>
      {isVendorDashboard ? (
        // Vendor Dashboard Layout
        <PageWrapper>
          <VendorSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <ContentWrapper isCollapsed={isCollapsed}>
            <VendorHeader />
            <VendorBreadcrumb />
            <Outlet />
          </ContentWrapper>
        </PageWrapper>
      ) : (
        // Admin Dashboard Layout
        <PageWrapper>
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <ContentWrapper isCollapsed={isCollapsed}>
            <Header />
            <Breadcrumb/>
            <Outlet />
          </ContentWrapper>
        </PageWrapper>
      )}
    </>
  );
};

export default Layout;
