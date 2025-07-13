"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { IKImage } from "imagekitio-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { updateProfile } from "@/lib/actions/profile";
import config from "@/lib/config";

type FormInitial = {
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
};

// to update the profile
export default function ProfileForm({
  initial,
  onSaved,
}: {
  initial: FormInitial;
  onSaved: () => void;
}) {
  // state & navigation
  const [state, formAction] = useFormState(updateProfile, { ok: false });
  const router = useRouter();
  const [, startTransition] = useTransition();

  // path of the uploaded card – pre-seed with the existing one
  const [cardPath, setCardPath] = useState(initial.universityCard);

  // refresh parent on save
  useEffect(() => {
    if (state.ok) {
      onSaved();
      startTransition(() => router.refresh());
    }
  }, [state.ok, onSaved, router, startTransition]);

  return (
    <form
      action={formAction}
      className="relative w-full max-w-sm overflow-hidden rounded-xl
                bg-gradient-to-br from-gray-900 via-black to-gray-900
                p-10 space-y-4"
    >
      {/* avatar + name */}
      <div className="flex flex-col items-center gap-4">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt={initial.fullName}
          className="h-24 w-24 rounded-full object-cover ring-4 ring-green-500/60"
        />
        <Input
          name="fullName"
          defaultValue={initial.fullName}
          className="w-full text-center text-xl font-semibold text-white bg-transparent
                     border-none focus:ring-0"
        />
      </div>

      {/* email + id */}
      <DetailInput
        label="Email"
        name="email"
        type="email"
        defaultValue={initial.email}
      />
      <DetailInput
        label="University ID"
        name="universityId"
        type="number"
        defaultValue={initial.universityId}
      />

      {/* student-card uploader */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wide text-gray-400">
          Student card image
        </span>
        {/* uploader – writes back a path string */}
        <FileUpload
          type="image"
          accept="image/*"
          placeholder="Upload new card"
          folder="/student-cards"
          variant="gray"
          value={cardPath}
          onFileChange={setCardPath} // update local state
        />

        {/* hidden field that the server action reads*/}
        <input type="hidden" name="universityCard" value={cardPath ?? ""} />
      </div>

      {/* password */}
      <DetailInput
        label="Password"
        name="password"
        type="password"
        placeholder="Leave blank to keep current password"
      />

      {/* save button & success note */}
      <SaveButton disabled={state.ok} />
      {state.ok && (
        <p className="text-sm font-medium text-emerald-500 text-center">
          Profile updated ✔
        </p>
      )}
    </form>
  );
}

// Reusable fields for the form
function DetailInput({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  defaultValue?: string | number;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <Input
        name={name}
        type={type}
        defaultValue={defaultValue as string}
        placeholder={placeholder}
        className="bg-gray-900/40 text-white ring-1 ring-white/10
                   focus:ring-2 focus:ring-emerald-400/60"
      />
    </div>
  );
}

// Saving profile information
function SaveButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className="w-full flex items-center justify-center
                 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
    >
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}
