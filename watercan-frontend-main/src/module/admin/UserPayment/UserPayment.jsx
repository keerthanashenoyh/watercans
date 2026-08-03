import React, { useEffect, useState } from "react";
import { Table, Modal, Button, InputNumber, Select } from "antd";
import { Container, Title, StyledTable, ModalContent, ButtonGroup, FilterContainer } from "./UserPayment.styles";

const { Option } = Select;

const AdminPayment = () => {
    const [payments, setPayments] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState("All");
    const [newTransaction, setNewTransaction] = useState({ userName: "", waterCans: 1 });

    useEffect(() => {
        const dummyData = [
            { 
                key: "1", 
                userName: "dfghj", 
                waterCans: 5, 
                amount: 5 * 45, 
                transactionId: "TXN123456", 
                paymentDate: "2025-03-20", 
                status: "Received" 
            },
            { 
                key: "2", 
                userName: "Jane Smith", 
                waterCans: 10, 
                amount: 10 * 45, 
                transactionId: "TXN789012", 
                paymentDate: "2025-03-18", 
                status: "Failed" 
            },
            { 
                key: "3", 
                userName: "Mike Johnson", 
                waterCans: 3, 
                amount: 3 * 45, 
                transactionId: "TXN345678", 
                paymentDate: "2025-03-15", 
                status: "Received" 
            }
        ];

        setPayments(dummyData);
    }, []);

    const handleStatusClick = (payment) => {
        setSelectedPayment(payment);
        setIsModalOpen(true);
    };

    const handleMarkReceived = () => {
        setPayments(payments.map(p => 
            p.key === selectedPayment.key ? { ...p, status: "Received" } : p
        ));
        setIsModalOpen(false);
    };

    const handleMarkFailed = () => {
        setPayments(payments.map(p => 
            p.key === selectedPayment.key ? { ...p, status: "Failed" } : p
        ));
        setIsModalOpen(false);
    };

    const handleFilterChange = (value) => {
        setFilterStatus(value);
    };

    const handleNewTransaction = () => {
        if (!newTransaction.userName || newTransaction.waterCans < 1) {
            alert("Please enter a valid user name and number of water cans.");
            return;
        }

        const newPayment = {
            key: (payments.length + 1).toString(),
            userName: newTransaction.userName,
            waterCans: newTransaction.waterCans,
            amount: newTransaction.waterCans * 45,
            transactionId: "TXN" + Math.floor(100000 + Math.random() * 900000),
            paymentDate: new Date().toISOString().split("T")[0],
            status: "Received"
        };

        setPayments([...payments, newPayment]);
        setNewTransaction({ userName: "", waterCans: 1 });
    };

    const filteredPayments = payments.filter(payment => 
        filterStatus === "All" || payment.status === filterStatus
    );

    const columns = [
        { title: "User Name", dataIndex: "userName", key: "userName" },
        { title: "Water Cans", dataIndex: "waterCans", key: "waterCans" },
        { title: "Total Amount (₹)", dataIndex: "amount", key: "amount" },
        { title: "Transaction ID", dataIndex: "transactionId", key: "transactionId" },
        { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
        { 
            title: "Status", 
            dataIndex: "status", 
            key: "status", 
            render: (_, record) => (
                <a href="#" onClick={() => handleStatusClick(record)} className="created">
                    {record.status}
                </a>
            ) 
        }
    ];

    return (
        <Container>
            <Title>User Payment Management</Title>

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
                    dataSource={filteredPayments} 
                    pagination={{ pageSize: 5, showSizeChanger: false }} 
                    rowKey="key" 
                />
            </StyledTable>

            <Modal
                title="Payment Details"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
            >
                {selectedPayment && (
                    <ModalContent>
                        <p><strong>User Name:</strong> {selectedPayment.userName}</p>
                        <p><strong>Water Cans:</strong> {selectedPayment.waterCans}</p>
                        <p><strong>Total Amount (₹):</strong> {selectedPayment.amount}</p>
                        <p><strong>Transaction ID:</strong> {selectedPayment.transactionId}</p>
                        <p><strong>Payment Date:</strong> {selectedPayment.paymentDate}</p>

                        <ButtonGroup>
                            <Button type="primary" onClick={handleMarkReceived}>Mark as Received</Button>
                            <Button type="danger" onClick={handleMarkFailed}>Mark as Failed</Button>
                        </ButtonGroup>
                    </ModalContent>
                )}
            </Modal>
        </Container>
    );
};

export default AdminPayment;
