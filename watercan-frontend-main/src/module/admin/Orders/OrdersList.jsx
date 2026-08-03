import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Select } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Container, Title, StyledTable, FilterContainer, StyledModal, ModalContent, DetailRow, OrderStatus, TitleContent } from "./OrdersList.styles";
import { getAllOrders } from "../../../api/serviceapi";
import moment from "moment";

const { Option } = Select;

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const response = await getAllOrders();
                console.log("API Response:", response); // Debugging

                if (response && response.data) {
                    const formattedOrders = response.data.map((order) => ({
                        ...order,
                        key: order._id,
                        username: order.user_id?.name,
                        vendorName: order.vendor_id?.name,
                        cans: order.watercan_id?.capacityInLiters,
                        status: order.orderStatus,
                    }));

                    setOrders(formattedOrders);
                    setFilteredOrders(formattedOrders);
                } else {
                    console.error("Invalid API response:", response);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);


    useEffect(() => {
        if (statusFilter === "All") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.status === statusFilter));
        }
    }, [statusFilter, orders]);

    const handleViewClick = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
    };

    const columns = [
        { title: "Username", dataIndex: "username", key: "username" },
        { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
        { title: "Number of Cans", dataIndex: "cans", key: "cans" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                return (
                    <OrderStatus status={status}>
                        {status}
                    </OrderStatus>
                );
            }
        },
        {
            title: "View More",
            key: "view",
            render: (_, record) => (
                <EyeOutlined
                    style={{ fontSize: "18px", cursor: "pointer", color: "#1890ff" }}
                    onClick={() => handleViewClick(record)}
                />
            ),
        },
    ];

    return (
        <Container>
            <TitleContent>
            <Title>Orders List</Title>

            <FilterContainer>
                <span className="span">Filter by Status:</span>
                <Select
  defaultValue="All"
  style={{ width: 150 }}
  className="custom-select"
  dropdownClassName="custom-select-dropdown"
  onChange={handleStatusFilterChange}
>
  <Option value="All">All</Option>
  <Option value="Order placed">Order Placed</Option>
  <Option value="confirmed">Confirmed</Option>
  <Option value="Shipped">Shipped</Option>
  <Option value="Delivered">Delivered</Option>
  <Option value="Cancelled">Cancelled</Option>
</Select>

            </FilterContainer>
            </TitleContent>

            <StyledTable>
                <Table
                    columns={columns}
                    dataSource={filteredOrders}
                    pagination={{ pageSize: 5, showSizeChanger: false }}
                    rowKey="_id"
                    loading={loading}
                />
            </StyledTable>



            <StyledModal
                title="Order Details"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
            >
                {selectedOrder && (
                    <ModalContent>
                        <DetailRow>
                            <strong>Username:</strong> {selectedOrder.user_id?.name}
                        </DetailRow>
                        <DetailRow>
                            <strong>Vendor Name:</strong> {selectedOrder.vendor_id?.name}
                        </DetailRow>
                        <DetailRow>
                            <strong>Number of Cans:</strong> {selectedOrder.watercan_id?.capacityInLiters}
                        </DetailRow>
                        <DetailRow>
                            <strong>Delivery Address:</strong> {selectedOrder.user_id?.address}
                        </DetailRow>
                        <DetailRow>
                            <strong>Phone No.:</strong> {selectedOrder.user_id?.phoneNumber}
                        </DetailRow>
                        {/* <OrderStatus>
            <strong>Order Status:</strong> {selectedOrder.orderStatus}
          </OrderStatus> */}
                        <DetailRow>
                            <strong>Order Date:</strong> {moment(selectedOrder.createdAt).format("MMMM Do YYYY, h:mm A")}
                        </DetailRow>
                    </ModalContent>
                )}
            </StyledModal>
        </Container>
    );
};

export default OrdersList;
