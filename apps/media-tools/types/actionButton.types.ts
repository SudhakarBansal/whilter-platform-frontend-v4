import type { ButtonProps } from "@mui/material";
import type { ReactNode } from "react";

export interface ActionButtonProps extends Omit<ButtonProps, 'onClick'> {
  href?: string;
  children: ReactNode;
}
