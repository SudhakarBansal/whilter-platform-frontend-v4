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
                      <Typography>
                        {row.brand}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography>
                        {row.totalCampaigns}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography>
                        {row.activeCampaigns}
                      </Typography>
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
