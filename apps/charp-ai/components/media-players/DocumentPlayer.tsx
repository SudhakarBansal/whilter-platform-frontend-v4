"use client";
import React, { useState } from "react";
import { MoreVertical, Download, ExternalLink, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface DocumentPlayerProps {
  url: string;
  name?: string;
}

export const DocumentPlayer: React.FC<DocumentPlayerProps> = ({
  url,
  name,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPdfDialog, setShowPdfDialog] = useState(false);

  const fileName = name || url.split("/").pop() || "Document";
  const isPdf = fileName.toLowerCase().endsWith(".pdf");
  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div>
      <div className="relative bg-gray-100 h-60 flex items-center justify-center overflow-hidden">
        <div
          onClick={() => setShowPdfDialog(true)}
          className="mx-auto my-4 flex flex-col items-center border border-gray-200 bg-gray-50 p-4 shadow hover:shadow-lg cursor-pointer transition"
          style={{ maxWidth: 220 }}
        >
          <FileText className="w-16 h-16 text-blue-500 mb-2" />
          <p className="text-sm text-center text-blue-600">
            Click to view {isPdf ? "PDF" : "document"}
          </p>
        </div>

        {showPdfDialog && isPdf && (
          <Dialog
            open={showPdfDialog}
            onClose={() => setShowPdfDialog(false)}
            maxWidth="lg"
            fullWidth
          >
            <DialogTitle className="flex items-center justify-between">
              <span>{name}</span>
              <IconButton onClick={() => setShowPdfDialog(false)}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <iframe src={url} className="w-full h-96 border-0" title={name} />
            </DialogContent>
          </Dialog>
        )}

        {/* Menu button and rest of the code remains the same */}
        <Button
          onClick={toggleMenu}
          className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </Button>

        {showMenu && (
          <div className="absolute top-10 right-2 bg-white border rounded shadow-md w-40 z-10">
            <a
              href={url}
              download
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm"
            >
              <Download className="w-4 h-4" /> Download
            </a>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm"
            >
              <ExternalLink className="w-4 h-4" /> Open in Browser
            </a>
          </div>
        )}
      </div>

      <div className="p-3 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-500" />
        <span className="truncate text-sm font-medium">{fileName}</span>
      </div>
    </div>
  );
};
