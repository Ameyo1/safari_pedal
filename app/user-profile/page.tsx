'use client';

import { useEffect, useState, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import CompletionTracker from '@/components/CompletionTracker';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Avatar,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { MdEmail, MdPerson, MdLogout, MdAssignment, MdCameraAlt } from 'react-icons/md';
import { FaFileAlt, FaHeartbeat, FaSignature } from 'react-icons/fa';
import FullscreenLoader from '@/components/helper/FullScreenLoader';

interface UserData {
  name: string;
  email: string;
  image?: string;
  hasPolicy: boolean;
  hasMedical: boolean;
  hasWaiver: boolean;
}

interface EventLog {
  id: string;
  type: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [events, setEvents] = useState<EventLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      setError(null);
      try {
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch user data');
        const data = await res.json();
        setUserData(data.user);
        setEvents(data.events ?? []);
      } catch (err: any) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'Unknown error');
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    const { name, value } = e.target;
    setUserData(prev => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSave = async () => {
    if (!userData || !userId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save profile');

      alert('Profile updated successfully!');
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError(err.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !userId) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await fetch(`/api/profile/${userId}/upload-image`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Image upload failed');

      // Update state with new image URL
      setUserData(prev => (prev ? { ...prev, image: data.url } : prev));
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  if (status === 'loading') return <FullscreenLoader />;
  if (!session) return <p className="text-red-600">You must be logged in to view this page.</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!userData) return <FullscreenLoader />;

  return (
    <div className="space-y-10 p-6 max-w-4xl mt-16 mx-auto">
      {/* Hero Section with Avatar */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Avatar
            src={userData.image || ''}
            sx={{ width: 100, height: 100 }}
          >
            {!userData.image && userData.name.charAt(0).toUpperCase()}
          </Avatar>
          <IconButton
            className="absolute bottom-0 right-0 bg-white shadow"
            onClick={() => fileInputRef.current?.click()}
            size="small"
          >
            <MdCameraAlt />
          </IconButton>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <Typography variant="h5" className="font-bold">
            Welcome back, {userData.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Manage your profile and participation status
          </Typography>
          <Button
            variant="outlined"
            startIcon={<MdLogout />}
            onClick={() => signOut({ callbackUrl: '/' })}
            sx={{ mt: 1 }}
          >
            Sign out
          </Button>
        </div>
      </div>
 
      {/* Completion Tracker */}
      <Card>
        <CardHeader
          title={<span className="flex items-center gap-2"><MdAssignment /> Completion Tracker</span>}
        />
        <CardContent>
          <CompletionTracker />
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card>
        <CardHeader
          title={<span className="flex items-center gap-2"><MdPerson /> Basic Information</span>}
        />
        <CardContent className="space-y-4">
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={20} /> : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      {/* Participation Status */}
      <Card>
        <CardHeader title="Participation Status" />
        <CardContent className="space-y-4">
          {[
            { label: 'Policies Agreement', key: 'hasPolicy', icon: <FaFileAlt /> },
            { label: 'Medical Form', key: 'hasMedical', icon: <FaHeartbeat /> },
            { label: 'Waiver', key: 'hasWaiver', icon: <FaSignature /> },
          ].map(({ label, key, icon }) => (
            <div key={key} className="flex items-center justify-between border-b pb-2">
              <span className="flex items-center gap-2">{icon} {label}</span>
              <span
                className={
                  userData[key as keyof UserData]
                    ? 'text-green-600 font-semibold'
                    : 'text-red-600 font-semibold'
                }
              >
                {userData[key as keyof UserData] ? 'Completed' : 'Pending'}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Event Logs */}
      <Card>
        <CardHeader title="Recent Activity" />
        <CardContent>
          {events.length === 0 ? (
            <p className="text-sm text-gray-500">No events recorded.</p>
          ) : (
            <ul className="space-y-2">
              {events.map(e => (
                <li key={e.id} className="flex justify-between text-sm border-b pb-1">
                  <span className="capitalize">{e.type.replace(/_/g, ' ')}</span>
                  <span className="text-gray-400">{new Date(e.createdAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
