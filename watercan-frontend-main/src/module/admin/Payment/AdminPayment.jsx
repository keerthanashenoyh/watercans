import React, { useState } from "react";
import UserPayment from "../UserPayment/UserPayment";
import VendorPayment from "../VendorPayment/VendorPayment";
import { Container, Title, ToggleContainer, ToggleButton, ContentContainer, ToggleEvent } from "./AdminPayment.styles";

const AdminPayment = () => {
    const [activeTab, setActiveTab] = useState("vendor");

    return (
        <Container>
            <ToggleEvent>
            <Title>Admin Payment Management</Title>

            {/* Toggle Buttons */}
            <ToggleContainer>
                {/* <ToggleButton 
                    isActive={activeTab === "user"} 
                    onClick={() => setActiveTab("user")}
                >
                    User Payments
                </ToggleButton> */}
                <ToggleButton 
                    isActive={activeTab === "vendor"} 
                    onClick={() => setActiveTab("vendor")}
                >
                    Vendor Payments
                </ToggleButton>
            </ToggleContainer>
            </ToggleEvent>

            {/* Render Component Based on Active Tab */}
            <ContentContainer>
                {activeTab === "user" ? <UserPayment /> : <VendorPayment />}
            </ContentContainer>
        </Container>
    );
};

export default AdminPayment;
