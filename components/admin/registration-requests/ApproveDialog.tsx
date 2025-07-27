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
import { approveUser } from "@/lib/admin/actions/registrationRequests";

export default function ApproveDialog(props: { userId: string }) {
  // Wraps the approve button and confirmation dialog
  return (
    <AlertDialog>
      {/* Button that opens the dialog */}
      <AlertDialogTrigger asChild>
        <button className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded text-sm font-medium">
          Approve Account
        </button>
      </AlertDialogTrigger>
      {/* Dialog box for confirmation */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Account</AlertDialogTitle>
          <AlertDialogDescription>
            Approve the student's request and send a confirmation email.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* Closes the dialog without action */}
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* Triggers the approveUser action */}
          <AlertDialogAction
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => approveUser(props.userId)}
          >
            Approve & Send
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
