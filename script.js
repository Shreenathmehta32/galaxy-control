// Utility functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, decimals = 2) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}

// Function to get a point on an SVG path
function getPointOnPath(pathElement, percentage) {
    const pathLength = pathElement.getTotalLength();
    return pathElement.getPointAtLength(pathLength * percentage);
}

function createGlassCard(title, content, colorClass = 'text-blue-300') {
    const card = document.createElement('div');
    card.className = `glass-panel p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-[1.02]`;
    card.innerHTML = `
        <h3 class="text-lg font-semibold mb-2 ${colorClass}">${title}</h3>
        <p class="text-gray-300 text-sm">${content}</p>
    `;
    return card;
}

function createRadialMeter(id, label, value, max, unit = '%') {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / max) * circumference;

    const meterDiv = document.createElement('div');
    meterDiv.className = 'radial-meter';
    meterDiv.innerHTML = `
        <svg viewBox="0 0 100 100">
            <circle class="meter-bg" cx="50" cy="50" r="${radius}"></circle>
            <circle class="meter-fill" cx="50" cy="50" r="${radius}"
                    style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${strokeDashoffset};"></circle>
        </svg>
        <div class="meter-value" id="${id}-value">${value}${unit}</div>
        <div class="meter-label">${label}</div>
    `;
    return meterDiv;
}

function updateRadialMeter(id, value, max, unit = '%') {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / max) * circumference;

    const fillCircle = document.querySelector(`#${id} .meter-fill`);
    const valueDisplay = document.getElementById(`${id}-value`);

    if (fillCircle && valueDisplay) {
        fillCircle.style.strokeDashoffset = strokeDashoffset;
        valueDisplay.textContent = `${value}${unit}`;
    }
}

// DOM Elements
const aiHintEl = document.getElementById('ai-hint');
const themeSwitcher = document.getElementById('theme-switcher');
const telemetryDataEl = document.getElementById('telemetry-data'); // For home view
const marsWeatherDataEl = document.getElementById('mars-weather-data'); // For home view
const asteroidListEl = document.getElementById('asteroid-list'); // For home view
const asteroidSvgEl = document.getElementById('asteroid-svg'); // For home view
const consoleLogEl = document.getElementById('console-log'); // For home view
const radialMetersEl = document.getElementById('radial-meters'); // For home view
const orbitInfoBox = document.getElementById('orbit-info-box'); // For home view
const currentDateTimeEl = document.getElementById('current-datetime'); // New: For date/time display

const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const menuButton = document.getElementById('menu-button');

const homePageContainer = document.getElementById('home-page-container');
const dashboardContainer = document.getElementById('dashboard-container');
const enterWebsiteBtn = document.getElementById('enter-website-btn');

// New page elements
const homePageView = document.getElementById('home-page-view');
const satelliteViewPage = document.getElementById('satellite-view-page');
const issTrackerPage = document.getElementById('iss-tracker-page');
const marsWeatherPage = document.getElementById('mars-weather-page');
const asteroidAlertsPage = document.getElementById('asteroid-alerts-page');
const moonViewPage = document.getElementById('moon-view-page'); // New Moon View page

// References for duplicated content on specific pages
const telemetryDataSatView = document.getElementById('telemetry-data-sat-view');
const orbitInfoBoxSatView = document.getElementById('orbit-info-box-sat-view');

const telemetryDataIssView = document.getElementById('telemetry-data-iss-view');
const orbitInfoBoxIssView = document.getElementById('orbit-info-box-iss-view');

const marsWeatherDataPage = document.getElementById('mars-weather-data-page');
const asteroidListPage = document.getElementById('asteroid-list-page');
const asteroidSvgPage = document.getElementById('asteroid-svg-page');

// Moon View specific DOM elements
const moonImage = document.getElementById('moon-image');
const moonPhaseEl = document.getElementById('moon-phase');
const moonIlluminationEl = document.getElementById('moon-illumination');
const moonDistanceEl = document.getElementById('moon-distance');
const nextFullMoonEl = document.getElementById('next-full-moon');

// Fun Fact DOM Elements
const funFactDisplay = document.getElementById('fun-fact-display');
const newFactBtn = document.getElementById('new-fact-btn');

// Chatbot DOM Elements
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChatbotBtn = document.getElementById('close-chatbot-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');


