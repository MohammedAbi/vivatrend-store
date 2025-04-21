import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { user, logout, error } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center mt-[90px]">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Please log in to view your profile
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-lg btn-primary mx-auto px-16 py-2 rounded-lg mt-8"
        >
          Login
        </button>
      </div>
    );
  }

  const formatName = (name: string) => {
    return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="container mx-auto px-4 py-4 mt-[90px]">
      {/* Banner */}
      <div className="relative h-40 rounded-lg mb-4 overflow-hidden bg-gray-800">
        {user.banner?.url ? (
          <img
            src={user.banner.url}
            alt={user.banner.alt || "Profile banner"}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <span className="text-lg">Banner Image</span>
          </div>
        )}
      </div>

      {/* Profile Header */}
      <div className="flex flex-col mb-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-end gap-4">
          {/* Avatar */}
          <div className="relative mb-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
              {user.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt={user.avatar.alt || "Profile"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-600 text-white text-3xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          {/* Name and Actions */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl font-bold text-white">
              {formatName(user.name)}
            </h1>
            <p className="text-sm mb-2 text-white">{user.email}</p>

            <div className="flex justify-center sm:justify-start gap-2 mt-2">
              <button
                onClick={handleLogout}
                className="btn btn-sm btn-primary max-w-[150px]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-white">About</h2>
        <p className="text-white">{user.bio || "No bio provided yet."}</p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Account Details */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Account Information</h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500">Username</p>
            <p className="text-gray-800">{user.name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-gray-800">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Account Type</p>
            <p className="text-gray-800">
              {user.venueManager ? "Venue Manager" : "Regular User"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
