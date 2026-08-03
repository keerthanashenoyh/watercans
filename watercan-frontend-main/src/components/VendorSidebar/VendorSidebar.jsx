


import React, { useState } from "react";
import {
  SideBarwrapper,
  Logo,
  Hamburger,
  Overlay,
} from "./VendorSidebar.styles";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaHandHoldingWater, FaBars } from "react-icons/fa";
import logo from "../../assets/logo.png";

const VendorSidebar = ({ setTitle, isCollapsed, setIsCollapsed }) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const SidebarItem = [
    { id: 1, name: "Dashboard", path: "/vendor", icon: <MdDashboard /> },
    { id: 2, name: "Orders", path: "/vendor/Orders", icon: <FaHandHoldingWater /> },
  ];

  const handleHamburgerClick = () => {
    if (window.innerWidth <= 576) {
      setIsMobileExpanded(!isMobileExpanded);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleOverlayClick = () => {
    if (window.innerWidth <= 576) {
      setIsMobileExpanded(false);
    }
  };

  return (
    <>
      <Hamburger onClick={handleHamburgerClick}>
        <FaBars />
      </Hamburger>

      {isMobileExpanded && <Overlay onClick={handleOverlayClick} />}

      <SideBarwrapper
        isCollapsed={isCollapsed}
        isMobileExpanded={isMobileExpanded}
        onMouseEnter={() => {
          if (window.innerWidth > 576) setIsCollapsed(false);
        }}
        onMouseLeave={() => {
          if (window.innerWidth > 576) setIsCollapsed(true);
        }}
      >
        <Logo isCollapsed={isCollapsed}>
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ borderRadius: "50%" }}
          />
        </Logo>

        <div className="menu">
          <ul className="menu-list">
            {SidebarItem.map((item) => (
              <li className="menu-item" key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "menu-link active" : "menu-link"
                  }
                  onClick={() => {
                    setTitle(item.name);
                    localStorage.setItem("title", JSON.stringify(item.name));
                    setIsMobileExpanded(false);
                  }}
                  end
                >
                  <span className="menu-link-icon">{item.icon}</span>
                  <span className="menu-link-text">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </SideBarwrapper>
    </>
  );
};

export default VendorSidebar;
