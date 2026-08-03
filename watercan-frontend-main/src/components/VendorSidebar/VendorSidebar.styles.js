import styled from "styled-components";

export const SideBarwrapper = styled.div`
  width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "250px")};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  background: #2290ac;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  align-items: center;
  padding: 10px;

   @media (max-width: 1360px){
    width: ${({ isCollapsed }) => (isCollapsed ? "60px" : "200px")};
  }

     .logo {
     display: flex;
     justify-content: center;
     align-items: center;
     padding: 20px;
     color: #1f2937;
     font-size: ${({ isCollapsed }) => (isCollapsed ? "18px" : "24px")};
     transition: font-size 0.3s ease-in-out;
     font-weight: bold;

     @media (max-width: 1360px) {
       font-size: ${({ isCollapsed }) => (isCollapsed ? "10px" : "10px")};
     }
   }
  .sidebar-logo {
    width: ${({ isCollapsed }) => (isCollapsed ? "40px" : "80px")};
    transition: width 0.3s ease-in-out;
    border-radius: 50%;
  }

      .menu {
    //  flex-grow: 1;
     display: flex;
     flex-direction: column;
     margin-top: 10px;
     font-family: "Montserrat", sans-serif;
     width: 100%;


   }
        .menu-list {
     list-style: none;
     padding: 0;
     display: flex;
     flex-direction: column;
     gap: 5px;
     font-family: "Montserrat", sans-serif;
   }
 
   .menu-item {
     width: 100%;

     @media (max-width: 1360px) {
       width: ${({ isCollapsed }) => (isCollapsed ? "80%" : "100%")};
       margin: 0 auto;
     }
   }
 
   .menu-link {
     display: flex;
     align-items: center;
     justify-content: ${({ isCollapsed }) => (isCollapsed ? "center" : "flex-start")};
     padding: 12px;
     color: #1f2937; /* Default text color */
     text-decoration: none;
     font-size: ${({ isCollapsed }) => (isCollapsed ? "16px" : "18px")};
     font-weight: 500;
    box-shadow: none;
     border-radius: 8px;
     transition: all 0.3s ease-in-out;
     white-space: nowrap;
     overflow: hidden;
     font-family: "Montserrat", sans-serif;
    //  margin-top: 60px; 

     @media (max-width: 1360px) {
       padding: 8px;
     }
     &:hover {
      background:rgba(165, 170, 179, 0.71);
       color: #1f2937;
     }
 
     &.active {
      background:rgba(229, 231, 235, 0.94); 
       color: white;
       font-weight: bold;
 
       /* Ensure icon turns white when active */
       .menu-link-icon {
         color: white;
       }
     }
   }
 
   .menu-link-icon {
     font-size: 20px;
     min-width: 40px;
     display: flex;
     justify-content: center;
     align-items: center;
     color: white;
     transition: color 0.3s ease-in-out;

     @media (max-width: 1360px) {
       font-size: 16px;
       padding: ${({ isCollapsed }) => (isCollapsed ? "0px" : "5px")};
     }
   }
 
   .menu-link.active .menu-link-icon {
     color: black !important; 
   }
 
   .menu-link-text {
     display: ${({ isCollapsed }) => (isCollapsed ? "none" : "inline")};
     color: white;

     @media (max-width: 1360px) {
       font-size: 14px;
     }
   }
  .menu {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    // margin-top: 20px;
    width: 100%;
  }

  .menu-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .menu-item {
    width: 100%;
  }

  .menu-link {
    display: flex;
    align-items: center;
    justify-content: ${({ isCollapsed }) =>
      isCollapsed ? "center" : "flex-start"};
    padding: 12px;
    color: #1f2937;
    text-decoration: none;
    font-size: ${({ isCollapsed }) => (isCollapsed ? "16px" : "18px")};
    font-weight: 500;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    white-space: nowrap;
    overflow: hidden;

    &:hover {
      background: rgba(165, 170, 179, 0.71);
      color: #1f2937;
    }

    &.active {
      background: rgba(229, 231, 235, 0.94);
      color: white;
      font-weight: bold;

      .menu-link-icon {
        color: white;
      }
    }
  }

  .menu-link-icon {
    font-size: 20px;
    min-width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    transition: color 0.3s ease-in-out;
  }

  .menu-link-text {
    display: ${({ isCollapsed }) => (isCollapsed ? "none" : "inline")};
    color: white;
  }

  .menu-link.active .menu-link-text {
    color: black !important;
  }

  .menu-link.active .menu-link-icon {
    color: black !important;
  }

  @media (max-width: 576px) {
    position: fixed;
    top: 0;
    left: 0;
    width: ${({ isMobileExpanded }) => (isMobileExpanded ? "250px" : "0")};
    height: 100vh;
    background: #2290ac;
    z-index: 1000;
    overflow: hidden;
    box-shadow: ${({ isMobileExpanded }) =>
      isMobileExpanded ? "2px 0 10px rgba(0, 0, 0, 0.1)" : "none"};
    display: ${({ isMobileExpanded }) => (isMobileExpanded ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    // padding-top: 60px;
    transition: all 0.3s ease-in-out;

    .menu-link {
      justify-content: flex-start;
      padding: 12px;
      font-size: 16px;

      &.active {
        background: rgba(229, 231, 235, 0.94);
        color: white;

        .menu-link-icon {
          color: white;
        }
      }

      &:hover {
        background: rgba(165, 170, 179, 0.71);
        color: #1f2937;
      }
    }

    .menu-link-text {
      display: block;
    }
  }
`;

export const Hamburger = styled.button`
  display: none;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 5;
  background: none;
  color: black;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 20px;

  @media (max-width: 576px) {
    display: block;
  }

  &:hover {
    // background-color: #1a7183;
    cursor: pointer;
  }
`;

export const Logo = styled.div`
  .logo {
    width: ${({ isCollapsed }) => (isCollapsed ? "40px" : "80px")};
    transition: width 0.3s ease-in-out;

    @media (max-width: 1360px) {
  width: ${({ isCollapsed }) => (isCollapsed ? "70px" : "130px")};
  }
  }

   @media (max-width: 576px) {
   .logo {
    width: ${({ isCollapsed }) => (isCollapsed ? "130px" : "150px")};
}
}
`;

export const Overlay = styled.div`
  @media (max-width: 576px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 999;
  }
`;
