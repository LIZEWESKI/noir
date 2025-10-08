import * as React from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns2,
  ChevronUp,
  Edit,
  Trash2,
  EllipsisVertical,
  Ticket,
} from "lucide-react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { format, isPast, isFuture } from "date-fns"
import { useExportCsv } from "@/hooks/use-export-csv"
import { useExportXlsx } from "@/hooks/use-export-xlsx"
import ExtensionDropdown from "@/components/data-table/extension-dropdown"
import DeleteAlertDialog from "@/components/ui/delete-alert-dialog"
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter"

function ColumnFilter({ column, title }) {
  const columnFilterValue = column.getFilterValue()

  return (
    <Input
      placeholder={`Filter ${title}...`}
      value={columnFilterValue ?? ""}
      onChange={(event) => column.setFilterValue(event.target.value)}
      className="h-8 w-full max-w-sm"
    />
  )
}

function SelectColumnFilter({ column, title, options }) {
  const columnFilterValue = column.getFilterValue()

  return (
    <Select
      value={columnFilterValue ?? "all"}
      onValueChange={(value) => {
        column.setFilterValue(value === "all" ? undefined : value)
      }}
    >
      <SelectTrigger className="h-8 w-full max-w-sm">
        <SelectValue placeholder={`Filter ${title}...`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All {title}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function getCouponStatus(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const today = new Date()

  if (isPast(end)) return "expired"
  if (isFuture(start)) return "upcoming"
  return "active"
}

function getStatusBadgeColor(status) {
  switch (status) {
    case "active":
      return "bg-emerald-500/10 text-emerald-500"
    case "expired":
      return "bg-red-500/10 text-red-500"
    case "upcoming":
      return "bg-blue-500/10 text-blue-500"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const columns = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Coupon Code
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
        <ColumnFilter column={column} title="Code" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 min-w-32">
        <span className="font-mono font-semibold">{row.original.code}</span>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Type
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
        <SelectColumnFilter column={column} title="Type" options={["fixed", "percentage"]} />
      </div>
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: "value",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Discount
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
      </div>
    ),
    cell: ({ row , table }) => (
      <div className="font-semibold">
        {row.original.type === "fixed" ? `${table.options.meta.formatCurrency(row.original.value)}` : `${row.original.value}%`}
      </div>
    ),
  },
  {
    accessorKey: "global_limit",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Uses Left
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        <span className={row.original.global_limit <= 10 ? "text-red-500 font-semibold" : ""}>
          {row.original.global_limit}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Start Date
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-xs text-muted-foreground">{format(new Date(row.original.start_date), "MMM dd, yyyy")}</div>
    ),
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          End Date
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-xs text-muted-foreground">{format(new Date(row.original.end_date), "MMM dd, yyyy")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column, table }) => {
      const uniqueStatuses = ["active", "expired", "upcoming"]

      return (
        <div className="space-y-2">
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center cursor-pointer font-medium"
          >
            Status
            {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
          </div>
          <SelectColumnFilter column={column} title="Status" options={uniqueStatuses} />
        </div>
      )
    },
    cell: ({ row }) => {
      const status = getCouponStatus(row.original.start_date, row.original.end_date)
      return <Badge className={`text-xs px-2 py-1 capitalize ${getStatusBadgeColor(status)}`}>{status}</Badge>
    },
    filterFn: (row, id, value) => {
      const status = getCouponStatus(row.original.start_date, row.original.end_date)
      return status === value
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="">
            <EllipsisVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => table.options.meta?.onEdit?.(row.original)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Coupon
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive hover:bg-destructive-foreground"
            onClick={() => table.options.meta?.onDeleteClick(row.original.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    enableSorting: false,
  },
]

function CouponsDataTable({ data: initialData, onEdit, onDelete }) {
  const [tableData, setTableData] = React.useState(() => initialData)
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [sorting, setSorting] = React.useState([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const { formatCurrency } = useCurrencyFormatter()
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [selectCouponId, setSelectCouponId] = React.useState(null)

  const table = useReactTable({
    data: tableData,
    columns,
    meta: {
      formatCurrency,
      onEdit,
      onDelete,
      onDeleteClick: (id) => {
        setSelectCouponId(id)
        setIsDeleteOpen(true)
      },
      isDeleteOpen,
      setIsDeleteOpen,
      selectCouponId,
    },
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <>
      <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
        <div className="flex items-center justify-end px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Columns2 />
                  <span className="hidden lg:inline">Customize Columns</span>
                  <span className="lg:hidden">Columns</span>
                  <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No coupons found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-4">
            <div className="flex w-full items-center gap-8 lg:w-fit lg:ml-auto">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex bg-transparent"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8 bg-transparent"
                  size=""
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  className="size-8 bg-transparent"
                  size=""
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex bg-transparent"
                  size=""
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <DeleteAlertDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title={onDelete.title}
        description={onDelete.description}
        action={() => onDelete.action(selectCouponId)}
      />
    </>
  )
}

export default CouponsDataTable
