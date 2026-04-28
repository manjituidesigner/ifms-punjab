const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const topWave = `
    <!-- Tutorials Top Wave Separator -->
    <div style="position: relative; width: 100%; overflow: hidden; line-height: 0; transform: translateY(1px); z-index: 1; background: #ffffff;">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style="display: block; width: 100%; height: 60px;">
            <path d="M0,30 C320,90 420,-30 740,30 C1060,90 1120,-30 1440,30 L1440,80 L0,80 Z" fill="#a0a0a0" opacity="0.5"></path>
            <path d="M0,35 C320,95 420,-25 740,35 C1060,95 1120,-25 1440,35 L1440,80 L0,80 Z" fill="#161c2d"></path>
        </svg>
    </div>
`;

const bottomWave = `
    <!-- Tutorials Bottom Wave Separator -->
    <div style="position: relative; width: 100%; overflow: hidden; line-height: 0; transform: translateY(1px); z-index: 1; background: #161c2d;">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style="display: block; width: 100%; height: 60px;">
            <path d="M0,30 C320,90 420,-30 740,30 C1060,90 1120,-30 1440,30 L1440,80 L0,80 Z" fill="#e0e0e0" opacity="0.5"></path>
            <path d="M0,35 C320,95 420,-25 740,35 C1060,95 1120,-25 1440,35 L1440,80 L0,80 Z" fill="#f8f9fa"></path>
        </svg>
    </div>
`;

// Insert top wave before <!-- ======= Tutorials Slider Section ======= -->
html = html.replace('    <!-- ======= Tutorials Slider Section ======= -->', topWave + '\n    <!-- ======= Tutorials Slider Section ======= -->');

// Insert bottom wave before <!-- ======= User Manuals Section ======= -->
html = html.replace('    <!-- ======= User Manuals Section ======= -->', bottomWave + '\n    <!-- ======= User Manuals Section ======= -->');

fs.writeFileSync('index.html', html);
console.log('done');
