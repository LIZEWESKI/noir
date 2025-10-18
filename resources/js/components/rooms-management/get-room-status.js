export const getStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "bg-primary/10 text-primary border-primary/20"
    case "Booked":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    case "Maintenance":
      return "bg-destructive/10 text-destructive border-destructive/20"
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
}