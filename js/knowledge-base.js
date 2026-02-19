/**
 * Tracy Jia Real Estate - Knowledge Base + Live Search Engine
 * 
 * Includes:
 * - Redfin & Zillow URL builders for live property searches
 * - NMLS lender/company lookup
 * - City/neighborhood data for Greater Seattle
 * - Comprehensive Q&A knowledge base
 */

// ============================================
// CITY DATABASE - Redfin city codes + Zillow slugs
// ============================================
const CITY_DATA = {
    'seattle':          { redfin: '16163', state: 'WA', zillow: 'seattle-wa',           name: 'Seattle' },
    'bellevue':         { redfin: '1532',  state: 'WA', zillow: 'bellevue-wa',          name: 'Bellevue' },
    'kirkland':         { redfin: '9471',  state: 'WA', zillow: 'kirkland-wa',          name: 'Kirkland' },
    'redmond':          { redfin: '15997', state: 'WA', zillow: 'redmond-wa',           name: 'Redmond' },
    'bothell':          { redfin: '2175',  state: 'WA', zillow: 'bothell-wa',           name: 'Bothell' },
    'lynnwood':         { redfin: '11383', state: 'WA', zillow: 'lynnwood-wa',          name: 'Lynnwood' },
    'everett':          { redfin: '5765',  state: 'WA', zillow: 'everett-wa',           name: 'Everett' },
    'kenmore':          { redfin: '9136',  state: 'WA', zillow: 'kenmore-wa',           name: 'Kenmore' },
    'lake forest park': { redfin: '9980',  state: 'WA', zillow: 'lake-forest-park-wa',  name: 'Lake Forest Park' },
    'brier':            { redfin: '2499',  state: 'WA', zillow: 'brier-wa',             name: 'Brier' },
    'sammamish':        { redfin: '16438', state: 'WA', zillow: 'sammamish-wa',         name: 'Sammamish' },
    'woodinville':      { redfin: '19636', state: 'WA', zillow: 'woodinville-wa',       name: 'Woodinville' },
    'issaquah':         { redfin: '8513',  state: 'WA', zillow: 'issaquah-wa',          name: 'Issaquah' },
    'renton':           { redfin: '16110', state: 'WA', zillow: 'renton-wa',            name: 'Renton' },
    'tukwila':          { redfin: '18337', state: 'WA', zillow: 'tukwila-wa',           name: 'Tukwila' },
    'auburn':           { redfin: '814',   state: 'WA', zillow: 'auburn-wa',            name: 'Auburn' },
    'lake stevens':     { redfin: '9987',  state: 'WA', zillow: 'lake-stevens-wa',      name: 'Lake Stevens' },
    'mercer island':    { redfin: '12398', state: 'WA', zillow: 'mercer-island-wa',     name: 'Mercer Island' },
    'shoreline':        { redfin: '16971', state: 'WA', zillow: 'shoreline-wa',         name: 'Shoreline' },
    'burien':           { redfin: '2718',  state: 'WA', zillow: 'burien-wa',            name: 'Burien' },
    'kent':             { redfin: '9173',  state: 'WA', zillow: 'kent-wa',              name: 'Kent' },
    'federal way':      { redfin: '5879',  state: 'WA', zillow: 'federal-way-wa',       name: 'Federal Way' },
    'maple valley':     { redfin: '11830', state: 'WA', zillow: 'maple-valley-wa',      name: 'Maple Valley' },
    'covington':        { redfin: '4361',  state: 'WA', zillow: 'covington-wa',         name: 'Covington' },
    'newcastle':        { redfin: '13408', state: 'WA', zillow: 'newcastle-wa',         name: 'Newcastle' },
    'snoqualmie':       { redfin: '17243', state: 'WA', zillow: 'snoqualmie-wa',        name: 'Snoqualmie' },
    'north bend':       { redfin: '13663', state: 'WA', zillow: 'north-bend-wa',        name: 'North Bend' }
};

