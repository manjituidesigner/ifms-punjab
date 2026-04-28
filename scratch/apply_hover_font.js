const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// Set font weights to 700 for card text
css = css.replace(/(\.flip-card-front h4\s*\{[^}]*font-weight:\s*)\d+([^}]*\})/g, '$1700$2');
css = css.replace(/(\.flip-card-front \.contact-info \.name-text\s*\{[^}]*font-weight:\s*)\d+([^}]*\})/g, '$1700$2');
css = css.replace(/(\.flip-card-front \.contact-info \.number-text\s*\{[^}]*font-weight:\s*)\d+([^}]*\})/g, '$1700$2');

// Append the hover fixes to the very end of the file
css += `
/* --- HOVER FIXES --- */
.flip-card-back { 
    display: none !important; 
}

.flip-card-container:hover .flip-card-front.service-card {
    border: 2px solid #4d95ffe0 !important;
}

.flip-card-container:hover .flip-card-front h4,
.flip-card-container:hover .flip-card-front .icon-box i {
    color: #4d95ffe0 !important;
    transition: color 0.3s ease;
}

.flip-card-front.service-card {
    transition: all 0.3s ease;
}

.flip-card-front h4, .flip-card-front .icon-box i {
    transition: color 0.3s ease;
}
/* -------------------- */
`;

fs.writeFileSync('css/style.css', css);
console.log('done');
