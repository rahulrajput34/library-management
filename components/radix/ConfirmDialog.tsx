"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

type ConfirmDialogProps = {
  /**
   * The trigger element that opens the confirmation dialog.
   * Example: a button or an icon button.
   */
  trigger: React.ReactNode;

  /**
   * The title shown in the dialog (usually the main confirmation question).
   * @default "Are you sure?"
   */
  title?: string;

  /**
   * A brief description of the action being confirmed.
   * @default "This action cannot be undone."
   */
  description?: string;

  /**
   * The label for the confirmation button (e.g. "Delete", "Logout").
   * @default "Confirm"
   */
  confirmText?: string;

  /**
   * The label for the cancel button.
   * @default "Cancel"
   */
  cancelText?: string;

  /**
   * The function that will be called when the user confirms the action.
   * Can be async.
   */
  onConfirm: () => void | Promise<void>;
};

/**
 * A reusable confirmation dialog component using ShadCN UI.
 *
 * This is helpful for critical actions like:
 * - Logging out
 * - Deleting items
 * - Publishing or unpublishing content
 *
 * It wraps any trigger (e.g. button/icon), and shows a modal with title, description, and cancel/confirm buttons.
 */
export default function ConfirmDialog({
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <button onClick={onConfirm}>{confirmText}</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
