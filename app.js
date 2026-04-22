// DOM Elements
const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('location-input');
const categorySelect = document.getElementById('category-select');
const resultsGrid = document.getElementById('results-grid');
const loadingState = document.getElementById('loading-state');
const emptyState = document.getElementById('empty-state');
const resultsTitle = document.getElementById('results-title');
const statsContainer = document.getElementById('stats-container');
const leadsCount = document.getElementById('leads-count');
const apiToggle = document.getElementById('api-toggle');
const apiKeyContainer = document.getElementById('api-key-container');
const liveLabel = document.getElementById('live-label');
const apiKeyInput = document.getElementById('api-key-input');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
apiToggle.addEventListener('change', handleToggleMode);

// Toggle between Mock and Live Mode
function handleToggleMode(e) {
    const isLive = e.target.checked;
    if (isLive) {
        liveLabel.classList.add('active');
        liveLabel.previousElementSibling.previousElementSibling.classList.remove('active');
        apiKeyContainer.classList.remove('hidden');
    } else {
        liveLabel.classList.remove('active');
        liveLabel.previousElementSibling.previousElementSibling.classList.add('active');
        apiKeyContainer.classList.add('hidden');
    }
}

// Main Search Handler
async function handleSearch() {
    const location = locationInput.value.trim();
    const category = categorySelect.value;
    const categoryText = categorySelect.options[categorySelect.selectedIndex].text;

    if (!location) {
        alert("Please enter a location!");
        return;
    }

    // Update UI state
    emptyState.classList.add('hidden');
    resultsGrid.innerHTML = '';
    statsContainer.classList.add('hidden');
    resultsTitle.innerText = `Searching in ${location}...`;
    loadingState.classList.remove('hidden');

    const isLiveMode = apiToggle.checked;
    
    try {
        let leads = [];
        
        if (isLiveMode) {
            const apiKey = apiKeyInput.value.trim();
            if (!apiKey) {
                throw new Error("Please enter your Google Places API Key to use Live Mode.");
            }
            leads = await fetchLiveGooglePlaces(location, category, apiKey);
        } else {
            // Simulate network delay for mock mode
            await new Promise(resolve => setTimeout(resolve, 1500));
            leads = getMockData(location, category);
        }

        renderResults(leads, categoryText, location);
        
    } catch (error) {
        loadingState.classList.add('hidden');
        resultsTitle.innerText = "Error Occurred";
        emptyState.classList.remove('hidden');
        emptyState.innerHTML = `<i data-lucide="alert-circle" class="empty-icon" style="color:var(--warning-color)"></i><p>${error.message}</p>`;
        lucide.createIcons();
    }
}

