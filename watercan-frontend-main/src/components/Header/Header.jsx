import React, { useState, useRef, useEffect } from "react";
import { 
    HeaderContainer, 
    HeaderWrapper, 
    HeaderTitle, 
    ProfileContainer, 
    ProfileIcon, 
    DropdownMenu 
} from "./Header.styles";
import { FaUserCircle } from "react-icons/fa";
import { getUserByFirebaseId } from "../../api/userApi";

const Header = ({ title }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null); // <-- Add userData state
    const dropdownRef = useRef(null);


    useEffect(() => {
        const getUsers = async () => {
            try {
                const firebaseUID = localStorage.getItem("FUID"); // or whatever the actual key is
    
                if (!firebaseUID) {
                    console.warn("No UID found in localStorage.");
                    return;
                }
    
                const response = await getUserByFirebaseId(firebaseUID);
                setUserData(response.data); // store user data
                console.log("User data:", response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        getUsers();
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <HeaderContainer>
            <HeaderWrapper>
                <HeaderTitle>{title}</HeaderTitle>

                <ProfileContainer ref={dropdownRef}>
                    {userData && <span>Welcome, {userData.name}!</span>} {/* <-- Only render when userData exists */}
                    
                    <ProfileIcon onClick={toggleDropdown}>
                        <FaUserCircle size={24} />
                    </ProfileIcon>

                    {dropdownOpen && (
                        <DropdownMenu>
                            <button onClick={handleLogout}>Logout</button>
                        </DropdownMenu>
                    )}
                </ProfileContainer>
            </HeaderWrapper>
        </HeaderContainer>
    );
};

export default Header;
