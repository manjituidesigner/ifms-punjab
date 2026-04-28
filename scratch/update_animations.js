const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Featured Services - Change to a different, faster animation without delays
// They are currently using `data-animation="animate__fadeInUp"` or `data-animation="animate__fadeInUp animate__delay-1s"` etc.
html = html.replace(/data-animation="animate__fadeInUp"/g, 'data-animation="animate__zoomIn"');
html = html.replace(/data-animation="animate__fadeInUp animate__delay-1s"/g, 'data-animation="animate__zoomIn"');
html = html.replace(/data-animation="animate__fadeInUp animate__delay-2s"/g, 'data-animation="animate__zoomIn"');
html = html.replace(/data-animation="animate__fadeInUp animate__delay-3s"/g, 'data-animation="animate__zoomIn"');

// 2. Footer Section - Remove animations from the content below the email subscription box.
// Replace the classes and data-animation attributes for the footer columns.
// Column 1
html = html.replace(
    'class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center justify-content-lg-start animate-on-scroll" data-animation="animate__zoomIn"',
    'class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center justify-content-lg-start"'
);

// We need to also catch if they had fadeInUp (just in case)
html = html.replace(
    'class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center justify-content-lg-start animate-on-scroll" data-animation="animate__fadeInUp"',
    'class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center justify-content-lg-start"'
);

// Column 2, 3, 4
// They are formatted like: class="col-lg-3 col-md-6 px-lg-4 animate-on-scroll" data-animation="..."
html = html.replace(/class="col-lg-3 col-md-6 px-lg-4 animate-on-scroll" data-animation="[^"]+"/g, 'class="col-lg-3 col-md-6 px-lg-4"');

fs.writeFileSync('index.html', html);
console.log('done');
