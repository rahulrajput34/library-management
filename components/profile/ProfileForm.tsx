"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IKImage } from "imagekitio-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import config from "@/lib/config";
import { updateProfile } from "@/lib/actions/profile";
import DetailInput from "./DetailInput";
import SaveButton from "./SaveButton";

export type FormInitial = {
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
};

type Props = {
  initial: FormInitial;
  onSaved: () => void;
};

export default function ProfileForm({ initial, onSaved }: Props) {
  const [state, formAction] = useFormState(updateProfile, { ok: false });
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [cardPath, setCardPath] = useState(initial.universityCard);

  useEffect(() => {
    if (state.ok) {
      onSaved();
      startTransition(() => router.refresh());
    }
  }, [state.ok, onSaved, router, startTransition]);

  return (
    <aside className="w-full max-w-sm lg:self-start">
      <form
        action={formAction}
        className="flex flex-col space-y-8 rounded-xl
                   bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6"
      >
        <DetailInput
          label="Name"
          name="fullName"
          type="fullName"
          defaultValue={initial.fullName}
        />

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

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wide text-gray-400">
            Student card image
          </span>
          <FileUpload
            type="image"
            accept="image/*"
            placeholder="Upload new card"
            folder="/student-cards"
            variant="gray"
            value={cardPath}
            onFileChange={setCardPath}
          />
          <input type="hidden" name="universityCard" value={cardPath ?? ""} />
        </div>

        <DetailInput
          label="Password"
          name="password"
          type="password"
          placeholder="Leave blank to keep current password"
        />

        <SaveButton disabled={state.ok} />

        {state.ok && (
          <p className="text-center text-sm font-medium text-emerald-500">
            Profile updated ✔
          </p>
        )}
      </form>
    </aside>
  );
}
