// JavaScript functionality for EffiBit Technologies Website

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. PAGE ENTRANCE FADE
    // ==========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // ==========================================
    // 1. THEME SWITCHER (DARK / LIGHT MODE)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        document.body.setAttribute('data-theme', 'light');
    }

    // Toggle theme action
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        header.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('menu-open');
        });
    });

    // ==========================================
    // 3. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it is revealed, we can stop observing it
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // 4. ACTIVE NAVIGATION LINK ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section');

    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px' // Trigger when section is in middle of viewport
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // ==========================================
    // 4b. SCROLL PROGRESS BAR & BACK-TO-TOP BUTTON
    // ==========================================
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    const updateScrollUI = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;

        backToTopBtn.classList.toggle('visible', scrollTop > 600);
    };

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    updateScrollUI();

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // 4c. POINTER-FOLLOW GLOW ON FOCUS CARDS
    // ==========================================
    document.querySelectorAll('.focus-card').forEach(card => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });

    // ==========================================
    // 5. SERVICES TAB SWITCHER
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Toggle active class on buttons
            tabButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            // Toggle active class on panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('id') === `tab-${targetTab}`) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // ==========================================
    // 6. CONTACT FORM SUBMISSION & VALIDATION
    // ==========================================
    const inquiryForm = document.getElementById('inquiry-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = inquiryForm.querySelector('.form-submit-btn');
    const submitBtnText = submitBtn.querySelector('span');

    inquiryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check honeypot field for simple spam protection
        const honeyVal = inquiryForm.querySelector('input[name="_honey"]').value;
        if (honeyVal) {
            console.warn("Spam detected via honeypot.");
            return;
        }

        // Disable inputs and button, show sending state
        submitBtn.disabled = true;
        const originalText = submitBtnText.textContent;
        submitBtnText.textContent = 'Sending Message...';

        const nameVal = document.getElementById('name').value;
        const emailVal = document.getElementById('email').value;
        const subjectVal = document.getElementById('subject').value;
        const messageVal = document.getElementById('message').value;

        // Reset formStatus display
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';

        // Send AJAX request to FormSubmit
        fetch("https://formsubmit.co/ajax/effibit@gmail.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: nameVal,
                email: emailVal,
                _subject: `EffiBit Contact: ${subjectVal}`,
                message: messageVal,
                _captcha: "false"
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Show success message
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                formStatus.innerHTML = `<strong>Thank you, ${nameVal}!</strong> Your message regarding "<em>${subjectVal}</em>" has been submitted. Our engineering consultancy team will respond to <strong>${emailVal}</strong> within 1 Business Day.`;

                // Reset form
                inquiryForm.reset();

                // Scroll status into view
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Fade status after 8 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 8000);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                // Show error message
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                formStatus.innerHTML = `<strong>Oops!</strong> Something went wrong. Please try again or email us directly at <a href="mailto:effibit@gmail.com">effibit@gmail.com</a>.`;

                // Scroll status into view
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtnText.textContent = originalText;
            });
    });
});
