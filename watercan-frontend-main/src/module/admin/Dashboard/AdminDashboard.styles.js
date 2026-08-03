import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 20px;
`;

export const Title = styled.h1`
  margin-left: 50px;
  font-size: 26px;
  color: #333;
`;

export const CardContainer = styled.div`
    display: flex;
    gap: 20px;
    padding: 3px 50px;
    justify-content: space-around;
`;

export const StatCard = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  width: 20%;
//   align-items: center;

  @media (max-width: 1360px) {
    width: 40%;
    border-radius: 0px;
  }
`;

export const IconBox = styled.div`
  background-color: ${({ bgColor }) => bgColor || '#ccc'};
  color: #fff;
  font-size: 40px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1360px) {
    font-size: 30px;
    padding: 10px;
  }
  @media (max-width: 768px) {
    font-size: 25px;
    padding: 5px;
  }
    @media (max-width: 480px) {
        font-size: 20px;
        padding: 5px;
    }
`;

export const StatInfo = styled.div`
  padding: 10px 15px;
  display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`;

export const StatValue = styled.div`
  font-size: 20px;
  color: #2a6ebb;
  font-weight: bold;

  @media (max-width: 1360px) {
    font-size: 16px;
  }
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #888;
  @media (max-width: 1360px) {
    font-size: 12px;
  }
`;

export const GraphContainer = styled.div`

  padding: 20px;
  margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;

`;
