export const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-primary/10 text-primary border-primary/20"
    case "pending":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    case "cancelled":
      return "bg-red-500/10 text-red-600 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
}