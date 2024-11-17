"use client"
import React, { useState, ChangeEvent } from "react";

const ProfilePage: React.FC = () => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  function handleLogout(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }}>
      {/* Profile Photo */}
      <div style={{ marginLeft: "100px", textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="profilePhoto" style={{ cursor: "pointer" }}>
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ccc",
              }}
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                fontSize: "16px",
                border: "2px solid #ccc",
              }}
            >
              Upload Photo
            </div>
          )}
        </label>
        <input
          type="file"
          id="profilePhoto"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: "none" }}
        />
      </div>

      {/* Container for Account Information and Rewards Below Profile Photo */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          width: "300px",
          textAlign: "center"
        }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ padding: "10px 0", borderBottom: "1px solid #eee" }}>Account Information</li>
          <li style={{ padding: "10px 0" }}>Rewards</li>
        </ul>

         {/* Log Out Button */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "200px",
            fontSize: "16px",
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;