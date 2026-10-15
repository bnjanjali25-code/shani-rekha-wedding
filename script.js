// Show the invitation as soon as its HTML is ready; maps and music load separately.
function dismissPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('hidden');
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', dismissPreloader, { once: true });
} else {
    dismissPreloader();
}
setTimeout(dismissPreloader, 2500);

// Envelope Opening
const envelopeWrapper = document.getElementById('envelopeWrapper');
const envelope = document.getElementById('envelope');
const envelopeParticles = document.getElementById('envelopeParticles');

function createSealParticles() {
    const seal = document.getElementById('envelopeSeal');
    if (!seal) return;
    const rect = seal.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const colors = ['#D63447', '#FF6B9D', '#FFA07A', '#FFB6C1', '#FFEAA7', '#C23B58', '#8B1A2B'];

    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'envelope-particle';
        const size = Math.random() * 10 + 4;
        const angle = (Math.PI * 2 * i) / 40 + (Math.random() - 0.5) * 0.5;
        const velocity = Math.random() * 180 + 80;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const dur = Math.random() * 0.6 + 0.8;

        particle.style.cssText = `
            left: ${cx}px; top: ${cy}px;
            width: ${size}px; height: ${size}px;
            background: ${color};
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            opacity: 1;
            animation: particleBurst ${dur}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            --dx: ${dx}px; --dy: ${dy}px;
        `;
        envelopeParticles.appendChild(particle);
    }
}

if (envelopeWrapper && envelope) {
    document.body.style.overflow = 'hidden';

    envelope.addEventListener('click', function () {
        if (envelope.classList.contains('opened')) return;

        createSealParticles();

        const hint = envelopeWrapper.querySelector('.envelope-hint');
        if (hint) hint.style.transition = 'opacity 0.4s ease';
        if (hint) hint.style.opacity = '0';

        // Phase 1: Seal breaks, flap opens, letter rises (0-2.5s)
        setTimeout(() => {
            envelope.classList.add('opened');
        }, 300);

        // Phase 2: Start music while user reads the letter (1.5s)
        setTimeout(() => {
            attemptAutoplay();
        }, 1500);

        // Phase 3: Clean up particles & zoom to reveal website (5s — gives ~2.5s reading time)
        setTimeout(() => {
            envelopeParticles.innerHTML = '';
            envelopeWrapper.classList.add('zoom-reveal');
        }, 5000);

        // Phase 4: Fully remove overlay after zoom completes (6.2s)
        setTimeout(() => {
            envelopeWrapper.style.display = 'none';
            document.body.style.overflow = '';
        }, 6200);
    });
}

// Countdown Timer
function updateCountdown() {
    // Set your wedding date here (Year, Month (0-11), Day, Hour, Minute)
    const weddingDate = new Date("2026-11-14T20:00:00+05:30").getTime();

    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // If countdown is over
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<p class="countdown-over">We\'re Married! 🎉</p>';
    }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('open');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Parallax & Scroll Effects
const heroSection = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');
const mountains = document.querySelector('.mountains');
const navbar = document.querySelector('.navbar');

const parallaxDecoElements = [
    { selector: '.decorative-shape', rate: 0.15 },
    { selector: '.circle', rate: 0.1 },
    { selector: '.hill', rate: 0.2 },
    { selector: '.wave', rate: 0.12 },
];

let ticking = false;

function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Navbar
        navbar.style.backgroundColor = scrollY > 100
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(255, 255, 255, 0.95)';

        // Hero parallax
        const heroHeight = heroSection.offsetHeight;
        if (scrollY < heroHeight) {
            heroContent.style.transform = 'translateY(' + (scrollY * 0.4) + 'px)';
            heroContent.style.opacity = 1 - (scrollY / heroHeight) * 0.8;
            mountains.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
        }

        // Decorative elements parallax
        parallaxDecoElements.forEach(({ selector, rate }) => {
            document.querySelectorAll(selector).forEach(el => {
                const parent = el.closest('section');
                if (!parent) return;
                const rect = parent.getBoundingClientRect();
                const windowH = window.innerHeight;
                if (rect.top < windowH && rect.bottom > 0) {
                    const sectionProgress = (windowH - rect.top) / (windowH + rect.height);
                    const offset = (sectionProgress - 0.5) * rect.height * rate;
                    el.style.transform = 'translateY(' + offset + 'px)';
                }
            });
        });

        ticking = false;
    });
}