// Simulated Data
const satellites = [
    { id: 'iss-icon', name: 'ISS', speed: 27600, altitude: 420, pathId: 'iss-orbit-path', color: '#00ffff', angle: 0 },
    { id: 'sat1-icon', name: 'Starlink-123', speed: 27000, altitude: 550, pathId: 'sat1-orbit-path', color: '#ff00ff', angle: 90 },
    { id: 'sat2-icon', name: 'Hubble Space Telescope', speed: 27300, altitude: 540, pathId: 'sat2-orbit-path', color: '#00ff00', angle: 180 }
];

const aiHints = [
    "AI Status: All systems nominal. Monitoring for anomalies.",
    "AI Status: Initiating predictive trajectory analysis.",
    "AI Status: Optimizing power distribution across modules.",
    "AI Status: Running diagnostics on life support systems.",
    "AI Status: Detecting minor atmospheric disturbances on Mars.",
    "AI Status: Prioritizing communications with deep space probes."
];

const consoleMessages = [
    "INIT: CelestiaControl v1.0.0 booting...",
    "SYSTEM: All core modules online.",
    "TELEMETRY: Receiving real-time orbital data.",
    "WEATHER: Mars atmospheric sensors active.",
    "ASTEROID: Threat detection system initialized.",
    "COMM: Ground station link established.",
    "AI: Mission parameters loaded.",
    "DISPLAY: Graphics rendering complete.",
    "STATUS: Ready for mission operations."
];

let currentConsoleMessageIndex = 0;

const asteroidThreats = [
    { name: 'Apophis', approach: '2029-04-13', threat: 'High', color: 'text-red-500', path: 'M 10 90 Q 150 10 290 90' },
    { name: 'Bennu', approach: '2135-09-25', threat: 'Medium', color: 'text-yellow-500', path: 'M 10 50 Q 150 10 290 50' },
    { name: 'Didymos', approach: '2022-09-26', threat: 'Low', color: 'text-green-500', path: 'M 10 10 Q 150 90 290 10' },
    { name: 'Vesta', approach: '2030-01-15', threat: 'Low', color: 'text-green-500', path: 'M 10 30 Q 150 70 290 30' },
    { name: 'Eros', approach: '2040-07-01', threat: 'Medium', color: 'text-yellow-500', path: 'M 10 70 Q 150 30 290 70' }
];

const systemMetrics = [
    { id: 'power', label: 'Power', value: 85, max: 100, unit: '%' },
    { id: 'fuel', label: 'Fuel', value: 60, max: 100, unit: '%' },
    { id: 'data', label: 'Data Throughput', value: 75, max: 100, unit: 'Mbps' },
    { id: 'env', label: 'Env. Control', value: 92, max: 100, unit: '%' }
];

const universeFacts = [
    "A light-year is the distance light travels in one Earth year, about 9.46 trillion kilometers.",
    "The universe is estimated to be around 13.8 billion years old.",
    "There are more stars in the universe than grains of sand on all the beaches on Earth.",
    "Neutron stars are so dense that a single teaspoon of their material would weigh about 6 billion tons.",
    "The largest known structure in the universe is the Hercules-Corona Borealis Great Wall, a supercluster of galaxies.",
    "It takes light from the Sun about 8 minutes and 20 seconds to reach Earth.",
    "The observable universe is about 93 billion light-years in diameter.",
    "Black holes are regions in spacetime where gravity is so strong that nothing, not even light, can escape.",
    "The temperature of space is about -270.45 degrees Celsius, just above absolute zero.",
    "Our Milky Way galaxy is estimated to contain between 100 billion and 400 billion stars.",
    "Mars is known as the 'Red Planet' due to iron oxide prevalent on its surface."
];

// Functions for specific sections

// AI Hints
let currentHintIndex = 0;
function updateAIHint() {
    if (aiHintEl) {
        aiHintEl.textContent = aiHints[currentHintIndex];
        currentHintIndex = (currentHintIndex + 1) % aiHints.length;
    }
}

// Theme Switcher (Basic dark/light toggle for background)
function setupThemeSwitcher() {
    const themeLabel = document.getElementById('theme-label');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('change', (event) => {
            if (event.target.checked) {
                document.body.classList.remove('bg-gray-900');
                document.body.classList.add('bg-blue-100', 'text-gray-900');
                if (themeLabel) {
                    themeLabel.textContent = 'Dark Mode';
                }
            } else {
                document.body.classList.remove('bg-blue-100', 'text-gray-900');
                document.body.classList.add('bg-gray-900', 'text-white');
                if (themeLabel) {
                    themeLabel.textContent = 'Light Mode';
                }
            }
        });
    }
}

