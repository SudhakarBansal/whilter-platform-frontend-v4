import { Button } from "@mui/material";
import type { ActionButtonProps } from "@/types/actionButton.types";
import Link from "next/link";

export const ActionButton = ({ href, children, ...props }: ActionButtonProps) => {

  return (
    <Link
      href={href || "#"}
      prefetch={true}
    >
      <Button
        {...props}
      >
        {children}
      </Button>
    </Link>
  );
};