// Property type mapping
const PROPERTY_TYPES = {
    'house':           { redfin: 'house',      zillow: 'houses',      label: 'Single Family' },
    'single family':   { redfin: 'house',      zillow: 'houses',      label: 'Single Family' },
    'condo':           { redfin: 'condo',      zillow: 'condos',      label: 'Condo' },
    'condominium':     { redfin: 'condo',      zillow: 'condos',      label: 'Condo' },
    'townhouse':       { redfin: 'townhouse',  zillow: 'townhomes',   label: 'Townhouse' },
    'townhome':        { redfin: 'townhouse',  zillow: 'townhomes',   label: 'Townhouse' },
    'multi-family':    { redfin: 'multifamily', zillow: 'multifamily', label: 'Multi-Family' },
    'multifamily':     { redfin: 'multifamily', zillow: 'multifamily', label: 'Multi-Family' },
    'land':            { redfin: 'land',       zillow: 'land',        label: 'Land' },
};

// ============================================
// URL BUILDERS
// ============================================

function buildRedfinUrl(params) {
    const { city, minPrice, maxPrice, minBeds, maxBeds, minBaths, propertyType } = params;
    const cityData = city ? CITY_DATA[city.toLowerCase()] : CITY_DATA['seattle'];
    if (!cityData) return `https://www.redfin.com/state/Washington`;
    
    let url = `https://www.redfin.com/city/${cityData.redfin}/${cityData.state}/${encodeURIComponent(cityData.name)}`;
    
    const filters = [];
    if (propertyType && PROPERTY_TYPES[propertyType.toLowerCase()]) {
        filters.push(`property-type=${PROPERTY_TYPES[propertyType.toLowerCase()].redfin}`);
    }
    if (minPrice) filters.push(`min-price=${minPrice}`);
    if (maxPrice) filters.push(`max-price=${maxPrice}`);
    if (minBeds) filters.push(`min-beds=${minBeds}`);
    if (maxBeds) filters.push(`max-beds=${maxBeds}`);
    if (minBaths) filters.push(`min-baths=${minBaths}`);
    
    if (filters.length > 0) {
        url += '/filter/' + filters.join(',');
    }
    return url;
}

function buildZillowUrl(params) {
    const { city, minPrice, maxPrice, minBeds, minBaths, propertyType } = params;
    const cityData = city ? CITY_DATA[city.toLowerCase()] : CITY_DATA['seattle'];
    if (!cityData) return `https://www.zillow.com/homes/Washington/`;
    
    let url = `https://www.zillow.com/${cityData.zillow}/`;
    
    // Zillow search params
    const qParams = [];
    if (minBeds) qParams.push(`beds-${minBeds}`);
    if (minPrice || maxPrice) {
        const p1 = minPrice || '0';
        const p2 = maxPrice || '';
        qParams.push(`${p1}-${p2}_price`);
    }
    if (qParams.length > 0) {
        url += qParams.join('/') + '/';
    }
    return url;
}

function buildRedfinSoldUrl(params) {
    const { city, minPrice, maxPrice, minBeds, propertyType } = params;
    const cityData = city ? CITY_DATA[city.toLowerCase()] : CITY_DATA['seattle'];
    if (!cityData) return `https://www.redfin.com/state/Washington`;
    
    let url = `https://www.redfin.com/city/${cityData.redfin}/${cityData.state}/${encodeURIComponent(cityData.name)}`;
    url += '/filter/include=sold-3mo';
    
    if (propertyType && PROPERTY_TYPES[propertyType.toLowerCase()]) {
        url += `,property-type=${PROPERTY_TYPES[propertyType.toLowerCase()].redfin}`;
    }
    if (minPrice) url += `,min-price=${minPrice}`;
    if (maxPrice) url += `,max-price=${maxPrice}`;
    if (minBeds) url += `,min-beds=${minBeds}`;
    
    return url;
}

function buildNmlsUrl(searchTerm) {
    const baseUrl = 'https://www.nmlsconsumeraccess.org/';
    if (searchTerm && /^\d+$/.test(searchTerm.trim())) {
        return `${baseUrl}EntityDetails.aspx/COMPANY/${searchTerm.trim()}`;
    }
    return baseUrl;
}

// ============================================
// QUERY PARSER
// ============================================

