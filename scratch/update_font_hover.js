const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Change card font weights to 700
css = css.replace(/(\.flip-card-front h4\s*\{[^}]*font-weight:\s*)\d+([^}]*\})/g, '$1700$2');
css = css.replace(/(\.flip-card-front \.contact-info \.name-text\s*\{[^}]*font-weight:\s*)\d+([^}]*\})/g, '$1700$2');
css = css.replace(/(\.flip-card-front \.contact-info \.number-text\s*\{[^}]*font-weight:\s*)\d+([^}]*\})/g, '$1700$2');

// 2. Uncomment and fix the hover block added by user
const oldHoverBlock = `/* .service-card:hover {
    border: 2px solid #4d95ffe0 !important;
} */`;

const newHoverBlock = `.flip-card-container:hover .service-card {
    border: 2px solid #4d95ffe0 !important;
}
.flip-card-container:hover .flip-card-front h4,
.flip-card-container:hover .flip-card-front .icon-box i {
    color: #4d95ffe0 !important;
    transition: color 0.3s ease;
}`;

if (css.includes(oldHoverBlock)) {
    css = css.replace(oldHoverBlock, newHoverBlock);
} else {
    css += '\n' + newHoverBlock + '\n';
}

// Add transition to service card for smooth border change
css = css.replace(/(\.service-card\s*\{[^}]*)\}/, '$1    transition: all 0.3s ease;\n}');

// Add transition to text and icon
css = css.replace(/(\.flip-card-front h4\s*\{[^}]*)\}/, '$1    transition: color 0.3s ease;\n}');
css = css.replace(/(\.flip-card-front \.icon-box i\s*\{[^}]*)\}/, '$1    transition: color 0.3s ease;\n}');


fs.writeFileSync('css/style.css', css);
console.log('done');
