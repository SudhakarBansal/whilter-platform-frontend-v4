"use client";
import React, { useState } from "react";
import { MoreVertical, Download, ExternalLink, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { Close } from "@mui/icons-material";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface DocumentPlayerProps {
  url: string;
  name?: string;
}

export const DocumentPlayer: React.FC<DocumentPlayerProps> = ({
  url,
  name,
}) => {
  url = url;
  const [showMenu, setShowMenu] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const fileName = name || url.split("/").pop() || "Document";

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div>
      {/* Preview Header */}
      <div className="relative bg-gray-100 h-60 flex items-center justify-center overflow-hidden">
        {error ? (
          <div className="flex flex-col items-center text-gray-500 text-sm">
            <FileText className="w-12 h-12 mb-2" />
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div
              onClick={() => setShowPdfDialog(true)}
              className="mx-auto my-4 flex flex-col items-center  border border-gray-200 bg-gray-50 p-4 shadow hover:shadow-lg cursor-pointer transition"
              style={{ maxWidth: 220 }}
            >
              <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={1} width={180} />
              </Document>
              <Typography
                variant="caption"
                className="text-blue-600 mt-2 text-center"
              >
                Click to view full document
              </Typography>
            </div>
            <Dialog
              open={showPdfDialog}
              onClose={() => setShowPdfDialog(false)}
              maxWidth="md"
              fullWidth
              PaperProps={{
                className:
                  "rounded-2xl bg-white min-h-[400px] max-h-[80vh] overflow-y-auto",
              }}
            >
              <DialogTitle className="flex items-center justify-between pb-0">
                <span className="font-semibold text-lg">{name}</span>
                <IconButton onClick={() => setShowPdfDialog(false)}>
                  <Close className="text-red-500" />
                </IconButton>
              </DialogTitle>
              <DialogContent className="pt-2 pb-2 flex flex-col items-center bg-gray-50">
                <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={600}
                      className="mb-4 shadow"
                    />
                  ))}
                </Document>
              </DialogContent>
            </Dialog>
          </>
        )}

        {/* 3-dot menu */}
        <button
          onClick={toggleMenu}
          className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
        >
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>

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

      {/* File Info */}
      <div className="p-3 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-500" />
        <span className="truncate text-sm font-medium">{fileName}</span>
      </div>
    </div>
  );
};
