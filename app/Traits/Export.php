<?php

namespace App\Traits;

use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Exception;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

trait Export
{
    private array $headers;

    public function addHeader(array $columns): static
    {
        $this->headers[] = $columns;

        return $this;
    }

    /**
     * @throws Exception
     */
    private function mergeCells(AfterSheet $event, $start, $end): void
    {
        $event->sheet->mergeCells($start.':'.$end)->getStyle($start)
            ->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
    }
}
