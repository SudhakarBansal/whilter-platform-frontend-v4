'use client';

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import type { ActionButtonProps } from "@/types/action-button.types";
import Link from "next/link";

export const ActionButton = ({ href, children, ...props }: ActionButtonProps) => {
  const router = useRouter();

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