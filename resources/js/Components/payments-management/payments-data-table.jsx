import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns2,
  GripVertical,
  ChevronUp,
  Eye,
  FileUp,
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
import { getStatusColor } from "@/components/reservations-management/get-reservation-status";
import { useCapitalize } from "@/hooks/use-capitalize"
import PaymentDetailsModal from "@/components/payments-management/payment-details-modal"
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter"


function DragHandle({ id }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size=""
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <GripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

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
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    enableSorting: false,
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Guest
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
        <ColumnFilter column={column} title="by Guest or Transaction Id" />
      </div>
    ),
    cell: ({ row, table }) => {
      const user = row.original.user;
      const initials = table.options.meta.getInitials(user.name);
      return (
        <div className="flex items-center gap-3 min-w-48">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profile_picture_url} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
        </div>
      );
    },
    enableHiding: false,
    filterFn: (row, id, value) => {
      return (
        row.original.user.name.toLowerCase().includes(value.toLowerCase()) ||
        row.original.user.email.toLowerCase().includes(value.toLowerCase()) ||
        row.original.transaction_id.toLowerCase().includes(value.toLowerCase()) 
      );
    },
  },
  {
    accessorKey: "reservations",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Reservations
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="space-y-1 min-w-32">
        {row.original.reservations.map((res) => (
          <div key={res.id} className="text-xs text-muted-foreground">
            {res.check_in} → {res.check_out}
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Amount
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
      </div>
    ),
    cell: ({ row, table }) => (
      <div className="font-semibold">{table.options.meta.formatCurrency(row.original.total_amount)}</div>
    ),
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => (
      <div className="space-y-2">
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center cursor-pointer font-medium"
        >
          Method
          {column.getIsSorted() === "asc" && <ChevronUp className="ml-2 h-4 w-4" />}
          {column.getIsSorted() === "desc" && <ChevronDown className="ml-2 h-4 w-4" />}
        </div>
        <SelectColumnFilter column={column} title="Method" options={["PayPal", "Credit Card","Cash"]} />
      </div>
    ),
    cell: ({ row , table}) => <div className="text-xs text-muted-foreground">{table.options.meta.getCapitalize(row.original.payment_method)}</div>,
  },
  {
    accessorKey: "payment_status",
    header: ({ column, table }) => {
      const uniqueStatuses = Array.from(
        table.getPreFilteredRowModel().flatRows.reduce((statuses, row) => {
          statuses.add(row.original.payment_status);
          return statuses;
        }, new Set()),
      );

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
      );
    },
    cell: ({ row }) => (
      <div>
        <Badge className={`text-xs px-2 py-1 ${getStatusColor(row.original.payment_status)}`}>
          {row.original.payment_status}
        </Badge>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row, table }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => table.options.meta.onModalClick(row.original.id)}
      >
        <Eye className="w-4 h-4" />
        <span className="sr-only">Open Payment Details</span>
      </Button>
    ),
    enableSorting: false,
    header: () => null,
  }
];


function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  )
}

function PaymentsDataTable({ data: initialData }) {
  const [tableData, setTableData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [sorting, setSorting] = React.useState([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

  const dataIds = React.useMemo(() => tableData?.map(({ id }) => id) || [], [tableData])
  const getInitials = useInitials()
  const getCapitalize = useCapitalize()
  const { formatCurrency } = useCurrencyFormatter()
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedPaymentId, setSelectedPaymentId] = React.useState(null)
  const table = useReactTable({
    data: tableData,
    columns,
    meta: {
      getInitials,
      getCapitalize,
      formatCurrency,
      onModalClick: (id) => {
        setSelectedPaymentId(id)
        setIsModalOpen(true)
      },
      isModalOpen,
      setIsModalOpen,
      selectedPaymentId,
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
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

  function handleDragEnd(event) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setTableData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  const handleExportCsv = async () => {
    try {
      const response = await fetch("/admin/payments/export/csv", {
        method: "GET",
        headers: {
          Accept: "text/csv",
        },
      });

      if (!response.ok) throw new Error("Failed to export CSV");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "payments.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

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
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleExportCsv}
            >
              <FileUp />
              <span className="hidden lg:inline">Export as CSV</span>
            </Button>
          </div>
        </div>
        <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto">
          <div className="overflow-hidden rounded-lg border">
            <DndContext
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis]}
              onDragEnd={handleDragEnd}
              sensors={sensors}
              id={sortableId}
            >
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
                <TableBody className="**:data-[slot=table-cell]:first:w-8">
                  {table.getRowModel().rows?.length ? (
                    <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                      {table.getRowModel().rows.map((row) => (
                        <DraggableRow key={row.id} row={row} />
                      ))}
                    </SortableContext>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No reservations found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </DndContext>
          </div>
          <div className="flex items-center justify-between px-4">
            <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
              selected.
            </div>
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

      <PaymentDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payment={tableData.find(p => p.id === selectedPaymentId)}
      />
    </>
  )
}

export default PaymentsDataTable