function parseSearchQuery(question) {
    const q = question.toLowerCase();
    const result = {
        intent: null,
        city: null,
        minPrice: null,
        maxPrice: null,
        minBeds: null,
        maxBeds: null,
        minBaths: null,
        propertyType: null,
        nmlsQuery: null,
        nmlsType: null,
        isSold: false
    };

    // --- Detect intent ---
    const listingWords = ['listing', 'homes for sale', 'houses for sale', 'find home', 'find house',
        'search home', 'search house', 'looking for', 'buy a home', 'buy a house',
        'show me', 'condos for sale', 'townhomes for sale', 'available', 'on the market',
        'for sale', 'what homes', 'any homes', 'properties', 'bedroom', 'bed ', 'bath ',
        'under $', 'price range', 'how much', 'affordable'];
    
    const soldWords = ['sold', 'recently sold', 'sold homes', 'past sales', 'sale history', 'comps', 'comparable'];
    
    const nmlsWords = ['nmls', 'verify lender', 'check lender', 'loan officer', 
        'mortgage company', 'lender license', 'nmls number', 'nmls lookup', 'lookup lender',
        'verify mortgage', 'lender credentials'];

    const isListing = listingWords.some(kw => q.includes(kw));
    const isSold = soldWords.some(kw => q.includes(kw));
    const isNmls = nmlsWords.some(kw => q.includes(kw));

    if (isNmls) {
        result.intent = 'nmls_lookup';
        const nmlsNumMatch = q.match(/nmls\s*#?\s*(\d+)/i) || q.match(/#\s*(\d{4,})/);
        if (nmlsNumMatch) result.nmlsQuery = nmlsNumMatch[1];
        result.nmlsType = q.includes('company') || q.includes('bank') ? 'company' : 'individual';
        return result;
    }

    if (isSold) {
        result.intent = 'search_sold';
        result.isSold = true;
    } else if (isListing) {
        result.intent = 'search_listing';
    }

    // --- Extract city (longest match first) ---
    const cityKeys = Object.keys(CITY_DATA).sort((a, b) => b.length - a.length);
    for (const key of cityKeys) {
        if (q.includes(key)) {
            result.city = key;
            break;
        }
    }

    // --- Extract price ---
    // "under $500k", "below 800000", "max 1.5m"
    const underMatch = q.match(/(?:under|below|max|up to|less than|no more than|budget|cheaper than)\s*\$?\s*([\d,.]+)\s*(k|m|million|thousand)?/i);
    if (underMatch) result.maxPrice = normalizePrice(underMatch[1], underMatch[2]);

    // "over $500k", "above 500000", "min 1m"
    const overMatch = q.match(/(?:over|above|min|at least|starting at?|more than|from|minimum)\s*\$?\s*([\d,.]+)\s*(k|m|million|thousand)?/i);
    if (overMatch) result.minPrice = normalizePrice(overMatch[1], overMatch[2]);

    // "$500k - $800k" or "$500,000 to $800,000"
    const rangeMatch = q.match(/\$\s*([\d,.]+)\s*(k|m)?\s*(?:-|to|~|and)\s*\$?\s*([\d,.]+)\s*(k|m)?/i);
    if (rangeMatch && !result.minPrice && !result.maxPrice) {
        result.minPrice = normalizePrice(rangeMatch[1], rangeMatch[2]);
        result.maxPrice = normalizePrice(rangeMatch[3], rangeMatch[4]);
    }

    // --- Extract bedrooms ---
    const bedMatch = q.match(/(\d+)\s*(?:bed|br|bedroom|bd)/i);
    if (bedMatch) result.minBeds = parseInt(bedMatch[1]);

    // --- Extract bathrooms ---
    const bathMatch = q.match(/(\d+)\s*(?:bath|ba|bathroom)/i);
    if (bathMatch) result.minBaths = parseInt(bathMatch[1]);

    // --- Extract property type ---
    const typeKeys = Object.keys(PROPERTY_TYPES).sort((a, b) => b.length - a.length);
    for (const key of typeKeys) {
        if (q.includes(key)) {
            result.propertyType = key;
            break;
        }
    }

    // If we have search criteria but no explicit intent, treat as listing search
    if (!result.intent && (result.city || result.minPrice || result.maxPrice || result.minBeds || result.propertyType)) {
        result.intent = 'search_listing';
    }

    if (!result.intent) result.intent = 'general_qa';
    return result;
}

function normalizePrice(numStr, suffix) {
    let num = parseFloat(numStr.replace(/,/g, ''));
    if (suffix) {
        const s = suffix.toLowerCase();
        if (s === 'k' || s === 'thousand') num *= 1000;
        else if (s === 'm' || s === 'million') num *= 1000000;
    }
    if (num > 0 && num < 100 && !suffix) num *= 1000;
    return Math.round(num);
}

function formatPrice(num) {
    if (!num) return '';
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1).replace('.0', '')}M`;
    if (num >= 1000) return `$${Math.round(num / 1000)}K`;
    return `$${num.toLocaleString()}`;
}

// ============================================
// NMLS RESOURCE LINKS
// ============================================
const NMLS_RESOURCES = {
    consumerAccess:  'https://www.nmlsconsumeraccess.org/',
    mortgageSearch:  'https://www.nmlsconsumeraccess.org/FindAMortgageProfessional.aspx',
    stateInfo:       'https://mortgage.nationwidelicensingsystem.org/about/Pages/default.aspx',
    news:            'https://mortgage.nationwidelicensingsystem.org/news/Pages/default.aspx',
    announcements:   'https://mortgage.nationwidelicensingsystem.org/news/Pages/Announcements.aspx',
    education:       'https://mortgage.nationwidelicensingsystem.org/profreq/Pages/default.aspx',
    stateAgencies:   'https://mortgage.nationwidelicensingsystem.org/slr/Pages/default.aspx',
    waState:         'https://mortgage.nationwidelicensingsystem.org/slr/Pages/DynamicLicenses.aspx?state=WA',
    resourceCenter:  'https://mortgage.nationwidelicensingsystem.org/consumer/Pages/default.aspx',
    industryUpdates: 'https://mortgage.nationwidelicensingsystem.org/news/Pages/Industry-Letters.aspx'
};

// ============================================
// KNOWLEDGE BASE - Q&A entries
// ============================================
const KNOWLEDGE_BASE = {
    agent: {
        name: "Tracy Jia",
        title: "Real Estate Broker",
        brokerage: "Best Choice Realty",
        phone: "(425) 985-7833",
        email: "Tracy.Jia.Realestate@gmail.com",
        office: "16400 Southcenter Prky Ste 306, Tukwila, WA 98188",
        experience: "9+ years",
        languages: ["English", "Mandarin"],
        serviceAreas: ["Bellevue", "Bothell", "Brier", "Everett", "Kirkland", "Lake Forest Park", "Lynnwood", "Kenmore", "Redmond"],
        zillow: "https://www.zillow.com/profile/TracyJia2020",
        linkedin: "https://www.linkedin.com/in/tracy-jia-a82778107/"
    },

    entries: [
        {
            keywords: ["buy home", "buying process", "home buying", "purchase home", "buy house", "steps to buy", "how to buy", "first time buyer", "first-time"],
            answer: `<p><strong>Home Buying Process in Washington State:</strong></p>
