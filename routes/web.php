<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/ping', fn () => 'Laravel is alive');

Route::get('/diag', function () {
    return response()->json([
        'app_env' => config('app.env'),
        'app_debug' => config('app.debug'),
        'has_app_key' => !empty(config('app.key')),
        'app_url' => config('app.url'),
    ]);
});

Route::get('/', function () {
    return Inertia::render('Welcome');
});
