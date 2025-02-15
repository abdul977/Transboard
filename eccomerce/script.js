document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality (keep existing carousel code)
    const carousel = {
        currentSlide: 0,
        items: document.querySelectorAll('.carousel-item'),
        prevButton: document.querySelector('.carousel-button.prev'),
        nextButton: document.querySelector('.carousel-button.next'),
        
        init() {
            this.showSlide(this.currentSlide);
            this.setupEventListeners();
            this.startAutoSlide();
        },

        showSlide(index) {
            this.items.forEach(item => item.classList.remove('active'));
            this.currentSlide = (index + this.items.length) % this.items.length;
            this.items[this.currentSlide].classList.add('active');
        },

        nextSlide() {
            this.showSlide(this.currentSlide + 1);
        },

        prevSlide() {
            this.showSlide(this.currentSlide - 1);
        },

        setupEventListeners() {
            this.prevButton.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoSlide();
            });

            this.nextButton.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoSlide();
            });

            let touchStartX = 0;
            const carouselElement = document.querySelector('.carousel');

            carouselElement.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });

            carouselElement.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const difference = touchStartX - touchEndX;

                if (Math.abs(difference) > 50) {
                    if (difference > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                    this.resetAutoSlide();
                }
            });
        },

        startAutoSlide() {
            this.autoSlideInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        },

        resetAutoSlide() {
            clearInterval(this.autoSlideInterval);
            this.startAutoSlide();
        }
    };

    carousel.init();

    // Chat functionality
    const chat = {
        messages: [],
        isOpen: false,
        unreadCount: 0,

        init() {
            this.loadState();
            this.setupEventListeners();
            this.renderMessages();
            this.setupAutoReply();
        },

        loadState() {
            try {
                const savedState = localStorage.getItem('chatState');
                if (savedState) {
                    const state = JSON.parse(savedState);
                    this.messages = state.messages || [];
                    this.unreadCount = state.unreadCount || 0;
                    this.renderMessages(); // Ensure messages are rendered on load
                }
            } catch (error) {
                console.error('Error loading chat state:', error);
                // Reset to default state if there's an error
                this.messages = [];
                this.unreadCount = 0;
            }
        },

        saveState() {
            try {
                const state = {
                    messages: this.messages,
                    unreadCount: this.unreadCount
                };
                localStorage.setItem('chatState', JSON.stringify(state));
            } catch (error) {
                console.error('Error saving chat state:', error);
            }
        },

        setupEventListeners() {
            const toggleBtn = document.querySelector('.chat-toggle');
            const closeBtn = document.querySelector('.close-chat');
            const sendBtn = document.querySelector('.send-message');
            const input = document.querySelector('#chat-message-input');
            const chatContainer = document.querySelector('.chat-container');

            toggleBtn.addEventListener('click', () => this.toggleChat());
            closeBtn.addEventListener('click', () => this.toggleChat());

            sendBtn.addEventListener('click', () => this.sendMessage());
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });

            // Update notification badge
            this.updateNotificationBadge();
        },

        toggleChat() {
            const chatContainer = document.querySelector('.chat-container');
            this.isOpen = !this.isOpen;
            chatContainer.classList.toggle('hidden', !this.isOpen);
            
            if (this.isOpen) {
                this.unreadCount = 0;
                this.updateNotificationBadge();
                this.saveState();
                const input = document.querySelector('#chat-message-input');
                input.focus();
                this.renderMessages(); // Re-render messages when chat is opened
            }
        },

        sendMessage() {
            const input = document.querySelector('#chat-message-input');
            const message = input.value.trim();
            
            if (message) {
                this.addMessage('user', message);
                input.value = '';
                this.saveState();
                this.simulateResponse();
            }
        },

        addMessage(type, text) {
            const message = {
                type,
                text,
                timestamp: new Date().toISOString()
            };
            
            this.messages.push(message);
            this.renderMessages();
            
            if (type === 'support' && !this.isOpen) {
                this.unreadCount++;
                this.updateNotificationBadge();
            }
            
            this.saveState();
        },

        renderMessages() {
            const container = document.querySelector('.chat-messages');
            container.innerHTML = this.messages.map(msg => `
                <div class="message ${msg.type}">
                    ${msg.text}
                </div>
            `).join('');
            
            container.scrollTop = container.scrollHeight;
        },

        updateNotificationBadge() {
            const badge = document.querySelector('.notification-badge');
            badge.classList.toggle('hidden', this.unreadCount === 0);
            badge.textContent = this.unreadCount;
        },

        simulateResponse() {
            const responses = [
                "Hello! How can I help you today?",
                "Thank you for your interest in the iPhone 15 Pro Max!",
                "I'd be happy to answer any questions about the features.",
                "Would you like to know more about our payment options?",
                "Is there anything specific you'd like to know about the camera system?"
            ];

            setTimeout(() => {
                const response = responses[Math.floor(Math.random() * responses.length)];
                this.addMessage('support', response);
            }, 1000);
        },

        setupAutoReply() {
            if (this.messages.length === 0) {
                setTimeout(() => {
                    this.addMessage('support', "👋 Hi there! How can I assist you with the iPhone 15 Pro Max today?");
                }, 1000);
            }
        }
    };

    // Initialize chat
    chat.init();

    // Buy Now button animation (keep existing code)
    const buyButton = document.querySelector('.buy-now');
    buyButton.addEventListener('click', () => {
        buyButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            buyButton.style.transform = '';
            alert('Thank you for your interest! This is a demo product page.');
        }, 150);
    });

    // Smooth scroll for navigation links (keep existing code)
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
});
