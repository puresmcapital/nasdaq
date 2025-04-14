// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add animation class to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-fadeIn');
    });

    // Mobile menu toggle functionality
    const menuButton = document.createElement('button');
    menuButton.className = 'md:hidden fixed top-4 right-4 z-50';
    menuButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    `;
    document.body.appendChild(menuButton);

    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed inset-0 bg-white z-40 hidden';
    mobileMenu.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full space-y-8">
            <a href="#" class="text-2xl font-semibold text-gray-800 hover:text-gray-600">Home</a>
            <a href="#analysis" class="text-2xl font-semibold text-gray-800 hover:text-gray-600">Analysis</a>
            <a href="#about" class="text-2xl font-semibold text-gray-800 hover:text-gray-600">About</a>
        </div>
    `;
    document.body.appendChild(mobileMenu);

    // Toggle mobile menu
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects to analysis cards
    const cards = document.querySelectorAll('.analysis-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add loading state for dynamic content
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden';
    loadingIndicator.innerHTML = `
        <div class="bg-white p-4 rounded-lg">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
    `;
    document.body.appendChild(loadingIndicator);

    // Function to show loading indicator
    window.showLoading = () => {
        loadingIndicator.classList.remove('hidden');
    };

    // Function to hide loading indicator
    window.hideLoading = () => {
        loadingIndicator.classList.add('hidden');
    };
}); 