"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@mui/material"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export default function Pagination({
  totalPages,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Convert 0-based API page to 1-based UI page
  const apiPage = Number(searchParams.get("page")) || 0
  const currentPage = apiPage + 1
  const size = Number(searchParams.get("size")) || itemsPerPage

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    let changed = false
    if (!params.get("page")) {
      params.set("page", "0") // API uses 0-based
      changed = true
    }
    if (!params.get("size")) {
      params.set("size", itemsPerPage.toString())
      changed = true
    }
    if (changed) {
      router.replace(`?${params.toString()}`)
    }
  }, [searchParams, router, itemsPerPage])

  const startItem = apiPage * size + 1 
  const endItem = Math.min(currentPage * size, totalItems)

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const onPageChange = (uiPage: number) => {
    const apiPage = uiPage - 1 // Convert back to 0-based for API
    const params = new URLSearchParams(searchParams)
    params.set("page", apiPage.toString())
    params.set("size", size.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-200/60 dark:border-slate-700/60">
      <div className="text-sm text-slate-600 dark:text-slate-400">
        Showing {startItem} to {endItem} of {totalItems} users
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="flatSecondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-white/80 dark:bg-slate-800/80"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) => (
            <Button
              key={index}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
              className={`min-w-[40px] ${
                page === currentPage ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white/80 dark:bg-slate-800/80"
              }`}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-white/80 dark:bg-slate-800/80"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}