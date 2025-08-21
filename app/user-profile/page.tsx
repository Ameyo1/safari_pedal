'use client';

import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import CompletionTracker from '@/components/CompletionTracker';
import { CardTitle } from '@/components/ui/Card';
import { Card, CardHeader, CardContent, Input, Button } from '@mui/material';

interface UserData {
  name: string;
  email: string;
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
  const [error, setError] = useState<string | null>(null);

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

  if (status === 'loading') return <p>Loading session...</p>;
  if (!session) return <p className="text-red-600">You must be logged in to view this page.</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!userData) return <p>Loading profile...</p>;

  return (
    <div className="space-y-8 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-white text-base font-medium"
        >
          Sign out
        </button>

      {/* Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {['name', 'email'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize">{field}</label>
              <Input
                name={field}
                value={userData[field as keyof UserData] as string}
                onChange={handleChange}
              />
            </div>
          ))}
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>

      {/* Participation Status */}
      <Card>
        <CardHeader>
          <CardTitle>Participation Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Policies Agreement', key: 'hasPolicy' },
            { label: 'Medical Form', key: 'hasMedical' },
            { label: 'Waiver', key: 'hasWaiver' },
          ].map(({ label, key }) => (
            <div key={key} className="flex items-center justify-between">
              <span>{label}</span>
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
        <CardHeader>
          <CardTitle>Event Logs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {events.length === 0 ? (
            <p className="text-sm text-gray-500">No events recorded.</p>
          ) : (
            events.map(e => (
              <div key={e.id} className="flex justify-between text-sm">
                <span>{e.type.replace(/_/g, ' ')}</span>
                <span className="text-gray-400">{new Date(e.createdAt).toLocaleString()}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <CompletionTracker />
    </div>
  );
}