// Orbital Tracking for Home, Satellite View, and ISS Tracker
function updateOrbitalPositions(viewType) {
    let currentTelemetryDataEl, currentOrbitInfoBox;
    let currentSatellites = JSON.parse(JSON.stringify(satellites));

    if (viewType === 'home') {
        currentTelemetryDataEl = telemetryDataEl;
        currentOrbitInfoBox = orbitInfoBox;
    } else if (viewType === 'satellite') {
        currentTelemetryDataEl = telemetryDataSatView;
        currentOrbitInfoBox = orbitInfoBoxSatView;
    } else if (viewType === 'iss') {
        currentTelemetryDataEl = telemetryDataIssView;
        currentOrbitInfoBox = orbitInfoBoxIssView;
    } else {
        return;
    }

    currentSatellites.forEach(sat => {
        const pathEl = document.getElementById(`${sat.pathId}${viewType === 'home' ? '' : '-' + viewType}`);
        const iconEl = document.getElementById(`${sat.id}${viewType === 'home' ? '' : '-' + viewType}`);

        if (pathEl && iconEl) {
            sat.angle = (sat.angle + (sat.speed / 100000)) % 360;
            const percentage = sat.angle / 360;
            const point = getPointOnPath(pathEl, percentage);

            iconEl.setAttribute('cx', point.x);
            iconEl.setAttribute('cy', point.y);

            const telemetryCard = currentTelemetryDataEl ? currentTelemetryDataEl.querySelector(`#telemetry-${sat.id}${viewType === 'home' ? '' : '-' + viewType}`) : null;
            if (telemetryCard) {
                const currentSpeed = (sat.speed + getRandomInt(-100, 100)).toLocaleString();
                const currentAltitude = (sat.altitude + getRandomInt(-5, 5)).toLocaleString();
                const currentLocation = `Lat: ${getRandomFloat(-90, 90).toFixed(2)}°, Lon: ${getRandomFloat(-180, 180).toFixed(2)}°`;
                telemetryCard.querySelector('p').innerHTML = `
                    Speed: <span class="font-bold">${currentSpeed} km/h</span><br>
                    Altitude: <span class="font-bold">${currentAltitude} km</span><br>
                    Location: ${currentLocation}
                `;
            }
        }
    });

    const orbitingObjects = document.querySelectorAll(`#${viewType === 'home' ? 'orbit-display' : 'orbit-display-' + viewType} .orbiting-object`);
    orbitingObjects.forEach(obj => {
        obj.onmouseover = (e) => {
            const name = e.target.dataset.name;
            const speed = e.target.dataset.speed;
            const altitude = e.target.dataset.altitude;
            const rect = e.target.getBoundingClientRect();
            const orbitDisplayRect = currentOrbitInfoBox.parentElement.getBoundingClientRect();

            currentOrbitInfoBox.innerHTML = `
                <span class="font-bold">${name}</span><br>
                Speed: ${speed}<br>
                Altitude: ${altitude}
            `;
            currentOrbitInfoBox.style.left = `${rect.left - orbitDisplayRect.left + rect.width / 2 + 10}px`;
            currentOrbitInfoBox.style.top = `${rect.top - orbitDisplayRect.top + rect.height / 2 + 10}px`;
            currentOrbitInfoBox.classList.remove('hidden');
        };

        obj.onmouseout = () => {
            currentOrbitInfoBox.classList.add('hidden');
        };
    });
}

function initializeTelemetryCards(targetElement, viewType) {
    if (targetElement) {
        targetElement.innerHTML = '';
        satellites.forEach(sat => {
            const colorClassString = 'text-[' + sat.color + ']';
            const card = createGlassCard(
                `${sat.name} Telemetry`,
                `Speed: <span class="font-bold">${sat.speed.toLocaleString()} km/h</span><br>
                 Altitude: <span class="font-bold">${sat.altitude.toLocaleString()} km</span><br>
                 Location: Updating...`,
                colorClassString
            );
            card.id = `telemetry-${sat.id}${viewType === 'home' ? '' : '-' + viewType}`;
            targetElement.appendChild(card);
        });
    }
}