<ol>
<li>📋 <strong>Get Pre-Approved</strong> — Verify your lender at <a href="https://www.nmlsconsumeraccess.org/" target="_blank">NMLS Consumer Access</a></li>
<li>🔍 <strong>Find Your Home</strong> — Search on <a href="https://www.redfin.com/city/1532/WA/Bellevue" target="_blank">Redfin</a> or <a href="https://www.zillow.com/bellevue-wa/" target="_blank">Zillow</a></li>
<li>💰 <strong>Make an Offer</strong> — Tracy negotiated $120K under list for a recent buyer</li>
<li>🔎 <strong>Inspection & Appraisal</strong></li>
<li>📝 <strong>Close</strong> — Typically 30-45 days</li>
</ol>
<p>💡 <strong>Tip:</strong> Ask me <em>"Show me 3 bedroom homes in Bellevue under $1.5M"</em> and I'll search Redfin & Zillow for you!</p>
<p><a href="#contact">Contact Tracy</a> to get started.</p>`
        },
        {
            keywords: ["sell home", "selling process", "sell house", "list home", "listing", "how to sell", "selling tips", "best price"],
            answer: `<p><strong>Selling Your Home with Tracy:</strong></p>
<ol>
<li>📊 <strong>CMA Pricing</strong> — Using data from <a href="https://www.redfin.com/city/16163/WA/Seattle/housing-market" target="_blank">Redfin</a> and <a href="https://www.zillow.com/seattle-wa/home-values/" target="_blank">Zillow</a></li>
<li>🎨 <strong>Stage & Prep</strong></li>
<li>📸 <strong>Professional Marketing</strong> — Listed across MLS, Zillow, Redfin</li>
<li>💰 <strong>Negotiate & Close</strong></li>
</ol>
<p>Check your home value: <a href="https://www.zillow.com/how-much-is-my-home-worth/" target="_blank">Zillow Zestimate</a> | <a href="https://www.redfin.com/what-is-my-home-worth" target="_blank">Redfin Estimate</a></p>
<p><a href="#contact">Get a free CMA from Tracy</a>!</p>`
        },
        {
            keywords: ["mortgage rate", "interest rate", "current rate", "mortgage rates", "rate today"],
            answer: `<p><strong>Current Mortgage Rates:</strong></p>
