import styled from "styled-components";

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
`;

export const SuccessGif = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 20px;
`;

export const SuccessHeading = styled.h2`
  font-size: 2rem;
  color: #2d8f54;
  margin-bottom: 10px;
`;

export const SuccessMessage = styled.p`
  font-size: 1.2rem;
  color: #444;
  max-width: 500px;
  line-height: 1.6;
  margin-top: 50px;

  strong {
    color: #2d8f54;
    font-weight: 600;
    font-size: 1.4rem;
  }
`;