// Render the results to the DOM
function renderResults(leads, categoryText, location) {
    loadingState.classList.add('hidden');
    
    if (leads.length === 0) {
        resultsTitle.innerText = "No Results Found";
        emptyState.classList.remove('hidden');
        emptyState.innerHTML = `<i data-lucide="search-x" class="empty-icon"></i><p>No highly-rated ${categoryText} without websites found in ${location}.</p>`;
        lucide.createIcons();
        return;
    }

    resultsTitle.innerText = `Potential Web Dev Clients: ${categoryText}`;
    statsContainer.classList.remove('hidden');
    leadsCount.innerText = leads.length;

    leads.forEach((lead, index) => {
        const card = document.createElement('div');
        card.className = 'business-card glass-panel';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <h3 class="business-name">${lead.name}</h3>
                    <span class="status-badge">No Website</span>
                </div>
                <div class="rating-badge">
                    <i data-lucide="star"></i> ${lead.rating}
                </div>
            </div>
            
            <div class="card-body">
                <div class="info-row">
                    <i data-lucide="map-pin" class="info-icon"></i>
                    <span>${lead.address}</span>
                </div>
                <div class="info-row">
                    <i data-lucide="phone" class="info-icon"></i>
                    <span>${lead.phone || 'Not provided'}</span>
                </div>
                ${lead.reviews ? `
                <div class="info-row">
                    <i data-lucide="users" class="info-icon"></i>
                    <span>${lead.reviews} Google Reviews</span>
                </div>` : ''}
            </div>
            
            <div class="card-footer">
                <a href="${lead.mapLink}" target="_blank" class="action-btn">
                    <i data-lucide="map"></i> View on Google Maps
                </a>
            </div>
        `;
        
        resultsGrid.appendChild(card);
    });

    // Re-initialize icons for newly added elements
    lucide.createIcons();
}

// ==========================================
// MOCK DATA GENERATOR (For Demonstration)
// ==========================================
function getMockData(location, category) {
    const loc = location.charAt(0).toUpperCase() + location.slice(1);
    
    // Base templates for different categories
    const mockTemplates = {
        'restaurant': [
            { name: `Sri Annapoorna Veg Hotel`, rating: 4.5, street: 'Brough Road', phone: '+91 98765 43210' },
            { name: `Kongu Spice Biriyani`, rating: 4.2, street: 'Perundurai Road', phone: '+91 87654 32109' },
            { name: `${loc} Famous Parotta Stall`, rating: 4.4, street: 'Mettur Road', phone: '+91 76543 21098' },
            { name: `Amma Mess`, rating: 4.6, street: 'Bus Stand Backside', phone: '+91 99887 76655' }
        ],
        'beauty_salon': [
            { name: `Style & Shine Unisex Salon`, rating: 4.3, street: 'Sample Road 1', phone: '+91 98765 11111' },
            { name: `Elite Bridal Makeup Studio`, rating: 4.8, street: 'Main Market Area', phone: '+91 98765 22222' },
            { name: `${loc} Men's Grooming Lounge`, rating: 4.1, street: 'West Street', phone: '+91 98765 33333' }
        ],
        'gym': [
            { name: `Iron Pumping Fitness Centre`, rating: 4.7, street: 'Cross Cut Road', phone: '+91 88888 99999' },
            { name: `Muscle Factory ${loc}`, rating: 4.2, street: 'Bye Pass Road', phone: '+91 77777 66666' }
        ]
    };

    // Default to a generic list if category is not specifically mapped
    let baseList = mockTemplates[category] || [
        { name: `Premium ${category} Services`, rating: 4.5, street: 'Main Road', phone: '+91 12345 67890' },
        { name: `Reliable ${category} Center`, rating: 4.0, street: 'North Street', phone: '+91 09876 54321' },
        { name: `${loc} Best ${category}`, rating: 4.3, street: 'South Avenue', phone: '+91 11223 34455' }
    ];

    // Format the mock data into the required structure
    return baseList.map(item => ({
        name: item.name,
        rating: item.rating,
        reviews: Math.floor(Math.random() * 200) + 20, // Random review count
        address: `${item.street}, ${loc}, Tamil Nadu`,
        phone: item.phone,
        mapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' ' + loc)}`
    }));
}

// ==========================================
// REAL GOOGLE PLACES API IMPLEMENTATION
// ==========================================
/*
 * How this works:
 * 1. Uses Google Places API (Text Search) to find places by category and location.
 * 2. Filters out places that HAVE a website.
 * 3. Filters out places with a rating below 4.0.
 * 4. To use this, you must run this through a backend or proxy in production to avoid CORS/API Key exposure.
 *    For local development/testing, you can enable a CORS unblocker extension in your browser.
 */
async function fetchLiveGooglePlaces(location, category, apiKey) {
    const query = `${category.replace('_', ' ')} in ${location}`;
    
    // Note: Calling Google Places API directly from the frontend will usually result in CORS errors.
    // In a real production app, this fetch should go to YOUR backend, which then calls Google.
    // For this demonstration, we are using the new Places API endpoint.
    const url = 'https://places.googleapis.com/v1/places:searchText';
    
    const requestBody = {
        textQuery: query,
        minRating: 4.0 // Only good ratings
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                // We request specifically these fields to save bandwidth and cost
                'X-Goog-FieldMask': 'places.displayName,places.rating,places.userRatingCount,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.googleMapsUri'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(`API Error: ${errData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.places) {
            return [];
        }

        // Filter and map the results
        const leads = data.places
            // CRITICAL STEP: Filter OUT businesses that already have a website
            .filter(place => !place.websiteUri) 
            .map(place => ({
                name: place.displayName?.text || 'Unknown Business',
                rating: place.rating,
                reviews: place.userRatingCount,
                address: place.formattedAddress,
                phone: place.nationalPhoneNumber || 'No phone provided',
                mapLink: place.googleMapsUri
            }));

        return leads;
        
    } catch (error) {
        console.error("Live API Error:", error);
        throw new Error("Failed to fetch live data. Ensure your API key is valid and has Places API enabled. (Note: Frontend API calls may require a CORS workaround proxy).");
    }
}
