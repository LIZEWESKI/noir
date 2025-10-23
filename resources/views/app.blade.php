<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <meta name="description" content="Your Stay, Your Way. Noir's Personalized Hospitality.">
        <meta name="author" content="Lizeweski">

        <meta property="og:title" content="Noir">
        <meta property="og:description" content="Your Stay, Your Way. Noir's Personalized Hospitality.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://noir.lizeweski.me/">
        <meta property="og:image" content="{{ asset('noir-thumbnail.png') }}">

        <!-- Fonts & Icon -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="{{ asset('noir-ico.ico') }}">
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead
    </head>
    <body class="font-geist antialiased">
        @inertia
        <script>
            window.PAYPAL_CLIENT_ID = "{{ env('PAYPAL_CLIENT_ID') }}";
        </script>

    </body>
</html>
