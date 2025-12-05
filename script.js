// ===== Smooth Scroll Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Adjust for sticky header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Scroll Animation for Elements =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe skill cards and portfolio cards
document.querySelectorAll('.skill-card, .portfolio-card, .experience-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Active Navigation Link =====
window.addEventListener('scroll', () => {
    let current = '';
    
    // Define sections to track
    const sections = [
        { id: 'about', offset: 0 },
        { id: 'skills', offset: 0 },
        { id: 'experience', offset: 0 },
        { id: 'portfolio', offset: 0 },
        { id: 'contact', offset: 0 }
    ];

    sections.forEach(section => {
        const sectionElement = document.getElementById(section.id);
        if (sectionElement) {
            if (window.scrollY >= sectionElement.offsetTop - 200) {
                current = section.id;
            }
        }
    });

    // Update active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.opacity = '0.6';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.opacity = '1';
        }
    });
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== Mobile Menu Toggle (if needed for future mobile menu) =====
function handleMobileMenu() {
    const nav = document.querySelector('.nav');
    if (window.innerWidth <= 768) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
    } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'row';
    }
}

window.addEventListener('resize', handleMobileMenu);
window.addEventListener('load', handleMobileMenu);

// ===== Form Validation (for future contact form) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== Dark Mode Toggle (optional feature) =====
const darkModeToggle = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
};

// Call dark mode on load
darkModeToggle();

// ===== Scroll to Top Button =====
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.id = 'scrollTopBtn';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    display: none;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.display = 'flex';
        scrollTopButton.style.justifyContent = 'center';
        scrollTopButton.style.alignItems = 'center';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseover', () => {
    scrollTopButton.style.transform = 'scale(1.1)';
});

scrollTopButton.addEventListener('mouseout', () => {
    scrollTopButton.style.transform = 'scale(1)';
});

console.log('Portfolio script loaded successfully!');
