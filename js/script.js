// Custom JS to re-trigger animations on slide change
const myCarousel = document.getElementById('heroCarousel');

if (myCarousel) {
    myCarousel.addEventListener('slide.bs.carousel', function (e) {
        // Find all animated elements in the next slide
        const animatedElements = e.relatedTarget.querySelectorAll('.animate__animated');

        // Remove and re-add the classes to restart animation
        animatedElements.forEach(el => {
            // Get the specific animation class (e.g., animate__fadeInUp)
            const classes = Array.from(el.classList);
            const animClass = classes.find(c => c.startsWith('animate__') && c !== 'animate__animated' && !c.startsWith('animate__delay'));

            if (animClass) {
                el.classList.remove(animClass);
                // Force reflow
                void el.offsetWidth;
                el.classList.add(animClass);
            }
        });
    });
}

// Header Scroll Script
document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    if (!header) return;

    // Initial check in case page is loaded not at top
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    }

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
});

// Swiper JS & Video Modal
document.addEventListener('DOMContentLoaded', function () {
    if (typeof Swiper !== 'undefined') {
        var swiper = new Swiper(".tutorialsSwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            grabCursor: true,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".swiper-btn-next",
                prevEl: ".swiper-btn-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
        });
    }

    // Video Modal Logic
    const videoModal = document.getElementById('videoModal');
    const youtubeIframe = document.getElementById('youtubeIframe');
    const directYoutubeBtn = document.getElementById('modalDirectYoutubeBtn');
    const directYoutubeBtnMobile = document.getElementById('modalDirectYoutubeBtnMobile');

    if (videoModal && youtubeIframe && directYoutubeBtn && directYoutubeBtnMobile) {
        videoModal.addEventListener('show.bs.modal', function (event) {
            // Button that triggered the modal
            const button = event.relatedTarget;
            // Extract info from data-bs-* attributes
            const videoId = button.getAttribute('data-video-id');

            // Update the modal's content.
            const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&allowfullscreen=1`;
            const directUrl = `https://www.youtube.com/watch?v=${videoId}`;

            youtubeIframe.src = videoUrl;
            directYoutubeBtn.href = directUrl;
            directYoutubeBtnMobile.href = directUrl;
        });

        videoModal.addEventListener('hidden.bs.modal', function () {
            // Clear the src to stop the video from playing in the background
            youtubeIframe.src = '';
        });
    }
});

// Font Resize Logic
let currentZoom = 100;
window.changeFontSize = function(step) {
    currentZoom += (step * 10);
    if (currentZoom < 80) currentZoom = 80;
    if (currentZoom > 120) currentZoom = 120;
    document.body.style.zoom = currentZoom + "%";
};
window.resetFontSize = function() {
    currentZoom = 100;
    document.body.style.zoom = "100%";
};

// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animations = el.getAttribute('data-animation');
                if (animations) {
                    const animationClasses = animations.split(' ');
                    el.classList.add('animate__animated', ...animationClasses);
                }
                // Optional: remove observer if we only want it to animate once
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });
});

// Dark Mode Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleIcon = document.getElementById('themeToggleIcon');
    const htmlElement = document.documentElement;
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-bs-theme', savedTheme);
        if (savedTheme === 'dark' && themeToggleIcon) {
            themeToggleIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
        }
    }
    
    if (themeToggleBtn && themeToggleIcon) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            let newTheme = 'light';
            
            if (currentTheme === 'dark') {
                newTheme = 'light';
                themeToggleIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
            } else {
                newTheme = 'dark';
                themeToggleIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
            }
            
            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});

// Close Mobile Offcanvas on Link Click
document.addEventListener('DOMContentLoaded', () => {
    const offcanvasElement = document.getElementById('mobileNav');
    if (offcanvasElement && typeof bootstrap !== 'undefined') {
        const navLinks = offcanvasElement.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            });
        });
    }
});
