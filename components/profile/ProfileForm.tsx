"use client";

import React, { useTransition } from "react";
import { updateProfile } from "@/lib/actions/profile";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Profile Edit
export default function ProfileForm({
  initial,
  onSaved,
}: {
  initial: {
    fullName: string;
    email: string;
    universityId: number;
    universityCard: string;
  };
  onSaved: () => void;
}) {
  const [state, formAction] = useFormState(updateProfile, { ok: false });
  const router = useRouter();
  const [, startTransition] = useTransition();

  // When the server action succeeds
  useEffect(() => {
    if (state.ok) {
      // tell the parent to close the editor
      onSaved();
      // Re-run the server component so <ProfileSummary> has fresh data
      startTransition(() => router.refresh());
    }
  }, [state.ok, onSaved, router, startTransition]);

  return (
    <form
      action={formAction}
      className="max-w-lg mx-auto space-y-6 bg-gray-950 dark:bg-neutral-900/90 backdrop-blur-lg border border-gray-200 dark:border-neutral-700 shadow-xl rounded-2xl p-8"
    >
      {/* Full Name */}
      <div className="space-y-2">
        <label
          htmlFor="fullName"
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Full name
        </label>
        <Input
          name="fullName"
          defaultValue={initial.fullName}
          className="w-full"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor=""
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <Input
          name="email"
          type="email"
          defaultValue={initial.email}
          className="w-full"
        />
      </div>

      {/* University ID */}
      <div className="space-y-2">
        <label
          htmlFor=""
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          University ID
        </label>
        <Input
          name="universityId"
          type="number"
          defaultValue={initial.universityId}
          className="w-full"
        />
      </div>

      {/* University Card */}
      <div className="space-y-2">
        <label
          htmlFor=""
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          University Card
        </label>
        <Input
          name="universityCard"
          defaultValue={initial.universityCard}
          className="w-full"
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor=""
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <Input
          name="password"
          type="password"
          placeholder="Leave blank to keep current password"
          className="w-full"
        />
      </div>

      <SaveButton disabled={state.ok} />
      {state.ok && (
        <p className="text-sm text-emerald-600 font-medium">
          Profile updated ✔
        </p>
      )}
    </form>
  );
}

// Little helper so the button shows a spinner while the action is running
function SaveButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || disabled}
      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold"
    >
      {pending ? "Saving…" : "Save changes"}
    </Button>
  );
}
