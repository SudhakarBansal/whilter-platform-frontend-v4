import React from "react";
import { Box, Stack, Skeleton } from "@mui/material";

export function OrganizationFormSkeleton() {
  return (
    <Box className="flex flex-col md:flex-row items-center" sx={{ gap: 4 }}>
      {/* Image Uploader Skeleton */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Skeleton
          variant="rectangular"
          width={250}
          height={250}
        />
      </Box>

      {/* Form Fields Skeleton */}
      <Box sx={{ flex: 1, width: "100%" }}>
        <Stack spacing={3}>
          {/* Organization Name Field */}
          <Box>
            <Skeleton
              variant="rounded"
              width="100%"
              height={56}
            />
          </Box>

          {/* Organization Description Field */}
          <Box>
            <Skeleton
              variant="rounded"
              width="100%"
              height={112}
            />
          </Box>

          {/* Action Buttons Skeleton */}
          <Stack
            className="mt-4 flex-col md:flex-row space-y-4 space-x-0 md:space-y-0 md:space-x-4"
            sx={{ mt: 4 }}
          >
            <Skeleton
              variant="rounded"
              height={40}
              sx={{ flex: 1}}
            />
            <Skeleton
              variant="rounded"
              height={40}
              sx={{ flex: 1}}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
