const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// We append the new overrides at the bottom of the file
const newCardCSS = `
/* --- NEW HALF-GRAY CARD STYLE --- */
.flip-card-front.service-card {
    padding: 0 !important;
    border: 2px solid #3b82f6 !important; /* Light blue outline */
    border-radius: 12px !important;
    overflow: hidden;
    transition: all 0.3s ease;
}

/* Top Section: icon-box and h4 */
.flip-card-front .icon-box {
    background-color: #f0f4f8;
    padding-top: 2rem;
    margin-bottom: 0 !important;
    transition: all 0.3s ease;
}

.flip-card-front h4 {
    background-color: #f0f4f8;
    padding-bottom: 1.5rem !important;
    margin-bottom: 0 !important;
    border-bottom: 1px solid #e2e8f0 !important; /* Subtle separator line */
    transition: all 0.3s ease;
}

/* Bottom Section: contact-info */
.flip-card-front .contact-info {
    background-color: #ffffff;
    padding: 0 1.5rem;
    margin-bottom: 0 !important; /* Remove bootstrap margins */
}

/* Add padding to first and last contact-info items to replicate the original card padding */
.flip-card-front .contact-info:nth-of-type(1) {
    padding-top: 1.5rem;
    padding-bottom: 0.75rem;
}
.flip-card-front .contact-info:nth-of-type(2) {
    padding-top: 0.75rem;
    padding-bottom: 1.5rem;
}

/* Hover States */
.flip-card-container:hover .flip-card-front.service-card {
    border-color: var(--regal-blue) !important;
}

.flip-card-container:hover .flip-card-front .icon-box,
.flip-card-container:hover .flip-card-front h4 {
    background-color: var(--regal-blue);
    border-bottom-color: var(--regal-blue) !important;
}

.flip-card-container:hover .flip-card-front .icon-box i,
.flip-card-container:hover .flip-card-front h4 {
    color: #ffffff !important;
}

/* Keep the contact icons (phone, info) dark grey background even on hover */
.flip-card-front .contact-info i {
    background-color: #f0f4f8 !important;
}
/* -------------------------------- */
`;

css += newCardCSS;
fs.writeFileSync('css/style.css', css);
console.log('done');
