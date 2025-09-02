'use client';

import { useState, useRef } from 'react'; // Import useRef
import { User, Mail, Lock } from 'lucide-react';

// Reusable input component for this form
const ProfileInput = ({ id, type, label, value, onChange, icon, disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 ${disabled ? 'cursor-not-allowed bg-gray-200' : 'border-gray-300'}`}
      />
    </div>
  </div>
);

export default function UserPage() {
  // Mock user data - in a real app, this would come from an API
  const [user, setUser] = useState({
    name: 'pranavi',
    email: 'prana@example.com',
  });

  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  // New state for the avatar preview
  const [avatarPreview, setAvatarPreview] = useState('https://placehold.co/128x128/9ca3af/ffffff?text=JD');
  
  // Ref for the hidden file input
  const fileInputRef = useRef(null);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    // In a real app, you would upload the selected file (if any) and then update the user data
    console.log('Saving changes:', { user, passwords });
    alert('User profile saved successfully! (Check the console)');
  };

  // Function to handle the file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for the selected image and update the preview
      setAvatarPreview(URL.createObjectURL(file));
      // In a real app, you would also store the file object itself to be uploaded on save
    }
  };

  // Function to trigger the hidden file input
  const handleChangePictureClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900">User Profile</h1>
        <p className="text-gray-500 mt-2">Manage your account settings and personal information.</p>
      </header>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar and Name */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center h-full">
            <img 
              src={avatarPreview}
              alt="User Avatar" 
              className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-200 mx-auto"
            />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            
            {/* Hidden file input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />

            {/* Visible "Change Picture" button */}
            <button 
              onClick={handleChangePictureClick}
              className="mt-4 w-full text-sm bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Change Picture
            </button>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSaveChanges} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
              <p className="text-gray-500 text-sm">Update your name and email address.</p>
            </div>
            <ProfileInput
              id="name"
              type="text"
              label="Full Name"
              value={user.name}
              onChange={handleUserChange}
              icon={<User size={18} />}
            />
            <ProfileInput
              id="email"
              type="email"
              label="Email Address"
              value={user.email}
              onChange={handleUserChange}
              icon={<Mail size={18} />}
              disabled
            />

            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
              <p className="text-gray-500 text-sm">Enter a new password to update your account.</p>
            </div>
            <ProfileInput
              id="newPassword"
              type="password"
              label="New Password"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              icon={<Lock size={18} />}
            />
            <ProfileInput
              id="confirmPassword"
              type="password"
              label="Confirm New Password"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              icon={<Lock size={18} />}
            />

            <div className="flex justify-between items-center pt-4 border-t">
                <button type="button" className="text-sm font-semibold text-red-600 hover:underline">
                    Delete Account
                </button>
                <button type="submit" className="bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                    Save Changes
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}