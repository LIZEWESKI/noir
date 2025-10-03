import * as React from "react"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns2,
  EllipsisVertical,
  Edit,
  Trash2,
  ChevronUp,
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
import { z } from "zod"
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
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import DeleteAlertDialog from "../ui/delete-alert-dialog"
import { getStatusColor } from "@/components/rooms-management/get-room-status"
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter"
import { useExportCsv } from "@/hooks/use-export-csv"
import { useExportXlsx } from "@/hooks/use-export-xlsx"
import ExtensionDropdown from "../data-table/extension-dropdown"
import { usePage } from "@inertiajs/react"

export const schema = z.object({
  id: z.number(),
  name: z.string(),
  room_number: z.string(),
  type: z.string(),
  price: z.number(),
  status: z.string(),
  size: z.number(),
  guests: z.number(),
  bathrooms: z.number(),
  bed: z.string(),
  features: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
})

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

const columns = [
  {
    accessorKey: "room_number",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Room #{column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
        <ColumnFilter column={column} title="Room #" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-20">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.room_number}
        </Badge>
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Room Name
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
        <ColumnFilter column={column} title="Name" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.name}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column, table }) => {
      const uniqueTypes = Array.from(
        table.getPreFilteredRowModel().flatRows.reduce((types, row) => {
          types.add(row.original.type)
          return types
        }, new Set()),
      )

      return (
        <div className="space-y-2">
          <div
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center cursor-pointer font-medium"
          >
            Type
            {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
          </div>
          <SelectColumnFilter column={column} title="Type" options={uniqueTypes} />
        </div>
      )
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Price
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
      </div>
    ),
    filterFn: (row, id, value) => {
      const price = row.getValue(id)
      const [min, max] = value
      if (min && price < min) return false
      if (max && price > max) return false
      return true
    },
    cell: ({ row, table }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {table.options.meta.formatCurrency(row.original.price)}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column, table }) => {
      const uniqueStatuses = Array.from(
        table.getPreFilteredRowModel().flatRows.reduce((statuses, row) => {
          statuses.add(row.original.status)
          return statuses
        }, new Set()),
      )

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
    cell: ({ row }) => (
      <div className="space-y-2">
        <Badge className={`text-xs px-2 py-1 ${getStatusColor(row.original.status)}`}>{row.original.status}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "guests",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Capacity
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
      </div>
    ),
    filterFn: (row, id, value) => {
      const guests = row.getValue(id)
      return guests >= Number(value)
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.guests} guests
      </Badge>
    ),
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1 max-w-32">
        {row.original.features.slice(0, 2).map((feature) => (
          <span
            key={feature.id}
            className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
          >
            {feature.name}
          </span>
        ))}
        {row.original.features.length > 2 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground cursor-default">
                  +{row.original.features.length - 2}
                </span>
              </TooltipTrigger>
              <TooltipContent>{row.original.features[row.original.features.length - 1].name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    ),
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const canUpdate = table.options.meta?.canUpdate;
      const canDelete = table.options.meta?.canDelete;
      const hasActions = canUpdate || canDelete;

      if (!hasActions) return null;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            >
              <EllipsisVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-32">
            {canUpdate && (
              <DropdownMenuItem onClick={() => table.options.meta?.onEdit?.(row.original)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            )}

            {canDelete && (
              <>
                {canUpdate && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  className="text-destructive hover:bg-destructive-foreground"
                  onClick={() => table.options.meta?.onDeleteClick(row.original.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
  }
]

function RoomsDataTable({ data: initialData, onEdit, onDelete }) {
  const [data, setData] = React.useState(() => initialData)
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [sorting, setSorting] = React.useState([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const { permissions } = usePage().props.auth;
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [selectedRoomId, setSelectedRoomId] = React.useState(null)
  const { formatCurrency } = useCurrencyFormatter()

  const table = useReactTable({
    data,
    columns,
    meta: {
      canUpdate: permissions.updateRooms,
      canDelete: permissions.deleteRooms,
      onEdit,
      onDelete,
      onDeleteClick: (id) => {
        setSelectedRoomId(id)
        setIsDeleteOpen(true)
      },
      isDeleteOpen,
      setIsDeleteOpen,
      selectedRoomId,
      formatCurrency,
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

  const exportableExtensions = [
    {
      name: "csv",
      url: "/admin/rooms/export/csv",
      label: "rooms",
      action: useExportCsv(),
    },
    {
      name: "xlsx",
      url: "/admin/rooms/export/xlsx",
      label: "rooms",
      action: useExportXlsx(),
    },
  ]

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
              <ExtensionDropdown extensions={exportableExtensions} />
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
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-4">
            <div className="flex w-full items-center gap-8 lg:w-fit">
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
        action={() => onDelete.action(selectedRoomId)}
      />
    </>
  )
}

export default RoomsDataTable