<p>Rates change daily. Check the latest:</p>
<ul>
<li>📊 <a href="https://www.zillow.com/mortgage-rates/" target="_blank">Zillow Mortgage Rates</a></li>
<li>📈 <a href="https://www.redfin.com/mortgage/mortgage-rates" target="_blank">Redfin Mortgage Rates</a></li>
<li>🧮 <a href="https://www.zillow.com/mortgage-calculator/" target="_blank">Zillow Mortgage Calculator</a></li>
</ul>
<p>⚠️ <strong>Always verify your lender:</strong> <a href="https://www.nmlsconsumeraccess.org/" target="_blank">NMLS Consumer Access</a> | <a href="https://mortgage.nationwidelicensingsystem.org/news/Pages/default.aspx" target="_blank">NMLS News</a></p>`
        },
        {
            keywords: ["mortgage", "loan type", "fha", "conventional", "va loan", "jumbo", "financing", "loan option", "down payment"],
            answer: `<p><strong>Mortgage Loan Types:</strong></p>
<ul>
<li>🏛️ <strong>Conventional:</strong> 5-20% down, 620+ credit</li>
<li>🏠 <strong>FHA:</strong> 3.5% down, 580+ credit</li>
<li>🎖️ <strong>VA:</strong> 0% down for veterans</li>
<li>💎 <strong>Jumbo:</strong> For loans over $766,550 (common in Seattle)</li>
</ul>
<p><strong>Verify any lender:</strong> <a href="https://www.nmlsconsumeraccess.org/" target="_blank">NMLS Consumer Access</a> | <a href="https://www.nmlsconsumeraccess.org/FindAMortgageProfessional.aspx" target="_blank">Find a Mortgage Professional</a></p>
<p><strong>WA State licensing:</strong> <a href="https://mortgage.nationwidelicensingsystem.org/slr/Pages/DynamicLicenses.aspx?state=WA" target="_blank">WA NMLS Licenses</a></p>`
        },
        {
            keywords: ["nmls", "nmls number", "lender license", "mortgage license", "consumer access", "verify lender", "nmls lookup", "nmls news"],
            answer: `<p><strong>NMLS Resources & Lookup:</strong></p>
