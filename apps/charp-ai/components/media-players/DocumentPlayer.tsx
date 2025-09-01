"use client";
import React, { useState } from "react";
import { MoreVertical, Download, ExternalLink, FileText } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface DocumentPlayerProps {
  url: string;
  name?: string;
}

export const DocumentPlayer: React.FC<DocumentPlayerProps> = ({
  url,
  name,
}) => {
  // url = '';
  const [showMenu, setShowMenu] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileName = name || url.split("/").pop() || "Document";

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <div className="border rounded-lg shadow-sm w-full max-w-md relative">
      {/* Preview Header */}
      <div className="relative bg-gray-100 h-60 flex items-center justify-center overflow-visible">
        {error ? (
          <div className="flex flex-col items-center text-gray-500 text-sm text-center">
            <FileText className="w-12 h-12 mb-2" />
            <p>{error}</p>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            {/* <Document
              file={url}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={() =>
                setError("Failed to preview. Try downloading instead.")
              }
              loading={<p className="text-gray-500">Loading preview...</p>}
            >
              <Page pageNumber={1} width={220} className="mx-auto" />
            </Document> */}
            <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={1} />
            </Document>
          </div>
        )}

        {/* 3-dot menu */}
        <div className="absolute top-2 right-2">
          <button
            onClick={toggleMenu}
            className="p-1 rounded hover:bg-gray-200"
          >
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute top-8 right-0 bg-white border rounded shadow-md w-40 z-50">
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
      </div>

      {/* File Info */}
      <div className="p-3 flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-500" />
        <span className="truncate text-sm font-medium">{fileName}</span>
      </div>
    </div>
  );
};
