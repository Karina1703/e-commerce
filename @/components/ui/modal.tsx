"use client"

import { DialogDescription } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogDescription id="alert-dialog-description">
          {description}
        </DialogDescription>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};
