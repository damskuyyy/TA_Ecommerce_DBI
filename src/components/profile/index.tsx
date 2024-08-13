import { Button } from "@/components/ui/button";
import { ModalEditProfile } from "@/components/ui/modals/editProfile";
import { UserProfileProps } from "@/types/profileDataTypes";
import React from "react";

interface props {
  user: UserProfileProps;
}

const Profile: React.FC<props> = ({ user }) => {
  return (
    <div className="flex-grow bg-white">
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
        <table>
          <tbody>
            <tr>
              <td className="text-gray-600 font-semibold">Name</td>
              <td className="text-gray-600 font-semibold">:</td>
              <td className="text-gray-500">{user.name}</td>
            </tr>
            <tr>
              <td className="text-gray-600 font-semibold">Email</td>
              <td className="text-gray-600 font-semibold">:</td>
              <td className="text-gray-500">{user.email}</td>
            </tr>         
            <tr>
              <td className="text-gray-600 font-semibold">Phone</td>
              <td className="text-gray-600 font-semibold">:</td>
              <td className="text-gray-500">{user.phone}</td>
            </tr>
            <tr>
              <td className="text-gray-600 font-semibold">Email Verified</td>
              <td className="text-gray-600 font-semibold">:</td>
              <td className="text-gray-500">{user.emailVerified}</td>
            </tr>
            <tr>
              <td className="text-gray-600 font-semibold">Items</td>
              <td className="text-gray-600 font-semibold">:</td>
              <td className="text-gray-500">{user.items}</td>
            </tr>
            <tr>
              <td className="text-gray-600 font-semibold">Type</td>
              <td className="text-gray-600 font-semibold">:</td>
              <td className="text-gray-500">{user.type}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