// Mars Weather
function updateMarsWeather(targetElement) {
    const temp = getRandomInt(-120, 0);
    const wind = getRandomInt(5, 50);
    const dustStorm = Math.random() < 0.1 ? 'Active' : 'None';

    if (targetElement) {
        targetElement.innerHTML = '';
        targetElement.appendChild(createGlassCard('Temperature', `<span class="font-bold">${temp}°C</span>`));
        targetElement.appendChild(createGlassCard('Wind Speed', `<span class="font-bold">${wind} km/h</span>`));
        targetElement.appendChild(createGlassCard('Dust Storms', `<span class="font-bold">${dustStorm}</span>`, dustStorm === 'Active' ? 'text-red-400' : 'text-green-400'));
    }
}

// Asteroid Threat Monitoring
function displayAsteroidThreats(listElement, svgElement) {
    if (listElement) { listElement.innerHTML = ''; }
    if (svgElement) { svgElement.innerHTML = ''; }

    asteroidThreats.sort((a, b) => {
        const dateA = new Date(a.approach);
        const dateB = new Date(b.approach);
        return dateA - dateB;
    });

    asteroidThreats.forEach((asteroid, index) => {
        const listItem = document.createElement('div');
        listItem.className = `p-2 my-1 rounded-md transition-all duration-300 ease-in-out ${asteroid.threat === 'High' ? 'bg-red-900/50' : asteroid.threat === 'Medium' ? 'bg-yellow-900/50' : 'bg-green-900/50'} hover:bg-opacity-70`;
        listItem.innerHTML = `
            <span class="font-bold ${asteroid.color}">${asteroid.name}</span> -
            Approach: ${asteroid.approach} -
            Threat: <span class="font-semibold ${asteroid.color}">${asteroid.threat}</span>
        `;
        if (listElement) {
            listElement.appendChild(listItem);
        }

        const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathEl.setAttribute('d', asteroid.path);
        pathEl.setAttribute('fill', 'none');
        pathEl.setAttribute('stroke', asteroid.color.replace('text-', ''));
        pathEl.setAttribute('stroke-width', '2');
        pathEl.setAttribute('stroke-dasharray', '5 5');
        pathEl.classList.add('asteroid-path-animated');
        if (svgElement) {
            svgElement.appendChild(pathEl);
        }

        const pathLength = pathEl.getTotalLength();
        pathEl.style.setProperty('--path-length', pathLength + 'px');
        pathEl.style.animationDuration = `${getRandomFloat(5, 15)}s`;
        pathEl.style.animationDelay = `${getRandomFloat(0, 5)}s`;
    });
}

// Console Log
function addConsoleMessage() {
    if (consoleLogEl) {
        if (currentConsoleMessageIndex < consoleMessages.length) {
            const message = consoleMessages[currentConsoleMessageIndex];
            const p = document.createElement('p');
            p.className = 'typing-text';
            p.textContent = message;
            consoleLogEl.appendChild(p);
            consoleLogEl.scrollTop = consoleLogEl.scrollHeight;
            currentConsoleMessageIndex++;
        } else {
            currentConsoleMessageIndex = 0;
        }
    }
}

// Radial Meters
function initializeRadialMeters() {
    if (radialMetersEl) {
        radialMetersEl.innerHTML = '';
        systemMetrics.forEach(metric => {
            radialMetersEl.appendChild(createRadialMeter(metric.id, metric.label, metric.value, metric.max, metric.unit));
        });
    }
}

function updateSystemMetrics() {
    systemMetrics.forEach(metric => {
        const newValue = getRandomInt(metric.max * 0.5, metric.max);
        updateRadialMeter(metric.id, newValue, metric.max, metric.unit);
    });
}

// Sidebar functions
function toggleSidebar() {
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
    if (sidebarOverlay) {
        sidebarOverlay.classList.toggle('visible');
    }
}

