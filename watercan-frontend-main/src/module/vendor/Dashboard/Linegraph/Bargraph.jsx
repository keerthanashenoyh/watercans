import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

// Sample weekly orders data
const data = [
  { day: "Mon", orders: 2 },
  { day: "Tue", orders: 5 },
  { day: "Wed", orders: 3 },
  { day: "Thu", orders: 6 },
  { day: "Fri", orders: 4 },
  { day: "Sat", orders: 8 },
  { day: "Sun", orders: 7 },
];

// Styled components
const BarGraphContainer = styled.div`
  width: 90%;
  height: 350px;
  margin: 30px 20px 10px 20px;
  background: #fff;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 1360px) {
    height: 250px;
    margin: 20px 10px 10px 10px;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  text-align: center;
  margin: 15px;
  color: #333;

  @media (max-width: 1360px) {
    font-size: 14px;
  }
`;

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  width: 100% !important;
  height: 100% !important;
`;

const CustomYAxisTick = ({ x, y, payload }) => (
  <text
    x={window.innerWidth <= 1360 ? x - 5 : x - 10}
    y={window.innerWidth <= 1360 ? y + 4 : y + 8}
    textAnchor="end"
    fill="#666"
    fontSize={window.innerWidth <= 1360 ? 12 : 18}
  >
    {payload.value}
  </text>
);
 
const CustomXAxisTick = ({ x, y, payload }) => (
  <text
    x= {window.innerWidth <= 1360 ? x + 10 : x + 16}
    y={window.innerWidth <= 1360 ? y + 11 : y + 18}
    textAnchor="end"
    fill="#666"
    fontSize={window.innerWidth <= 1360 ? 12 : 18}
  >
    {payload.value}
  </text>
);
 

const BarGraph = () => {
  return (
    <BarGraphContainer>
      <Title>Weekly Orders</Title>
      <StyledResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 50 }} barSize={30}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" tick={<CustomXAxisTick />}/>
          <YAxis tick={<CustomYAxisTick />}/>
          <Tooltip />
          <Bar dataKey="orders" fill="#0984e3" radius={[6, 6, 0, 0]} />
        </BarChart>
      </StyledResponsiveContainer>
    </BarGraphContainer>
  );
};

export default BarGraph;
