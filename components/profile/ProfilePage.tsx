"use client";

import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import { Button } from "@/components/ui/button";

export type Profile = {
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
};

export default function ProfilePage({ initial }: { initial: Profile }) {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <ProfileForm initial={initial} onSaved={() => setEditing(false)} />
  ) : (
    <ProfileCard profile={initial} onEdit={() => setEditing(true)} />
  );
}

function ProfileCard({
  profile,
  onEdit,
}: {
  profile: Profile;
  onEdit: () => void;
}) {
  return (
    <div className="relative max-w-md mx-auto">
      {/* Top strap */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-indigo-800 h-6 w-16 rounded-b-lg ring-1 ring-white/10" />
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 bg-black/50 h-2 w-6 rounded" />

      {/* Card body */}
      <div
        className="bg-gradient-to-b from-indigo-900 to-indigo-800 
                      rounded-2xl border border-white/10 
                      shadow-xl p-8 space-y-8"
      >
        {/* Avatar + name */}
        <div className="flex flex-col items-center space-y-3">
          <img
            src="/placeholder-avatar.jpg" /* replace with real src */
            alt="Avatar"
            className="h-20 w-20 rounded-full object-cover ring-2 ring-indigo-500/60"
          />
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold text-white">
              {profile.fullName}
            </h2>
            <span
              className="inline-flex items-center justify-center 
                             h-5 w-5 rounded-full bg-green-500 text-xs text-white"
            >
              ✓
            </span>
          </div>
          <p className="text-sm text-gray-300">{profile.email}</p>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <Detail label="University" value="Mohawk College" />
          <Detail label="Student ID" value={profile.universityId} />
        </div>

        {/* Student-card image */}
        <div className="rounded-xl overflow-hidden border border-white/10">
          <img
            src={profile.universityCard}
            alt="University card"
            className="w-full block"
          />
        </div>

        {/* Edit button */}
        <Button
          onClick={onEdit}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
        >
          Edit profile
        </Button>
      </div>
    </div>
  );
}

/* Helper for the detail rows */
function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <span className="text-lg font-medium text-white">{value}</span>
    </div>
  );
}
