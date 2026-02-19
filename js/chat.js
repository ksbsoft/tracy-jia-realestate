/**
 * Tracy Jia Real Estate - Chat Engine
 * 
 * Handles:
 * - Listing searches → Redfin & Zillow URLs
 * - NMLS lookup → NMLS Consumer Access
 * - General Q&A → Knowledge base matching
 */

class ChatEngine {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendMessage');
        this.quickBtns = document.querySelectorAll('.quick-btn');
        this.isTyping = false;

        this.init();
    }

    init() {
        // Send button
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.handleSend());
        }

        // Enter key
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSend();
                }
            });
        }

        // Quick buttons
        this.quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question || btn.textContent.trim();
                this.chatInput.value = question;
                this.handleSend();
            });
        });
    }

    handleSend() {
        const message = this.chatInput.value.trim();
        if (!message || this.isTyping) return;

        this.addMessage(message, 'user');
        this.chatInput.value = '';
        this.processQuery(message);
    }

    addMessage(content, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${type}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'user' 
            ? '<i class="fas fa-user"></i>' 
            : '<i class="fas fa-home"></i>';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = content;

        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
        this.chatMessages.appendChild(msgDiv);

        this.scrollToBottom();
        return bubble;
    }

    showTyping() {
        this.isTyping = true;
        const typing = document.createElement('div');
        typing.className = 'chat-message assistant typing-indicator';
        typing.id = 'typingIndicator';
        typing.innerHTML = `
            <div class="message-avatar"><i class="fas fa-home"></i></div>
            <div class="message-bubble">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>`;
        this.chatMessages.appendChild(typing);
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    processQuery(question) {
        this.showTyping();
        
        // Small delay for UX
        setTimeout(() => {
            this.hideTyping();
            const parsed = parseSearchQuery(question);

            switch (parsed.intent) {
                case 'search_listing':
                    this.handleListingSearch(parsed, question);
                    break;
                case 'search_sold':
                    this.handleSoldSearch(parsed, question);
                    break;
                case 'nmls_lookup':
                    this.handleNmlsLookup(parsed, question);
                    break;
                default:
                    this.handleGeneralQA(question);
                    break;
            }
        }, 600 + Math.random() * 400);
    }

    // ================================
    // LISTING SEARCH
    // ================================
    handleListingSearch(params, question) {
        const cityName = params.city 
            ? CITY_DATA[params.city.toLowerCase()]?.name || params.city 
            : 'Seattle area';
        
        // Build description of search criteria
        const criteria = [];
        if (params.minBeds) criteria.push(`${params.minBeds}+ beds`);
        if (params.minBaths) criteria.push(`${params.minBaths}+ baths`);
        if (params.propertyType && PROPERTY_TYPES[params.propertyType]) {
            criteria.push(PROPERTY_TYPES[params.propertyType].label);
        }
        if (params.minPrice && params.maxPrice) {
            criteria.push(`${formatPrice(params.minPrice)} – ${formatPrice(params.maxPrice)}`);
        } else if (params.maxPrice) {
            criteria.push(`under ${formatPrice(params.maxPrice)}`);
        } else if (params.minPrice) {
            criteria.push(`over ${formatPrice(params.minPrice)}`);
        }

        const criteriaText = criteria.length > 0 
            ? criteria.join(', ') 
            : 'all listings';

        const redfinUrl = buildRedfinUrl(params);
        const zillowUrl = buildZillowUrl(params);

        const html = `
            <p>🔍 <strong>Found listings for: ${cityName}</strong></p>
            <p class="search-criteria">${criteriaText}</p>
            <div class="search-result-cards">
                <a href="${redfinUrl}" target="_blank" class="search-card redfin-card">
                    <div class="card-icon"><i class="fas fa-search-location"></i></div>
                    <div class="card-info">
                        <strong>Search on Redfin</strong>
                        <span>${criteriaText} in ${cityName}</span>
                    </div>
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="${zillowUrl}" target="_blank" class="search-card zillow-card">
                    <div class="card-icon"><i class="fas fa-home"></i></div>
                    <div class="card-info">
                        <strong>Search on Zillow</strong>
                        <span>${criteriaText} in ${cityName}</span>
                    </div>
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
            <p class="search-tip">💡 Refine your search: try adding beds, baths, or price range.<br>
            Example: <em>"3 bed 2 bath homes in ${cityName} under $1.5M"</em></p>
            <p>Want to visit any of these? <a href="#contact"><strong>Contact Tracy</strong></a> to schedule a showing!</p>`;

        this.addMessage(html, 'assistant');
    }

    // ================================
    // SOLD HOMES SEARCH
    // ================================
    handleSoldSearch(params, question) {
        const cityName = params.city 
            ? CITY_DATA[params.city.toLowerCase()]?.name || params.city 
            : 'Seattle area';

        const criteria = [];
        if (params.minBeds) criteria.push(`${params.minBeds}+ beds`);
        if (params.maxPrice) criteria.push(`under ${formatPrice(params.maxPrice)}`);
        if (params.minPrice) criteria.push(`over ${formatPrice(params.minPrice)}`);

        const criteriaText = criteria.length > 0 ? criteria.join(', ') : 'recent sales';
        const soldUrl = buildRedfinSoldUrl(params);

        const zillowCity = params.city 
            ? CITY_DATA[params.city.toLowerCase()]?.zillow || 'seattle-wa' 
            : 'seattle-wa';

        const html = `
            <p>📊 <strong>Recently Sold Homes in ${cityName}</strong></p>
            <p class="search-criteria">${criteriaText}</p>
            <div class="search-result-cards">
                <a href="${soldUrl}" target="_blank" class="search-card redfin-card">
                    <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                    <div class="card-info">
                        <strong>Sold Homes — Redfin</strong>
                        <span>Last 3 months in ${cityName}</span>
                    </div>
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="https://www.zillow.com/${zillowCity}/sold/" target="_blank" class="search-card zillow-card">
                    <div class="card-icon"><i class="fas fa-chart-bar"></i></div>
                    <div class="card-info">
                        <strong>Sold Homes — Zillow</strong>
                        <span>Recent sales in ${cityName}</span>
                    </div>
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
            <p class="search-tip">Need a detailed CMA (Comparative Market Analysis)? <a href="#contact"><strong>Ask Tracy</strong></a> for a free report!</p>`;

        this.addMessage(html, 'assistant');
    }

    // ================================
    // NMLS LOOKUP
    // ================================
    handleNmlsLookup(params, question) {
        let html = '';

        if (params.nmlsQuery) {
            const lookupUrl = buildNmlsUrl(params.nmlsQuery);
            html = `
                <p>🔒 <strong>NMLS Lookup: #${params.nmlsQuery}</strong></p>
                <div class="search-result-cards">
                    <a href="${lookupUrl}" target="_blank" class="search-card nmls-card">
                        <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
                        <div class="card-info">
                            <strong>View NMLS Record #${params.nmlsQuery}</strong>
                            <span>NMLS Consumer Access</span>
                        </div>
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                <p class="search-tip">This will show licensing status, authorized states, and history for NMLS #${params.nmlsQuery}.</p>`;
        } else {
            html = `
                <p>🔒 <strong>NMLS Lender Verification</strong></p>
                <p>Always verify your mortgage lender before sharing personal information!</p>
                <div class="search-result-cards">
                    <a href="${NMLS_RESOURCES.consumerAccess}" target="_blank" class="search-card nmls-card">
                        <div class="card-icon"><i class="fas fa-search"></i></div>
                        <div class="card-info">
                            <strong>NMLS Consumer Access</strong>
                            <span>Look up any lender by name or NMLS#</span>
                        </div>
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="${NMLS_RESOURCES.mortgageSearch}" target="_blank" class="search-card nmls-card">
                        <div class="card-icon"><i class="fas fa-user-shield"></i></div>
                        <div class="card-info">
                            <strong>Find a Mortgage Professional</strong>
                            <span>Search by name, NMLS#, or location</span>
                        </div>
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    <a href="${NMLS_RESOURCES.waState}" target="_blank" class="search-card nmls-card">
                        <div class="card-icon"><i class="fas fa-map-marker-alt"></i></div>
                        <div class="card-info">
                            <strong>WA State Licenses</strong>
                            <span>Washington state licensing info</span>
                        </div>
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
                <p class="search-tip">💡 Tip: Ask me <em>"Verify NMLS #12345"</em> to look up a specific lender.</p>`;
        }

        // Add NMLS news section
        html += `
            <div class="nmls-news-section">
                <p><strong>📰 NMLS News & Resources:</strong></p>
                <ul class="nmls-links">
                    <li><a href="${NMLS_RESOURCES.news}" target="_blank">📰 NMLS News & Updates</a></li>
                    <li><a href="${NMLS_RESOURCES.announcements}" target="_blank">📋 Announcements & Filing Deadlines</a></li>
                    <li><a href="${NMLS_RESOURCES.industryUpdates}" target="_blank">📨 Industry Letters</a></li>
                    <li><a href="${NMLS_RESOURCES.education}" target="_blank">🎓 Professional Requirements</a></li>
                    <li><a href="${NMLS_RESOURCES.resourceCenter}" target="_blank">📖 Consumer Resource Center</a></li>
                </ul>
            </div>`;

        this.addMessage(html, 'assistant');
    }

    // ================================
    // GENERAL Q&A
    // ================================
    handleGeneralQA(question) {
        const q = question.toLowerCase();
        let bestMatch = null;
        let bestScore = 0;

        for (const entry of KNOWLEDGE_BASE.entries) {
            let score = 0;
            for (const keyword of entry.keywords) {
                if (q.includes(keyword)) {
                    score += keyword.split(' ').length; // multi-word matches score higher
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        if (bestMatch && bestScore > 0) {
            this.addMessage(bestMatch.answer, 'assistant');
        } else {
            this.addMessage(KNOWLEDGE_BASE.defaultAnswer, 'assistant');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.chatEngine = new ChatEngine();
});
