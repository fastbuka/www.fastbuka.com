"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUser, setUser } from "@/utils/token";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface UserData {
  email: string;
  profile: {
    first_name: string;
    last_name: string;
    avatar: string;
    phone: string;
    address: string;
  };
}

export default function UserSettings() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (user) {
      setUserData(user);
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Here you would typically make an API call to update the user's profile
      // For now, we'll just update the local storage
      if (userData) {
        setUser(userData);
        setIsLoading(false);
        alert('Profile updated successfully!');
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prevState => {
      if (!prevState) return null;
      return {
        ...prevState,
        profile: {
          ...prevState.profile,
          [name]: value
        }
      };
    });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">Account Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-20 h-20">
            <Image
              src={userData.profile.avatar || "/images/profile.png"}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300">
            Change Avatar
          </Button>
        </div>

        <form onSubmit={handleUpdateProfile}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <Input
                type="text"
                name="first_name"
                value={userData.profile.first_name || ''}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <Input
                type="text"
                name="last_name"
                value={userData.profile.last_name || ''}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                type="email"
                name="email"
                value={userData.email || ''}
                onChange={handleInputChange}
                className="w-full"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <Input
                type="tel"
                name="phone"
                value={userData.profile.phone || ''}
                onChange={handleInputChange}
                className="w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <Input
              type="text"
              name="address"
              value={userData.profile.address || ''}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <Button type="submit" className="bg-green-600 text-white" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <Input type="password" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <Input type="password" className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <Input type="password" className="w-full" />
            </div>
          </div>
          <Button className="bg-blue-600 text-white">Change Password</Button>
        </form>
      </div>
    </div>
  );
}
