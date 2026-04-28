const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Use regex to match all <a href="...pdf" download class="manual-item ...">
c = c.replace(/<a href="([^"]+\.pdf)" download class="/g, '<a href="$1" target="_blank" class="');

fs.writeFileSync('index.html', c);
