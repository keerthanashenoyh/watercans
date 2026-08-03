import styled from "styled-components";
import waterBg from "../../assets/watercan.jpg";

export const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${waterBg}) no-repeat center center/cover;
    filter: blur(1px); /* Adjust the blur intensity */
    z-index: -1;
  }
`;

export const SignupWrapper = styled.div`
  // background: #fff;
    // background: rgba(255, 255, 255, 0.2); /* Semi-transparent white */
  background: transparent;
  // backdrop-filter: blur(100px); /* Adds a blur effect for better readability */
  border-radius: 10px;
  box-shadow: 0 4px 10px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-width: 450px;

  @media (max-width: 1360px) {
    min-width: 350px;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    margin: 0 auto;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  color: #fff;
  font-size: 2rem;

  @media (max-width: 1360px) {
    font-size: 1.5rem;
  }
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 1360px) {
    gap: 10px;
  }
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid ${({ error }) => (error ? "red" : "#ccc")};
  // border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  
  &:focus {
    border-color: ${({ error }) => (error ? "red" : "#0072ff")};
  }

  @media (max-width: 1360px) {
    font-size: 12px;
    padding: 8px;
  }
`;

export const SignupButton = styled.button`
  background: ${({ disabled }) => (disabled ? "#ccc" : "#0072ff")};
  color: ${({ disabled }) => (disabled ? "#0072ff" : "#fff")};
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: 100%;
  transition: 0.3s;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#0052d4")};
  }

  @media (max-width: 1360px) {
    font-size: 12px;
    padding: 8px;
  }
`;

export const FooterContent = styled.div`
  background: #fff;
  padding: 20px;
  max-width: 100%;
  text-align: center;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;

  .link {
  font-size: 20px;
    color: #0072ff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
}
    @media (max-width: 1360px) {
    padding: 15px;
    border-top-left-radius: 70%;
    border-top-right-radius: 70%;


    .link {
      font-size: 16px;
    }
}


      
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 16px;
  margin: -5px 0 10px;
  text-align: left;
  background:#0009;
  back-filter: blur(100px);

`;

export const Options = styled.div`
  display: flex;
  justify-content: start;
  font-size: 14px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
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

