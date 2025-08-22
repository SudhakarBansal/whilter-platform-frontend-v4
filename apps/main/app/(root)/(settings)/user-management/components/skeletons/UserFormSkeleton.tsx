
import { DialogTitle, DialogContent, Box } from "@mui/material";

const InputSkeleton = ({ width = "100%" }: { width?: string }) => (
  <div className="h-5 bg-gray-700 rounded-md animate-pulse" style={{ width }}></div>
);

const LabelSkeleton = ({ width = "40%" }: { width?: string }) => (
  <div className="h-4 bg-gray-600 rounded mb-2 animate-pulse" style={{ width }}></div>
);

export default function UserFormSkeleton() {
  return (
    <div className="relative p-6">
      {/* Close Button Skeleton */}
      <div className="absolute top-4 right-4 h-6 w-6 bg-gray-700 rounded-full animate-pulse" />

      <DialogTitle className="text-center pt-2 pb-4">
        <div className="h-6 bg-gray-700 rounded w-40 mx-auto mb-2 animate-pulse" />
        <div className="h-4 bg-gray-600 rounded w-64 mx-auto animate-pulse" />
      </DialogTitle>

      <DialogContent>
        <div className="space-y-6">
          {/* Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Box>
              <LabelSkeleton />
              <InputSkeleton />
            </Box>
            <Box>
              <LabelSkeleton />
              <InputSkeleton />
            </Box>
          </div>

          {/* Org & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Box>
              <LabelSkeleton />
              <InputSkeleton />
            </Box>
            <Box>
              <LabelSkeleton />
              <InputSkeleton />
            </Box>
          </div>

          {/* Password & Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Box>
              <LabelSkeleton />
              <InputSkeleton />
            </Box>
            <Box>
              <LabelSkeleton />
              <InputSkeleton />
            </Box>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Box>
              <LabelSkeleton />
              <div className="h-10 bg-gray-700 rounded-md animate-pulse" />
            </Box>
            <Box>
              <LabelSkeleton />
              <div className="h-10 bg-gray-700 rounded-md animate-pulse" />
            </Box>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <div className="h-10 w-20 bg-gray-700 rounded-md animate-pulse" />
            <div className="h-10 w-28 bg-gray-700 rounded-md animate-pulse" />
          </div>
        </div>
      </DialogContent>
    </div>
  );
}
