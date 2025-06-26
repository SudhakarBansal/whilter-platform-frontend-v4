'use client';

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import type { ActionButtonProps } from "@/types/action-button.types";

export const ActionButton = ({ href, children, ...props }: ActionButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};