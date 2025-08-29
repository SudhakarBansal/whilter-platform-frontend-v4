"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function AddNewBrand() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="https://whilter-platform-dev-media.s3.ap-south-1.amazonaws.com/Letter+for+ICC+members+-+Shabnam.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <p>
        Page {pageNumber} of {numPages}
      </p>

      <button
        disabled={pageNumber <= 1}
        onClick={() => setPageNumber((p) => p - 1)}
      >
        Previous
      </button>
      <button
        disabled={numPages ? pageNumber >= numPages : true}
        onClick={() => setPageNumber((p) => p + 1)}
      >
        Next
      </button>
    </div>
  );
}
