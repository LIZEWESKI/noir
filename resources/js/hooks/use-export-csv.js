import { useCallback } from 'react';
import { format } from 'date-fns';

export function useExportCsv() {
    return useCallback( async (getUrl,label) => {
        const now = new Date();
        const formattedDate = format(now, 'yyyy-MM-dd HH:mm:ss');
        
        try {
        const response = await fetch(getUrl, {
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
        link.setAttribute("download", `${label}_${formattedDate}.csv`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
        } catch (err) {
        console.error(err);
        }
    }, []);
}

