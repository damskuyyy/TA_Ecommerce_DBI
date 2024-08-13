import { Button } from "@/components/ui/button";
import { ModalEditProfile } from "@/components/ui/modals/editProfile";
import { UserProfileProps } from "@/types/profileDataTypes";
import React from "react";

interface props {
  user: UserProfileProps;
}

const Profile: React.FC<props> = ({ user }) => {
  return (
    <div className="flex-grow bg-white shadow-md rounded-lg p-6">
      <div className="flex items-center border-b pb-4 mb-4 justify-between">
        <div className="flex items-center gap-1">
          <img
            src={user.image}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4 object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{user.name} </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <ModalEditProfile />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Personal Information</h3>
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Email Verified:</strong> {user.emailVerified}
            </p>
            <p>
              <strong>Items:</strong> {user.items}
            </p>
            <p>
              <strong>Type:</strong> {user.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
