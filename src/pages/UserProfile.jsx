import React from "react";
import UserSideBar from "../components/Navbar/UserSideBar";

const UserProfile = () => {
  return (
    <>
      <div className="container flex">
        <div>
          <UserSideBar />
        </div>
        <div>
          <h2 className="text-center">User Profile</h2>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
