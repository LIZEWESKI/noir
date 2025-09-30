<?php

namespace App\Exports;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

abstract class Export
{
    protected string $label = 'export_';
    protected array $headers = [];


    abstract protected function queryData(): iterable;
    abstract protected function mapRow($item): array;

    public function exportCsv(): StreamedResponse
    {
        $fileName = $this->label . now()->format('Y-m-d_H-i-s') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$fileName\"",
        ];

        $callback = function () {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, $this->headers);
            foreach ($this->queryData() as $item) {
                fputcsv($handle, $this->mapRow($item));
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function exportXlsx(): StreamedResponse
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Add headers
        $sheet->fromArray($this->headers, null, 'A1');

        $row = 2;
        foreach ($this->queryData() as $item) {
            $sheet->fromArray($this->mapRow($item), null, "A{$row}");
            $row++;
        }

        $writer = new Xlsx($spreadsheet);

        $fileName = $this->label . now()->format('Y-m-d_H-i-s') . '.xlsx';

        return new StreamedResponse(function () use ($writer) {
            $writer->save('php://output');
        }, 200, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => "attachment; filename=\"$fileName\"",
            'Cache-Control' => 'max-age=0',
        ]);
    }
}
