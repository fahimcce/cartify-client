/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Building2, Edit2, X } from "lucide-react";
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
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(formData);
      toast.success("Profile updated successfully");
      window.location.reload();
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
          <div className="relative h-32 bg-green-500">
            <div className="absolute -bottom-16 left-8">
              {loading ? (
                <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse border-4 border-white"></div>
              ) : (
                <img
                  src={
                    profileData?.profilePhoto ||
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                />
              )}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <Edit2 className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="pt-20 px-8 pb-8">
            {/* Basic Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {loading ? (
                  <div className="w-48 h-8 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  profileData?.name || "Your Name"
                )}
              </h1>
              <p className="text-blue-600 font-medium mt-1">
                {loading ? (
                  <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                ) : (
                  profileData?.jobTitle || "Professional Title"
                )}
              </p>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-blue-500" />
                  <span>
                    {loading ? (
                      <div className="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      profileData?.contactNumber || "Not specified"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>
                    {loading ? (
                      <div className="w-40 h-5 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      profileData?.email || "email@example.com"
                    )}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span>
                    {loading ? (
                      <div className="w-48 h-5 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      profileData?.address || "Address not specified"
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  <span>
                    {loading ? (
                      <div className="w-36 h-5 bg-gray-200 rounded animate-pulse"></div>
                    ) : (
                      profileData?.department || "Department"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md m-4 p-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Edit Profile
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    placeholder="Enter contact number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
