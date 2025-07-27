"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { rejectUser } from "@/lib/admin/actions/registrationRequests";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function RejectDialog(props: { userId: string }) {
  // Render a confirmation dialog for denying an account request
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-rose-600 hover:text-rose-800">
          {/* Icon button to open the reject dialog */}
          <Icon icon="uil:times-circle" className="w-4 h-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {/* Dialog title */}
          <AlertDialogTitle>Deny Account Request</AlertDialogTitle>
          {/* Dialog description */}
          <AlertDialogDescription>
            Denying will notify the student their ID card could not be verified.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* Close dialog without action */}
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* Confirm denial and trigger rejectUser */}
          <AlertDialogAction
            className="bg-rose-600 hover:bg-rose-700 text-white"
            onClick={() => rejectUser(props.userId)}
          >
            Deny & Notify
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
