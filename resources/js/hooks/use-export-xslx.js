import { useCallback } from 'react';
import { format } from 'date-fns';

// I'm using the exact same custom hook I created for CSV 
// This need to be reusable somehow but let's try make it work for now
export function useExportXlsx() {
  return useCallback(async (getUrl, label) => {
    const now = new Date();
    const formattedDate = format(now, 'yyyy-MM-dd_HH-mm-ss');

    try {
      const response = await fetch(getUrl, {
        method: "GET",
        headers: {
          Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      if (!response.ok) throw new Error("Failed to export XLSX");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${label}_${formattedDate}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  }, []);
}
