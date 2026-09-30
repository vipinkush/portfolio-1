/* ===================================================================
   VIPIN KUSHWAHA - PORTFOLIO INTERACTIVITY SCRIPT
   - Theme Toggle (Light / Dark)
   - Skills & Projects Filtering
   - Interactive Project Modals
   - Form Validation & Toast Notification
   - Clipboard Copy & Mobile Navigation
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initSkillsFilter();
    initProjectsFilter();
    initModals();
    initContactForm();
    initScrollSpy();
});

/* -------------------------------------------------------------------
   1. THEME TOGGLE (LIGHT / DARK CORPORATE)
   ------------------------------------------------------------------- */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Retrieve saved preference or default to light mode
    const savedTheme = localStorage.getItem('vipin_portfolio_theme');
    
    if (savedTheme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('vipin_portfolio_theme', 'light');
            showToast('Switched to Corporate Light Theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('vipin_portfolio_theme', 'dark');
            showToast('Switched to Dark Tech Theme');
        }
    });
}

/* -------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   ------------------------------------------------------------------- */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (isOpen) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                mobileToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            }
        });
    });
}

/* -------------------------------------------------------------------
   3. SKILLS CATEGORY FILTERING
   ------------------------------------------------------------------- */
function initSkillsFilter() {
    const filterButtons = document.querySelectorAll('.skills-filter-nav .filter-btn');
    const skillCards = document.querySelectorAll('.skills-grid .skill-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.25s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* -------------------------------------------------------------------
   4. PROJECTS FILTERING
   ------------------------------------------------------------------- */
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.project-filter-nav .filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-project-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.25s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 20);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* -------------------------------------------------------------------
   5. PROJECT DETAILS MODALS
   ------------------------------------------------------------------- */
function initModals() {
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const modals = document.querySelectorAll('.modal-overlay');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                targetModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        const footerCloseBtn = modal.querySelector('.modal-close-btn');

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeModal);

        // Click outside modal content to close
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    modal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                }
            });
        }
    });
}

/* -------------------------------------------------------------------
   6. CONTACT FORM VALIDATION & INTERACTIVE SUBMISSION
   ------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');

    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Real-time input clearing of errors
    nameInput.addEventListener('input', () => clearError(nameInput, nameError));
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
    subjectInput.addEventListener('input', () => clearError(subjectInput, subjectError));
    messageInput.addEventListener('input', () => clearError(messageInput, messageError));

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Name Validation
        if (!nameInput.value.trim()) {
            showError(nameInput, nameError, 'Please enter your name.');
            isValid = false;
        }

        // Email Validation
        if (!emailInput.value.trim()) {
            showError(emailInput, emailError, 'Please enter your email.');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            isValid = false;
        }

        // Subject Validation
        if (!subjectInput.value.trim()) {
            showError(subjectInput, subjectError, 'Please provide a subject.');
            isValid = false;
        }

        // Message Validation
        if (!messageInput.value.trim()) {
            showError(messageInput, messageError, 'Please enter your message.');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, messageError, 'Message must be at least 10 characters.');
            isValid = false;
        }

        if (!isValid) return;

        // Simulation of submission
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline-flex';

        setTimeout(() => {
            submitBtn.disabled = false;
            btnText.style.display = 'inline-flex';
            btnSpinner.style.display = 'none';

            // Show Toast
            showToast('Thank you! Your message has been sent to Vipin Kushwaha.');

            // Construct mailto link as direct fallback
            const mailtoUrl = `mailto:kushwahavipin2002@gmail.com?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent("Sender Name: " + nameInput.value.trim() + "\nSender Email: " + emailInput.value.trim() + "\n\n" + messageInput.value.trim())}`;
            
            // Open user's email client cleanly
            window.location.href = mailtoUrl;

            // Reset form
            form.reset();
        }, 1200);
    });

    function showError(input, errorEl, msg) {
        input.classList.add('is-invalid');
        errorEl.textContent = msg;
    }

    function clearError(input, errorEl) {
        input.classList.remove('is-invalid');
        errorEl.textContent = '';
    }
}

/* -------------------------------------------------------------------
   7. CLIPBOARD COPY UTILITY
   ------------------------------------------------------------------- */
window.copyToClipboard = function(text, btnElement) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`Copied ${text} to clipboard!`);
            const icon = btnElement.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-check';
                setTimeout(() => {
                    icon.className = 'fa-regular fa-copy';
                }, 2000);
            }
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
};

function fallbackCopy(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied ${text} to clipboard!`);
}

/* -------------------------------------------------------------------
   8. TOAST NOTIFICATION POPUP
   ------------------------------------------------------------------- */
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');

    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

/* -------------------------------------------------------------------
   9. SCROLL SPY FOR ACTIVE NAVIGATION LINKS
   ------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}
