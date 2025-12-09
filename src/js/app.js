// Main application logic
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mini App loaded successfully!');

    // Get elements
    const actionBtn = document.getElementById('actionBtn');
    const output = document.getElementById('output');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Button click handler
    if (actionBtn) {
        actionBtn.addEventListener('click', () => {
            handleButtonClick();
        });
    }

    // Main function
    function handleButtonClick() {
        const messages = [
            'Hello! Welcome to the Mini App! 👋',
            'Great job! You clicked the button! 🎉',
            'This app is working perfectly! ✨',
            'Keep exploring and building! 🚀',
            'You\'re doing amazing! 💪'
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        output.textContent = randomMessage;
        output.classList.add('show');

        // Add some animation
        actionBtn.textContent = 'Click Again!';
        
        setTimeout(() => {
            output.classList.remove('show');
        }, 3000);
    }

    // Additional functionality can be added here
    initializeApp();
});

// Initialize app
function initializeApp() {
    console.log('App initialized at:', new Date().toLocaleString());
    
    // Add any initialization logic here
    setupEventListeners();
}

// Setup additional event listeners
function setupEventListeners() {
    // Example: Log when user scrolls
    window.addEventListener('scroll', () => {
        // Add scroll-based functionality here
    });

    // Example: Handle window resize
    window.addEventListener('resize', () => {
        console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                type: formData.get('type') || '',
                name: formData.get('name'),
                gender: formData.get('gender') || '',
                organization: formData.get('organization') || '',
                phone: formData.get('phone') || '',
                email: formData.get('email'),
                message: formData.get('message') || ''
            };

            // Show loading state
            formStatus.textContent = 'Submitting...';
            formStatus.className = 'form-status loading';

            try {
                // Replace with your Google Apps Script Web App URL
                const scriptUrl = 'https://script.google.com/macros/s/AKfycbxKjTgkT_rRnsGV9bAV40vNvCB2IbY0rz475WL-GFS36Gelg1E2NCJocNr6b8d8D6AN0g/exec';
                
                console.log('Submitting form data:', data);
                
                const response = await fetch(scriptUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: JSON.stringify(data)
                });

                console.log('Form submitted successfully');
                
                // With no-cors mode, we can't read the response
                // Assume success if no error was thrown
                formStatus.textContent = 'Thank you! Your submission has been received. Redirecting to home...';
                formStatus.className = 'form-status success';
                contactForm.reset();

                // Redirect to home page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);

            } catch (error) {
                console.error('Form submission error:', error);
                formStatus.textContent = 'An error occurred. Please try again.';
                formStatus.className = 'form-status error';
            }

            // Clear status after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        });
    }
}

// Utility functions
const utils = {
    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString();
    },

    // Generate random color
    randomColor: () => {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    },

    // Capitalize string
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { utils };
}
