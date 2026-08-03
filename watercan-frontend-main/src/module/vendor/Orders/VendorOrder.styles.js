import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 10px;
    width: 100%;
  }

  // @media (min-width: 1920px) {
  //   max-width: 1500px;
  //   padding: 30px;
  // }

  @media (max-width: 1360px) {
    max-width: 900px;
  }

`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  overflow-x: auto; /* Ensures tabs are scrollable on small screens */

  @media (max-width: 480px) {
    flex-wrap: wrap;
    // justify-content: center;
  }
`;

export const Tab = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  border-bottom: ${(props) => (props.active ? "3px solid #FA8072" : "none")};
  color: ${(props) => (props.active ? "#FA8072" : "gray")};

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px 10px;
    // color: #rgb(184, 12, 132);
  }

  @media (max-width: 1360px) {
    font-size: 12px;
    padding: 7px 10px;
  }
`;

export const OrderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

//   @media (max-width: 480px) {
//     flex-direction: column;
//     text-align: center;
//     padding: 10px;
//   }

  @media (max-width: 1360px) {
    padding: 10px;
    font-size: 12px;
    padding: 10px;
  }
`;

export const UserInfo = styled.div`
  // flex: 1;
  // gap: 10px;
  line-height: 2;

  @media (max-width: 480px) {
    font-size: 14px;
  }

  // @media (min-width: 1920px) {
  //   font-size: 18px;
  // }
`;

export const Username = styled.div`
  font-weight: bold;
  color: #008080;
  font-size: 16px;

  @media (max-width: 1360px) {
    font-size: 14px;
  }
`;

export const Cans = styled.div`
  color: #333;

  @media (max-width: 1360px) {
    font-size: 12px;
  }
`;

export const UserStatus = styled.div`
  font-weight: bold;
  padding: 7px 8px;
  border-radius: 10px;
  display: inline-block; 
  width: 20%;
  text-align: center;
  
  color: ${({ status }) =>
    status === "Order placed" ? "orange" :
    status === "Shipped" ? "purple" :
    status === "Delivered" ? "green" :
    status === "Cancelled" ? "red" : "black"};

  background-color: ${({ status }) =>
    status === "Order placed" ? "rgba(255, 165, 0, 0.3)" :
    status === "Shipped" ? "rgba(146, 59, 146, 0.29)" :
    status === "Delivered" ? "rgba(20, 255, 71, 0.4)" :
    status === "Cancelled" ? "rgba(255, 0, 0, 0.3)" : "rgba(200, 200, 200, 0.3)"};

    @media (max-width: 1360px) {
    width: 15%;
    padding: 5px 6px;
  }



    @media (max-width: 480px) {
      font-size: 12px;
      padding: 5px 6px;
      width: 30%;
    }
`;

export const ViewMoreIcon = styled.div`
  font-size: 20px;
  cursor: pointer;
  color: blue;

  @media (max-width: 480px) {
    font-size: 12px;
  }

  @media (max-width: 1360px) {
    font-size: 10px;
  }
`;

export const NoOrders = styled.div`
  text-align: center;
  color: gray;
  // margin-top: 20px;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 200px; 
    height: auto;
    margin-top: 10px;

    @media (max-width: 1360px) {
      width: 150px;
    }
  }

  p {
    margin-top: 15px;
    font-size: 24px;

    @media (max-width: 1360px) {
      font-size: 16px;
    }
  }


`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 450px;

  @media (max-width: 480px) {
    width: 90%;
  }

  @media (max-width: 1360px) {
    width: 350px;
    padding: 20px;
  }

  
  .orderTitle{
    text-align: center;
    font-size: 26px;
    color: #008080;
    margin-bottom: 20px;

    @media (max-width: 1360px){
    font-size: 18px;
    }
  }

  .orderDetails{
    font-size: 20px;
    margin-top: 12px;

    @media (max-width: 1360px){
    font-size: 14px;
    }
    
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 20px;

  @media (max-width: 480px) {
    font-size: 16px;
  }

  @media (max-width: 1360px) {
    font-size: 12px;
  }
`;


