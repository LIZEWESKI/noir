import { useCallback } from "react"

export function useCurrencyFormatter(){
  const formatCurrency = useCallback((value, currency = "USD", locale = "en-US") => {
    const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
    return formattedValue
  },[])
  return {formatCurrency}
}