// Moon Data Functions
const moonPhases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
function updateMoonData() {
    if (moonPhaseEl) moonPhaseEl.textContent = moonPhases[getRandomInt(0, moonPhases.length - 1)];
    if (moonIlluminationEl) moonIlluminationEl.textContent = `${getRandomInt(0, 100)}%`;
    if (moonDistanceEl) moonDistanceEl.textContent = `${getRandomInt(360000, 405000).toLocaleString()} km`;

    // Simulate next full moon date
    const today = new Date();
    const nextFullMoonDate = new Date(today.getFullYear(), today.getMonth() + getRandomInt(1, 3), getRandomInt(1, 28));
    if (nextFullMoonEl) nextFullMoonEl.textContent = nextFullMoonDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    // Simulate moon image based on phase (very basic, just cycles through placeholders)
    const currentPhaseIndex = moonPhases.indexOf(moonPhaseEl.textContent);
    const moonImageUrls = [
        "https://placehold.co/192x192/4a5568/ffffff?text=New", // New Moon
        "https://placehold.co/192x192/4a5568/ffffff?text=Waxing+Crescent",
        "https://placehold.co/192x192/4a5568/ffffff?text=First+Quarter",
        "https://placehold.co/192x192/4a5568/ffffff?text=Waxing+Gibbous",
        "https://placehold.co/192x192/4a5568/ffffff?text=Full", // Full Moon
        "https://placehold.co/192x192/4a5568/ffffff?text=Waning+Gibbous",
        "https://placehold.co/192x192/4a5568/ffffff?text=Last+Quarter",
        "https://placehold.co/192x192/4a5568/ffffff?text=Waning+Crescent"
    ];
    if (moonImage) moonImage.src = moonImageUrls[currentPhaseIndex];
}

// Fun Fact Functions
let currentFactIndex = 0;
function displayNewFunFact() {
    if (funFactDisplay) {
        funFactDisplay.textContent = universeFacts[currentFactIndex];
        currentFactIndex = (currentFactIndex + 1) % universeFacts.length;
    }
}

// Chatbot Functions
let chatHistory = []; // Stores chat messages for context
const API_KEY = ""; // Keep this as an empty string. Canvas will automatically provide it.

async function sendChatMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;

    // Add user message to chat history display
    appendMessage(userMessage, 'user');
    chatInput.value = ''; // Clear input

    // Add user message to chat history for API context
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

    // Add a loading indicator
    const loadingMessage = appendMessage('Typing...', 'bot', 'loading'); 

    try {
        const payload = {
            contents: chatHistory,
            generationConfig: {
                temperature: 0.7, // Adjust creativity
                topP: 0.95,
                topK: 40,
                maxOutputTokens: 200,
                stopSequences: [],
            },
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            ],
        };

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        // Remove loading indicator
        chatMessages.removeChild(loadingMessage);

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const botResponse = result.candidates[0].content.parts[0].text;
            appendMessage(botResponse, 'bot');
            chatHistory.push({ role: "model", parts: [{ text: botResponse }] }); // Add bot response to history
        } else {
            appendMessage("Sorry, I couldn't get a response. Please try again.", 'bot');
            console.error("Gemini API returned an unexpected structure:", result);
        }
    } catch (error) {
        // Remove loading indicator
        chatMessages.removeChild(loadingMessage);
        appendMessage("Oops! Something went wrong. Please try again later.", 'bot');
        console.error("Error calling Gemini API:", error);
    } finally {
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
    }
}

function appendMessage(text, ...senders) { // Modified to accept multiple class names
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', ...senders); // Use spread operator for multiple classes
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
    return messageDiv; // Return the message element for potential removal (e.g., loading)
}

// Page Switching Logic
const pageElements = {
    'home-page-view': homePageView,
    'satellite-view-page': satelliteViewPage,
    'iss-tracker-page': issTrackerPage,
    'mars-weather-page': marsWeatherPage,
    'asteroid-alerts-page': asteroidAlertsPage,
    'moon-view-page': moonViewPage
};

function showPage(pageId) {
    for (const id in pageElements) {
        if (pageElements[id]) {
            pageElements[id].classList.add('hidden');
        }
    }
    if (pageElements[pageId]) {
        pageElements[pageId].classList.remove('hidden');
    }
    toggleSidebar();

    if (pageId === 'home-page-view') {
        initializeTelemetryCards(telemetryDataEl, 'home');
        updateMarsWeather(marsWeatherDataEl);
        displayAsteroidThreats(asteroidListEl, asteroidSvgEl);
        initializeRadialMeters();
        displayNewFunFact(); // Display initial fun fact
    } else if (pageId === 'satellite-view-page') {
        initializeTelemetryCards(telemetryDataSatView, 'satellite');
    } else if (pageId === 'iss-tracker-page') {
        initializeTelemetryCards(telemetryDataIssView, 'iss');
    } else if (pageId === 'mars-weather-page') {
        updateMarsWeather(marsWeatherDataPage);
    } else if (pageId === 'asteroid-alerts-page') {
        displayAsteroidThreats(asteroidListPage, asteroidSvgPage);
    } else if (pageId === 'moon-view-page') {
        updateMoonData();
    }
}

