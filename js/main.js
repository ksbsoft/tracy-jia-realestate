/**
 * Tracy Jia Real Estate - Main JavaScript
 * 
 * Handles navigation, scroll effects, contact form,
 * and general UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // PWA SERVICE WORKER REGISTRATION
    // ============================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((registration) => {
                    console.log('[PWA] Service Worker registered, scope:', registration.scope);

                    // Check for updates periodically
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'activated') {
                                console.log('[PWA] New content available, refresh for updates.');
                            }
                        });
                    });
                })
                .catch((error) => {
                    console.log('[PWA] Service Worker registration failed:', error);
                });
        });
    }

    // ============================================
    // PWA INSTALL PROMPT (Android / Desktop Chrome)
    // ============================================
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Show a custom install button if desired
        const installBanner = document.getElementById('installBanner');
        if (installBanner) {
            installBanner.style.display = 'flex';
            installBanner.querySelector('.install-btn').addEventListener('click', () => {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('[PWA] User accepted install');
                    }
                    deferredPrompt = null;
                    installBanner.style.display = 'none';
                });
            });
        }
    });

    // Detect if running as installed PWA
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
        document.body.classList.add('pwa-standalone');
        console.log('[PWA] Running in standalone mode');
    }

    // ============================================
    // iOS SAFARI INSTALL PROMPT
    // ============================================
    const isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
    const isInStandaloneMode = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
    const iosPromptDismissed = localStorage.getItem('iosPromptDismissed');

    if (isIos && !isInStandaloneMode && !iosPromptDismissed) {
        // Show iOS install prompt after a short delay
        setTimeout(() => {
            const iosPrompt = document.getElementById('iosInstallPrompt');
            if (iosPrompt) {
                iosPrompt.style.display = 'block';
                // Auto-hide after 15 seconds
                setTimeout(() => {
                    iosPrompt.style.display = 'none';
                }, 15000);
            }
        }, 3000);
    }

    // ============================================
    // NAVBAR
    // ============================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top visibility
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll position
        updateActiveNavLink();
    };

    window.addEventListener('scroll', handleScroll);

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // Active nav link based on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ============================================
    // BACK TO TOP
    // ============================================
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================
    // FLOATING CHAT BUTTON (Mobile)
    // ============================================
    const floatingChat = document.getElementById('floatingChat');
    if (floatingChat) {
        floatingChat.addEventListener('click', () => {
            const qaSection = document.getElementById('qa');
            if (qaSection) {
                qaSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };

            // Build email body
            const subject = encodeURIComponent(`New Inquiry from ${formData.name} - ${getInterestLabel(formData.interest)}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Phone: ${formData.phone || 'Not provided'}\n` +
                `Interest: ${getInterestLabel(formData.interest)}\n\n` +
                `Message:\n${formData.message}`
            );

            // Open email client
            window.location.href = `mailto:Tracy.Jia.Realestate@gmail.com?subject=${subject}&body=${body}`;

            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // Reset after 5 seconds
            setTimeout(() => {
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
                contactForm.reset();
            }, 5000);
        });
    }

    function getInterestLabel(value) {
        const labels = {
            'buying': 'Buying a Home',
            'selling': 'Selling a Home',
            'both': 'Buying & Selling',
            'investing': 'Real Estate Investment',
            'management': 'Property Management',
            'market': 'Market Information',
            'other': 'Other'
        };
        return labels[value] || value;
    }

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================
    // ANIMATION ON SCROLL (Intersection Observer)
    // ============================================
    const animateElements = document.querySelectorAll(
        '.service-card, .sale-card, .testimonial-card, .resource-card, .area-card, .detail-item, .contact-item'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ============================================
    // STAT COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');

    if ('IntersectionObserver' in window && statNumbers.length) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStatNumber(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => statObserver.observe(stat));
    }

    function animateStatNumber(element) {
        const text = element.textContent;
        const numMatch = text.match(/[\d.]+/);
        if (!numMatch) return;

        const targetNum = parseFloat(numMatch[0]);
        const prefix = text.substring(0, text.indexOf(numMatch[0]));
        const suffix = text.substring(text.indexOf(numMatch[0]) + numMatch[0].length);
        const duration = 1500;
        const startTime = performance.now();
        const isDecimal = numMatch[0].includes('.');

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

            let currentValue = targetNum * eased;
            if (isDecimal) {
                currentValue = currentValue.toFixed(1);
            } else {
                currentValue = Math.floor(currentValue);
            }

            element.textContent = prefix + currentValue + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = text;
            }
        }

        requestAnimationFrame(update);
    }

});
