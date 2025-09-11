"use client";

import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
  Button,
  Fab,
} from "@mui/material";
import { AutoAwesome, PlayArrow } from "@mui/icons-material";
// import ImageUploadArea from './ImageUploadArea';
// import ModelGallery from './ModelGallery';
// import OutputDisplay from './OutputDisplay';

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
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
  { label: "Both", value: "both" },
  { label: "Auto", value: "auto" },
  { label: "One Piece", value: "onepiece" },
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
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth"
          centered
        >
          {garmentTypes.map((type, index) => (
            <Tab
              key={type.value}
              label={type.label}
              id={`garment-tab-${index}`}
              aria-controls={`garment-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {garmentTypes.map((type, index) => (
        <TabPanel key={type.value} value={selectedTab} index={index}>
          <Grid container spacing={4}>
            {/* Garment Selection */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="mb-4 flex items-center">
                <AutoAwesome className="mr-2 text-purple-600" />
                Select Garment ({type.label})
              </Typography>
              {/* <ImageUploadArea
                  title="Upload Garment Image"
                  subtitle={`Upload ${type.label.toLowerCase()} garment photo`}
                  onImageSelect={handleGarmentImageSelect}
                  acceptedTypes="image/*"
                  selectedImage={garmentImage}
                /> */}
            </Grid>

            {/* Model Selection */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" className="mb-4 flex items-center">
                <AutoAwesome className="mr-2 text-blue-600" />
                Select Model
              </Typography>
              <div className="space-y-4">
                {/* <ImageUploadArea
                    title="Upload Model Image"
                    subtitle="Upload your own model photo"
                    onImageSelect={handleModelImageSelect}
                    acceptedTypes="image/*"
                    selectedImage={typeof modelImage === 'string' ? null : modelImage}
                  />
                  */}
              </div>
            </Grid>
          </Grid>

          {/* Try-On Button */}
          <Box className="flex justify-center mt-8">
            <Button
              variant="generateButton"
              size="large"
              onClick={handleTryOn}
              disabled={!canProcess}
              className="px-8 py-4"
            >
              <PlayArrow sx={{ mr: 1 }} />
              {isProcessing ? "Processing..." : "Generate Try-On"}
            </Button>
          </Box>
        </TabPanel>
      ))}
    </div>
  );
}
