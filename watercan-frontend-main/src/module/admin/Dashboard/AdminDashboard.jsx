import React from 'react';
import {
  DashboardContainer,
//   Title,
  CardContainer,
  StatCard,
  IconBox,
  StatInfo,
  StatValue,
  StatLabel,
  GraphContainer
} from './AdminDashboard.styles';
import { FaDollarSign, FaMoneyBillAlt, FaBox, FaShoppingCart } from 'react-icons/fa';
import OrdersLineChart from './OrdersLineChart/OrdersLineChart';
import MonthlyRevenueChart from './MonthlyRevenueChart/MonthlyRevenueChart';

const AdminDashboard = () => {
  const stats = [
    {
      icon: <FaDollarSign />,
      color: '#F76C6C',
      value: '3,40 $',
      label: 'gross sales in last 7 days'
    },
    {
      icon: <FaMoneyBillAlt />,
      color: '#2DBAE7',
      value: '0,00 $',
      label: 'commission in last 7 days'
    },
    {
      icon: <FaBox />,
      color: '#F9D342',
      value: '1 item',
      label: 'sold in last 7 days'
    },
    {
      icon: <FaShoppingCart />,
      color: '#20A4F3',
      value: '1 order',
      label: 'received in last 7 days'
    }
  ];

  return (
    <DashboardContainer>
      {/* <Title>Admin Dashboard</Title> */}
      <CardContainer>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <IconBox bgColor={stat.color}>{stat.icon}</IconBox>
            <StatInfo>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatInfo>
          </StatCard>
        ))}
      </CardContainer>
      <GraphContainer>
        <OrdersLineChart />
        <MonthlyRevenueChart />
      </GraphContainer>
    </DashboardContainer>
  );
};

export default AdminDashboard;
