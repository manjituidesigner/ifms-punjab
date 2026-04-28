const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
c = c.split('href="./docs/').join('href="https://ifms.punjab.gov.in/docs/');
c = c.split('bi-caret-right-fill').join('bi-download');
fs.writeFileSync('index.html', c);
