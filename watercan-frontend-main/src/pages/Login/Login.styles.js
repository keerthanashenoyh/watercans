import styled from "styled-components";

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
  backdrop-filter: blur(100px);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  min-width: 450px;
  text-align: center;

  @media (max-width: 1360px) {
    min-width: 350px;
  }

  @media (max-width: 480px) {
  min-width: 90%;
  }
`;

export const Title = styled.h1`
  color: #333;
  margin: 3rem 1rem;

  @media (max-width: 1360px) {
    font-size: 1.5rem;
        margin: 1.5rem 1rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-bottom: 2px solid ${({ error }) => (error ? "red" : "#888")};
  font-size: 16px;
  box-sizing: border-box;
  background: transparent;
  transition: border-bottom 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-bottom-color: ${({ error }) => (error ? "red" : "#007bff")};
  }

  @media (max-width: 1360px) {
    font-size: 14px;
    padding: 8px;
    margin: 8px 0;
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
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    background: #4a90e2;
  }
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  margin: 20px 0;
`;

export const ForgotPassword = styled.a`
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 1360px) {
    font-size: 14px;
    color: #007bff;
  }
`;

export const SignupText = styled.p`
  margin-top: 15px;
  font-size: 16px;
  color: #333;

  .signuplink {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -5px;
  margin-bottom: 10px;
  text-align: left;
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const EyeIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 55%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
  font-size: 1.2rem;
  
  &:hover {
    color: #000;
  }
`;
