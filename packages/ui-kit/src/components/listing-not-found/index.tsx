"use client";
import { Box, Typography, Button } from "@mui/material";
import { ReactNode } from "react";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  buttonLabel?: string;
  onAction?: () => void;
};

export function ListingNotFound({
  icon,
  title,
  description,
  buttonLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      textAlign="center"
      gap={2}
      sx={{
        px: 2,
      }}
    >
      {icon && <Box sx={{ fontSize: 80, color: "text.secondary" }}>{icon}</Box>}

      <Typography variant="h3" color="text.primary" fontWeight={600}>
        {title}
      </Typography>

      {description && (
        <Typography variant="body1" color="text.secondary" maxWidth="400px">
          {description}
        </Typography>
      )}

      {buttonLabel && onAction && (
        <Button
        //   variant="contained"
          color="primary"
          onClick={onAction}
          sx={{ mt: 2, borderRadius: 2, textTransform: "none" }}
        >
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
}
