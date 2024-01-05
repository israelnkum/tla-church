@extends('print-layout.member')
@section('print-content')
    <tr>
        <td style="text-align: center; border-bottom: solid #cbcbcb 1px; padding-bottom: 5px" colspan="2">
            @if($data->photo?->file_name)
                <img style="border-radius: 5px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;" alt="Photo"
                     src="data:image/png;base64,<?= base64_encode(file_get_contents(public_path('storage/members/'.$data->photo?->file_name))) ?>"
                     width="120">
                <br>
            @endif
            <h2 style="text-transform: uppercase">{{$data->name}}</h2>
            <p>Status: <span
                    style="text-transform: capitalize; background: #2f2f2f; color: white; border-radius: 4px; padding: 5px">{{$data->status}}</span>
            </p>
        </td>
    </tr>
    <tr>
        <td style="padding-top: 10px">
            <p class="title">CLASS</p>
            <p class="body-text">{{$data->memberClass->name}}</p>
        </td>
        <td style="padding-top: 10px">
            <p class="title">PHONE NUMBER</p>
            <p class="body-text">{{$data->phone_number}}, {{$data->alt_phone_number}}</p>
        </td>
    </tr>
    <tr>
        <td>
            <p class="title">HOME TOWN</p>
            <p class="body-text">{{$data->home_town}}</p>
        </td>
        <td>
            <p class="title">GHANA CARD NUMBER</p>
            <p class="body-text">{{$data->ghana_card_number}}</p>
        </td>
    </tr>
    <tr>
        <td>
            <p class="title">EMAIL</p>
            <p class="body-text">{{$data->email}}</p>
        </td>
        <td>
            <p class="title">ADDRESS</p>
            <p class="body-text">{{$data->address}}</p>
        </td>
    </tr>
@endsection
