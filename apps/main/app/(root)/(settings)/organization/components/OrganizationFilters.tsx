"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TextField } from "@mui/material";
import debounce from "lodash.debounce";

export const OrganizationFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  // Local state that doesn't sync with URL until debounce completes
  const [searchValue, setSearchValue] = useState(
    () => searchParams.get("name") || "",
  );

  // Prevent initial effect from running on mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const urlName = searchParams.get("name") || "";
    // Only update local state if URL changed and it's different from current value
    if (urlName !== searchValue) {
      setSearchValue(urlName);
    }
  }, [searchParams]);

  // Debounced function to update URL
  const debouncedUpdateURL = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim() === "") {
        params.delete("name");
      } else {
        params.set("name", value);
      }

      // Reset to first page
      params.set("page", "0");

      // Use replace to avoid adding to history and maintain scroll position
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 500),
    [router, searchParams],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value); // Update local state immediately for responsive UI
    debouncedUpdateURL(value); // Update URL after debounce
  };

  // Maintain focus after re-renders
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (document.activeElement !== inputRef.current && searchValue) {
        inputRef.current?.focus();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [searchParams]);

  return (
    <div className="mb-6">
      <TextField
        inputRef={inputRef}
        label="Search Organizations"
        placeholder="Search by organization name..."
        value={searchValue}
        onChange={handleInputChange} // Use onChange instead of onChangeCapture
        fullWidth
        variant="outlined"
        size="medium"
        className="max-w-md"
        autoComplete="off"
        focused
      />
    </div>
  );
};
