const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const additionalDarkModeCSS = `
/* --- USER REQUESTED DARK MODE REFINEMENTS --- */
[data-bs-theme="dark"] #featured-services .container-fluid {
    z-index: 20;
    background: #070708 !important;
}

[data-bs-theme="dark"] .flip-card-front.service-card {
    border: none !important;
    background-color: #121212 !important; /* Slightly darker to contrast with #070708 */
}

[data-bs-theme="dark"] .flip-card-container:hover .flip-card-front.service-card {
    border: none !important;
}

[data-bs-theme="dark"] .flip-card-front h4 {
    border-bottom: 1px solid #2c323f !important;
    color: #e0e0e0 !important; /* Ignore the user's color: #222 which is too dark */
}

[data-bs-theme="dark"] .footer-section {
    background-color: #070708 !important;
}

/* Make sure the wave above the footer transitions smoothly into the new black footer */
[data-bs-theme="dark"] svg path[fill="#161c2d"] {
    fill: #070708 !important;
}
/* ------------------------------------------- */
`;

css += '\n' + additionalDarkModeCSS;
fs.writeFileSync('css/style.css', css);
console.log('done');
