import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'Mon', orders: 2 },
  { day: 'Tue', orders: 3 },
  { day: 'Wed', orders: 1 },
  { day: 'Thu', orders: 4 },
  { day: 'Fri', orders: 2 },
  { day: 'Sat', orders: 5 },
  { day: 'Sun', orders: 3 },
];

// Custom Tick for X-axis (days)
const CustomXAxisTick = ({ x, y, payload }) => (
  <text
    x={x}
    y={y + 10}
    textAnchor="middle"
    fill="#666"
    fontSize={window.innerWidth <= 1360 ? 12 : 14}
  >
    {payload.value}
  </text>
);

// Custom Tick for Y-axis (orders)
const CustomYAxisTick = ({ x, y, payload }) => (
  <text
    x={x - 5}
    y={y + 4}
    textAnchor="end"
    fill="#666"
    fontSize={window.innerWidth <= 1360 ? 12 : 14}
  >
    {payload.value}
  </text>
);

const OrdersLineChart = () => {
  return (
    <ChartContainer>
      <ChartTitle>Orders Over the Week</ChartTitle>
      <ResponsiveContainer width="95%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={<CustomXAxisTick />} />
          <YAxis allowDecimals={false} tick={<CustomYAxisTick />} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default OrdersLineChart;

// Styled Components
const ChartContainer = styled.div`
  width: 100%;
  height: 350px;
  padding: 20px;

  @media (max-width: 1360px) {
    height: 300px;
    padding: 10px;
  }
`;

const ChartTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;
