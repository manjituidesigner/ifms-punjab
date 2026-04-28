const fs = require('fs');

const htmlPath = "e:/IFMS PUNJAB/index.html";
const cssPath = "e:/IFMS PUNJAB/css/style.css";

let htmlContent = fs.readFileSync(htmlPath, 'utf8');
let cssContent = fs.readFileSync(cssPath, 'utf8');

// The pattern to match the a tag and the inner service card
const pattern = /<a href="([^"]+)" class="text-decoration-none">\s*<div\s+class="service-card\s+([^"]+)">\s*([\s\S]+?)\s*<\/div>\s*<\/a>/g;

htmlContent = htmlContent.replace(pattern, (match, url, classes, content) => {
    // Extract animate__ classes to put on the outer container
    const classList = classes.split(/\s+/);
    const animateClasses = classList.filter(c => c.startsWith('animate__'));
    const containerClasses = ['flip-card-container', 'h-100', ...animateClasses].join(' ');
    
    // We don't need animate classes on the inner cards anymore.
    // Also remove h-100 from here if we want, but h-100 is fine.
    
    return `<div class="${containerClasses}">
                        <a href="${url}" class="text-decoration-none h-100 d-block">
                            <div class="flip-card-inner">
                                <div class="flip-card-front service-card text-center p-4 rounded-3 h-100">
                                    ${content.trim()}
                                </div>
                                <div class="flip-card-back service-card text-center p-4 rounded-3 h-100">
                                    ${content.trim()}
                                </div>
                            </div>
                        </a>
                    </div>`;
});

fs.writeFileSync(htmlPath, htmlContent);

// Now update CSS
const cssUpdates = `
.flip-card-container {
    perspective: 1000px;
    height: 100%;
}
.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
    transform-style: preserve-3d;
    max-width: 320px;
    margin: 0 auto;
}
.flip-card-container:hover .flip-card-inner {
    transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}
.flip-card-front {
    position: relative; /* Front dictates the height */
    z-index: 2;
}
.flip-card-back {
    transform: rotateY(180deg);
}

.service-card {
    border: 1px solid #e5e5e5;
    border-radius: 8px !important;
    padding: 2.5rem 1.5rem !important;
    background: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    animation: floatCard 4s ease-in-out infinite;
}

/* Ensure animation only applies to the container or inner so it doesn't duplicate. 
Wait, if it's on service-card, it will float both faces independently?
Let's remove animation from service-card and put it on flip-card-inner */
.flip-card-inner {
    animation: floatCard 4s ease-in-out infinite;
}
.service-card {
    animation: none;
}

/* Front Face Styles */
.flip-card-front .icon-box i {
    font-size: 3.5rem;
    line-height: 1;
    color: var(--regal-blue);
    display: block;
    margin-bottom: 15px;
}

.flip-card-front h4 {
    color: #222;
    font-size: 1.25rem;
    font-weight: 800 !important;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid #e5e5e5;
}

.flip-card-front .contact-info i {
    color: #222;
}

.flip-card-front .contact-info .name-text {
    color: #666;
    font-size: 0.9rem;
}

.flip-card-front .contact-info .number-text {
    color: #222;
    font-size: 1rem;
}

/* Back Face Styles (Hover State effectively) */
.flip-card-back {
    background: var(--regal-blue);
    border-color: var(--regal-blue);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.flip-card-back .icon-box i {
    font-size: 3.5rem;
    line-height: 1;
    color: #ffffff;
    display: block;
    margin-bottom: 15px;
}

.flip-card-back h4 {
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 800 !important;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    position: relative;
    border-bottom: none;
}

.flip-card-back h4::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
}

.flip-card-back .contact-info i,
.flip-card-back .contact-info .name-text,
.flip-card-back .contact-info .number-text {
    color: #ffffff !important;
}
`;

const cssReplacePattern = /\.service-card\s*\{[\s\S]*?\.service-card:hover\s+\.contact-info\s+\.number-text\s*\{\s*color:\s*#ffffff\s*!important;\s*\}/;
if (cssContent.match(cssReplacePattern)) {
    cssContent = cssContent.replace(cssReplacePattern, cssUpdates.trim());
} else {
    console.log("CSS pattern not found, trying a fallback");
    // fallback just replace everything from .service-card { to the end if we have to, but better to be precise.
    const fallbackPattern = /\.service-card\s*\{[\s\S]+/;
    if (cssContent.match(fallbackPattern)) {
        cssContent = cssContent.replace(fallbackPattern, cssUpdates.trim());
    }
}

fs.writeFileSync(cssPath, cssContent);
console.log("Flip card changes applied");
