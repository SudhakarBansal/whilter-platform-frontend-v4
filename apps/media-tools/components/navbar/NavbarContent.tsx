"use client";
import { getToolBySlug } from "@/lib/getToolBySlug";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

function NavbarContent() {
  const params = useParams();
  const { tool: toolSlug } = params;

  // Handle the type conversion properly
  const normalizedToolSlug = Array.isArray(toolSlug) ? toolSlug[0] : toolSlug;

  // Validate tool existence
  const tool = getToolBySlug(normalizedToolSlug || null);

  return (
    <div className="flex flex-col gap-1">
      {tool ? (
        <>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {tool.title}
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "gray.400" }}>
            {tool?.description}
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Media Tools
          </Typography>
        </>
      )}
    </div>
  );
}

export default NavbarContent;