<div class="chat-links-grid">
<p>🔍 <a href="https://www.nmlsconsumeraccess.org/" target="_blank"><strong>NMLS Consumer Access</strong></a> — Look up any mortgage company or loan officer by name or NMLS#</p>
<p>👤 <a href="https://www.nmlsconsumeraccess.org/FindAMortgageProfessional.aspx" target="_blank"><strong>Find a Mortgage Professional</strong></a> — Search by name, NMLS#, or location</p>
<p>📰 <a href="https://mortgage.nationwidelicensingsystem.org/news/Pages/default.aspx" target="_blank"><strong>NMLS News & Updates</strong></a> — Latest industry news</p>
<p>📋 <a href="https://mortgage.nationwidelicensingsystem.org/news/Pages/Announcements.aspx" target="_blank"><strong>NMLS Announcements</strong></a> — Filing deadlines & system alerts</p>
<p>📨 <a href="https://mortgage.nationwidelicensingsystem.org/news/Pages/Industry-Letters.aspx" target="_blank"><strong>Industry Letters</strong></a> — Official NMLS communications</p>
<p>🎓 <a href="https://mortgage.nationwidelicensingsystem.org/profreq/Pages/default.aspx" target="_blank"><strong>Professional Requirements</strong></a> — Education & licensing info</p>
<p>🏛️ <a href="https://mortgage.nationwidelicensingsystem.org/slr/Pages/default.aspx" target="_blank"><strong>State Regulators</strong></a> — Find your state agency</p>
<p>📍 <a href="https://mortgage.nationwidelicensingsystem.org/slr/Pages/DynamicLicenses.aspx?state=WA" target="_blank"><strong>Washington State Licenses</strong></a></p>
<p>📖 <a href="https://mortgage.nationwidelicensingsystem.org/consumer/Pages/default.aspx" target="_blank"><strong>Consumer Resource Center</strong></a></p>
</div>
<p>💡 <strong>Tip:</strong> Ask me <em>"Verify NMLS #12345"</em> to look up a specific lender!</p>`
        },
        {
            keywords: ["closing cost", "closing costs", "fees", "how much closing"],
            answer: `<p><strong>Closing Costs in Washington (2-5% of purchase price):</strong></p>
