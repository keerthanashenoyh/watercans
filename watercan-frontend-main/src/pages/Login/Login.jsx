import React, { useState } from "react";
import {
  Container,
  FormWrapper,
  Title,
  Input,
  Button,
  CheckboxWrapper,
  ForgotPassword,
  SignupText,
  ErrorText,
  PasswordWrapper,
  EyeIcon
} from "./Login.styles";

import { loginUser } from "../../api/userApi";
import { getApplicationByUserId } from "../../api/serviceapi";

import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { VscEye, VscEyeClosed } from "react-icons/vsc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  // ---------- VALIDATION ----------
  const validateEmail = (value) => {
    if (!value) return "Email is required!";
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value)) return "Invalid email format!";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required!";
    if (value.length < 6) return "Minimum 6 characters required!";
    return "";
  };

  // ---------- HANDLERS ----------
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // ---------- LOGIN ----------
  const handleLogin = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr || passErr) {
      setErrors({ email: emailErr, password: passErr });
      toast.error("Fix validation errors");
      return;
    }

    try {
      const response = await loginUser(email, password);
      const user = response?.data;

      if (!user) throw new Error("Invalid login response");

      console.log("User:", user);

      localStorage.setItem("user", JSON.stringify(user));

      const role = user.role;

      // ---------- ADMIN ----------
      if (role === "admin") {
        toast.success("Login successful!");
        navigate("/admin", { replace: true });
        return;
      }

      // ---------- VENDOR ----------
if (role === "vendor") {
  const userId = user?.id || user?._id;

  if (!userId) throw new Error("User ID missing");

  const res = await getApplicationByUserId(userId);
  const appData = res?.data;

  console.log("Application:", appData);

  if (!Array.isArray(appData) || appData.length === 0) {
    navigate("/applicationform", { replace: true });
    return;
  }

  const status = appData?.[0]?.status?.trim()?.toLowerCase();

  console.log("Status:", status);

  if (status === "approved") {
    toast.success("Login successful!");

    localStorage.setItem("application", JSON.stringify(appData));

    navigate("/vendor", { replace: true });
  } 
  else if (status === "pending") {
    navigate("/registration-successfully", { replace: true });
  } 
  else {
    toast.error("Application not approved");
  }

  return;
}

      toast.error("Role not recognized");

    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Login failed"
      );
    }

    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} />

      <FormWrapper>
        <Title>Login</Title>

        <form onSubmit={handleLogin}>
          {/* EMAIL */}
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleEmailChange}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}

          {/* PASSWORD */}
          <PasswordWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <EyeIcon onClick={togglePasswordVisibility}>
              {showPassword ? <VscEye /> : <VscEyeClosed />}
            </EyeIcon>
          </PasswordWrapper>

          {errors.password && <ErrorText>{errors.password}</ErrorText>}

          {/* FORGOT PASSWORD */}
          <CheckboxWrapper>
            <ForgotPassword>
              <Link to="/forgot-password">Forgot Password</Link>
            </ForgotPassword>
          </CheckboxWrapper>

          {/* BUTTON */}
          <Button type="submit">Login</Button>
        </form>

        {/* SIGNUP */}
        <SignupText>
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </SignupText>
      </FormWrapper>
    </Container>
  );
};

export default Login;