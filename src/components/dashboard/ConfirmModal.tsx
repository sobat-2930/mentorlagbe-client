"use client";
import { Button } from "@/components/ui/button";
import Modal from "./Modal";

type Props = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function ConfirmModal({ open, title, message, confirmLabel = "Confirm", onConfirm, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm leading-relaxed text-foreground/70">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} className="h-11 rounded-full px-6">
          Keep it
        </Button>
        <Button onClick={onConfirm} className="h-11 rounded-full bg-destructive px-6 text-white hover:bg-destructive/90">
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}