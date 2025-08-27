import React, { useState } from "react";
import { MoreVertical, Download, ExternalLink, FileText } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface DocumentPlayerProps {
  url: string;
  name?: string;
}

export const DocumentPlayer: React.FC<DocumentPlayerProps> = ({ url, name }) => {
    url = "https://s3.ap-south-1.amazonaws.com/whilter.cdn.com/testing/ADFlow.pdf";
  const [showMenu, setShowMenu] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileName = name || url.split("/").pop() || "Document";

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="border rounded-lg shadow-sm w-full max-w-md bg-white">
      {/* Preview Header */}
      <div className="relative bg-gray-100 h-60 flex items-center justify-center overflow-hidden">
        {error ? (
          <div className="flex flex-col items-center text-gray-500 text-sm">
            <FileText className="w-12 h-12 mb-2" />
            <p>{error}</p>
          </div>
        ) : (
          <Document
            file={url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={() =>
              setError("Failed to preview. Try downloading instead.")
            }
            loading={<p className="text-gray-500">Loading preview...</p>}
          >
            <Page pageNumber={1} width={400} />
          </Document>
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
