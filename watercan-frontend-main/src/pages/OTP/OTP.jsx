import React, { useState } from "react";
import { Container, OTPBox, Title, SubText, Input, Button } from "./OTP.styles";

const OTP = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Entered OTP: ${otp}`);
  };

  return (
    <Container>
      <OTPBox>
        <Title>Enter OTP</Title>
        <SubText>Check your phone number for the OTP</SubText>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="One Time Password"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </OTPBox>
    </Container>
  );
};

export default OTP;
