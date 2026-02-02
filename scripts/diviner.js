// Diviner page - API calls and divination display logic

// Configuration - Update this with your Cloudflare Worker endpoint
// For local testing:
const API_ENDPOINT = 'http://localhost:8080/divination-all';
// For production:
// const API_ENDPOINT = 'https://your-worker.your-subdomain.workers.dev/divination';

// DOM Elements
let loadingState, divinationResults, errorState;
let heartText, headText, soulText, fleshText;
let newDivinationBtn, homeBtn, retryBtn, homeErrorBtn, errorMessage;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    loadingState = document.getElementById('loading-state');
    divinationResults = document.getElementById('divination-results');
    errorState = document.getElementById('error-state');
    
    heartText = document.getElementById('heart-text');
    headText = document.getElementById('head-text');
    soulText = document.getElementById('soul-text');
    fleshText = document.getElementById('flesh-text');
    
    newDivinationBtn = document.getElementById('new-divination-btn');
    homeBtn = document.getElementById('home-btn');
    retryBtn = document.getElementById('retry-btn');
    homeErrorBtn = document.getElementById('home-error-btn');
    errorMessage = document.getElementById('error-message');

    // Set current date and day
    const dateElement = document.getElementById('current-date');
    const today = new Date();
    
    if (dateElement) {
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        dateElement.textContent = `${day}.${month}.${year}`;
    }
    
    // Set current day of the week
    const dayElements = document.querySelectorAll('header span');
    if (dayElements.length >= 3) {
        const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        dayElements[2].textContent = dayOfWeek; // The third span is the day
    }

    // Event listeners
    newDivinationBtn.addEventListener('click', generateDivination);
    homeBtn.addEventListener('click', goHome);
    retryBtn.addEventListener('click', generateDivination);
    homeErrorBtn.addEventListener('click', goHome);

    // Start divination generation on page load
    generateDivination();
});

/**
 * Generates a new divination by calling the API
 */
async function generateDivination() {
    // Show loading state
    showLoadingState();

    try {
        // Call the API
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: 'Generate a Serer cosmology divination with four sections: heart, head, soul, and flesh'
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        // Validate response structure
        if (!data.heart || !data.head || !data.soul || !data.flesh) {
            throw new Error('Invalid response format from API');
        }

        // Display the divination
        displayDivination(data);

    } catch (error) {
        console.error('Error generating divination:', error);
        showErrorState(error.message);
    }
}

/**
 * Displays the divination results
 * @param {Object} data - The divination data with heart, head, soul, flesh properties
 */
function displayDivination(data) {
    // Populate the text areas
    heartText.textContent = data.heart;
    headText.textContent = data.head;
    soulText.textContent = data.soul;
    fleshText.textContent = data.flesh;

    // Hide loading and error states
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');

    // Show results with animation
    divinationResults.classList.remove('hidden');
    divinationResults.classList.add('fade-in');
}

/**
 * Shows the loading state
 */
function showLoadingState() {
    loadingState.classList.remove('hidden');
    divinationResults.classList.add('hidden');
    errorState.classList.add('hidden');
}

/**
 * Shows the error state
 * @param {string} message - The error message to display
 */
function showErrorState(message) {
    loadingState.classList.add('hidden');
    divinationResults.classList.add('hidden');
    errorState.classList.remove('hidden');
    
    // Set error message
    if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
        errorMessage.textContent = 'Network error. Please check your connection and try again.';
    } else if (message.includes('API request failed')) {
        errorMessage.textContent = 'The divination service is currently unavailable. Please try again later.';
    } else {
        errorMessage.textContent = message || 'An unexpected error occurred. Please try again.';
    }
}

/**
 * Navigates back to home page
 */
function goHome() {
    window.location.href = 'index.html';
}

/**
 * Mock divination for testing (remove this when API is ready)
 * Uncomment the function call in generateDivination() to use mock data
 */
function displayMockDivination() {
    const mockData = {
        heart: "The threads of connection weave through your days. A relationship that has been dormant calls for attention. The ancestors remind you that love is not passive—it requires tending, like a garden requires water. Someone near you carries an unspoken burden. Your compassion will be the key that unlocks their heart.",
        head: "Clarity comes not from thinking more, but from thinking differently. The problem you have been circling has a solution that lies outside your current perspective. Seek counsel from an unexpected source. The wisdom you need exists, but it wears an unfamiliar face. Trust the insight that arrives sideways.",
        soul: "Your spirit seeks renewal. There is a practice you have abandoned that once brought you peace—return to it. The ancestors speak of a ritual, small but significant, that will restore your inner balance. This is not about grand gestures, but about daily devotion to your own sacred center. The path inward is the path forward.",
        flesh: "Your body carries messages you have not yet heard. Pay attention to the subtle signals—the tension in your shoulders, the restlessness in your sleep. Health is not only the absence of illness, but the presence of vitality. Move your body with intention. The ancestors remind you that the flesh is not separate from the spirit; it is the spirit's dwelling place. Honor it."
    };
    
    displayDivination(mockData);
}

// For development/testing: Uncomment to use mock data instead of API
// Comment out the actual API call in generateDivination() and use this instead:
// setTimeout(() => displayMockDivination(), 2000);

