<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        return Inertia::render('Portfolio/Index', [
            'projects' => [
                [
                    'id' => 1,
                    'title' => 'Project 1',
                    'description' => 'Description of project 1',
                    'image' => '/images/project1.jpg',
                    'technologies' => ['Vue.js', 'Laravel', 'TypeScript']
                ],
                [
                    'id' => 2,
                    'title' => 'Project 2',
                    'description' => 'Description of project 2',
                    'image' => '/images/project2.jpg',
                    'technologies' => ['Inertia.js', 'Tailwind CSS', 'PWA']
                ],
                // Add more projects
            ]
        ]);
    }
}