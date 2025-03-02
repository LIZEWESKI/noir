import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { router } from "@inertiajs/react"
export function SimplePagination({ currentPage = 1, totalPages = 3, nextPage, prevPage }) {
  return (
    <div className="flex justify-center items-center gap-8 py-12">
      <Button
        variant="outline"
        className="group h-10 px-6 rounded-full border-2 border-success"
        onClick={() => router.visit(prevPage)}
        disabled={prevPage === null}
      >
        <ChevronLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Previous
      </Button>
      <span className="text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="outline"
        className="group h-10 px-6 rounded-full border-2 border-success"
        onClick={() => router.visit(nextPage)}
        disabled={nextPage === null}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  )
}

