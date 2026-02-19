/**
 * Tracy Jia Real Estate - Chat Engine
 * 
 * Handles the Q&A chat functionality, matching user questions
 * against the knowledge base and providing relevant answers.
 */

class RealEstateChat {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.quickButtons = document.querySelectorAll('.quick-btn');

        this.init();
    }

    init() {
        // Send message on button click
        this.chatSend.addEventListener('click', () => this.handleSend());

        // Send message on Enter key
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSend();
            }
        });

        // Quick question buttons
        this.quickButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.getAttribute('data-question');
                this.chatInput.value = question;
                this.handleSend();
            });
        });
    }

    handleSend() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        // Show typing indicator
        this.showTyping();

        // Simulate processing delay for natural feel
        setTimeout(() => {
            this.removeTyping();
            const answer = this.findAnswer(message);
            this.addMessage(answer, 'bot');
        }, 800 + Math.random() * 700);
    }

    addMessage(content, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;

        const avatarIcon = sender === 'bot' ? 'fa-user-tie' : 'fa-user';

        msgDiv.innerHTML = `
            <div class="chat-avatar"><i class="fas ${avatarIcon}"></i></div>
            <div class="chat-bubble">${sender === 'user' ? `<p>${this.escapeHtml(content)}</p>` : content}</div>
        `;

        this.chatMessages.appendChild(msgDiv);
        this.scrollToBottom();
    }

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="chat-avatar"><i class="fas fa-user-tie"></i></div>
            <div class="chat-bubble">
                <div class="chat-typing">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    removeTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Find the best matching answer from the knowledge base
     */
    findAnswer(question) {
        const lowerQuestion = question.toLowerCase();
        let bestMatch = null;
        let bestScore = 0;

        for (const entry of KNOWLEDGE_BASE.entries) {
            let score = 0;

            for (const keyword of entry.keywords) {
                const keywordLower = keyword.toLowerCase();

                // Exact phrase match
                if (lowerQuestion.includes(keywordLower)) {
                    score += keywordLower.split(' ').length * 3;
                }

                // Individual word matching
                const keywordWords = keywordLower.split(' ');
                for (const word of keywordWords) {
                    if (word.length > 2 && lowerQuestion.includes(word)) {
                        score += 1;
                    }
                }
            }

            // Boost for category-related words in question
            const categoryWords = {
                'Buying': ['buy', 'purchase', 'afford', 'buyer', 'looking for home', 'find home'],
                'Selling': ['sell', 'list', 'selling', 'value', 'worth', 'staging'],
                'Mortgage': ['mortgage', 'loan', 'rate', 'financing', 'lender', 'payment'],
                'Seattle Market': ['seattle', 'market', 'trend', 'price', 'area'],
                'NMLS': ['nmls', 'license', 'verify', 'credential'],
                'Agent': ['tracy', 'contact', 'agent', 'broker', 'appointment'],
                'General': ['tax', 'school', 'invest', 'type', 'condo']
            };

            if (categoryWords[entry.category]) {
                for (const catWord of categoryWords[entry.category]) {
                    if (lowerQuestion.includes(catWord)) {
                        score += 0.5;
                    }
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        // If we found a reasonable match, return it
        if (bestMatch && bestScore >= 2) {
            return bestMatch.answer;
        }

        // Try to give a semi-relevant answer based on common words
        if (bestMatch && bestScore >= 1) {
            return bestMatch.answer + `<p style="margin-top: 12px; font-size: 0.85rem; color: #6b7c8d;"><em>Not quite what you were looking for? Try rephrasing your question or <a href="#contact">contact Tracy directly</a> for personalized help.</em></p>`;
        }

        // Default response
        return KNOWLEDGE_BASE.defaultAnswer;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RealEstateChat();
});
