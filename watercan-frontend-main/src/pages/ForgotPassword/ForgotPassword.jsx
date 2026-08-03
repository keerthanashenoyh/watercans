import React, { useState } from "react";
import {
  Container,
  FormWrapper,
  Title,
  Input,
  Button,
  SignupText,
  ErrorText,
} from "./ForgotPassword.styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../api/userApi"; // Import from userApi.js

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    if (!value) return "Email is required!";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return "Invalid email format!";
    return "";
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(validateEmail(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error || !email) {
      toast.error("Please enter a valid email!");
      return;
    }

    try {
      const response = await forgotPassword(email);
      toast.success(response.message);
    } catch (err) {
      toast.error(err.message || "Error sending password reset email");
    }

    setEmail("");
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <FormWrapper>
        <Title>Forgot Password</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            error={error}
            required
          />
          {error && <ErrorText>{error}</ErrorText>}

          <Button type="submit">Send Reset Link</Button>
        </form>

        <SignupText>
          Back to
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#4a90e2",
              marginLeft: "10px",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Login
          </Link>
        </SignupText>
      </FormWrapper>
    </Container>
  );
};

export default ForgotPassword;
