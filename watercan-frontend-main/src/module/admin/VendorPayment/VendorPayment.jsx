import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Select } from "antd";
import { Container, Title, StyledTable, ModalContent, ButtonGroup, FilterContainer } from "./VendorPayment.styles";

const { Option } = Select;

const VendorPayment = () => {
    const [vendorPayments, setVendorPayments] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        const dummyVendorData = [
            { 
                key: "1", 
                vendorName: "Aqua Suppliers", 
                deliveredCans: 20, 
                amount: 20 * 40, 
                transactionId: "VTXN123456", 
                deliveryDate: "2025-03-20", 
                status: "Received" 
            },
            { 
                key: "2", 
                vendorName: "Fresh Water Co.", 
                deliveredCans: 30, 
                amount: 30 * 40, 
                transactionId: "VTXN789012", 
                deliveryDate: "2025-03-18", 
                status: "Failed" 
            },
            { 
                key: "3", 
                vendorName: "Blue Water Pvt. Ltd.", 
                deliveredCans: 15, 
                amount: 15 * 40, 
                transactionId: "VTXN345678", 
                deliveryDate: "2025-03-15", 
                status: "Received" 
            }
        ];

        setVendorPayments(dummyVendorData);
    }, []);

    const handleStatusClick = (vendor) => {
        setSelectedVendor(vendor);
        setIsModalOpen(true);
    };

    const handleReceived = () => {
        setVendorPayments(vendorPayments.map(v => 
            v.key === selectedVendor.key ? { ...v, status: "Received" } : v
        ));
        setIsModalOpen(false);
    };

    const handleFailed = () => {
        setVendorPayments(vendorPayments.map(v => 
            v.key === selectedVendor.key ? { ...v, status: "Failed" } : v
        ));
        setIsModalOpen(false);
    };

    const handleFilterChange = (value) => {
        setFilterStatus(value);
    };

    const filteredVendorPayments = vendorPayments.filter(vendor => 
        filterStatus === "All" || vendor.status === filterStatus
    );

    const columns = [
        { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
        { title: "Delivered Cans", dataIndex: "deliveredCans", key: "deliveredCans" },
        { title: "Total Amount (₹)", dataIndex: "amount", key: "amount" },
        { title: "Transaction ID", dataIndex: "transactionId", key: "transactionId" },
        { title: "Delivery Date", dataIndex: "deliveryDate", key: "deliveryDate" },
        { 
            title: "Status", 
            dataIndex: "status", 
            key: "status", 
            render: (_, record) => (
                <a href="#" onClick={() => handleStatusClick(record)}>
                    {record.status}
                </a>
            ) 
        }
    ];

    return (
        <Container>
            <Title>Vendor Payment Management</Title>

            <FilterContainer>
                <label>Filter by Status:</label>
                <Select defaultValue="All" onChange={handleFilterChange} style={{ width: 150 }}>
                    <Option value="All">All</Option>
                    <Option value="Received">Received</Option>
                    <Option value="Failed">Failed</Option>
                </Select>
            </FilterContainer>

            <StyledTable>
                <Table 
                    columns={columns} 
                    dataSource={filteredVendorPayments} 
                    pagination={{ pageSize: 5, showSizeChanger: false }} 
                    rowKey="key" 
                />
            </StyledTable>

            <Modal
                title="Vendor Payment Details"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
            >
                {selectedVendor && (
                    <ModalContent>
                        <p><strong>Vendor Name:</strong> yfbhf</p>
                        <p><strong>Delivered Cans:</strong> {selectedVendor.deliveredCans}</p>
                        <p><strong>Total Amount (₹):</strong> {selectedVendor.amount}</p>
                        <p><strong>Transaction ID:</strong> {selectedVendor.transactionId}</p>
                        <p><strong>Delivery Date:</strong> {selectedVendor.deliveryDate}</p>

                        <ButtonGroup>
                            <Button type="primary" onClick={handleReceived}>Mark as Received</Button>
                            <Button type="danger" onClick={handleFailed}>Mark as Failed</Button>
                        </ButtonGroup>
                    </ModalContent>
                )}
            </Modal>
        </Container>
    );
};

export default VendorPayment;
