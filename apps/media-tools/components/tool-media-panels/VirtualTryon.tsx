"use client";

import React, { useState } from "react";
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import ImageUploader from "../ImageUploader";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`garment-tabpanel-${index}`}
      aria-labelledby={`garment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const garmentTypes = [
  { label: "Top", value: "top", uploaders: 1 },
  { label: "Bottom", value: "bottom", uploaders: 1 },
  { label: "Both", value: "both", uploaders: 2 },
  { label: "Auto", value: "auto", uploaders: 1 },
  { label: "One Piece", value: "onepiece", uploaders: 1 },
];

export default function VirtualTryOnScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [modelImage, setModelImage] = useState<File | string | null>(null);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleModelImageSelect = (image: File | string) => {
    setModelImage(image);
  };

  const handleGarmentImageSelect = (image: File) => {
    setGarmentImage(image);
  };

  const handleTryOn = async () => {
    if (!modelImage || !garmentImage) return;

    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setResult(
        "https://images.pexels.com/photos/8832879/pexels-photo-8832879.jpeg?auto=compress&cs=tinysrgb&w=800",
      );
      setIsProcessing(false);
    }, 3000);
  };

  const canProcess = modelImage && garmentImage && !isProcessing;

  return (
    <div className="w-full">
      <Stack direction={{ xs: "column", md: "row" }} spacing={0.1}>
        {/* Left Section - Garment Selection */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "background.paper",
            paddingY: 1.5,
            paddingX: 3,
            borderTopLeftRadius: { xs: 10, md: 10 },
            borderBottomLeftRadius: { xs: 0, md: 10 },
            borderTopRightRadius: { xs: 10, md: 0 },
            borderBottomRightRadius: { xs: 0, md: 0 },
          }}
        >
          <Box>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              centered
              sx={{ borderBottom: 1, borderColor: "divider" }}
            >
              {garmentTypes.map((type, index) => (
                <Tab
                  key={type.value}
                  label={type.label}
                  id={`garment-tab-${index}`}
                  aria-controls={`garment-tabpanel-${index}`}
                  sx={{ color: "gray.400" }}
                />
              ))}
            </Tabs>

            {garmentTypes.map((type, index) => (
              <TabPanel key={type.value} value={selectedTab} index={index}>
                {type.uploaders === 2 ? (
                  <Stack direction="row" spacing={2}>
                    <ImageUploader />
                    <ImageUploader />
                  </Stack>
                ) : (
                  <ImageUploader />
                )}
              </TabPanel>
            ))}
          </Box>
        </Box>

        {/* Right Section - Model Selection */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "background.paper",
            paddingY: 1.5,
            paddingX: 3,
            borderTopLeftRadius: { xs: 0, md: 0 },
            borderBottomLeftRadius: { xs: 10, md: 0 },
            borderTopRightRadius: { xs: 0, md: 10 },
            borderBottomRightRadius: { xs: 10, md: 10 },
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "transparent",
              minHeight: "48px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography className="text-xl text-gray-800 font-bold">
              Select a Model
            </Typography>
          </Box>

          {/* Add padding to match TabPanel */}
          <Box sx={{ pt: 3 }}>
            <ImageUploader />
          </Box>
        </Box>
      </Stack>

      {/* Try-On Button - Centered below both sections */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          mb: 2,
        }}
      >
        <Button
          variant="generateButton"
          size="large"
          onClick={handleTryOn}
          disabled={!canProcess}
          className="px-8 py-2 text-lg"
        >
          <PlayArrow sx={{ mr: 1 }} />
          {isProcessing ? "Processing..." : "Generate Try-On"}
        </Button>
      </Box>
    </div>
  );
}
