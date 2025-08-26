import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type CampaignRowType = {
  campaignTitle: string;
  mode: string;
  totalMediaRequests: number;
  mediaGenerated: number;
  mediaFailed: number;
  mediaPending: number;
  timeDuration: string;
  totalCost: number;
};

// Vars
const campaignData: CampaignRowType[] = [
  {
    campaignTitle: "Policy Bazaar- Year End Reel 2024",
    mode: "WhatsApp",
    totalMediaRequests: 100,
    mediaGenerated: 20,
    mediaFailed: 30,
    mediaPending: 20,
    timeDuration: "20 Seconds",
    totalCost: 200,
  },
  {
    campaignTitle: "Policy Bazaar- Year End Reel 2024",
    mode: "WhatsApp",
    totalMediaRequests: 100,
    mediaGenerated: 10,
    mediaFailed: 10,
    mediaPending: 10,
    timeDuration: "20 Seconds",
    totalCost: 150,
  },
  {
    campaignTitle: "Policy Bazaar- Year End Reel 2024",
    mode: "WhatsApp",
    totalMediaRequests: 100,
    mediaGenerated: 50,
    mediaFailed: 20,
    mediaPending: 50,
    timeDuration: "20 Seconds",
    totalCost: 300,
  },
  {
    campaignTitle: "Policy Bazaar- Year End Reel 2024",
    mode: "WhatsApp",
    totalMediaRequests: 100,
    mediaGenerated: 30,
    mediaFailed: 100,
    mediaPending: 30,
    timeDuration: "20 Seconds",
    totalCost: 180,
  },
  {
    campaignTitle: "Policy Bazaar- Year End Reel 2024",
    mode: "WhatsApp",
    totalMediaRequests: 100,
    mediaGenerated: 127,
    mediaFailed: 25,
    mediaPending: 127,
    timeDuration: "20 Seconds",
    totalCost: 500,
  },
];

export const CampaignDetailsTable = () => {
  return (
    <div>
      <Typography variant="h4" className="mb-4">
        Campaign Details
      </Typography>
      <Card className="bg-[#142762]">
        <div className="px-4 pt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-500">
                  <th className="text-left p-3 text-base font-medium">
                    Campaign Title
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Mode
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Total Media Requests
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Media Generated
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Media Failed
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Media Pending
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Time Duration
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Total Cost
                  </th>
                  <th className="text-left p-3 text-base font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaignData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-blue-600/10"
                  >
                    <td className="p-4">
                      <Typography>
                        {row.campaignTitle}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Chip
                        label={row.mode}
                        size="small"
                        className="bg-green-600 font-medium"
                      />
                    </td>
                    <td className="p-4">
                      <Typography>
                        {row.totalMediaRequests}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography>
                        {row.mediaGenerated}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-2">
                        <Typography className="text-sm">
                          {row.mediaFailed}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={row.mediaFailed}
                          className="h-1 rounded-full"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <Typography>{row.mediaPending}</Typography>
                    </td>
                    <td className="p-4">
                      <Typography>{row.timeDuration}</Typography>
                    </td>
                    <td className="p-4">
                      <Typography>${row.totalCost}</Typography>
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
