<?php

namespace App\Exports;

use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class MemberExport implements FromCollection, WithHeadings, WithMapping, ShouldAutoSize
{
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
        return [
            'First Name',
            'Middle Name',
            'Last Name',
            'Email',
            'Gender',
            'Home Town',
            'Ghana Card Number',
            'Address',
            'Phone Number',
            'Alt Phone Number',
            'Class Leader',
            'Member Class',
            'Status'
        ];
    }

    public function map($row): array
    {
        return [
            $row->first_name,
            $row->other_names,
            $row->last_name,
            $row->email,
            $row->gender,
            $row->home_town,
            $row->ghana_card_number,
            $row->address,
            $row->phone_number,
            $row->alt_phone_number,
            $row->class_leader,
            $row->memberClass->name,
            $row->status
        ];
    }
}
