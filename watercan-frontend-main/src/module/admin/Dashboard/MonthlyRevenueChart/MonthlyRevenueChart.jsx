import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 2100 },
  { month: 'Mar', revenue: 800 },
  { month: 'Apr', revenue: 1600 },
  { month: 'May', revenue: 2000 },
  { month: 'Jun', revenue: 1500 },
  { month: 'Jul', revenue: 2500 },
  { month: 'Aug', revenue: 1900 },
  { month: 'Sep', revenue: 1700 },
  { month: 'Oct', revenue: 2300 },
  { month: 'Nov', revenue: 2200 },
  { month: 'Dec', revenue: 2600 },
];

// Custom Tick for X-axis (months)
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

// Custom Tick for Y-axis (revenue)
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

const MonthlyRevenueChart = () => {
  const [barSize, setBarSize] = useState(getBarSize(window.innerWidth));

  function getBarSize(width) {
    if (width >= 1920) return 40;
    if (width <= 1360) return 20;
    return 30;
  }

  useEffect(() => {
    const handleResize = () => setBarSize(getBarSize(window.innerWidth));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ChartContainer>
      <ChartTitle>Monthly Revenue</ChartTitle>
      <ResponsiveContainer width="95%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="month" tick={<CustomXAxisTick />} />
          <YAxis tick={<CustomYAxisTick />} />
          <Tooltip />
          <Bar dataKey="revenue" fill="#82ca9d" barSize={barSize} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MonthlyRevenueChart;

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
