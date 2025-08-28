"use client";

import { useEffect, useState } from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/ui";
import { Card, CardContent } from "@/components/ui/ui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/ui";
import { Button } from "@/components/ui/ui";
import CardHeader from "@mui/material/CardHeader";
import { CardTitle } from "@/components/ui/Card"
import AdminLayout from "@/components/dashboard/AdminLayout";

type Settings = {
  profile: { name: string; bio: string };
  account: { email: string; username: string };
  security: { twoFactor: boolean };
  notifications: { email: boolean; push: boolean };
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    profile: { name: "", bio: "" },
    account: { email: "", username: "" },
    security: { twoFactor: false },
    notifications: { email: true, push: true },
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data));
  }, []);

  async function handleSave(section: keyof Settings) {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, data: settings[section] }),
    });

    const result = await res.json();
    if (res.ok) {
      setSettings((prev) => ({ ...prev, [section]: result.settings[section] }));
    } else {
      console.error(result.error);
    }
  }

  return (

    <AdminLayout>
      <Tabs value="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={settings.profile.name ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    profile: { ...prev.profile, name: e.target.value },
                  }))
                }
                placeholder="Your name"
              />
              <Textarea
                value={settings.profile.bio ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    profile: { ...prev.profile, bio: e.target.value },
                  }))
                }
                placeholder="Your bio"
              />
              <Button onClick={() => handleSave("profile")}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="email"
                value={settings.account.email ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    account: { ...prev.account, email: e.target.value },
                  }))
                }
                placeholder="Email"
              />
              <Input
                value={settings.account.username ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({
                    ...prev,
                    account: { ...prev.account, username: e.target.value },
                  }))
                }
                placeholder="Username"
              />
              <Button onClick={() => handleSave("account")}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Two Factor Authentication</span>
                <Switch
                  checked={settings.security.twoFactor ?? false}
                  onCheckedChange={(val) =>
                    setSettings((prev) => ({
                      ...prev,
                      security: { ...prev.security, twoFactor: val },
                    }))
                  }
                />
              </div>
              <Button onClick={() => handleSave("security")}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email Notifications</span>
                <Switch
                  checked={settings.notifications.email ?? true}
                  onCheckedChange={(val) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, email: val },
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span>Push Notifications</span>
                <Switch
                  checked={settings.notifications.push ?? true}
                  onCheckedChange={(val) =>
                    setSettings((prev) => ({
                      ...prev,
                      notifications: { ...prev.notifications, push: val },
                    }))
                  }
                />
              </div>
              <Button onClick={() => handleSave("notifications")}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
