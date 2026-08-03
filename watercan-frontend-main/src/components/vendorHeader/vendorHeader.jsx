import React, { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  HeaderContainer,
  HeaderWrapper,
  ProfileContainer,
  ProfileIcon,
  DropdownMenu,
  SidebarContainer,
  Overlay,
} from "./vendorHeader.styles";
import { getUserByFirebaseId, getVendorsByUserId } from "../../api/userApi";
import UserProfile from "../../module/vendor/vendorProfile/vendorProfile";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

const VendorHeader = () => {
  const [vendorName, setVendorName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const fUID = localStorage.getItem("FUID");
        const user = await getUserByFirebaseId(fUID);
        const vendorRes = await getVendorsByUserId(user.data._id);
        setVendorName(vendorRes.data[0].name || "Vendor");
      } catch (err) {
        console.error("Error fetching vendor data:", err);
      }
    };

    fetchVendorData();
  }, []);

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <ProfileContainer ref={dropdownRef}>
            <p>Welcome, {vendorName}!</p>
            <ProfileIcon onClick={toggleDropdown}>
              <FaUserCircle />
            </ProfileIcon>

            {dropdownOpen && (
              <DropdownMenu>
                <button onClick={() => setSidebarOpen(true)}> <CgProfile/> Profile</button>
                <button onClick={handleLogout}> <TbLogout/> Logout</button>
              </DropdownMenu>
            )}
          </ProfileContainer>
        </HeaderWrapper>
      </HeaderContainer>

      {/* Optional sidebar toggle for full profile */}
      <Overlay open={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      <SidebarContainer open={sidebarOpen}>
        <UserProfile handleLogout={handleLogout} />
      </SidebarContainer>
    </>
  );
};

export default VendorHeader;



