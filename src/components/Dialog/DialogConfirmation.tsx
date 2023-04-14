import React, { PropsWithChildren, ReactNode } from "react";
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Breakpoint,
  Button,
  Dialog,
} from "@mui/material";

export interface DialogConfirmationProps
  extends Omit<DialogProps, "onClose" | "title"> {
  title: string | ReactNode;
  showAccept?: boolean;
  showReject?: boolean;
  accept?: {
    color?:
      | "primary"
      | "secondary"
      | "inherit"
      | "success"
      | "error"
      | "info"
      | "warning";
    label: string;
  };
  reject?: {
    color?:
      | "primary"
      | "secondary"
      | "inherit"
      | "success"
      | "error"
      | "info"
      | "warning";
    label: string;
  };
  canCloseOnClickOutside?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  maxWidth?: false | Breakpoint;
  visible: boolean;
  onClose: (result: boolean | null) => void;
}

const DialogConfirmation = ({
  title,
  showAccept = true,
  showReject = true,
  accept = {
    color: "primary",
    label: "Sim",
  },
  reject = {
    color: "secondary",
    label: "Não",
  },
  canCloseOnClickOutside = true,
  disabled = false,
  fullWidth = false,
  maxWidth = "sm",
  visible,
  children,
  onClose,
  ...rest
}: PropsWithChildren<DialogConfirmationProps>) => {
  const ignore = () => canCloseOnClickOutside && !disabled && onClose(null);

  const onAccept = () => onClose(true);

  const onReject = () => onClose(false);

  const renderDialog = () => (
    <Dialog
      {...rest}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={ignore}
      open={visible}>
      {title && (
        <DialogTitle sx={{ fontSize: "16px", fontWeight: "bold" }}>
          {title}
        </DialogTitle>
      )}
      {children && <DialogContent>{children}</DialogContent>}
      <DialogActions>
        {showAccept && (
          <Button
            className="dialog-btn-accept"
            color={accept.color}
            disabled={disabled}
            onClick={onAccept}
            startIcon={disabled ? <CircularProgress size={16} /> : <></>}>
            {accept.label}
          </Button>
        )}
        {showReject && (
          <Button
            className="dialog-btn-reject"
            color={reject.color}
            disabled={disabled}
            onClick={onReject}>
            {reject.label}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  return visible ? renderDialog() : <></>;
};

export default DialogConfirmation;
