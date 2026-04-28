const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Update Button
html = html.replace(
    '<button class="btn btn-link text-white p-0 border-0 fs-5 theme-toggle ms-2"\n                    title="Toggle Dark/Light Mode">',
    '<button id="themeToggleBtn" class="btn btn-link text-white p-0 border-0 fs-5 theme-toggle ms-2"\n                    title="Toggle Dark/Light Mode">'
);
html = html.replace(
    '<i class="bi bi-moon-stars-fill text-shadow"></i>',
    '<i id="themeToggleIcon" class="bi bi-moon-stars-fill text-shadow"></i>'
);

// Append Script before closing body
const script = `
    <!-- Dark Mode Logic -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const themeToggleBtn = document.getElementById('themeToggleBtn');
            const themeToggleIcon = document.getElementById('themeToggleIcon');
            const htmlElement = document.documentElement;
            
            // Check for saved user preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                htmlElement.setAttribute('data-bs-theme', savedTheme);
                if (savedTheme === 'dark') {
                    themeToggleIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
                }
            }
            
            themeToggleBtn.addEventListener('click', () => {
                const currentTheme = htmlElement.getAttribute('data-bs-theme');
                let newTheme = 'light';
                
                if (currentTheme === 'dark') {
                    newTheme = 'light';
                    themeToggleIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
                } else {
                    newTheme = 'dark';
                    themeToggleIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
                }
                
                htmlElement.setAttribute('data-bs-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        });
    </script>
`;

if (!html.includes('<!-- Dark Mode Logic -->')) {
    html = html.replace('</body>', script + '\n</body>');
}

// Update SVG paths with classes to easily target them in CSS for dark mode
// Top Tutorials Wave: Transitions from about (#ffffff) to tutorials (#161c2d)
// Path 1 is grey accent (#a0a0a0), Path 2 is dark blue (#161c2d)
// The container has background #ffffff.
html = html.replace(
    '<div style="position: relative; width: 100%; overflow: hidden; line-height: 0; transform: translateY(1px); z-index: 1; background: #ffffff;">',
    '<div class="tutorials-top-wave-container" style="position: relative; width: 100%; overflow: hidden; line-height: 0; transform: translateY(1px); z-index: 1; background: #ffffff;">'
);

// Bottom Tutorials Wave: Transitions from tutorials (#161c2d) to manuals (#f8f9fa)
// Path 2 is #f8f9fa
html = html.replace(
    '<path d="M0,35 C320,95 420,-25 740,35 C1060,95 1120,-25 1440,35 L1440,80 L0,80 Z" fill="#f8f9fa"></path>',
    '<path class="wave-manuals" d="M0,35 C320,95 420,-25 740,35 C1060,95 1120,-25 1440,35 L1440,80 L0,80 Z" fill="#f8f9fa"></path>'
);

fs.writeFileSync('index.html', html);

// 2. Update style.css
let css = fs.readFileSync('css/style.css', 'utf8');

const darkModeCSS = `
/* --- DARK MODE THEME OVERRIDES --- */
[data-bs-theme="dark"] body {
    background-color: #121212 !important;
    color: #e0e0e0 !important;
}

[data-bs-theme="dark"] .about-section,
[data-bs-theme="dark"] .instructions-section {
    background-color: #121212 !important;
}

[data-bs-theme="dark"] .user-manuals-section {
    background-color: #1a1a1a !important;
}

/* Cards */
[data-bs-theme="dark"] .flip-card-front.service-card {
    background-color: #1e1e1e !important;
    border-color: #333 !important;
}
[data-bs-theme="dark"] .flip-card-front h4,
[data-bs-theme="dark"] .flip-card-front .contact-info .name-text,
[data-bs-theme="dark"] .flip-card-front .contact-info .number-text {
    color: #e0e0e0 !important;
}
[data-bs-theme="dark"] .flip-card-front .icon-box i {
    color: #64b5f6 !important;
}
[data-bs-theme="dark"] .flip-card-front .contact-info i {
    background-color: #333 !important;
    color: #e0e0e0 !important;
}
[data-bs-theme="dark"] .flip-card-front .contact-info {
    background-color: #1e1e1e !important;
}

/* Hover fixes for cards in dark mode */
[data-bs-theme="dark"] .flip-card-container:hover .flip-card-front.service-card {
    border-color: #64b5f6 !important;
}

/* Headings */
[data-bs-theme="dark"] .about-heading,
[data-bs-theme="dark"] h1, [data-bs-theme="dark"] h2, [data-bs-theme="dark"] h3, 
[data-bs-theme="dark"] h4, [data-bs-theme="dark"] h5, [data-bs-theme="dark"] h6 {
    color: #ffffff !important;
}

[data-bs-theme="dark"] .text-black,
[data-bs-theme="dark"] .text-dark,
[data-bs-theme="dark"] .text-muted {
    color: #b0b0b0 !important;
}

/* About Us Section specifics */
[data-bs-theme="dark"] .steps-box {
    background-color: transparent !important;
}
[data-bs-theme="dark"] .step-icon-wrapper {
    background-color: #1e1e1e !important;
}
[data-bs-theme="dark"] .step-connector-line {
    border-top-color: #444 !important;
}

/* List Groups (User Manuals / Instructions) */
[data-bs-theme="dark"] .list-group-item {
    background-color: #1e1e1e !important;
    color: #e0e0e0 !important;
    border-color: #333 !important;
}
[data-bs-theme="dark"] .list-group-item:hover {
    background-color: #2a2a2a !important;
}
[data-bs-theme="dark"] .list-group-item strong {
    color: #ffffff !important;
}

/* Wave Separators Fixes */
[data-bs-theme="dark"] .tutorials-top-wave-container {
    background-color: #121212 !important;
}
[data-bs-theme="dark"] .wave-manuals {
    fill: #1a1a1a !important;
}

/* Footer Bottom Strip Text */
[data-bs-theme="dark"] .container-fluid[style*="background-color: #ffc107"] p.text-black {
    color: #000 !important; /* Keep yellow strip text dark */
}
[data-bs-theme="dark"] .container-fluid[style*="background-color: #ffc107"] strong.text-black {
    color: #000 !important; /* Keep yellow strip text dark */
}

/* Modal Fixes */
[data-bs-theme="dark"] .modal-content {
    background-color: #1e1e1e !important;
}
/* -------------------------------- */
`;

if (!css.includes('/* --- DARK MODE THEME OVERRIDES --- */')) {
    css += '\n' + darkModeCSS;
}

fs.writeFileSync('css/style.css', css);
console.log('done');
