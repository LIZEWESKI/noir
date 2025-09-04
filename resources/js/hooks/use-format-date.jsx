import { useCallback } from 'react';

export function useFormatDate() {
    return useCallback((date) => {
        if (!date) return ""

        // Use local timezone formatting instead of UTC
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }, []);
}
