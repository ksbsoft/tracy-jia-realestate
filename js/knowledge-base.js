/**
 * Tracy Jia Real Estate - Knowledge Base
 * 
 * Comprehensive Q&A knowledge base powered by information from
 * Zillow, Redfin, NMLS, and general real estate expertise.
 * Covers: Seattle market, buying/selling process, mortgage, financing, etc.
 */

const KNOWLEDGE_BASE = {

    // ============================================
    // AGENT INFORMATION
    // ============================================
    agent: {
        name: "Tracy Jia",
        pronouns: "She/Her/Hers",
        title: "Real Estate Broker",
        brokerage: "Best Choice Realty",
        phone: "(425) 985-7833",
        email: "Tracy.Jia.Realestate@gmail.com",
        office: "16400 Southcenter Prky Ste 306, Tukwila, WA 98188",
        experience: "9+ years",
        languages: ["English", "Mandarin"],
        specialties: ["Buyer's Agent", "Listing Agent", "Property Management"],
        serviceAreas: ["Bellevue", "Bothell", "Brier", "Everett", "Kirkland", "Lake Forest Park", "Lynnwood", "Kenmore", "Redmond"],
        totalSales: 24,
        avgPrice: "$1.1M",
        priceRange: "$415K - $1.9M",
        rating: "5.0",
        reviews: 3,
        zillow: "https://www.zillow.com/profile/TracyJia2020",
        linkedin: "https://www.linkedin.com/in/tracy-jia-a82778107/"
    },

    // ============================================
    // Q&A ENTRIES - Categorized
    // ============================================
    entries: [
        // ----- SEATTLE MARKET -----
        {
            keywords: ["seattle market", "market trend", "housing market", "market condition", "market update", "real estate market", "market overview"],
            category: "Seattle Market",
            answer: `<p><strong>Seattle & Eastside Real Estate Market Overview:</strong></p>
<p>The Greater Seattle area remains one of the most dynamic housing markets in the US. Here are key trends:</p>
<ul>
<li>📈 <strong>Median home prices</strong> in the Seattle metro area have shown steady appreciation over the past decade</li>
<li>🏘️ <strong>Eastside cities</strong> (Bellevue, Kirkland, Redmond) continue to see strong demand, driven by tech industry growth</li>
<li>⏱️ <strong>Days on market</strong> vary by neighborhood — competitive areas see homes under contract within 1-2 weeks</li>
<li>📊 For the latest data, check <a href="https://www.zillow.com/seattle-wa/home-values/" target="_blank">Zillow's Seattle Market Overview</a> or <a href="https://www.redfin.com/city/16163/WA/Seattle/housing-market" target="_blank">Redfin's Seattle Housing Market</a></li>
</ul>
<p>Want specific insights for a particular neighborhood? <a href="#contact">Reach out to Tracy</a> for a personalized market analysis!</p>`
        },
        {
            keywords: ["bellevue", "bellevue home", "bellevue price", "bellevue market", "bellevue real estate"],
            category: "Seattle Market",
            answer: `<p><strong>Bellevue Real Estate Market:</strong></p>
<p>Bellevue is one of the most sought-after cities on the Eastside, known for its excellent schools, proximity to tech employers (Microsoft, Meta, Amazon), and vibrant downtown.</p>
<ul>
<li>🏠 <strong>Median home price:</strong> Typically ranges from $1.2M to $2M+ depending on neighborhood</li>
<li>📍 <strong>Hot neighborhoods:</strong> West Bellevue, Crossroads, Factoria, Somerset, Newport</li>
<li>🏗️ <strong>New developments:</strong> Downtown Bellevue has seen significant condo and mixed-use development</li>
<li>🎓 <strong>Schools:</strong> Bellevue School District is consistently ranked among the best in WA</li>
</ul>
<p>Tracy has completed several transactions in Bellevue, including a $1,456,800 sale. <a href="https://www.zillow.com/bellevue-wa/" target="_blank">View current Bellevue listings on Zillow</a></p>`
        },
        {
            keywords: ["kirkland", "kirkland home", "kirkland price", "kirkland market"],
            category: "Seattle Market",
            answer: `<p><strong>Kirkland Real Estate Market:</strong></p>
<p>Kirkland offers a charming waterfront lifestyle on Lake Washington with a vibrant downtown scene.</p>
<ul>
<li>🏠 <strong>Median home price:</strong> Generally $900K–$1.5M+ range</li>
<li>🌊 <strong>Waterfront living:</strong> Lake Washington access is a major draw</li>
<li>🍽️ <strong>Lifestyle:</strong> Excellent restaurants, parks, and community feel</li>
<li>💼 <strong>Google campus</strong> has boosted the local market significantly</li>
</ul>
<p>Tracy recently helped a buyer purchase a $1,149,000 home in Kirkland. <a href="https://www.zillow.com/kirkland-wa/" target="_blank">Explore Kirkland listings</a></p>`
        },
        {
            keywords: ["redmond", "redmond home", "redmond price", "redmond market"],
            category: "Seattle Market",
            answer: `<p><strong>Redmond Real Estate Market:</strong></p>
<p>Home to Microsoft and Nintendo of America, Redmond offers a suburban feel with excellent amenities.</p>
<ul>
<li>🏠 <strong>Median home price:</strong> Typically $1M–$2M range</li>
<li>💻 <strong>Tech hub:</strong> Microsoft campus drives significant housing demand</li>
<li>🚲 <strong>Outdoor amenities:</strong> Marymoor Park, Sammamish River Trail</li>
<li>🎓 <strong>Education:</strong> Lake Washington School District has great ratings</li>
</ul>
<p>Tracy helped a buyer negotiate <strong>$120K under list price</strong> on a $1,975,000 home in Redmond! <a href="https://www.zillow.com/redmond-wa/" target="_blank">View Redmond listings</a></p>`
        },

        // ----- BUYING PROCESS -----
        {
            keywords: ["buy home", "buying process", "home buying", "purchase home", "buy house", "steps to buy", "how to buy", "first time buyer", "first-time"],
            category: "Buying",
            answer: `<p><strong>Home Buying Process in Washington State:</strong></p>
<p>Here's a step-by-step guide to buying a home:</p>
<ol>
<li>📋 <strong>Get Pre-Approved:</strong> Work with a lender to determine your budget. Check <a href="https://www.nmlsconsumeraccess.org/" target="_blank">NMLS Consumer Access</a> to verify your lender's credentials.</li>
<li>🔍 <strong>Find Your Home:</strong> Work with Tracy to identify homes that match your criteria — she covers Bellevue, Kirkland, Redmond, and more.</li>
<li>💰 <strong>Make an Offer:</strong> Tracy will help you craft a competitive offer with the right terms.</li>
<li>🔎 <strong>Home Inspection:</strong> A professional inspection typically costs $400–$700 and is highly recommended.</li>
<li>📄 <strong>Appraisal & Loan Processing:</strong> Your lender orders an appraisal; loan underwriting proceeds.</li>
<li>📝 <strong>Closing:</strong> Sign final documents, transfer funds, and get your keys! Typically takes 30-45 days from offer acceptance.</li>
</ol>
<p>Tracy specializes as a Buyer's Agent with 24 completed sales. <a href="#contact">Contact her</a> to start your home search!</p>`
        },
        {
            keywords: ["pre-approval", "pre-approved", "preapproval", "preapproved", "qualify", "how much can i afford", "afford"],
            category: "Buying",
            answer: `<p><strong>Mortgage Pre-Approval:</strong></p>
<p>Getting pre-approved is the first step in your home buying journey:</p>
<ul>
<li>📄 <strong>What you need:</strong> W-2s, tax returns, pay stubs, bank statements, and credit check</li>
<li>💳 <strong>Credit score:</strong> Generally 620+ for conventional loans, 580+ for FHA</li>
<li>💰 <strong>Down payment:</strong> Conventional (5-20%), FHA (3.5%), VA (0%), USDA (0%)</li>
<li>📊 <strong>Debt-to-income:</strong> Most lenders prefer 43% or lower DTI ratio</li>
<li>⏱️ <strong>Pre-approval duration:</strong> Typically valid for 60-90 days</li>
</ul>
<p>Use <a href="https://www.zillow.com/mortgage-calculator/" target="_blank">Zillow's Mortgage Calculator</a> to estimate your monthly payments. Always verify your lender through <a href="https://www.nmlsconsumeraccess.org/" target="_blank">NMLS Consumer Access</a>.</p>`
        },

        // ----- SELLING PROCESS -----
        {
            keywords: ["sell home", "selling process", "sell house", "list home", "listing", "how to sell", "selling tips", "best price"],
            category: "Selling",
            answer: `<p><strong>Tips for Selling Your Home:</strong></p>
<p>As a listing agent, Tracy can guide you through the selling process:</p>
<ol>
<li>📊 <strong>Pricing Strategy:</strong> Tracy provides a Comparative Market Analysis (CMA) using data from Zillow, Redfin, and MLS to price your home right.</li>
<li>🎨 <strong>Staging & Prep:</strong> First impressions matter — declutter, deep clean, and consider professional staging.</li>
<li>📸 <strong>Professional Marketing:</strong> High-quality photos, virtual tours, and listing on multiple platforms.</li>
<li>🏠 <strong>Open Houses:</strong> Strategic scheduling to maximize buyer exposure.</li>
<li>💰 <strong>Negotiate Offers:</strong> Tracy reviews all offers and negotiates the best terms for you.</li>
<li>📝 <strong>Close the Deal:</strong> Tracy manages all paperwork and coordinates with all parties.</li>
</ol>
<p>Tracy's price range spans $415K to $1.9M with an average of $1.1M. <a href="#contact">Get your free home valuation</a>!</p>`
        },
        {
            keywords: ["home value", "home worth", "zestimate", "property value", "how much is my home worth", "valuation", "cma", "market analysis"],
            category: "Selling",
            answer: `<p><strong>Determining Your Home's Value:</strong></p>
<ul>
<li>🏠 <strong>Zillow Zestimate:</strong> Get an instant estimate at <a href="https://www.zillow.com/zestimate/" target="_blank">Zillow Zestimate</a> — helpful as a starting point but not a substitute for a professional CMA.</li>
<li>📊 <strong>Redfin Estimate:</strong> Check <a href="https://www.redfin.com/what-is-my-home-worth" target="_blank">Redfin's Home Value Tool</a> for another data point.</li>
<li>📋 <strong>Professional CMA:</strong> Tracy can provide a comprehensive Comparative Market Analysis that accounts for your home's unique features, upgrades, and local market conditions.</li>
<li>🔑 <strong>Key factors:</strong> Location, square footage, lot size, condition, recent upgrades, comparable sales, and current market trends.</li>
</ul>
<p><a href="#contact">Contact Tracy</a> for a free, personalized home valuation!</p>`
        },

        // ----- MORTGAGE & FINANCING -----
        {
            keywords: ["mortgage rate", "interest rate", "current rate", "mortgage rates", "rate today"],
            category: "Mortgage",
            answer: `<p><strong>Current Mortgage Rates:</strong></p>
<p>Mortgage rates fluctuate daily based on economic conditions. Here's where to check current rates:</p>
<ul>
<li>📊 <a href="https://www.zillow.com/mortgage-rates/" target="_blank">Zillow Mortgage Rates</a> — Compare rates from multiple lenders</li>
<li>📈 <a href="https://www.redfin.com/mortgage/mortgage-rates" target="_blank">Redfin Mortgage Rates</a> — Current rate trends and analysis</li>
<li>🏦 <strong>Rate types:</strong> 30-year fixed, 15-year fixed, 5/1 ARM, 7/1 ARM, etc.</li>
<li>💡 <strong>Tip:</strong> Even a 0.25% rate difference can save thousands over the life of your loan</li>
</ul>
<p>Always compare offers from multiple lenders and verify credentials at <a href="https://www.nmlsconsumeraccess.org/" target="_blank">NMLS Consumer Access</a>.</p>`
        },
        {
            keywords: ["mortgage", "loan type", "fha", "conventional", "va loan", "jumbo", "financing", "loan option"],
            category: "Mortgage",
            answer: `<p><strong>Mortgage Loan Types:</strong></p>
<ul>
<li>🏛️ <strong>Conventional Loan:</strong> 5-20% down, good credit required (620+). Best rates with 20%+ down (no PMI).</li>
<li>🏠 <strong>FHA Loan:</strong> 3.5% down with 580+ credit score. Government-insured, great for first-time buyers.</li>
<li>🎖️ <strong>VA Loan:</strong> 0% down for eligible veterans and active military. No PMI required.</li>
<li>🌾 <strong>USDA Loan:</strong> 0% down for eligible rural areas. Income limits apply.</li>
<li>💎 <strong>Jumbo Loan:</strong> For homes exceeding conforming loan limits ($766,550 in most areas, higher in some). Common in the Seattle market.</li>
</ul>
<p><strong>Important:</strong> Verify any mortgage lender or loan originator through the <a href="https://www.nmlsconsumeraccess.org/" target="_blank">NMLS Consumer Access</a> database. Use <a href="https://www.zillow.com/mortgage-calculator/" target="_blank">Zillow's Mortgage Calculator</a> to estimate payments.</p>`
        },
        {
            keywords: ["down payment", "how much down", "down payment assistance", "dpa"],
            category: "Mortgage",
            answer: `<p><strong>Down Payment Information:</strong></p>
<ul>
<li>💰 <strong>Conventional:</strong> Minimum 3-5%, but 20% avoids Private Mortgage Insurance (PMI)</li>
<li>🏠 <strong>FHA:</strong> Minimum 3.5% with credit score 580+</li>
<li>🎖️ <strong>VA:</strong> 0% down for eligible veterans</li>
<li>🌾 <strong>USDA:</strong> 0% down for qualifying rural properties</li>
</ul>
<p><strong>Washington State Down Payment Assistance Programs:</strong></p>
<ul>
<li>📋 <strong>WSHFC Home Advantage:</strong> Down payment assistance for first-time and repeat buyers</li>
<li>📋 <strong>House Key Opportunity:</strong> Below-market rate loans with down payment assistance</li>
<li>📋 <strong>HomeChoice Program:</strong> For buyers with disabilities</li>
</ul>
<p>Tracy can connect you with trusted lenders who specialize in these programs. <a href="#contact">Get in touch</a>!</p>`
        },

        // ----- NMLS -----
        {
            keywords: ["nmls", "nmls number", "lender license", "mortgage license", "consumer access", "verify lender", "nmls lookup"],
            category: "NMLS",
            answer: `<p><strong>NMLS (Nationwide Multistate Licensing System):</strong></p>
<p>NMLS is a regulatory system that helps protect consumers in mortgage transactions:</p>
<ul>
<li>🔒 <strong>What is NMLS?</strong> A centralized database for registering and licensing mortgage companies, branches, and loan originators across the US.</li>
<li>🔍 <strong>Why it matters:</strong> You can verify that your lender or loan officer is properly licensed before sharing personal financial information.</li>
<li>📋 <strong>How to check:</strong> Visit <a href="https://www.nmlsconsumeraccess.org/" target="_blank">NMLS Consumer Access</a>, enter the person's or company's NMLS number or name.</li>
<li>⚠️ <strong>Red flags:</strong> If a lender cannot provide an NMLS number, or the number doesn't check out, consider it a warning sign.</li>
</ul>
<p><strong>Tip:</strong> Every legitimate mortgage professional is required to have an NMLS unique identifier. Always ask for it!</p>`
        },

        // ----- CLOSING COSTS -----
        {
            keywords: ["closing cost", "closing costs", "fees", "how much closing", "closing expenses"],
            category: "Buying",
            answer: `<p><strong>Closing Costs in Washington State:</strong></p>
<p>Closing costs typically range from <strong>2-5% of the purchase price</strong>. Here's a breakdown:</p>
<p><strong>Buyer's Closing Costs:</strong></p>
<ul>
<li>💰 Loan origination fees (0.5-1% of loan)</li>
<li>📋 Appraisal fee ($400-$700)</li>
<li>🔍 Home inspection ($350-$600)</li>
<li>📄 Title insurance & escrow fees</li>
<li>🏛️ Recording fees</li>
<li>💵 Prepaid items (property tax, homeowner's insurance)</li>
</ul>
<p><strong>Seller's Closing Costs:</strong></p>
<ul>
<li>📊 Real estate agent commissions</li>
<li>📊 Excise tax (typically 1.1-3% in WA, varies by sale price)</li>
<li>📄 Title insurance (seller's policy)</li>
<li>🔧 Any negotiated repairs or credits</li>
</ul>
<p>Tracy can provide a detailed estimate based on your specific transaction. <a href="#contact">Ask for a closing cost estimate</a>!</p>`
        },

        // ----- HOME INSPECTION -----
        {
            keywords: ["inspection", "home inspection", "inspector", "inspection cost", "do i need inspection"],
            category: "Buying",
            answer: `<p><strong>Home Inspections:</strong></p>
<p>A home inspection is <strong>strongly recommended</strong> for any home purchase:</p>
<ul>
<li>🔍 <strong>What's covered:</strong> Structure, roof, plumbing, electrical, HVAC, foundation, water damage, and more</li>
<li>💰 <strong>Cost:</strong> Typically $400-$700 depending on home size</li>
<li>⏱️ <strong>Duration:</strong> 2-4 hours for a standard inspection</li>
<li>📋 <strong>Additional inspections:</strong> Sewer scope ($200-$350), radon test ($150+), pest inspection</li>
</ul>
<p><strong>In the Seattle area:</strong> Due to our wet climate, pay special attention to:</p>
<ul>
<li>🌧️ Roof condition and drainage</li>
<li>💧 Signs of water intrusion in basements/crawl spaces</li>
<li>🌲 Trees near the foundation</li>
</ul>
<p>Tracy always recommends thorough inspections and can refer trusted inspectors in the area.</p>`
        },

        // ----- PROPERTY TYPES -----
        {
            keywords: ["condo", "condominium", "townhouse", "townhome", "single family", "property type", "what type"],
            category: "General",
            answer: `<p><strong>Property Types in the Seattle Area:</strong></p>
<ul>
<li>🏠 <strong>Single-Family Home:</strong> Standalone house on its own lot. Most common in suburbs like Redmond, Kirkland, Bothell. Price range varies widely.</li>
<li>🏘️ <strong>Townhouse:</strong> Multi-level attached units sharing walls. Great middle ground between condos and single-family. Popular in Bellevue and Kirkland.</li>
<li>🏢 <strong>Condominium:</strong> Unit in a larger building/complex with shared amenities. Common in downtown Bellevue and Seattle. HOA fees apply.</li>
<li>🏡 <strong>Multi-Family:</strong> Duplexes, triplexes, fourplexes — good for investors or house-hackers.</li>
</ul>
<p>Tracy has experience with single-family homes and condominiums across her service areas. <a href="#contact">Discuss your preferences with Tracy</a>!</p>`
        },

        // ----- WORKING WITH TRACY -----
        {
            keywords: ["why tracy", "why choose tracy", "why work with", "about tracy", "tracy experience", "tracy specialty"],
            category: "Agent",
            answer: `<p><strong>Why Work with Tracy Jia?</strong></p>
<ul>
<li>⭐ <strong>Perfect 5.0 rating</strong> on Zillow with glowing client reviews</li>
<li>📊 <strong>Market research background</strong> — she brings data-driven insights to every transaction</li>
<li>🏠 <strong>24 completed sales</strong> across the Greater Seattle area</li>
<li>💰 <strong>Strong negotiator</strong> — negotiated $120K under list price for a recent buyer</li>
<li>🗣️ <strong>Bilingual:</strong> Fluent in English and Mandarin (中文)</li>
<li>🤝 <strong>Client-first approach</strong> — focused on long-term relationships</li>
<li>📍 <strong>Local expertise</strong> spanning 9 Eastside & North King County cities</li>
</ul>
<p>Read her reviews on <a href="https://www.zillow.com/profile/TracyJia2020" target="_blank">Zillow</a> or <a href="#contact">contact her directly</a>!</p>`
        },
        {
            keywords: ["contact tracy", "reach tracy", "talk to tracy", "phone", "email", "call", "schedule"],
            category: "Agent",
            answer: `<p><strong>Contact Tracy Jia:</strong></p>
<ul>
<li>📞 <strong>Phone:</strong> <a href="tel:+14259857833">(425) 985-7833</a></li>
<li>📧 <strong>Email:</strong> <a href="mailto:Tracy.Jia.Realestate@gmail.com">Tracy.Jia.Realestate@gmail.com</a></li>
<li>🏢 <strong>Office:</strong> Best Choice Realty — 16400 Southcenter Prky Ste 306, Tukwila, WA 98188</li>
<li>🔗 <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/tracy-jia-a82778107/" target="_blank">Connect on LinkedIn</a></li>
<li>🏠 <strong>Zillow:</strong> <a href="https://www.zillow.com/profile/TracyJia2020" target="_blank">View Zillow Profile</a></li>
</ul>
<p>You can also use the <a href="#contact">contact form below</a> to send a message directly!</p>`
        },
        {
            keywords: ["service area", "where do you work", "which cities", "area served", "coverage"],
            category: "Agent",
            answer: `<p><strong>Tracy's Service Areas:</strong></p>
<p>Tracy serves the following cities in the Greater Seattle & Eastside area:</p>
<ul>
<li>📍 Bellevue</li>
<li>📍 Kirkland</li>
<li>📍 Redmond</li>
<li>📍 Bothell</li>
<li>📍 Lynnwood</li>
<li>📍 Everett</li>
<li>📍 Kenmore</li>
<li>📍 Lake Forest Park</li>
<li>📍 Brier</li>
</ul>
<p>If your area isn't listed, <a href="#contact">reach out anyway</a> — Tracy may be able to help or refer you to a trusted colleague.</p>`
        },

        // ----- GENERAL REAL ESTATE -----
        {
            keywords: ["offer", "make offer", "how to offer", "competitive offer", "bidding war", "multiple offers"],
            category: "Buying",
            answer: `<p><strong>Making a Competitive Offer:</strong></p>
<p>In the Seattle market, strong offers are essential. Here's what Tracy recommends:</p>
<ul>
<li>📋 <strong>Pre-approval letter:</strong> Always include a current pre-approval from a reputable lender</li>
<li>💰 <strong>Earnest money:</strong> Typically 1-3% of purchase price in Seattle area; higher signals seriousness</li>
<li>📊 <strong>Pricing:</strong> Tracy analyzes comparable sales and market conditions to help you determine the right offer price</li>
<li>📝 <strong>Clean terms:</strong> Minimize contingencies where appropriate (with careful guidance)</li>
<li>✉️ <strong>Escalation clause:</strong> Can be effective in multiple-offer situations</li>
<li>⏱️ <strong>Quick close:</strong> Shorter closing timelines can appeal to sellers</li>
</ul>
<p>Tracy's negotiation skills have saved her clients significant money — like the $120K under list in Redmond. <a href="#contact">Let Tracy help craft your offer</a>!</p>`
        },
        {
            keywords: ["property tax", "tax", "taxes", "washington tax", "property taxes"],
            category: "General",
            answer: `<p><strong>Property Taxes in Washington State:</strong></p>
<ul>
<li>📊 <strong>WA has no state income tax</strong> — but property taxes fund local services</li>
<li>💰 <strong>Average rate:</strong> Approximately 0.9-1.1% of assessed value (varies by county)</li>
<li>🏠 <strong>King County:</strong> Rates typically range from $8-$12 per $1,000 of assessed value</li>
<li>📋 <strong>Assessed vs. Market Value:</strong> Assessed values may differ from market value</li>
<li>🏛️ <strong>Exemptions:</strong> Senior/disabled exemptions, property tax deferrals available</li>
<li>📈 <strong>Annual assessments:</strong> King County Assessor reviews property values annually</li>
</ul>
<p>Use <a href="https://www.zillow.com/mortgage-calculator/" target="_blank">Zillow's Mortgage Calculator</a> to estimate your total monthly payment including property taxes.</p>`
        },
        {
            keywords: ["school", "schools", "school district", "education", "best schools", "school rating"],
            category: "General",
            answer: `<p><strong>School Districts in Tracy's Service Areas:</strong></p>
<ul>
<li>🎓 <strong>Bellevue School District:</strong> Consistently ranked among the top in Washington state. Known for strong academics and STEM programs.</li>
<li>🎓 <strong>Lake Washington School District (Kirkland/Redmond):</strong> Excellent ratings, home to highly-rated schools. Microsoft partnership programs.</li>
<li>🎓 <strong>Northshore School District (Bothell/Kenmore):</strong> Strong academic performance, diverse extracurricular programs.</li>
<li>🎓 <strong>Edmonds School District (Lynnwood):</strong> Improving ratings with growing investment.</li>
<li>🎓 <strong>Everett School District:</strong> Comprehensive programs with career & technical education focus.</li>
</ul>
<p>School quality is a major factor in home values. Check <a href="https://www.zillow.com/bellevue-wa/" target="_blank">Zillow</a> or <a href="https://www.redfin.com/city/1532/WA/Bellevue" target="_blank">Redfin</a> for school ratings by address. Tracy can help you find homes in your desired school district.</p>`
        },
        {
            keywords: ["investment", "invest", "rental property", "investment property", "roi", "cash flow", "real estate investment"],
            category: "General",
            answer: `<p><strong>Real Estate Investment in Seattle Area:</strong></p>
<ul>
<li>📈 <strong>Appreciation:</strong> Seattle metro has seen strong long-term appreciation driven by tech industry growth</li>
<li>💰 <strong>Rental demand:</strong> High demand for rentals across the Eastside, especially near tech campuses</li>
<li>🏘️ <strong>Multi-family:</strong> Duplexes and small multi-family properties can offer good cash flow</li>
<li>🏢 <strong>Condos:</strong> Downtown Bellevue and Seattle condos popular with investors for rental income</li>
<li>📊 <strong>Key metrics:</strong> Cap rate, cash-on-cash return, gross rent multiplier</li>
</ul>
<p>Tracy offers <strong>Property Management</strong> services and can help you identify investment opportunities. <a href="#contact">Discuss investment strategy</a> with Tracy!</p>`
        },
        {
            keywords: ["relocation", "relocating", "moving to seattle", "moving to", "new to seattle", "relocate"],
            category: "General",
            answer: `<p><strong>Relocating to the Seattle Area?</strong></p>
<p>Welcome! Here's what you should know:</p>
<ul>
<li>🌧️ <strong>Weather:</strong> Mild year-round, rainy fall-spring, beautiful summers. Avg. high 75°F in summer, 45°F in winter.</li>
<li>💼 <strong>Economy:</strong> Major employers include Microsoft, Amazon, Google, Meta, Boeing, and many tech startups.</li>
<li>🚗 <strong>Commute:</strong> Consider proximity to your workplace — Bellevue/Redmond for Eastside tech, Seattle for downtown roles.</li>
<li>💰 <strong>No state income tax:</strong> Washington has no personal income tax (but higher sales tax ~10.25%).</li>
<li>🏠 <strong>Housing:</strong> Diverse options from urban condos to suburban single-family homes.</li>
</ul>
<p>Tracy speaks <strong>English and Mandarin</strong> and has helped many relocating families. <a href="#contact">Contact Tracy for relocation assistance</a>!</p>`
        },
        {
            keywords: ["mandarin", "chinese", "中文", "speak chinese", "chinese speaker", "中国", "华人"],
            category: "Agent",
            answer: `<p><strong>中文服务 / Mandarin Services:</strong></p>
<p>Tracy Jia 美东西和英语双语流利，可以为华人客户提供全面的房地产服务：</p>
<ul>
<li>🏠 买房和卖房服务</li>
<li>📊 市场分析和定价策略</li>
<li>💰 贷款和融资指导</li>
<li>📋 全程中文沟通</li>
</ul>
<p>Tracy speaks fluent Mandarin and English, providing comprehensive real estate services for Chinese-speaking clients in the Greater Seattle area.</p>
<p>📞 <a href="tel:+14259857833">(425) 985-7833</a> | 📧 <a href="mailto:Tracy.Jia.Realestate@gmail.com">Tracy.Jia.Realestate@gmail.com</a></p>`
        }
    ],

    // ============================================
    // DEFAULT RESPONSE
    // ============================================
    defaultAnswer: `<p>That's a great question! While I may not have specific information on that topic in my knowledge base, Tracy would be happy to help you personally.</p>
<p>Here are some ways to get an answer:</p>
<ul>
<li>📞 <strong>Call Tracy:</strong> <a href="tel:+14259857833">(425) 985-7833</a></li>
<li>📧 <strong>Email Tracy:</strong> <a href="mailto:Tracy.Jia.Realestate@gmail.com">Tracy.Jia.Realestate@gmail.com</a></li>
<li>📝 <strong>Send a message:</strong> Use the <a href="#contact">contact form</a> below</li>
</ul>
<p>In the meantime, you can also try asking about:</p>
<ul>
<li>🏠 Home buying or selling process</li>
<li>📊 Seattle area market trends</li>
<li>💰 Mortgage & financing options</li>
<li>🔒 NMLS lender verification</li>
<li>📍 Specific neighborhoods (Bellevue, Kirkland, Redmond, etc.)</li>
</ul>`
};