// Function to update current date and time
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const formattedDateTime = now.toLocaleDateString('en-US', options);
    if (currentDateTimeEl) {
        currentDateTimeEl.textContent = formattedDateTime;
    }
}

// Function to start all dashboard intervals
let dashboardIntervals = [];

function startDashboardIntervals() {
    dashboardIntervals.forEach(clearInterval);
    dashboardIntervals = [];

    dashboardIntervals.push(setInterval(() => updateOrbitalPositions('home'), 50));
    dashboardIntervals.push(setInterval(() => updateOrbitalPositions('satellite'), 50));
    dashboardIntervals.push(setInterval(() => updateOrbitalPositions('iss'), 50));
    dashboardIntervals.push(setInterval(() => updateMarsWeather(marsWeatherDataEl), 8000));
    dashboardIntervals.push(setInterval(() => updateMarsWeather(marsWeatherDataPage), 8000));
    dashboardIntervals.push(setInterval(addConsoleMessage, 2000));
    dashboardIntervals.push(setInterval(updateSystemMetrics, 5000));
    dashboardIntervals.push(setInterval(updateMoonData, 15000));
    dashboardIntervals.push(setInterval(updateDateTime, 1000)); // Update date/time every second
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (homePageContainer) {
        homePageContainer.classList.remove('hidden');
    }
    if (dashboardContainer) {
        dashboardContainer.classList.add('hidden');
    }

    if (enterWebsiteBtn) {
        enterWebsiteBtn.addEventListener('click', () => {
            if (homePageContainer) {
                homePageContainer.classList.add('hidden');
            }
            if (dashboardContainer) {
                dashboardContainer.classList.remove('hidden');
            }
            showPage('home-page-view');
            startDashboardIntervals();
        });
    } else {
        if (homePageContainer) {
            homePageContainer.classList.add('hidden');
        }
        if (dashboardContainer) {
            dashboardContainer.classList.remove('hidden');
        }
        showPage('home-page-view');
        startDashboardIntervals();
    }

    setupThemeSwitcher();
    updateAIHint();
    setInterval(updateAIHint, 10000);

    // Sidebar navigation event listeners
    document.getElementById('nav-home').addEventListener('click', (e) => { e.preventDefault(); showPage('home-page-view'); });
    document.getElementById('nav-satellite').addEventListener('click', (e) => { e.preventDefault(); showPage('satellite-view-page'); });
    document.getElementById('nav-iss').addEventListener('click', (e) => { e.preventDefault(); showPage('iss-tracker-page'); });
    document.getElementById('nav-mars').addEventListener('click', (e) => { e.preventDefault(); showPage('mars-weather-page'); });
    document.getElementById('nav-asteroid').addEventListener('click', (e) => { e.preventDefault(); showPage('asteroid-alerts-page'); });
    document.getElementById('nav-moon').addEventListener('click', (e) => { e.preventDefault(); showPage('moon-view-page'); });

    if (menuButton) { menuButton.addEventListener('click', toggleSidebar); }
    if (sidebarOverlay) { sidebarOverlay.addEventListener('click', toggleSidebar); }

    // Fun Fact button listener
    if (newFactBtn) {
        newFactBtn.addEventListener('click', displayNewFunFact);
    }

    // Chatbot event listeners
    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', () => {
            chatbotWindow.classList.toggle('open');
            if (chatbotWindow.classList.contains('open')) {
                chatInput.focus(); // Focus input when opened
                chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
            }
        });
    }
    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener('click', () => {
            chatbotWindow.classList.remove('open');
        });
    }
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendChatMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }


    // Initial content setup for all pages (they will be hidden, but data structures are ready)
    initializeTelemetryCards(telemetryDataEl, 'home');
    initializeTelemetryCards(telemetryDataSatView, 'satellite');
    initializeTelemetryCards(telemetryDataIssView, 'iss');
    updateMarsWeather(marsWeatherDataEl);
    updateMarsWeather(marsWeatherDataPage);
    displayAsteroidThreats(asteroidListEl, asteroidSvgEl);
    displayAsteroidThreats(asteroidListPage, asteroidSvgPage);
    initializeRadialMeters();
    updateMoonData();
    displayNewFunFact(); // Display initial fun fact when dashboard loads
    updateDateTime(); // Initial call for date/time
});
