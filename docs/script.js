// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add animation class to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        // Stagger the animations
        setTimeout(() => {
            section.classList.add('animate-fadeIn');
        }, index * 150);
    });

    // Mobile menu functionality
    const menuButton = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuButton = document.querySelector('.close-mobile-menu');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });

        // Close mobile menu when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        });
        
        // Close mobile menu when clicking the close button
        if (closeMenuButton) {
            closeMenuButton.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        }
    }

    // Copy to clipboard functionality
    window.copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.className = 'copy-notification';
            notification.textContent = 'Copied to clipboard!';
            document.body.appendChild(notification);
            
            // Remove notification after a short delay
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .copy-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--accent-primary);
            color: #000;
            padding: 10px 20px;
            border-radius: 4px;
            font-weight: bold;
            opacity: 1;
            transition: opacity 0.5s ease;
            z-index: 1000;
            box-shadow: var(--shadow-neon);
        }
    `;
    document.head.appendChild(style);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Terminal functionality
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const submitTerminal = document.getElementById('submit-terminal');

    if (terminalInput && terminalOutput && submitTerminal) {
        // Function to handle terminal input
        const handleTerminalInput = () => {
            const input = terminalInput.value.trim();
            if (!input) return;

            // Add user input to terminal
            const userInputElement = document.createElement('p');
            userInputElement.className = 'terminal-line';
            userInputElement.innerHTML = `<span class="text-green-400">$</span> <span class="text-white">${input}</span>`;
            terminalOutput.appendChild(userInputElement);

            // Clear input field
            terminalInput.value = '';

            // Simulate AI processing
            const loadingElement = document.createElement('p');
            loadingElement.className = 'terminal-line';
            loadingElement.innerHTML = '<span class="text-yellow-400">Processing analysis...</span>';
            terminalOutput.appendChild(loadingElement);

            // Scroll to bottom of terminal
            terminalOutput.scrollTop = terminalOutput.scrollHeight;

            // Simulate API response (replace with actual API call later)
            setTimeout(() => {
                // Remove loading message
                terminalOutput.removeChild(loadingElement);

                // Generate a fake analysis response based on input
                let response = '';
                
                if (input.toLowerCase().includes('btc') || input.toLowerCase().includes('bitcoin')) {
                    response = generateAnalysis('BTC', 'Bitcoin');
                } else if (input.toLowerCase().includes('eth') || input.toLowerCase().includes('ethereum')) {
                    response = generateAnalysis('ETH', 'Ethereum');
                } else if (input.toLowerCase().includes('sol') || input.toLowerCase().includes('solana')) {
                    response = generateAnalysis('SOL', 'Solana');
                } else if (input.toLowerCase().includes('nasdaq')) {
                    response = 'NASDAQ token is currently in the accumulation phase with strong buy signals. The recent price action indicates a potential breakout in the next 24-48 hours. Technical indicators show bullish divergence on multiple timeframes.';
                } else {
                    response = 'I\'m sorry, I don\'t have enough data to analyze that yet. Try asking about BTC, ETH, SOL, or NASDAQ token.';
                }

                // Add AI response to terminal
                const aiResponseElement = document.createElement('p');
                aiResponseElement.className = 'terminal-line';
                aiResponseElement.innerHTML = `<span class="text-green-400">NASDAQ AI:</span> ${response}`;
                terminalOutput.appendChild(aiResponseElement);

                // Scroll to bottom of terminal
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }, 1500);
        };

        // Submit button click event
        submitTerminal.addEventListener('click', handleTerminalInput);

        // Enter key press event
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleTerminalInput();
            }
        });

        // Focus terminal input when terminal container is clicked
        const terminalContainer = document.querySelector('.terminal-container');
        if (terminalContainer) {
            terminalContainer.addEventListener('click', () => {
                terminalInput.focus();
            });
        }
    }

    // Function to generate fake analysis
    function generateAnalysis(symbol, name) {
        const trends = ['bullish', 'bearish', 'neutral', 'strongly bullish', 'slightly bearish'];
        const trend = trends[Math.floor(Math.random() * trends.length)];
        
        const supports = [28500, 29200, 30100, 31500, 32200];
        const support = supports[Math.floor(Math.random() * supports.length)];
        
        const resistances = [33500, 34200, 35000, 36800, 38500];
        const resistance = resistances[Math.floor(Math.random() * resistances.length)];
        
        const timeframes = ['short-term', 'medium-term', 'long-term'];
        const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];
        
        return `${name} (${symbol}) is showing ${trend} momentum in the ${timeframe}. Key support levels are at $${support} with resistance at $${resistance}. ${trend === 'bullish' || trend === 'strongly bullish' ? 'Consider accumulating at current levels.' : trend === 'bearish' || trend === 'slightly bearish' ? 'Consider waiting for a better entry point.' : 'Monitor for breakout or breakdown from the current range.'}`;
    }

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrollPos * 0.5}px`;
        });
    }

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Add typewriter effect to terminal welcome message
    const terminalWelcome = document.querySelector('.terminal-line');
    if (terminalWelcome) {
        const text = terminalWelcome.textContent;
        terminalWelcome.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                terminalWelcome.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 40);
            }
        };
        
        typeWriter();
    }

    // Intersection Observer for animations
    const elementsToAnimate = document.querySelectorAll('.feature-card, .roadmap-item, .buy-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}); 