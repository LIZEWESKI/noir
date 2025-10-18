import React from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from 'lucide-react'
import { roomStatuses, roomTypes } from './rooms-data';
const FilterSection = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    }) => {
  return (
    <>
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search rooms by name or number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
            />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {roomStatuses.map((status) => (
            <SelectItem key={status} value={status}>
                {status}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {roomTypes.map((type) => (
            <SelectItem key={type} value={type}>
                {type}
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    </>
  )
}

export default FilterSection