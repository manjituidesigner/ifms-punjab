const fs = require('fs');

// Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// 1. Vision section box shadow and rounded corners removal
html = html.replace(
    '<div class="steps-box rounded-3 p-4 p-md-5 mx-auto position-relative z-3 shadow-lg">',
    '<div class="steps-box p-4 p-md-5 mx-auto position-relative z-3">'
);

// 2. Play button size reduction
html = html.replace(/font-size: 4rem;/g, 'font-size: 2.5rem;');

fs.writeFileSync('index.html', html);

// Update style.css
let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Remove background from .steps-box
css = css.replace(
    '.steps-box {\n    background-color: #f3f6f9;\n}',
    '.steps-box {\n    background-color: transparent;\n}'
);
// Fallback if formatting differs
css = css.replace(/background-color:\s*#f3f6f9;/g, 'background-color: transparent;');

// 2. Remove .tutorials-section::after to remove the white border
css = css.replace(/\.tutorials-section::after\s*\{[^}]+\}/, '');

fs.writeFileSync('css/style.css', css);

console.log('done');
