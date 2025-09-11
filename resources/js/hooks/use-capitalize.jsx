import { useCallback } from 'react';

export function useCapitalize() {
    return useCallback((str) => {
        if (str.length === 0) {
        return "";
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
    }, []);
}
