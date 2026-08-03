import styled from "styled-components";
import waterBg from "../../assets/water5.jpg";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to right, #4a90e2, #8e44ad);
`;

export const FormWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 450px;
  text-align: center;
`;

export const Title = styled.h1`
  color: #333;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 20px 0;
  border: none;
  border-bottom: 2px solid ${({ error }) => (error ? "red" : "#888")};
  font-size: 16px;
  background : transparent; /* Matches uploaded image */
  // background: #f7f9fc;
  outline: none;
  transition: 0.3s ease-in-out;

  &:focus {
    border-bottom: 2px solid ${({ error }) => (error ? "red" : "#007bff")};
    background: #e7ecff;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: linear-gradient(to right, #4a90e2, #8e44ad);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  margin: 20px 0;

  &:hover {
    background: #4a90e2;
  }
`;

export const SignupText = styled.p`
  margin-top: 15px;
  font-size: 16px;
  color: #333;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -15px;
  margin-bottom: 10px;
  text-align: left;
`;
