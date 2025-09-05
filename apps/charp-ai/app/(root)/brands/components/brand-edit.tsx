import React from "react";
import BrandForm from "./brand-form";

export default function BrandEdit() {
  try {
    return <BrandForm />;
  } catch (error) {
    return (
      <div style={{ color: "red" }}>
        Failed to load brand data. Please try again later.
      </div>
    );
  }
}
