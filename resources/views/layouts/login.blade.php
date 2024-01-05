<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'E-Voting App') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
        button {
            background: linear-gradient(to right, rgba(44, 143, 255, 0.52), rgba(0, 74, 148, 0.5));
            border: none !important;
        }

        input {
            background: none !important;
            border: solid 1px rgba(0, 74, 148, 0.5) !important;
            padding: 10px;
            height: 40px;
            border-radius: 5px;
        }

        input:hover,
        input:active,
        input:focus {
            outline: 0px !important;
            background: none !important;
            border: solid 1px rgba(0, 74, 148, 0.5) !important;
        }

        ::placeholder {
            font-family: Montserrat, sans-serif !important;
        }
    </style>

</head>
<body style="background: #ffffff">
<main class="">
    @yield('content')
</main>
</body>
</html>
