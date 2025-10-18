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
  User,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useInitials } from "@/hooks/use-initials"
import { getStatusColor } from "@/components/guests-management/get-guest-status"
import { format } from "date-fns"
import DeleteUserDialog from "@/components/ui/delete-user-dialog"
import { useExportCsv } from "@/hooks/use-export-csv"
import { useExportXlsx } from "@/hooks/use-export-xlsx"
import ExtensionDropdown from "../data-table/extension-dropdown"
import { usePage } from "@inertiajs/react"

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

const columns = [
  {
    accessorKey: "user",
    header: ({ column }) => (
      <div className="space-y-2">
        <div className="flex items-center font-medium">Full Name</div>
        <ColumnFilter column={column} title="Guest" />
      </div>
    ),
    cell: ({ row, table }) => {
      const user = row.original
      const initials = table.options.meta.getInitials(user.name)
      return (
        <div className="flex items-center gap-3 min-w-48">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profile_picture_url || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{user.name}</div>
          </div>
        </div>
      )
    },
    enableHiding: false,
    filterFn: (row, id, value) => {
      return row.original.name.toLowerCase().includes(value.toLowerCase())
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Email
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
        <ColumnFilter column={column} title="Email" />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="space-y-1">
          <Badge variant="outline" className="text-xs px-2 py-1">
            {row.original.email}
          </Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return row.original.email.includes(value)
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Roles
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="space-y-1 min-w-32">
        <Badge variant="ghost" className="text-xs">
          {row.original.role.charAt(0).toUpperCase() + row.original.role.slice(1)}
        </Badge>
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "stays",
    header: ({ column }) => (
      <div className="space-y-2">
        <div className="flex items-center font-medium">Total Stays</div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground">{row.original.stays}</div>
      </div>
    ),
  },
  {
    accessorKey: "Last Stay",
    header: ({ column }) => {
      return (
        <div className="space-y-2">
          <div className="flex items-center font-medium">Last Stay Date</div>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">{row.original.last_stay}</div>
      </div>
    ),
  },
  {
    accessorKey: "is_active",
    header: ({ column }) => {
      return (
        <div className="space-y-2">
          <div
            className="flex items-center font-medium cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Account Status
            {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
            {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
          </div>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">
          <Badge className={`text-xs px-2 py-1 ${getStatusColor(row.original.is_active)}`}>
            {row.original.is_active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "Creation Date",
    header: ({ column }) => {
      return (
        <div className="space-y-2">
          <div className="flex items-center font-medium">Creation Date</div>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">{format(row.original.created_at, "MM-dd-yyyy")}</div>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const canView = table.options.meta?.canView;
      const canUpdate = table.options.meta?.canUpdate;
      const canDelete = table.options.meta?.canDelete;

      const hasActions = canView || canUpdate || canDelete;
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

          <DropdownMenuContent align="end" className="w-40">
            {canView && (
              <DropdownMenuItem onClick={() => table.options.meta.viewGuest(row.original)}>
                <User className="mr-2 h-4 w-4" />
                View Guest
              </DropdownMenuItem>
            )}

            {canUpdate && (
              <DropdownMenuItem onClick={() => table.options.meta?.onEdit?.(row.original)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Guest
              </DropdownMenuItem>
            )}

            {canDelete && (
              <>
                {(canView || canUpdate) && <DropdownMenuSeparator />}
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

function GuestsDataTable({ data: initialData, onEdit, onDelete, viewGuest }) {
  const [tableData, setTableData] = React.useState(() => initialData)
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [sorting, setSorting] = React.useState([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const { auth: {permissions} } = usePage().props;
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [selectGuestId, setSelectGuestId] = React.useState(null)
  const getInitials = useInitials()
  const table = useReactTable({
    data: tableData,
    columns,
    meta: {
      canUpdate: permissions.updateGuests,
      canDelete: permissions.deleteGuests,
      canView: permissions.viewGuests,
      getInitials,
      onEdit,
      onDelete,
      viewGuest,
      onDeleteClick: (id) => {
        setSelectGuestId(id)
        setIsDeleteOpen(true)
      },
      isDeleteOpen,
      setIsDeleteOpen,
      selectGuestId,
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

  const exportConfig = [
    {
      name: "csv",
      url: "/admin/guests/export/csv",
      label: "guests",
      action: useExportCsv(),
    },
    {
      name: "xlsx",
      url: "/admin/guests/export/xlsx",
      label: "guests",
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
            </DropdownMenu>
            {permissions.exportGuests && <ExtensionDropdown extensions={exportConfig} />}
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
                      No reservations found.
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

      <DeleteUserDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen} guestId={selectGuestId} />
    </>
  )
}

export default GuestsDataTable
