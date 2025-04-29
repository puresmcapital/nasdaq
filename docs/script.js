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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
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
        const handleTerminalInput = async () => {
            const input = terminalInput.value.trim();
            if (!input) return;

            // Add user input to terminal
            const userInputElement = document.createElement('p');
            userInputElement.className = 'terminal-line';
            userInputElement.innerHTML = `<span class="text-blue-400">$</span> <span class="text-white">${input}</span>`;
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

            try {
                // Parse the input to determine what the user is asking about
                const symbol = extractSymbol(input);
                
                if (symbol) {
                    // Call the Eliza API
                    const analysis = await fetchTechnicalAnalysis(symbol);
                    
                    // Remove loading message
                    terminalOutput.removeChild(loadingElement);
                    
                    // Add AI response to terminal
                    const aiResponseElement = document.createElement('p');
                    aiResponseElement.className = 'terminal-line';
                    aiResponseElement.innerHTML = `<span class="text-blue-400">$NASDAQ AI:</span> ${analysis}`;
                    terminalOutput.appendChild(aiResponseElement);
                } else {
                    // Remove loading message
                    terminalOutput.removeChild(loadingElement);
                    
                    // If no valid symbol was found
                    const aiResponseElement = document.createElement('p');
                    aiResponseElement.className = 'terminal-line';
                    aiResponseElement.innerHTML = `<span class="text-blue-400">$NASDAQ AI:</span> I'm sorry, I couldn't identify a cryptocurrency or stock symbol in your query. Try asking about BTC, ETH, SOL, or $NASDAQ token.`;
                    terminalOutput.appendChild(aiResponseElement);
                }
            } catch (error) {
                console.error('Error fetching analysis:', error);
                
                // Remove loading message
                terminalOutput.removeChild(loadingElement);
                
                // Fallback to mocked data if API fails
                const response = generateFallbackAnalysis(input);
                
                // Add AI response to terminal
                const aiResponseElement = document.createElement('p');
                aiResponseElement.className = 'terminal-line';
                aiResponseElement.innerHTML = `<span class="text-blue-400">$NASDAQ AI:</span> ${response}`;
                terminalOutput.appendChild(aiResponseElement);
            }
            
            // Scroll to bottom of terminal
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        };

        // Function to extract a symbol from user input
        function extractSymbol(input) {
            input = input.toUpperCase();
            
            // Common crypto/stock symbols to look for
            const commonSymbols = ['BTC', 'ETH', 'SOL', 'NASDAQ', 'DOGE', 'XRP', 'ADA', 'AVAX', 'DOT', 'MATIC'];
            
            // Check if any common symbols are in the input
            for (const symbol of commonSymbols) {
                if (input.includes(symbol)) {
                    return symbol;
                }
            }
            
            // Check for Bitcoin/Ethereum full names
            if (input.includes('BITCOIN')) return 'BTC';
            if (input.includes('ETHEREUM')) return 'ETH';
            if (input.includes('SOLANA')) return 'SOL';
            
            return null;
        }

        // Function to fetch technical analysis from Eliza API
        async function fetchTechnicalAnalysis(symbol) {
            // API endpoint for Eliza technical analysis
            const apiEndpoint = 'https://api.elizaos.ai/technical-analysis';
            
            try {
                const response = await fetch(`${apiEndpoint}?symbol=${symbol}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_API_KEY' // Replace with actual API key if needed
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`API responded with status ${response.status}`);
                }
                
                const data = await response.json();
                return data.analysis || 'Analysis not available for this symbol at the moment.';
            } catch (error) {
                console.error('API Error:', error);
                throw error;
            }
        }

        // Fallback function to generate analysis if API fails
        function generateFallbackAnalysis(input) {
            if (input.toLowerCase().includes('btc') || input.toLowerCase().includes('bitcoin')) {
                return generateAnalysis('BTC', 'Bitcoin');
            } else if (input.toLowerCase().includes('eth') || input.toLowerCase().includes('ethereum')) {
                return generateAnalysis('ETH', 'Ethereum');
            } else if (input.toLowerCase().includes('sol') || input.toLowerCase().includes('solana')) {
                return generateAnalysis('SOL', 'Solana');
            } else if (input.toLowerCase().includes('nasdaq')) {
                return '$NASDAQ token is currently in the accumulation phase with strong buy signals. The recent price action indicates a potential breakout in the next 24-48 hours. Technical indicators show bullish divergence on multiple timeframes.';
            } else {
                return 'I\'m sorry, I don\'t have enough data to analyze that yet. Try asking about BTC, ETH, SOL, or $NASDAQ token.';
            }
        }

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