// Ocytosigne Website JavaScript
// Accessibility-focused interactive functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeFormValidation();
    initializeAccessibilityFeatures();
    initializeInteractiveElements();
    
    console.log('Ocytosigne website loaded successfully');
});

// Navigation functionality
function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Trap focus in mobile menu when open
        if (!isExpanded) {
            navMenu.querySelector('.nav-link').focus();
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    });
}

// Smooth scrolling and active navigation highlighting
function initializeScrollEffects() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Highlight active navigation item based on scroll position
    function highlightActiveNavItem() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttled scroll event listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                highlightActiveNavItem();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    highlightActiveNavItem();
}

// Form validation and submission
function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(input);
        });

        input.addEventListener('input', function() {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            submitForm(form);
        } else {
            // Focus on first invalid field
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.focus();
                announceToScreenReader('Please correct the errors in the form');
            }
        }
    });

    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('name');
        const errorElement = document.getElementById(`${fieldName}-error`);
        let errorMessage = '';

        // Clear previous error state
        field.classList.remove('error');
        errorElement.classList.remove('show');
        errorElement.textContent = '';

        // Validation rules
        if (!value) {
            errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        } else if (fieldName === 'email' && !isValidEmail(value)) {
            errorMessage = 'Please enter a valid email address';
        } else if (fieldName === 'name' && value.length < 2) {
            errorMessage = 'Name must be at least 2 characters long';
        } else if (fieldName === 'message' && value.length < 10) {
            errorMessage = 'Message must be at least 10 characters long';
        }

        if (errorMessage) {
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            return false;
        }

        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function submitForm(form) {
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            announceToScreenReader('Message sent successfully! We will get back to you soon.');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
        }, 2000);
    }
}

// Accessibility features
function initializeAccessibilityFeatures() {
    const highContrastToggle = document.getElementById('high-contrast');
    const largeTextToggle = document.getElementById('large-text');
    const screenReaderInfo = document.getElementById('screen-reader');

    // High contrast mode
    highContrastToggle.addEventListener('click', function(event) {
        event.preventDefault();
        document.body.classList.toggle('high-contrast');
        
        const isEnabled = document.body.classList.contains('high-contrast');
        localStorage.setItem('high-contrast', isEnabled);
        
        announceToScreenReader(`High contrast mode ${isEnabled ? 'enabled' : 'disabled'}`);
        this.textContent = isEnabled ? 'Disable High Contrast' : 'High Contrast Mode';
    });

    // Large text mode
    largeTextToggle.addEventListener('click', function(event) {
        event.preventDefault();
        document.body.classList.toggle('large-text');
        
        const isEnabled = document.body.classList.contains('large-text');
        localStorage.setItem('large-text', isEnabled);
        
        announceToScreenReader(`Large text mode ${isEnabled ? 'enabled' : 'disabled'}`);
        this.textContent = isEnabled ? 'Disable Large Text' : 'Large Text Mode';
    });

    // Screen reader information
    screenReaderInfo.addEventListener('click', function(event) {
        event.preventDefault();
        showScreenReaderInfo();
    });

    // Restore accessibility preferences
    if (localStorage.getItem('high-contrast') === 'true') {
        document.body.classList.add('high-contrast');
        highContrastToggle.textContent = 'Disable High Contrast';
    }

    if (localStorage.getItem('large-text') === 'true') {
        document.body.classList.add('large-text');
        largeTextToggle.textContent = 'Disable Large Text';
    }

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(event) {
        // Skip to main content shortcut
        if (event.altKey && event.key === 'm') {
            event.preventDefault();
            document.getElementById('main-content').focus();
            announceToScreenReader('Skipped to main content');
        }

        // Focus management for modals and overlays
        if (event.key === 'Tab') {
            handleTabNavigation(event);
        }
    });
}

// Interactive elements
function initializeInteractiveElements() {
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const demoBtn = document.getElementById('demo-btn');

    learnMoreBtn.addEventListener('click', function() {
        // Smooth scroll to features section
        document.getElementById('features').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        announceToScreenReader('Scrolled to features section');
    });

    demoBtn.addEventListener('click', function() {
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Focus on the contact form after scrolling
        setTimeout(() => {
            document.getElementById('name').focus();
            announceToScreenReader('Scrolled to contact form. Ready to request demo.');
        }, 800);
    });

    // Add hover effects with keyboard support
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('focus', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Utility functions
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4a90e2',
        color: 'white',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease-out'
    });
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        closeNotification(notification);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            closeNotification(notification);
        }
    }, 5000);
    
    function closeNotification(notif) {
        notif.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (document.body.contains(notif)) {
                document.body.removeChild(notif);
            }
        }, 300);
    }
}

function showScreenReaderInfo() {
    const infoText = `
        Ocytosigne Website Accessibility Information:
        
        This website is designed with accessibility in mind for users with hearing impairments.
        
        Keyboard shortcuts:
        - Alt + M: Skip to main content
        - Tab: Navigate through interactive elements
        - Escape: Close menus and dialogs
        
        Accessibility features:
        - High contrast mode for better visibility
        - Large text mode for easier reading
        - Full keyboard navigation support
        - Screen reader optimized content
        - Clear focus indicators
        - Semantic HTML structure
        
        For additional assistance, please contact us at info@ocytosigne.com
    `;
    
    announceToScreenReader(infoText);
    showNotification('Screen reader information announced. Check your screen reader output for details.', 'info');
}

function handleTabNavigation(event) {
    // Focus trap implementation for modals (if any are added later)
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // This is a basic implementation - would be expanded for modal dialogs
    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
}

// Performance optimization: Lazy loading for non-critical features
function lazyLoadFeatures() {
    // Intersection Observer for animation triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .stat, .contact-item');
    animateElements.forEach(el => observer.observe(el));
}

// Initialize lazy loading after page load
window.addEventListener('load', lazyLoadFeatures);

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    announceToScreenReader('An error occurred. Please refresh the page or contact support if the problem persists.');
});

// Service worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}