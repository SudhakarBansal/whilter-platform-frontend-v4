

"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import clsx from "clsx"

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

  const apiPage = Number(searchParams.get("page")) || 0
  const currentPage = apiPage + 1
  const size = Number(searchParams.get("size")) || itemsPerPage

  const startItem = apiPage * size + 1
  const endItem = Math.min(currentPage * size, totalItems)

  const onPageChange = (uiPage: number) => {
    const apiPage = uiPage - 1
    const params = new URLSearchParams(searchParams)
    params.set("page", apiPage.toString())
    params.set("size", size.toString())
    router.push(`?${params.toString()}`)
  }

  // 🔹 Visible pages logic
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 3) return [1, 2, 3, "…", totalPages]
    if (currentPage >= totalPages - 2)
      return [1, "…", totalPages - 2, totalPages - 1, totalPages]
    return [1, "…", currentPage, currentPage + 1, "…", totalPages]
  }

  // 🔹 Styled buttons
  const btnClasses = (active?: boolean, disabled?: boolean) =>
    clsx(
      "w-9 h-9 flex items-center justify-center transition-all duration-150",
      "text-sm font-medium rounded-[4px]",
      active
        ? "bg-blue-500 text-white shadow-md border-sky-400"
        : "text-sky-100 bg-navy-700 hover:bg-blue-500 border border-gray-500",
      disabled && "opacity-40 pointer-events-none"
    )
  

  const iconBtnClasses = (disabled?: boolean) =>
    clsx(
      "w-9 h-9 flex items-center justify-center rounded-[4px]",
      "text-blue-200 bg-navy-700 hover:bg-navy-700 border border-gray-500",
      "transition-all duration-150",
      disabled && "opacity-40 pointer-events-none"
    )

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between gap-10">
        {/* Info - More subtle text */}
        <div className="text-sm text-gray-400">
          Showing <span className="text-gray-200">{startItem}-{endItem}</span> of{" "}
          <span className="text-gray-200">{totalItems}</span>
        </div>
  
        {/* Pagination - Tightened spacing */}
        <div className="flex items-center gap-1">
          {/* First */}
          <button
            className={iconBtnClasses(currentPage === 1)}
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <ChevronsLeft size={16} className="scale-90" />
          </button>
  
          {/* Prev */}
          <button
            className={iconBtnClasses(currentPage === 1)}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} className="scale-90" />
          </button>
  
          {/* Pages */}
          {getVisiblePages().map((page, idx) =>
            page === "…" ? (
              <span
                key={idx}
                className="w-9 h-9 flex items-center justify-center text-gray-500"
              >
                …
              </span>
            ) : (
              <button
                key={idx}
                className={btnClasses(page === currentPage)}
                onClick={() => onPageChange(page as number)}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
  
          {/* Next */}
          <button
            className={iconBtnClasses(currentPage === totalPages)}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={16} className="scale-90" />
          </button>
  
          {/* Last */}
          <button
            className={iconBtnClasses(currentPage === totalPages)}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <ChevronsRight size={16} className="scale-90" />
          </button>
        </div>
      </div>
    )
  }
