// MUI Imports
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type TableBodyRowType = {
  brand: string;
  totalCampaigns: number;
  activeCampaigns: number;
  mediaGenerated: number;
};

// Vars
const rowsData: TableBodyRowType[] = [
  {
    brand: "Policy Bazaar",
    totalCampaigns: 100,
    activeCampaigns: 20,
    mediaGenerated: 60,
  },
  {
    brand: "IDFC",
    totalCampaigns: 100,
    activeCampaigns: 10,
    mediaGenerated: 10,
  },
  {
    brand: "Domino's",
    totalCampaigns: 100,
    activeCampaigns: 50,
    mediaGenerated: 100,
  },
  {
    brand: "Aditya Birla Group",
    totalCampaigns: 100,
    activeCampaigns: 30,
    mediaGenerated: 100,
  },
  {
    brand: "Apple",
    totalCampaigns: 100,
    activeCampaigns: 127,
    mediaGenerated: 25,
  },
];

export const BrandDetailsTable = () => {
  return (
    <div>
      <Typography variant="h4">Brand Details</Typography>
      <Card className="bg-gradient-to-b from-blue-400 to-blue-600 mt-4">
        <div className="px-4 pt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-500">
                  <th className="text-left p-3 text-base font-medium">
                    Brands
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Total Campaigns
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Active Campaigns
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Media Generated
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rowsData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-blue-600/10"
                  >
                    <td className="p-4">
                      <Typography>{row.brand}</Typography>
                    </td>
                    <td className="p-4">
                      <Typography>{row.totalCampaigns}</Typography>
                    </td>
                    <td className="p-4">
                      <Typography>{row.activeCampaigns}</Typography>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-2">
                        <Typography className="text-sm">
                          {row.mediaGenerated}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={row.mediaGenerated}
                          className="h-1 rounded-full"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <IconButton size="small" className="text-white">
                        <MoreVertIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

// MUI Imports
// import Typography from "@mui/material/Typography";
// import Card from "@mui/material/Card";
// import LinearProgress from "@mui/material/LinearProgress";
// import IconButton from "@mui/material/IconButton";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Alert from "@mui/material/Alert";
// import Skeleton from "@mui/material/Skeleton";
// import Box from "@mui/material/Box";

// type TableBodyRowType = {
//   brand: string;
//   totalCampaigns: number;
//   activeCampaigns: number;
//   mediaGenerated: number;
// };

// interface BrandDetailsTableProps {
//   data?: TableBodyRowType[];
//   loading?: boolean;
//   error?: string | null;
// }

// // Sample data - you can remove this and pass data via props
// const defaultRowsData: TableBodyRowType[] = [
//   {
//     brand: "Policy Bazaar",
//     totalCampaigns: 100,
//     activeCampaigns: 20,
//     mediaGenerated: 60,
//   },
//   {
//     brand: "IDFC",
//     totalCampaigns: 100,
//     activeCampaigns: 10,
//     mediaGenerated: 10,
//   },
//   {
//     brand: "Domino's",
//     totalCampaigns: 100,
//     activeCampaigns: 50,
//     mediaGenerated: 100,
//   },
//   {
//     brand: "Aditya Birla Group",
//     totalCampaigns: 100,
//     activeCampaigns: 30,
//     mediaGenerated: 100,
//   },
//   {
//     brand: "Apple",
//     totalCampaigns: 100,
//     activeCampaigns: 127,
//     mediaGenerated: 25,
//   },
// ];

// // Utility function to validate and sanitize data
// const validateRowData = (row: TableBodyRowType): TableBodyRowType => {
//   return {
//     brand: row.brand || "Unknown Brand",
//     totalCampaigns: Math.max(0, Number(row.totalCampaigns) || 0),
//     activeCampaigns: Math.max(0, Number(row.activeCampaigns) || 0),
//     mediaGenerated: Math.min(100, Math.max(0, Number(row.mediaGenerated) || 0)),
//   };
// };

// // Loading skeleton component
// const TableSkeleton = () => (
//   <tbody>
//     {Array.from({ length: 5 }).map((_, index) => (
//       <tr key={index} className="border-b border-gray-700">
//         {Array.from({ length: 5 }).map((_, colIndex) => (
//           <td key={colIndex} className="p-4">
//             <Skeleton variant="text" height={24} />
//           </td>
//         ))}
//       </tr>
//     ))}
//   </tbody>
// );

// // Empty state component
// const EmptyState = () => (
//   <Box className="text-center py-8">
//     <Typography variant="h4" className="mb-2 text-gray-400">
//       No Brand Data Available
//     </Typography>
//   </Box>
// );

// export const BrandDetailsTable = ({
//   data = defaultRowsData,
//   loading = false,
//   error = null,
// }: BrandDetailsTableProps) => {
//   // Validate and sanitize data
//   const validatedData = data?.map(validateRowData) || [];

//   // Check for edge cases
//   const hasData = validatedData.length > 0;
//   const showTable = !loading && !error && hasData;

//   return (
//     <div>
//       <Typography variant="h4">Brand Details</Typography>
//       <Card className="bg-gradient-to-b from-blue-400 to-blue-600 mt-4">
//         <div className="px-4 pt-4">
//           {/* Error State */}
//           {error && (
//             <Alert severity="error" className="mb-4">
//               {error}
//             </Alert>
//           )}

//           {/* Loading or Data Display */}
//           {(loading || hasData) && (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="border-b-2 border-gray-500">
//                     <th className="text-left p-3 text-base font-medium text-white">
//                       Brands
//                     </th>
//                     <th className="text-left p-3 text-base font-medium text-white">
//                       Total Campaigns
//                     </th>
//                     <th className="text-left p-3 text-base font-medium text-white">
//                       Active Campaigns
//                     </th>
//                     <th className="text-left p-3 text-base font-medium text-white">
//                       Media Generated
//                     </th>
//                     <th className="text-left p-3 text-base font-medium text-white">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 {/* Loading Skeleton */}
//                 {loading && <TableSkeleton />}

//                 {/* Data Rows */}
//                 {showTable && (
//                   <tbody>
//                     {validatedData.map((row, index) => {
//                       // Calculate media generated percentage (capped at 100%)
//                       const mediaPercentage = Math.min(100, row.mediaGenerated);

//                       // Check if active campaigns exceed total campaigns
//                       const hasActiveCampaignWarning =
//                         row.activeCampaigns > row.totalCampaigns;

//                       return (
//                         <tr
//                           key={`${row.brand}-${index}`}
//                           className="border-b border-gray-700 hover:bg-blue-600/10"
//                         >
//                           <td className="p-4">
//                             <Typography>
//                               {row.brand}
//                             </Typography>
//                           </td>
//                           <td className="p-4">
//                             <Typography>
//                               {row.totalCampaigns.toLocaleString()}
//                             </Typography>
//                           </td>
//                           <td className="p-4">
//                             <div className="flex items-center gap-1">
//                               <Typography
//                                 className={`${hasActiveCampaignWarning ? "text-red-300" : "text-white"}`}
//                               >
//                                 {row.activeCampaigns.toLocaleString()}
//                               </Typography>
//                               {hasActiveCampaignWarning && (
//                                 <Typography
//                                   variant="caption"
//                                   className="text-red-300 ml-1"
//                                   title="Active campaigns exceed total campaigns"
//                                 >
//                                   ⚠️
//                                 </Typography>
//                               )}
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <div className="flex flex-col gap-2">
//                               <Typography className="text-sm">
//                                 {mediaPercentage}%
//                               </Typography>
//                               <LinearProgress
//                                 variant="determinate"
//                                 value={mediaPercentage}
//                                 className="h-1 rounded-full"
//                                 sx={{
//                                   "& .MuiLinearProgress-bar": {
//                                     backgroundColor:
//                                       mediaPercentage === 100
//                                         ? "#22c55e"
//                                         : "#3b82f6",
//                                   },
//                                 }}
//                               />
//                             </div>
//                           </td>
//                           <td className="p-4">
//                             <IconButton
//                               size="small"
//                               className="text-white hover:bg-white/10"
//                             >
//                               <MoreVertIcon />
//                             </IconButton>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 )}
//               </table>
//             </div>
//           )}

//           {/* Empty State */}
//           {!loading && !error && !hasData && <EmptyState />}
//         </div>
//       </Card>
//     </div>
//   );
// };
