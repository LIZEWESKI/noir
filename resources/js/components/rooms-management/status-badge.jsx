import React from 'react'
import { Badge } from '@/components/ui/badge';

const StatusBadge = ({ status }) => {
  const statusVariants = {
    Available: "default",
    Booked: "secondary",
    Maintenance: "destructive",
  }
  return <Badge variant={statusVariants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
}
export default StatusBadge;