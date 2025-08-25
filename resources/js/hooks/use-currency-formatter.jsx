import { useCallback } from "react"

export function useCurrencyFormatter(){
  const formatCurrency = useCallback((value, currency, locale) => {
    const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
    return formattedValue
  },[])
  return {formatCurrency}
}

