<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'TLA Church') }}</title>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <style>
        body {
            font-family: 'Arial', sans-serif;
        }

        table {
            width: 100%;
            margin-bottom: 1rem;
            color: #000;
            vertical-align: top;
            border-color: green;
        }

        .title {
            font-size: 12px;
            font-weight: bold;
            line-height: 0;
        }

        .body-text {
            font-size: 16px;
        }
    </style>
</head>
<body>
<table style="width: 100%">
    <thead align="left">
    <tr>
        <td colspan="2" style="text-align: center; border-bottom: solid #cbcbcb 1px; padding-bottom: 5px">
            <img alt="Photo" src="data:image/png;base64,<?= base64_encode(file_get_contents(public_path('images/methodist.jpg'))) ?>" width="70">
            <p class="title">THE METHODIST CHURCH GHANA</p>
            <p class="title">ANAJI ESTATE CIRCUIT</p>
            <p class="title">EMMANUEL SOCIETY</p>
        </td>
    </tr>
    <tr align="left">
        @yield('headers')
    </tr>
    </thead>
    <tbody>
    @yield('print-content')
    </tbody>
</table>
</body>
</html>
