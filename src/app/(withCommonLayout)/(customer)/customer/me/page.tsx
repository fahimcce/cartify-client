/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  myProfile,
  updateProfile,
} from "@/src/services/UserService/UserService";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    profilePhoto: "",
    contactNumber: "",
    address: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await myProfile();

        setProfileData(data);
        setFormData({
          name: data?.name || "",
          contactNumber: data?.contactNumber || "",
          address: data?.address || "",
        });
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(formData);
      toast.success("SuccessFully Update Profile");
      window.location.reload();
      setIsModalOpen(false);
    } catch {
      toast.error("Something Went wrong!try again");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left Section: Profile Picture and Basic Info */}
        <div className="md:w-1/3 p-6 flex flex-col items-center bg-gray-50">
          {loading ? (
            <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse"></div>
          ) : (
            <img
              src={profileData?.profilePhoto || "/default-avatar.png"}
              alt="Profile Avatar"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          )}
          <h1 className="text-xl font-bold text-gray-800">
            {loading ? (
              <div className="w-40 h-6 bg-gray-300 animate-pulse rounded mb-2"></div>
            ) : (
              profileData?.name || "Your Name"
            )}
          </h1>
          <p className="text-gray-500">
            {loading ? (
              <span className="w-48 h-4 bg-gray-300 animate-pulse rounded block"></span>
            ) : (
              profileData?.jobTitle || "Jobtitle : N/A"
            )}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {loading ? (
              <span className="w-48 h-4 bg-gray-300 animate-pulse rounded block"></span>
            ) : (
              profileData?.address || "N/A"
            )}
          </p>
        </div>

        {/* Right Section: Detailed Info */}
        <div className="md:w-2/3 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-24 font-medium text-gray-600">Phone:</span>
              <span className="text-gray-800">
                {loading ? (
                  <div className="w-48 h-4 bg-gray-300 animate-pulse rounded"></div>
                ) : (
                  profileData?.contactNumber || "+00 123 456 789"
                )}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-medium text-gray-600">Address:</span>
              <span className="text-gray-800">
                {loading ? (
                  <div className="w-48 h-4 bg-gray-300 animate-pulse rounded"></div>
                ) : (
                  profileData?.address || "123 Street Name, City, Country"
                )}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="Contact Number"
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
