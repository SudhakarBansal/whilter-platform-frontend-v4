"use client";
import React, { useState } from "react";
import { MoreVertical, Download, ExternalLink, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  ClickAwayListener, // 🔹 import
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

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const closeMenu = () => setShowMenu(false);

  const handleDownload = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    try {
      const resp = await fetch(url, { mode: "cors", credentials: "omit" });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const blob = await resp.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

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
            PaperProps={{
              className: "rounded-xl",
              style: { height: "90vh" },
            }}
          >
            <DialogTitle className="flex items-center justify-between">
              <span>{name}</span>
              <IconButton onClick={() => setShowPdfDialog(false)}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent className="p-0">
              <iframe
                src={url}
                className="w-full h-[80vh] border-0"
                title={name}
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Menu with click-away */}
        <ClickAwayListener onClickAway={closeMenu}>
          <div className="absolute top-2 right-2">
            <Button
              onClick={toggleMenu}
              className="p-1 rounded hover:bg-gray-200 min-w-0"
            >
              <MoreVertical className="w-5 h-5 text-gray-800" />
            </Button>

            {showMenu && (
              <div className="absolute top-10 right-0 bg-white border rounded shadow-md w-44 z-10">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full text-left flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-gray-900"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-gray-900"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open in Browser
                </a>
              </div>
            )}
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
};
