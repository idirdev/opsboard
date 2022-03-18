"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "preferences", label: "Preferences" },
    { id: "security", label: "Security" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div className="max-w-4xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id ? "border-blue-600 text-blue-600" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>{tab.label}</button>
        ))}
      </div>

      {activeTab === "profile" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-6 space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl font-bold">U</div>
            <div>
              <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg">Change Avatar</button>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name</label>
              <input type="text" defaultValue="John Doe" className="w-full px-3 py-2 border rounded-lg bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input type="email" defaultValue="john@company.com" className="w-full px-3 py-2 border rounded-lg bg-transparent" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1.5">Bio</label>
              <textarea rows={3} className="w-full px-3 py-2 border rounded-lg bg-transparent resize-none" placeholder="Write a short bio..." />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium">Save Changes</button>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border p-6 space-y-6">
          <h3 className="font-semibold">Change Password</h3>
          <div className="space-y-4 max-w-md">
            <div><label className="block text-sm font-medium mb-1.5">Current Password</label><input type="password" className="w-full px-3 py-2 border rounded-lg bg-transparent" /></div>
            <div><label className="block text-sm font-medium mb-1.5">New Password</label><input type="password" className="w-full px-3 py-2 border rounded-lg bg-transparent" /></div>
            <div><label className="block text-sm font-medium mb-1.5">Confirm New Password</label><input type="password" className="w-full px-3 py-2 border rounded-lg bg-transparent" /></div>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium">Update Password</button>
          <hr />
          <h3 className="font-semibold">Two-Factor Authentication</h3>
          <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
          <button className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">Enable 2FA</button>
          <hr />
          <h3 className="font-semibold text-red-600">Danger Zone</h3>
          <p className="text-sm text-muted-foreground">Permanently delete your account and all data.</p>
          <button className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50">Delete Account</button>
        </div>
      )}
    </div>
  );
}
