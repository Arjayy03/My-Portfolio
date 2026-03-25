<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @php
            $manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true);
            $appJs = $manifest['resources/js/app.js']['file'] ?? '';
            $pageKey = "resources/js/Pages/{$page['component']}.vue";
            $pageJs = $manifest[$pageKey]['file'] ?? '';
            $appCss = $manifest['resources/js/app.js']['css'] ?? [];
        @endphp
        @foreach($appCss as $css)
            <link rel="stylesheet" href="/build/{{ $css }}">
        @endforeach
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
        <script type="module" src="/build/{{ $appJs }}"></script>
        @if($pageJs)
        <script type="module" src="/build/{{ $pageJs }}"></script>
        @endif
    </body>
</html>
