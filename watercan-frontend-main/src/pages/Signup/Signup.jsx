import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SignupContainer,
  SignupWrapper,
  Title,
  SignupForm,
  Input,
  SignupButton,
  // FooterText,
  ErrorText,
  FooterContent,
  PasswordWrapper, 
  EyeIcon
} from "./Signup.styles";
import { createUser } from "../../api/userApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { VscEye , VscEyeClosed } from "react-icons/vsc";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Validation function for each field
const validateField = (field, value) => {
  let message = "";

  if (field === "name" && !value.trim()) {
    message = "Name is required";
  }

  if (field === "email") {
    if (!value.trim()) message = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(value))
      message = "Enter a valid email";
  }

  if (field === "phone") {
    if (!value.trim()) message = "Phone number is required";
    else if (!/^\d{10}$/.test(value))
      message = "Enter a valid 10-digit phone number";
  }

  if (field === "password") {
    if (!value.trim()) message = "Password is required";
    else if (value.length < 8)
      message = "Minimum 8 characters required";
  }

  setErrors((prev) => ({ ...prev, [field]: message }));
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  if (Object.values(errors).some((err) => err)) return;

  setLoading(true);

  try {
    const userData = {
      name,
      email,
      role: "vendor",
      phoneNumber: phone,
      password, // ✅ IMPORTANT (send password to backend)
    };

    await createUser(userData);

    toast.success("Signup successful!");

    setTimeout(() => {
      navigate("/login"); // better than applicationform
    }, 2000);

  } catch (error) {
    console.error("Signup error:", error);
    toast.error(error.message || "Signup failed");
  }

  setLoading(false);
};

  return (
    <SignupContainer>
      <SignupWrapper>
        <div style={{ padding: "30px"}}>
        <Title>Signup</Title>
        <SignupForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => {
              const newValue = e.target.value;
              if (/^[a-zA-Z\s]*$/.test(newValue)) {
                setName(newValue);
                setErrors((prev) => ({ ...prev, name: "" }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  name: "Only letters and spaces are allowed",
                }));
              }
            }}
            error={errors.name}
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
            error={errors.email}
          />
          {errors.email && <ErrorText>{errors.email}</ErrorText>}

          <Input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => {
              const newValue = e.target.value;
              if (/^\d{0,10}$/.test(newValue)) {
                // Allows only up to 10 digits
                setPhone(newValue);
                setErrors((prev) => ({
                  ...prev,
                  phone:
                    newValue.length === 10
                      ? ""
                      : "Phone number must be 10 digits",
                }));
              }
            }}
            error={errors.phone}
          />
          {errors.phone && <ErrorText>{errors.phone}</ErrorText>}

          <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
            error={errors.password}
          />
                      <EyeIcon onClick={togglePasswordVisibility}>
                        {showPassword ? <VscEye /> : <VscEyeClosed />}
                      </EyeIcon>
                    </PasswordWrapper>
          {errors.password && <ErrorText>{errors.password}</ErrorText>}

          <SignupButton
            type="submit"
            disabled={loading || Object.values(errors).some((err) => err)}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </SignupButton>
        </SignupForm>
        </div>
        <FooterContent>
            <Link to="/login" className="link">Login</Link>
        </FooterContent>
      </SignupWrapper>

      {/* Toast container for displaying notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </SignupContainer>
  );
};

export default Signup;