<p><strong>Buyer:</strong> Loan origination (0.5-1%), appraisal ($400-$700), inspection ($350-$600), title insurance, escrow, prepaid taxes/insurance.</p>
<p><strong>Seller:</strong> Agent commissions, WA excise tax (1.1-3%), title insurance, negotiated repairs.</p>
<p>Use <a href="https://www.zillow.com/mortgage-calculator/" target="_blank">Zillow's Calculator</a> for estimates. <a href="#contact">Ask Tracy</a> for a detailed breakdown.</p>`
        },
        {
            keywords: ["inspection", "home inspection", "inspector"],
            answer: `<p><strong>Home Inspections ($400-$700):</strong></p>
<p>Covers structure, roof, plumbing, electrical, HVAC, foundation. In Seattle's wet climate, pay attention to:</p>
<ul><li>🌧️ Roof & drainage</li><li>💧 Water intrusion in basements/crawl spaces</li><li>🌲 Trees near foundation</li></ul>
<p>Additional: sewer scope ($200-$350), radon ($150+), pest inspection. Tracy can refer trusted inspectors.</p>`
        },
        {
            keywords: ["property tax", "tax", "taxes"],
            answer: `<p><strong>WA Property Taxes:</strong></p>
<p>No state income tax! Property tax approximately 0.9-1.1% of assessed value. King County: $8-$12 per $1,000.</p>
<p><a href="https://www.zillow.com/mortgage-calculator/" target="_blank">Estimate total monthly payment on Zillow</a></p>`
        },
        {
            keywords: ["school", "schools", "school district", "education"],
            answer: `<p><strong>Top School Districts in Tracy's Service Areas:</strong></p>
<ul>
<li>🎓 <strong>Bellevue SD</strong> — Top-ranked in WA, strong STEM</li>
<li>🎓 <strong>Lake Washington SD</strong> (Kirkland/Redmond) — Excellent ratings</li>
<li>🎓 <strong>Northshore SD</strong> (Bothell/Kenmore) — Strong academics</li>
</ul>
<p>Check school ratings by address: <a href="https://www.redfin.com/school" target="_blank">Redfin Schools</a> | <a href="https://www.zillow.com/bellevue-wa/" target="_blank">Zillow</a></p>`
        },
        {
            keywords: ["seattle market", "market trend", "housing market", "market condition", "market update"],
            answer: `<p><strong>Seattle Area Market:</strong></p>
<p>Strong demand driven by tech (Microsoft, Amazon, Google, Meta). Eastside continues to appreciate.</p>
<ul>
<li>📊 <a href="https://www.redfin.com/city/16163/WA/Seattle/housing-market" target="_blank">Redfin Seattle Market Report</a></li>
<li>📈 <a href="https://www.zillow.com/seattle-wa/home-values/" target="_blank">Zillow Seattle Home Values</a></li>
<li>📉 <a href="https://www.redfin.com/news/housing-market-tracker" target="_blank">Redfin Housing Market Tracker</a></li>
</ul>
<p>💡 Try: <em>"Show me homes in Bellevue under $1.5M"</em> to search live listings!</p>`
        },
        {
            keywords: ["why tracy", "why choose", "about tracy", "tracy experience"],
            answer: `<p><strong>Why Work with Tracy Jia?</strong></p>
<ul>
<li>⭐ 5.0 rating on <a href="https://www.zillow.com/profile/TracyJia2020" target="_blank">Zillow</a></li>
<li>📊 Market research background — data-driven insights</li>
<li>🏠 24 completed sales, $415K-$1.9M range</li>
<li>💰 Negotiated $120K under list for a recent buyer</li>
<li>🗣️ English & Mandarin (中文)</li>
<li>📍 9+ Eastside & Seattle cities</li>
</ul>`
        },
        {
            keywords: ["contact tracy", "reach tracy", "phone", "email", "call"],
            answer: `<p><strong>Contact Tracy:</strong></p>
<ul>
<li>📞 <a href="tel:+14259857833">(425) 985-7833</a></li>
<li>📧 <a href="mailto:Tracy.Jia.Realestate@gmail.com">Tracy.Jia.Realestate@gmail.com</a></li>
<li>🏢 Best Choice Realty, 16400 Southcenter Prky Ste 306, Tukwila, WA 98188</li>
<li>🔗 <a href="https://www.linkedin.com/in/tracy-jia-a82778107/" target="_blank">LinkedIn</a> | <a href="https://www.zillow.com/profile/TracyJia2020" target="_blank">Zillow</a></li>
</ul>`
        },
        {
            keywords: ["mandarin", "chinese", "中文", "华人"],
            answer: `<p><strong>中文服务 / Mandarin Services:</strong></p>
<p>Tracy 会说中文，可以为华人客户提供买房、卖房、市场分析、贷款指导等全面的房地产服务。</p>
<p>📞 <a href="tel:+14259857833">(425) 985-7833</a> | 📧 <a href="mailto:Tracy.Jia.Realestate@gmail.com">Email</a></p>`
        },
        {
            keywords: ["investment", "invest", "rental property", "roi", "cash flow"],
            answer: `<p><strong>Seattle Area Investment:</strong></p>
<p>Strong appreciation, high rental demand near tech campuses.</p>
<ul>
<li><a href="https://www.redfin.com/city/1532/WA/Bellevue/filter/property-type=multifamily" target="_blank">Multi-family on Redfin (Bellevue)</a></li>
<li><a href="https://www.redfin.com/city/16163/WA/Seattle/filter/property-type=multifamily" target="_blank">Multi-family on Redfin (Seattle)</a></li>
</ul>
<p>Tracy offers Property Management services. <a href="#contact">Discuss strategy</a>!</p>`
        },
        {
            keywords: ["relocation", "relocating", "moving to seattle", "new to seattle"],
            answer: `<p><strong>Relocating to Seattle?</strong></p>
<ul>
<li>💼 Tech hub: Microsoft, Amazon, Google, Meta, Boeing</li>
<li>💰 No state income tax</li>
<li>🌧️ Mild climate, rainy winters, beautiful summers</li>
</ul>
<p>Browse: <a href="https://www.redfin.com/city/16163/WA/Seattle/neighborhoods" target="_blank">Redfin Seattle Neighborhoods</a> | <a href="https://www.zillow.com/seattle-wa/" target="_blank">Zillow</a></p>
<p>Tracy speaks English & Mandarin. <a href="#contact">Get in touch</a>!</p>`
        },
        {
            keywords: ["home value", "home worth", "zestimate", "property value", "how much is my home"],
            answer: `<p><strong>Check Your Home's Value:</strong></p>
<ul>
<li>🏠 <a href="https://www.zillow.com/how-much-is-my-home-worth/" target="_blank">Zillow Zestimate</a></li>
<li>📊 <a href="https://www.redfin.com/what-is-my-home-worth" target="_blank">Redfin Home Value Estimate</a></li>
</ul>
<p>For the most accurate valuation, <a href="#contact">ask Tracy for a free CMA</a>.</p>`
        },
        {
            keywords: ["offer", "make offer", "competitive offer", "bidding war", "multiple offers"],
            answer: `<p><strong>Making a Competitive Offer:</strong></p>
<ul>
<li>📋 Include pre-approval letter (verify lender at <a href="https://www.nmlsconsumeraccess.org/" target="_blank">NMLS</a>)</li>
<li>💰 Earnest money: 1-3% in Seattle area</li>
<li>📊 Tracy analyzes comps from <a href="https://www.redfin.com" target="_blank">Redfin</a> & <a href="https://www.zillow.com" target="_blank">Zillow</a></li>
<li>⏱️ Clean terms + quick close timeline</li>
</ul>
<p>Tracy saved a buyer <strong>$120K under list</strong> in Redmond. <a href="#contact">Let Tracy help</a>!</p>`
        },
        {
            keywords: ["open house", "open houses", "tour", "showing", "visit"],
            answer: `<p><strong>Find Open Houses:</strong></p>
<ul>
<li>🏠 <a href="https://www.redfin.com/city/1532/WA/Bellevue/filter/open-house=true" target="_blank">Redfin Open Houses — Bellevue</a></li>
<li>🏠 <a href="https://www.redfin.com/city/9471/WA/Kirkland/filter/open-house=true" target="_blank">Redfin Open Houses — Kirkland</a></li>
<li>🏠 <a href="https://www.redfin.com/city/15997/WA/Redmond/filter/open-house=true" target="_blank">Redfin Open Houses — Redmond</a></li>
<li>🏠 <a href="https://www.zillow.com/bellevue-wa/open-houses/" target="_blank">Zillow Open Houses — Bellevue</a></li>
</ul>
<p>Tracy can schedule private showings for you. <a href="#contact">Contact Tracy</a>!</p>`
        },
        {
            keywords: ["new construction", "new build", "new homes", "newly built"],
            answer: `<p><strong>New Construction Homes:</strong></p>
<ul>
<li>🏗️ <a href="https://www.redfin.com/city/1532/WA/Bellevue/filter/property-type=house,min-year-built=2024" target="_blank">New Homes — Bellevue (Redfin)</a></li>
<li>🏗️ <a href="https://www.redfin.com/city/15997/WA/Redmond/filter/property-type=house,min-year-built=2024" target="_blank">New Homes — Redmond (Redfin)</a></li>
<li>🏗️ <a href="https://www.zillow.com/bellevue-wa/new-construction/" target="_blank">New Construction — Bellevue (Zillow)</a></li>
</ul>
<p><a href="#contact">Ask Tracy</a> about upcoming developments!</p>`
        }
    ],

    defaultAnswer: `<p>I'd be happy to help! Here are some things I can do:</p>
<ul>
<li>🔍 <strong>Search listings:</strong> <em>"Show me 3 bed homes in Kirkland under $1M"</em></li>
<li>🏠 <strong>Recently sold:</strong> <em>"Sold homes in Bellevue over $1M"</em></li>
<li>📊 <strong>Market info:</strong> <em>"What's the Bellevue market like?"</em></li>
<li>🔒 <strong>NMLS lookup:</strong> <em>"How do I verify a mortgage lender?"</em></li>
<li>💰 <strong>Mortgage info:</strong> <em>"What are current mortgage rates?"</em></li>
<li>📋 <strong>Process help:</strong> <em>"How do I buy a home?"</em></li>
<li>🏠 <strong>Open houses:</strong> <em>"Show me open houses in Kirkland"</em></li>
</ul>
<p>Or contact Tracy: <a href="tel:+14259857833">(425) 985-7833</a> | <a href="mailto:Tracy.Jia.Realestate@gmail.com">Email</a></p>`
};
