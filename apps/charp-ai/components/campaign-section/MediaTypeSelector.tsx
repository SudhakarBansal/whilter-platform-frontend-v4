import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import ImageIcon from "@mui/icons-material/Image";
import { useCallback } from "react";
import type { MediaType } from "@/model/formInitialValues";

// ========== TYPES & CONSTANTS ==========

const MEDIA_TYPES: {
  id: MediaType;
  label: string;
  icon: typeof ImageIcon;
}[] = [
  {
    id: "image",
    label: "Image",
    icon: ImageIcon,
  },
  {
    id: "video",
    label: "Video",
    icon: VideoCameraFrontIcon,
  },
];

interface MediaTypeCardProps {
  selectedMediaType: MediaType;
  onSelect: (mediaType: MediaType) => void;
}

// ========== STYLES ==========

const styles = {
  mediaTypeContainer: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "background.paper",
    padding: 4,
    borderRadius: 2,
  },
  mediaCard: {
    base: {
      width: 200,
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      border: 2,
      boxShadow: 0,
    },
    unselected: {
      borderColor: "#D6D6D6",
      background: "#F4F4F4",
      color: "#707070",
      "&:hover": {
        borderColor: "gray.400",
        background: "#D6D6D6",
      },
    },
    selected: {
      borderColor: "transparent",
      background: "linear-gradient(180deg, #2343AA 0%, #0E1B44 100%)",
      color: "#ffffff",
      boxShadow: 10,
    },
  },
  iconStyle: {
    fontSize: 58,
  },
  submitButton: {
    textAlign: "center" as const,
    mt: 4,
  },
} as const;

export const MediaTypeCard: React.FC<MediaTypeCardProps> = ({
  selectedMediaType,
  onSelect,
}) => {
  const handleClick = useCallback(
    (mediaTypeId: MediaType) => {
      onSelect(mediaTypeId);
    },
    [onSelect],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, mediaTypeId: MediaType) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect(mediaTypeId);
      }
    },
    [onSelect],
  );

  return (
    <>
      <Typography variant="h5" component="h2" mb={1}>
        Media Type
      </Typography>
      <Box sx={styles.mediaTypeContainer}>
        {MEDIA_TYPES.map((mediaType) => {
          const isSelected = selectedMediaType === mediaType.id;
          const IconComponent = mediaType.icon;

          const cardStyles = {
            ...styles.mediaCard.base,
            ...(isSelected
              ? styles.mediaCard.selected
              : styles.mediaCard.unselected),
          };

          return (
            <Card
              key={mediaType.id}
              onClick={() => handleClick(mediaType.id)}
              onKeyDown={(event) => handleKeyDown(event, mediaType.id)}
              sx={cardStyles}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`Select ${mediaType.label} media type`}
            >
              <CardContent>
                <Box sx={{ mb: 1 }}>
                  <IconComponent sx={styles.iconStyle} />
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: isSelected ? "#ffffff" : "#707070",
                  }}
                >
                  {mediaType.label}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </>
  );
};
