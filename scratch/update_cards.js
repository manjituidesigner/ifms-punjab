const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Style contact-info icons to have a background box
const oldIconCSS = /\.flip-card-front \.contact-info i\s*\{\s*color:\s*#222;\s*\}/;
const newIconCSS = `.flip-card-front .contact-info i {
    color: #111827 !important;
    background-color: #f3f4f6;
    width: 38px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 1.1rem !important;
}`;

css = css.replace(oldIconCSS, newIconCSS);
if(!css.includes('background-color: #f3f4f6')) {
    console.log("Failed to replace icon CSS");
}

// 2. Style name-text to be dark with normal/medium weight
const oldNameCSS = /\.flip-card-front \.contact-info \.name-text\s*\{\s*color:\s*#666;\s*font-size:\s*0\.9rem;\s*\}/;
const newNameCSS = `.flip-card-front .contact-info .name-text {
    color: #111827;
    font-size: 0.95rem;
    font-weight: 500;
}`;

css = css.replace(oldNameCSS, newNameCSS);

// 3. Style number-text to be dark with bold weight
const oldNumberCSS = /\.flip-card-front \.contact-info \.number-text\s*\{\s*color:\s*#222;\s*font-size:\s*1rem;\s*\}/;
const newNumberCSS = `.flip-card-front .contact-info .number-text {
    color: #111827;
    font-size: 0.95rem;
    font-weight: 800;
}`;

css = css.replace(oldNumberCSS, newNumberCSS);

// 4. Disable the hover effect showing the back card to keep texts dark
css = css.replace(/\.flip-card-container:hover \.flip-card-back\s*\{\s*opacity:\s*1;\s*\}/, '.flip-card-container:hover .flip-card-back { /* opacity: 1; disabled to keep front styling */ }');

fs.writeFileSync('css/style.css', css);
console.log('done');
