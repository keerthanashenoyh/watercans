import React, { useEffect, useState } from "react";
import animationGif from "../../../assets/Animation.gif";
import {
  SuccessContainer,
  SuccessGif,
  SuccessHeading,
  SuccessMessage,
} from "./RegistrationSuccessfully.styles";
import { getApplicationByUserId } from "../../../api/serviceapi";
import { getUserByFirebaseId } from "../../../api/userApi";

const RegistrationSuccessfully = () => {
  const [application, setApplication] = useState(null);

  const userId = localStorage.getItem("FUID"); // Must be MongoDB ObjectId

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const users = await getUserByFirebaseId(userId);
        const result = await getApplicationByUserId(users.data._id);
        if (result?.success && Array.isArray(result.data)) {
          setApplication(result.data[0]); 
        } else {
          setApplication(null);
        }
      } catch (error) {
        console.error("Error fetching application:", error);
        setApplication(null);
      } 
    };

    if (userId) {
      fetchApplication();
    } else {
      console.warn("No user_id found in localStorage");
    }
  }, [userId]);


  return (
    <SuccessContainer>
      <SuccessGif src={animationGif} alt="Success Animation" />
      <SuccessHeading>Request sent to admin</SuccessHeading>
      <SuccessMessage>
        We'll notify at <strong>{application?.email || "you"}</strong> about your request.
      </SuccessMessage>
    </SuccessContainer>
  );
};

export default RegistrationSuccessfully;
