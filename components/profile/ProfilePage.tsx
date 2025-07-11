"use client";

import React, { useState } from "react";
import ProfileForm from "./ProfileForm";
import { Button } from "@/components/ui/button";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

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
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-black p-10 shadow-xl ring-1 ring-white/10">
      {/* Avatar + name */}
      <div className="flex flex-col items-center gap-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Hb5xzFZJCTW4cMqmPwsgfw-gILUV7QevvQ&s"
          alt={profile.fullName}
          className="h-24 w-24 rounded-full object-cover ring-4 ring-green-500/60"
        />
        <div className="flex items-center gap-1">
          <h2 className="text-2xl font-semibold text-white">
            {profile.fullName}
          </h2>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
            ✓
          </span>
        </div>
        <p className="text-sm text-gray-400">{profile.email}</p>
      </div>

      {/* Details */}
      <div className="mt-10 space-y-6">
        <Detail label="University" value="Mohawk College" />
        <Detail label="Student ID" value={profile.universityId} />
      </div>

      {/* Student-card image */}
      <div className="mt-10 space-y-6">
        {/* Student card */}
        <Detail label="Student card image" value="" />
        <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-lg ring-1 ring-white/10">
          <IKImage
            path={profile.universityCard}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt="Student card"
            fill
            className="object-cover"
            loading="lazy"
            lqip={{ active: true }}
          />
        </div>
      </div>

      {/* Edit button */}
      <button
        onClick={onEdit}
        className="mt-8 w-full rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
      >
        Edit profile
      </button>
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
