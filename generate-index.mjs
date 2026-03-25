import { readFileSync, writeFileSync } from 'fs'

const manifest = JSON.parse(readFileSync('./public/build/manifest.json', 'utf-8'))

const appJs = manifest['resources/js/app.js']['file']
const appCss = manifest['resources/js/app.js']['css'] ?? []
const welcomeCss = manifest['resources/js/Pages/Welcome.vue']['css'] ?? []

const allCss = [...appCss, ...welcomeCss]
  .map(css => `    <link rel="stylesheet" href="/build/${css}">`)
  .join('\n')

const html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Arjay Dadivas</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico">
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
${allCss}
    </head>
    <body class="font-sans antialiased">
        <div id="app" data-page='{"component":"Welcome","props":{},"url":"/","version":null}'></div>
        <script type="module" src="/build/${appJs}"></script>
    </body>
</html>`

writeFileSync('./public/index.html', html)
console.log('index.html generated successfully')
