import { useCallback } from "react"

export function useStringFormatter() {
    // it replaces dash to space
  const formatDashedString = useCallback((str) => {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
  }, []) 

  return { formatDashedString }
}