window.addEventListener('scroll', onScroll, { passive: true });

// Staggered reveal on scroll
const revealTargets = '.section-title, .event-card, .couple-card, .detail-item, .love-story, .venue-info, .venue-map, .rsvp-form, .alternative-rsvp, .image-showcase';

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(revealTargets).forEach((el, i) => {
    el.classList.add('reveal-element');
    const parent = el.closest('section') || el.closest('.container');
    const siblings = parent ? Array.from(parent.querySelectorAll(revealTargets)) : [el];
    const indexInGroup = siblings.indexOf(el);
    el.style.transitionDelay = (indexInGroup * 0.12) + 's';
    revealObserver.observe(el);
});

// Family carousel dots
function setupCarouselDots(gridSelector, dotsId) {
    const grid = document.querySelector(gridSelector);
    const dotsContainer = document.getElementById(dotsId);
    if (!grid || !dotsContainer) return;

    const cards = grid.querySelectorAll('.family-card');
    let currentIndex = 0;
    let autoScrollInterval = null;
    const AUTO_SCROLL_DELAY = 5000;

    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to card ' + (i + 1));
        dot.addEventListener('click', () => {
            currentIndex = i;
            scrollToCard(i);
            resetAutoScroll();
        });
        dotsContainer.appendChild(dot);
    });

    function scrollToCard(index) {
        const card = cards[index];
        const scrollTarget = card.offsetLeft - (grid.offsetWidth - card.offsetWidth) / 2;
        grid.scrollTo({ left: scrollTarget, behavior: 'smooth' });
        dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function autoAdvance() {
        currentIndex = (currentIndex + 1) % cards.length;
        scrollToCard(currentIndex);
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(autoAdvance, AUTO_SCROLL_DELAY);
    }

    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }

    grid.addEventListener('scroll', () => {
        const scrollLeft = grid.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 32;
        const activeIndex = Math.round(scrollLeft / cardWidth);
        if (activeIndex >= 0 && activeIndex < cards.length) {
            currentIndex = activeIndex;
            dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === activeIndex);
            });
        }
    }, { passive: true });

    grid.addEventListener('pointerdown', () => clearInterval(autoScrollInterval));
    grid.addEventListener('pointerup', () => resetAutoScroll());

    startAutoScroll();
}

setupCarouselDots('#groomGrid', 'groomDots');
setupCarouselDots('#brideGrid', 'brideDots');

// Music Player Functionality
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
let isPlaying = false;

backgroundMusic.volume = 0.3;

// Try to autoplay when page loads
function attemptAutoplay() {
    backgroundMusic.play()
        .then(() => {
            isPlaying = true;
            musicToggle.classList.add('playing');
        })
        .catch(error => {
            isPlaying = false;
            musicToggle.classList.remove('playing');
        });
}

// Only autoplay if there's no envelope (otherwise envelope handles it)
if (!document.getElementById('envelopeWrapper')) {
    window.addEventListener('load', attemptAutoplay);
}

// Play/Pause button toggle
musicToggle.addEventListener('click', function() {
    if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
        isPlaying = false;
    } else {
        backgroundMusic.play().catch(error => {
            console.log('Playback error:', error);
        });
        musicToggle.classList.add('playing');
        isPlaying = true;
    }
});

// Fallback: If autoplay was blocked, try again on first user interaction
let hasInteracted = false;
document.body.addEventListener('click', function(e) {
    // Don't trigger if clicking the music button itself
    if (!hasInteracted && !isPlaying && !e.target.closest('.music-toggle')) {
        hasInteracted = true;
        backgroundMusic.play()
            .then(() => {
                isPlaying = true;
                musicToggle.classList.add('playing');
            })
            .catch(error => {
                console.log('Playback prevented:', error);
            });
    }
}, { once: false });
