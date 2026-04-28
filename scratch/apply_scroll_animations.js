const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Featured Services Replacements
html = html.replace(/class="flip-card-container h-100 animate__animated animate__fadeInUp"/g, 'class="flip-card-container h-100 animate-on-scroll" data-animation="animate__fadeInUp"');
html = html.replace(/class="flip-card-container h-100 animate__animated animate__fadeInUp animate__delay-1s"/g, 'class="flip-card-container h-100 animate-on-scroll" data-animation="animate__fadeInUp animate__delay-1s"');
html = html.replace(/class="flip-card-container h-100 animate__animated animate__fadeInUp animate__delay-2s"/g, 'class="flip-card-container h-100 animate-on-scroll" data-animation="animate__fadeInUp animate__delay-2s"');
html = html.replace(/class="flip-card-container h-100 animate__animated animate__fadeInUp animate__delay-3s"/g, 'class="flip-card-container h-100 animate-on-scroll" data-animation="animate__fadeInUp animate__delay-3s"');

// 2. IFMS Youtube / Tutorials Section
html = html.replace(/class="col-lg-8 mb-4 mb-lg-0 text-center text-lg-start"/, 'class="col-lg-8 mb-4 mb-lg-0 text-center text-lg-start animate-on-scroll" data-animation="animate__fadeInLeft"');
html = html.replace(/class="col-lg-4 text-center text-lg-end mt-4 mt-lg-0"/, 'class="col-lg-4 text-center text-lg-end mt-4 mt-lg-0 animate-on-scroll" data-animation="animate__fadeInRight"');
html = html.replace(/class="swiper tutorialsSwiper pb-2"/, 'class="swiper tutorialsSwiper pb-2 animate-on-scroll" data-animation="animate__zoomIn"');

// 3. User Manuals Section
// Note: User Manuals left image is the first one, Instructions is the second one.
html = html.replace(/<div class="col-lg-5 mb-5 mb-lg-0 d-flex">/g, '<div class="col-lg-5 mb-5 mb-lg-0 d-flex animate-on-scroll" data-animation="animate__fadeInLeft">');
html = html.replace(/<div class="col-lg-7 ps-lg-5">/g, '<div class="col-lg-7 ps-lg-5 animate-on-scroll" data-animation="animate__fadeInRight">');

// 4. Footer Section
html = html.replace(/class="col-lg-8 text-center mt-4"/, 'class="col-lg-8 text-center mt-4 animate-on-scroll" data-animation="animate__fadeInDown"');

html = html.replace(/class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center justify-content-lg-start"/, 'class="col-lg-3 col-md-6 d-flex align-items-center justify-content-center justify-content-lg-start animate-on-scroll" data-animation="animate__fadeInUp"');

// We have three 'col-lg-3 col-md-6 px-lg-4' in footer
let footerColIndex = 1;
html = html.replace(/class="col-lg-3 col-md-6 px-lg-4"/g, (match) => {
    let delay = `animate__delay-${footerColIndex}s`;
    footerColIndex++;
    return `class="col-lg-3 col-md-6 px-lg-4 animate-on-scroll" data-animation="animate__fadeInUp ${delay}"`;
});

fs.writeFileSync('index.html', html);
console.log('done');
