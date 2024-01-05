<?php

namespace App\Exports;

use App\Traits\Export;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithPreCalculateFormulas;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Events\BeforeExport;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class AccountRecordExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize, WithPreCalculateFormulas, WithEvents
{
    use Export;

    private AnonymousResourceCollection $data;

    public function __construct($collection)
    {
        $this->data = $collection;
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function collection(): AnonymousResourceCollection
    {
        return $this->data;
    }

    public function headings(): array
    {
        $this->addHeader(['The Methodist Church Ghana']);
        $this->addHeader(['Anaji Estate Circuit']);
        $this->addHeader(['Emmanuel Society']);

        $this->addHeader(['', '', '', '']);

        $this->addHeader([
            'Type',
            'Amount',
            'Comment',
            'Added By'
        ]);


        return $this->headers;
    }

    public function map($row): array
    {
        return [
            $row->type->value,
            $row->amount,
            $row->comments,
            $row->user->userable->name === " " ? $row->user->userable->username : $row->user->userable->name,
        ];
    }

    public function registerEvents(): array
    {
        return [
            BeforeExport::class => function (BeforeExport $event) {
                $event->writer->getProperties()->setCreator('TechLineAfrica');
            },
            AfterSheet::class => function (AfterSheet $event) {
                $highestRow = ($event->sheet->getHighestRow());

                $columns = ['A', 'B', 'C', 'D', 'E', 'F'];

                $event->sheet->getStyle('A1')->getFont()->setSize(14);
                $this->mergeCells($event, 'A1', 'F1');
                $this->mergeCells($event, 'A2', 'F2');
                $this->mergeCells($event, 'A3', 'F3');

                for ($i = 1; $i <= 5; $i++) {
                    $event->sheet->getStyle('A' . $i . ':F' . $i)->getFont()->setBold(true);
                    $event->sheet->getStyle('A' . $i . ':F' . $i)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
                }

                foreach ($columns as $column) {
                    $event->sheet->getStyle('A1:' . $column . $highestRow)->getFont()->setName('TimesNewRoman');
                }

                $event->sheet->getStyle('A1')->getFont()->setUnderline(true);

                for ($i = 1; $i < 4; $i++) {
                    $event->sheet->getStyle('A1:F' . $i)->applyFromArray([
                        'borders' => [
                            'bottom' => [
                                'borderStyle' => Border::BORDER_THIN,
                                'color' => ['rgb' => 'FFFFFF']
                            ]
                        ]
                    ]);
                }

                $highestRow += 2;

//                $event->sheet->setCellValue('A' . $highestRow, 'Superficie Totale');
//                $event->sheet->mergeCells('A' . $highestRow . ':E' . $highestRow)
//                    ->getStyle('A' . $highestRow . ':E' . $highestRow)
//                    ->getAlignment()
//                    ->setHorizontal(Alignment::HORIZONTAL_CENTER);
            }
        ];
    }
}
