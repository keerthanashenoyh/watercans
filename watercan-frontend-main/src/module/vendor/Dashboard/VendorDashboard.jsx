import React from "react";
import {
  DashboardContainer,
  CardContainer,
  StatCard,
  IconWrapper,
  StatContent,
  StatValue,
  StatLabel,
  GraphContainer
} from "./VendorDashboard.styles";
import { FaDollarSign, FaMoneyBillAlt, FaCube, FaShoppingCart } from "react-icons/fa";
import { Card } from "antd";
import LineGraph from "./Linegraph/Linegraph";
import BarGraph from "./Linegraph/Bargraph";
import OrderStatusgraph from "./Linegraph/OrderStatusgraph";
const VendorDashboard = () => {
  return (
    <DashboardContainer>

    <CardContainer>
      <StatCard>
        <IconWrapper style={{backgroundColor: "#f36c6c"}}>
          <FaDollarSign />
        </IconWrapper>
        <StatContent>
          <StatValue>₹ 0</StatValue>
          <StatLabel>gross sales in last 7 days</StatLabel>
        </StatContent>
      </StatCard>

      <StatCard>
        <IconWrapper style={{backgroundColor: "#1ba9cc"}}>
          <FaMoneyBillAlt />
        </IconWrapper>
        <StatContent>
          <StatValue>₹ 0</StatValue>
          <StatLabel>commission in last 7 days</StatLabel>
        </StatContent>
      </StatCard>

      <StatCard>
        <IconWrapper style={{backgroundColor: "#f9cd38"}}>
          <FaCube />
        </IconWrapper>
        <StatContent>
          <StatValue>1 item</StatValue>
          <StatLabel>sold in last 7 days</StatLabel>
        </StatContent>
      </StatCard>

      <StatCard>
        <IconWrapper style={{backgroundColor: "#169bb0"}}>
          <FaShoppingCart />
        </IconWrapper>
        <StatContent>
          <StatValue>1 order</StatValue>
          <StatLabel>received in last 7 days</StatLabel>
        </StatContent>
      </StatCard>
    </CardContainer>

    <GraphContainer>
        <LineGraph />

        <BarGraph />

        <OrderStatusgraph/>
    </GraphContainer>

    </DashboardContainer>
  );
};

export default VendorDashboard;
