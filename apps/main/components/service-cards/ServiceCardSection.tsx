'use client';

import { useState } from "react";
import { services } from "@/utils/data/services";
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { ServiceCard } from "./ServiceCard";
import { accessMatrix } from "@whilter/auth";


export const ServiceCardSection = ({
  role,
  section,
}: {
  role: string;
  section: string;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [deniedServiceName, setDeniedServiceName] = useState("");

  const handleCardClick = (serviceId: string, href: string, title: string) => {
    const access = accessMatrix[serviceId];

    if (!access) {
      setDeniedServiceName(title);
      setOpenDialog(true);
      return;
    }

    const hasRole = access.roles.includes(role);
    const hasSection = !access.sections || access.sections.includes(section);

    if (hasRole && hasSection) {
      window.location.href = href;
    } else {
      setDeniedServiceName(title);
      setOpenDialog(true);
    }
  };

  return (
    <>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-14 w-full">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            image={service.image}
            href={service.href}
            onCardClick={() =>
              handleCardClick(service.id, service.href, service.title)
            }
          />
        ))}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Unauthorized Access</DialogTitle>
        <DialogContent>
          <Typography>
            You do not have permission to access "<strong>{deniedServiceName}</strong>".
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
