import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

// Sample data
const data = [
  { name: "Mon", value: 10 },
  { name: "Tue", value: 15 },
  { name: "Wed", value: 8 },
  { name: "Thu", value: 20 },
  { name: "Fri", value: 12 },
  { name: "Sat", value: 18 },
  { name: "Sun", value: 25 },
];

// Styled Components
const LineGraphContainer = styled.div`
  width: 90%;
  height: 350px;
  margin: 30px 20px 10px 20px;
  background: #ffffff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 10px;

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

const LineGraph = () => {
  return (
    <LineGraphContainer>
      <Title>Weekly Sales Trend</Title>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={<CustomXAxisTick />} />
          <YAxis tick={<CustomYAxisTick />}/>
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#00b894" strokeWidth={2} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </LineGraphContainer>
  );
};

export default LineGraph;
