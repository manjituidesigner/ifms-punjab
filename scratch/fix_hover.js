const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

css += `
.flip-card-back { display: none !important; }
.flip-card-container:hover .flip-card-front.service-card {
    border: 2px solid #4d95ffe0 !important;
}
`;

fs.writeFileSync('css/style.css', css);
console.log('done');
