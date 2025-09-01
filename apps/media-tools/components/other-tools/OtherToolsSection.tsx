import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { otherToolCardsData } from "@/data/otherToolCards.data";
import { OtherToolCard } from "./OtherToolCard";

// Main Grid Component
const OtherToolsSection: React.FC = () => {
  return (
    <Box className="w-full">
      <Stack direction="row" alignItems="center" className="mb-6">
        <Typography variant="h2" component="h2">
          Other Tools
        </Typography>
      </Stack>

      {/* Cards Grid */}
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {otherToolCardsData.map((cardData) => (
          <OtherToolCard key={cardData.id} data={cardData} />
        ))}
      </Box>
    </Box>
  );
};

export default OtherToolsSection;
