import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
  export function FullPagination({ currentPage = 1, totalPages = 5 }) {
    const getPageNumbers = () => {
      const pages = []
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
          pages.push(i)
        } else if (i === currentPage - 2 || i === currentPage + 2) {
          pages.push("...")
        }
      }
      return pages
    }
  
    return (
      <Pagination className="py-12">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/rooms?page=${currentPage - 1}`}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
  
          {getPageNumbers().map((page, i) => (
            <PaginationItem key={i}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink href={`/rooms?page=${page}`} isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
  
          <PaginationItem>
            <PaginationNext
              href={`/rooms?page=${currentPage + 1}`}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  
  