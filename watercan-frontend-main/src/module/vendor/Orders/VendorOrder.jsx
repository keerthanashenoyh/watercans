import React, { useEffect, useState } from "react";
import {
  Container,
  TabContainer,
  Tab,
  OrderCard,
  UserInfo,
  ViewMoreIcon,
  ModalOverlay,
  ModalContent,
  CloseButton,
  Username,
  Cans,
  UserStatus,
  NoOrders,
} from "./VendorOrder.styles";
import { FaTimes } from "react-icons/fa";
import { TbDotsVertical } from "react-icons/tb";
// import { getOrdersByVendor } from "../../../api/serviceapi";
import { getOrdersByVendor } from "../../../api/OrdersApi";
import noorder from "../../../assets/noOrder.png"
import { getUserByFirebaseId } from "../../../api/userApi";

// Static time slots for filtering
const STATIC_TIME_SLOTS = ["10AM-12PM", "12PM-3PM", "3PM-6PM", "6PM-9PM"];

// Normalize API time slot to match our static time slots
const normalizeTimeSlot = (timeSlot) => {
  if (!timeSlot) return null;

  const mapping = {
    "10:00 AM - 12:00 PM": "10AM-12PM",
    "12:00 PM - 03:00 PM": "12PM-3PM",
    "03:00 PM - 06:00 PM": "3PM-6PM",
    "06:00 PM - 09:00 PM": "6PM-9PM",
  };

  const normalized = mapping[timeSlot.trim()] || timeSlot; 
  console.log(`Original: ${timeSlot} → Normalized: ${normalized}`);
  return normalized;
};

const VendorOrder = () => {
  const [activeTab, setActiveTab] = useState(STATIC_TIME_SLOTS[0]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const closeModal = () => setSelectedOrder(null);

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  const fetchVendorOrders = async () => {
    try {
      const firebaseId = localStorage.getItem("FUID");
      console.log("Vendor Firebase ID from localStorage:", firebaseId);
  
      const vendorUser = await getUserByFirebaseId(firebaseId);

      // const vendorUserId = "67ef94f79464fe34bb3b9147";
      const vendorUserId = vendorUser?.data?._id;
      console.log("Vendor User ID:", vendorUserId);
  
      if (!vendorUserId) {
        console.error("Vendor user ID not found.");
        return;
      }


  
      const ordersResponse = await getOrdersByVendor(vendorUserId);
      const ordersArray = ordersResponse?.data || [];
  
      if (ordersArray.length === 0) {
        setOrders([]);
        return;
      }
  
      const normalizedOrders = ordersArray.map((order) => ({
        ...order,
        timeSlot: normalizeTimeSlot(order.timeSlot),
      }));
  
      setOrders(normalizedOrders);
    } catch (error) {
      console.error("Error fetching vendor orders:", error);
      setOrders([]);
    }
  };
  
  


      // Normalize time slots before storing orders



  const filteredOrders = orders.filter((order) => order.timeSlot === activeTab);

  return (
    <Container>
      <TabContainer>
        {STATIC_TIME_SLOTS.map((timeSlot) => (
          <Tab
            key={timeSlot}
            active={activeTab === timeSlot}
            onClick={() => setActiveTab(timeSlot)}
          >
            {timeSlot}
          </Tab>
        ))}
      </TabContainer>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderCard key={order._id}>
            <UserInfo>
              <Username>{order.user_id?.name?.charAt(0).toUpperCase() + order.user_id?.name?.slice(1).toLowerCase()}</Username>
              <Cans>No of WaterCans:{order.watercan_id?.capacityInLiters}</Cans>
            </UserInfo>

            <UserStatus status={order.orderStatus}>{order.orderStatus}</UserStatus>   

            <ViewMoreIcon onClick={() => setSelectedOrder(order)}>
            <TbDotsVertical/>
            </ViewMoreIcon>
          </OrderCard>
        ))
      ) : (
<NoOrders>
  <img src={noorder} alt="No Orders" />
  <p>No orders available</p>
</NoOrders>      )}

      {selectedOrder && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>
              <FaTimes />
            </CloseButton>
            <h3 className="orderTitle">Order Details</h3>
            <p className="orderDetails">
              <strong>Order ID:</strong> {selectedOrder._id}
            </p>
            <p className="orderDetails">
              <strong>Name:</strong> {selectedOrder.user_id?.name}
            </p>
            <p className="orderDetails">
              <strong>Address:</strong> {selectedOrder.user_id?.email}
            </p>
            <p className="orderDetails">
              <strong>Phone:</strong> {selectedOrder.user_id?.phoneNumber}
            </p>
            <p className="orderDetails">
              <strong>No of WaterCans:</strong> {selectedOrder.watercan_id?.capacityInLiters}
            </p>
            <p className="orderDetails">
              <strong>Brand:</strong> {selectedOrder.watercan_id?.Brand}
            </p>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default VendorOrder;
