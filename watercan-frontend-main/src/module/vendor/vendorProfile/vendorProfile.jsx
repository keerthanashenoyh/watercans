import React, { useState, useEffect } from "react";
import {
    ProfileContainer,
    FormWrapper,
    HeaderBackground,
    ProfileImageWrapper,
    ProfileImage,
    EditIcon,
    Title,
    FieldGroup,
    SaveButton,
} from "./vendorprofile.styles";
import vendorProfile from "../../../assets/vendorProfile.jpg";
import { getVendorsByUserId, updateVendorsByUserId } from "../../../api/userApi";


const UserProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        proof: "",
    });

    const [isEditable, setIsEditable] = useState(false);



useEffect(() => {
  const fetchVendorData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // ✔ FIX

      const userId = user?.id || user?._id;

      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }

      const vendor = await getVendorsByUserId(userId);

      console.log("Vendor data:", vendor);

      const data = vendor?.data?.[0];

      if (!data) return;

      setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phoneNumber || "",
        address: data.address || "",
        area: data.area || "",
        pincode: data.pincode || "",
        city: data.city || "",
        state: data.state || "",
        proof: data.proof_image || "",
      });

    } catch (error) {
      console.error("Failed to fetch vendor data:", error.message);
    }
  };

  fetchVendorData();
}, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
        setIsEditable(true);
    };

const handleSave = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const updatePayload = {
      name: profile.name,
      phoneNumber: profile.phone,
      address: profile.address,
      area: profile.area,
      pincode: profile.pincode,
      city: profile.city,
      state: profile.state,
    };

    await updateVendorsByUserId(userId, updatePayload);

    alert("Vendor updated successfully");
    setIsEditable(false);

  } catch (error) {
    console.error(error);
    alert("Error updating vendor");
  }
};


    return (
        <ProfileContainer>
            <FormWrapper>
                <HeaderBackground />

                <ProfileImageWrapper>
                    <ProfileImage src={vendorProfile} alt="profile" />
                </ProfileImageWrapper>

                <Title style={{ textTransform: "uppercase" }} >{profile.name}</Title>

                <div className="edit-button">
                    <EditIcon onClick={handleEditToggle}>✎ Edit</EditIcon>
                </div>

                <FieldGroup>
                    <label>Username</label>
                    <input
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>Email</label>
                    <input
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        disabled
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>Phone Number</label>
                    <input
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>Address</label>
                    <input
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>Pincode</label>
                    <input
                        name="pincode"
                        value={profile.pincode}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>City</label>
                    <input
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <FieldGroup>
                    <label>State</label>
                    <input
                        name="state"
                        value={profile.state}
                        onChange={handleChange}
                        disabled={!isEditable}
                    />
                </FieldGroup>

                <SaveButton disabled={!isEditable} onClick={handleSave}>
                    Save
                </SaveButton>

            </FormWrapper>
        </ProfileContainer>
    );
};

export default UserProfile;
