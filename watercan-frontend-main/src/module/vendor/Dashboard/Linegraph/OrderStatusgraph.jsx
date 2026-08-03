import React from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Add this hook above or in a separate file
const useWindowWidth = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

// Styled Components
const OrderStatusContainer = styled.div`
  padding: 10px;
  border-radius: 0.5rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: 30px 20px 10px 20px;
  height: 350px;

  @media (max-width: 1360px) {
    margin: 20px 10px 10px 10px;
    height: 250px;
  }

  .recharts-default-legend {
    display: flex !important;
    justify-content: center !important;
    // flex-wrap: wrap;
    gap: 10px !important;
  }

  .recharts-legend-item-text {
    font-weight: 500;
    font-size: 20px;
    color: #444 !important;

    @media (max-width: 1360px) {
      font-size: 12px;
    }
  }
`;

const Title = styled.h2`
  font-size: 20px;
  margin-top: 5px;
  text-align: center;
  color: #333;

  @media (max-width: 1360px) {
    font-size: 14px;
    margin: 0px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    margin: 10px;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;

  @media (max-width: 1360px) {
    height: 200px;
  }

  @media (max-width: 480px) {
    height: 190px;
  }
`;

const OrderStatusgraph = () => {
  const width = useWindowWidth();

  const data = [
    { name: "Delivered", value: 60 },
    { name: "Pending", value: 25 },
    { name: "Cancelled", value: 15 }
  ];

  const COLORS = ["#4CAF50", "#FF9800", "#F44336"];

  // Set radius values based on screen width
  const getRadius = () => {
    if (width <= 480) {
      return { innerRadius: "50%", outerRadius: "75%", cy: "40%" };
    } else if (width <= 1360) {
      return { innerRadius: "40%", outerRadius: "65%", cy: "45%" };
    } else {
      return { innerRadius: "50%", outerRadius: "75%", cy: "50%" };
    }
  };

  const { innerRadius, outerRadius, cy } = getRadius();

  return (
    <OrderStatusContainer>
      <Title>Order Status Breakdown</Title>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy={cy}
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ width: "100%", textAlign: "center" }} />
            <Legend verticalAlign="bottom" height={16} />
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </OrderStatusContainer>
  );
};

export default OrderStatusgraph;
