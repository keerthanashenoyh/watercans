// Replace Ant Design Modal with a custom modal component
import React, { useEffect, useState } from "react";
import { Table, Button, Select } from "antd";
import { getApplication, rejectApplication, approveApplication } from "../../../api/serviceapi";
import { Container, Title, StyledTable, ModalContent, ButtonGroup, FilterContainer, OrderStatus, CustomModalOverlay, CustomModalWrapper, CustomModalBox, CloseButton } from "./VendorList.styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const { Option } = Select;

const VendorList = () => {
    const [vendors, setVendors] = useState([]);
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");

useEffect(() => {
    let mounted = true;

    const fetchVendors = async () => {
        try {
            const data = await getApplication();
            if (!mounted) return;

            const sortedVendors = data.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            setVendors(sortedVendors);
            setFilteredVendors(sortedVendors);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };

    fetchVendors();

    return () => {
        mounted = false;
    };
}, []);

    useEffect(() => {
        if (statusFilter === "All") {
            setFilteredVendors(vendors);
        } else {
            setFilteredVendors(vendors.filter(vendor => vendor.status === statusFilter));
        }
    }, [statusFilter, vendors]);

    const handleStatusClick = (vendor) => {
        setSelectedVendor(vendor);
        setIsModalOpen(true);
    };

    const handleApprove = async () => {
        if (!selectedVendor || !selectedVendor._id) return;
        try {
            await approveApplication(selectedVendor._id);
            setVendors(prev => prev.map(v => v._id === selectedVendor._id ? { ...v, status: "approved" } : v));
            setIsModalOpen(false);
            toast.success("Vendor approved successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to approve vendor");
        }
    };

    const handleReject = async () => {
        if (!selectedVendor || !selectedVendor._id) return;
        try {
            await rejectApplication(selectedVendor._id);
            setVendors(prev => prev.map(v => v._id === selectedVendor._id ? { ...v, status: "rejected" } : v));
            setIsModalOpen(false);
            toast.error("Vendor rejected successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reject vendor");
        }
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
        {
            title: "Delivery Start Time",
            dataIndex: "delivery_start_time",
            key: "delivery_start_time",
            render: (text) => moment(text).isValid() ? moment(text).format("h:mm A") : 'Invalid date',
        },
        {
            title: "Delivery End Time",
            dataIndex: "delivery_end_time",
            key: "delivery_end_time",
            render: (text) => moment(text).isValid() ? moment(text).format("h:mm A") : 'Invalid date',
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <OrderStatus status={record.status} onClick={() => handleStatusClick(record)}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </OrderStatus>
            )
        }
    ];

    return (
        <Container>
            <ToastContainer />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title>Vendor List</Title>
                <FilterContainer>
                    <span style={{ marginTop: "8px" }}>Filter by Status: </span>
                    <Select defaultValue="All" style={{ width: 150 }} onChange={handleStatusFilterChange}>
                        <Option value="All">All</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="approved">Approved</Option>
                        <Option value="rejected">Rejected</Option>
                    </Select>
                </FilterContainer>
            </div>
            <StyledTable>
                <Table 
                    columns={columns} 
                    dataSource={filteredVendors} 
                    pagination={{ pageSize: 5, showSizeChanger: false }} 
                    rowKey="_id" 
                />
            </StyledTable>

            {isModalOpen && (
                <CustomModalOverlay>
                    <CustomModalWrapper>
                        <CustomModalBox>
                            <CloseButton onClick={() => setIsModalOpen(false)}>&times;</CloseButton>
                            {selectedVendor && (
                                <ModalContent>
                                    <p><strong>Name:</strong> {selectedVendor.name}</p>
                                    <p><strong>Email:</strong> {selectedVendor.email}</p>
                                    <p><strong>Phone Number:</strong> {selectedVendor.phoneNumber}</p>
                                    <p><strong>Address:</strong> {selectedVendor.address}</p>
                                    <p><strong>City:</strong> {selectedVendor.city}</p>
                                    <p><strong>State:</strong> {selectedVendor.state}</p>
                                    <p><strong>Pincode:</strong> {selectedVendor.pincode}</p>
                                    <p><strong>Delivery Start Time:</strong> {moment(selectedVendor.delivery_start_time).format("h:mm A")}</p>
                                    <p><strong>Delivery End Time:</strong> {moment(selectedVendor.delivery_end_time).format("h:mm A")}</p>
                                    <p><strong>Deliverable Cans:</strong> {selectedVendor.deliverable_water_cans.length}</p>
                                    <ButtonGroup>
                                        <Button type="primary" onClick={handleApprove} disabled={selectedVendor?.status === "approved"}>Approve</Button>
                                        <Button type="primary" onClick={handleReject} disabled={selectedVendor?.status === "rejected"}>Reject</Button>
                                    </ButtonGroup>
                                </ModalContent>
                            )}
                        </CustomModalBox>
                    </CustomModalWrapper>
                </CustomModalOverlay>
            )}
        </Container>
    );
};

export default VendorList;
