const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// Find the index of the start of the new styles
const index = css.indexOf('/* --- NEW HALF-GRAY CARD STYLE --- */');

if (index !== -1) {
    // Remove everything from that index onwards
    css = css.substring(0, index);
    fs.writeFileSync('css/style.css', css);
    console.log('Reverted successfully');
} else {
    console.log('Block not found');
}
