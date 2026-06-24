// LifeBridge AI - Application Controller

// State Management
let currentScenario = "NORMAL";
let currentLang = "EN";
let userLocation = { lat: 19.0760, lng: 72.8777 }; // Center Mumbai
let selectedCheckinStatus = "safe";
let isSOSActive = false;
let flashlightInterval = null;
let activeRoute = null;

// Map & Layer References
let map = null;
let userMarker = null;
let shelterMarkers = [];
let hospitalMarkers = [];
let hazardCircles = [];

// Translation Database (English and Hindi mappings)
const translations = {
  EN: {
    appTitle: "LifeBridge AI",
    appTagline: "Disaster & Emergency Assistant",
    tabShelters: "Shelters",
    tabMedical: "Medical Help",
    tabSupplies: "Supplies",
    tabTips: "Safety Rules",
    titleShelters: "Emergency Shelters",
    titleMedical: "Hospitals & Trauma Centers",
    titleSupplies: "Offline Supply Checklist",
    titleTips: "Emergency Safety Guides",
    sheltersDesc: "Click card to plot route on map",
    medicalDesc: "Active bed count and emergency wait times",
    suppliesDesc: "Maintained locally on device for offline tracking",
    tipsDesc: "Actionable safety rules for current threat",
    titleSOS: "Emergency SOS Beacon",
    sosInst: "Tap SOS to simulate flashlight strobe and generate distress location message.",
    titleCheckin: "Safety Status Broadcast",
    lblCheckinName: "Your Name",
    lblCheckinStatus: "Current Status",
    optSafe: "I am Safe",
    optDanger: "Need Help",
    btnGenerateBroadcast: "Generate Safety Message",
    txtShareReady: "Message ready to copy:",
    btnCopy: "Copy",
    btnCopied: "Copied!",
    titleSimulation: "Disaster Simulation Console",
    copilotStatus: "Active Emergency Responder",
    aiGreet: "Hello! I am your **Gemini Emergency Assistant**. I have offline access to shelter locations, hospitals, and route bypass coordinates. How can I help you survive the current situation?",
    placeholderAsk: "Ask Gemini...",
    statusOpen: "Open",
    statusFull: "Full",
    bedsAvailable: "beds available",
    erWait: "ER Wait time",
    min: "min",
    ambulance: "Ambulance",
    capacity: "Capacity",
    occupied: "Occupied",
    phone: "Phone",
    distance: "Distance",
    nearestShelter: "Nearest Shelter",
    safeRoute: "Safe Route",
    avoidingHazards: "Avoiding Hazards",
    noHazards: "No hazards in area",
    distressBeaconTitle: "🚨 EMERGENCY SOS DISTRESS BEACON 🚨",
    distressMessage: "Need urgent help! Name: {name}. Status: {status}. Location: https://maps.google.com/?q={lat},{lng} ({scenario} situation). Please dispatch rescue services."
  },
  HI: {
    appTitle: "लाइफब्रिज AI",
    appTagline: "आपदा एवं आपातकालीन सहायक",
    tabShelters: "आश्रय स्थल",
    tabMedical: "चिकित्सा सहायता",
    tabSupplies: "आपूर्ति सूची",
    tabTips: "सुरक्षा नियम",
    titleShelters: "आपातकालीन आश्रय स्थल",
    titleMedical: "अस्पताल और ट्रॉमा सेंटर",
    titleSupplies: "ऑफ़लाइन सामग्री सूची",
    titleTips: "आपातकालीन सुरक्षा नियम",
    sheltersDesc: "मानचित्र पर मार्ग देखने के लिए कार्ड पर क्लिक करें",
    medicalDesc: "सक्रिय बेड की संख्या और आपातकालीन प्रतीक्षा समय",
    suppliesDesc: "ऑफ़लाइन ट्रैकिंग के लिए डिवाइस पर स्थानीय रूप से सुरक्षित",
    tipsDesc: "वर्तमान खतरे के लिए व्यावहारिक सुरक्षा नियम",
    titleSOS: "आपातकालीन एसओएस बीकन",
    sosInst: "फ़्लैशलाइट स्ट्रोब सिम्युलेट करने और स्थान संदेश उत्पन्न करने के लिए SOS दबाएं।",
    titleCheckin: "सुरक्षा स्थिति प्रसारण",
    lblCheckinName: "आपका नाम",
    lblCheckinStatus: "वर्तमान स्थिति",
    optSafe: "मैं सुरक्षित हूँ",
    optDanger: "सहायता चाहिए",
    btnGenerateBroadcast: "सुरक्षा संदेश बनाएँ",
    txtShareReady: "कॉपी करने के लिए संदेश तैयार है:",
    btnCopy: "कॉपी करें",
    btnCopied: "कॉपी हो गया!",
    titleSimulation: "आपदा सिमुलेशन कंसोल",
    copilotStatus: "सक्रिय आपातकालीन सहायक",
    aiGreet: "नमस्ते! मैं आपका **जेमिनी आपातकालीन सहायक** हूँ। मेरे पास आश्रय स्थलों, अस्पतालों और बाईपास मार्गों की ऑफ़लाइन जानकारी है। मैं आपकी सहायता कैसे कर सकता हूँ?",
    placeholderAsk: "जेमिनी से पूछें...",
    statusOpen: "खुला है",
    statusFull: "पूर्ण",
    bedsAvailable: "बेड उपलब्ध",
    erWait: "आपातकालीन प्रतीक्षा समय",
    min: "मिनट",
    ambulance: "एम्बुलेंस",
    capacity: "क्षमता",
    occupied: "भरे हुए",
    phone: "फ़ोन",
    distance: "दूरी",
    nearestShelter: "निकटतम आश्रय",
    safeRoute: "सुरक्षित मार्ग",
    avoidingHazards: "खतरों से बचते हुए",
    noHazards: "क्षेत्र में कोई खतरा नहीं",
    distressBeaconTitle: "🚨 आपातकालीन एसओएस संकट बीकन 🚨",
    distressMessage: "त्वरित सहायता की आवश्यकता है! नाम: {name}। स्थिति: {status}। स्थान: https://maps.google.com/?q={lat},{lng} ({scenario} की स्थिति)। कृपया बचाव सेवाएं भेजें।"
  }
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  loadChecklist();
  updateUIForScenario();
  updateLanguageUI();
  updateLocationCoords();
  
  // Custom marker animation interval helper
  setInterval(() => {
    if (isSOSActive) {
      document.getElementById("flashlightOverlay").classList.toggle("flashlight-active");
    }
  }, 150);
});

// Map Setup
function initMap() {
  // Leaflet initialization
  map = L.map('map', {
    zoomControl: false
  }).setView([defaultLocation.lat, defaultLocation.lng], defaultLocation.zoom);

  // Load custom dark-mode style OSM tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add zoom control at bottom right
  L.control.zoom({ position: 'bottomleft' }).addTo(map);
  
  // Update map contents based on active scenario
  updateMapMarkers();
}

// Update Map Markers & Hazard Circles
function updateMapMarkers() {
  if (!map) return;

  // Clear existing layers
  if (userMarker) map.removeLayer(userMarker);
  shelterMarkers.forEach(m => map.removeLayer(m));
  hospitalMarkers.forEach(m => map.removeLayer(m));
  hazardCircles.forEach(c => map.removeLayer(c));
  if (activeRoute) map.removeLayer(activeRoute);

  shelterMarkers = [];
  hospitalMarkers = [];
  hazardCircles = [];
  activeRoute = null;

  const data = scenarios[currentScenario];

  // 1. User Position Marker (Purple glowing pulse marker)
  const userIcon = L.divIcon({
    className: 'user-pulse-marker',
    html: '<div style="background:#8b5cf6; width:16px; height:16px; border-radius:50%; border:3px solid white; box-shadow:0 0 10px rgba(139,92,246,0.8);"></div>',
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
  userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map);
  userMarker.bindPopup(`<b>Your Simulated Location</b><br>Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}`).openPopup();

  // 2. Add Hazard Circles (Red translucent regions)
  data.hazards.forEach(hazard => {
    const circle = L.circle([hazard.lat, hazard.lng], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.25,
      radius: hazard.radius,
      className: 'hazard-pulse-marker-class'
    }).addTo(map);
    circle.bindPopup(`<b>⚠️ Hazard Area: ${hazard.name}</b><br>Severity: ${hazard.severity}`);
    hazardCircles.push(circle);
  });

  // 3. Add Shelters (Blue pins)
  data.shelters.forEach(shelter => {
    const color = shelter.status === "Open" ? "#3b82f6" : "#ef4444";
    const shelterIcon = L.divIcon({
      className: 'shelter-marker-icon',
      html: `<div style="background:${color}; width:24px; height:24px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:var(--shadow-sm);"><i class="fa-solid fa-tents" style="transform:rotate(45deg); font-size:10px; color:#fff;"></i></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });
    
    const m = L.marker([shelter.lat, shelter.lng], { icon: shelterIcon }).addTo(map);
    m.bindPopup(`
      <b>🏢 ${shelter.name}</b><br>
      Status: <span style="color:${color}; font-weight:bold;">${shelter.status}</span><br>
      Capacity: ${shelter.occupied}/${shelter.capacity} (${Math.round((shelter.occupied/shelter.capacity)*100)}%)<br>
      Phone: ${shelter.phone}
    `);
    shelterMarkers.push(m);
  });

  // 4. Add Hospitals (Green cross pins)
  data.hospitals.forEach(hospital => {
    const hospitalIcon = L.divIcon({
      className: 'hospital-marker-icon',
      html: `<div style="background:#10b981; width:24px; height:24px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:var(--shadow-sm);"><i class="fa-solid fa-square-h" style="transform:rotate(45deg); font-size:12px; color:#fff;"></i></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });
    
    const m = L.marker([hospital.lat, hospital.lng], { icon: hospitalIcon }).addTo(map);
    m.bindPopup(`
      <b>🏥 ${hospital.name}</b><br>
      Available Beds: <b>${hospital.bedsAvailable}</b><br>
      ER Wait Time: <b>${hospital.erWaitMinutes} min</b><br>
      Phone: ${hospital.phone}
    `);
    hospitalMarkers.push(m);
  });
}

// Simulated Safe Route Finder
// Computes path and offsets segments if they cross active hazard zones
function plotSafeRouteTo(targetLat, targetLng, destinationName) {
  if (activeRoute) map.removeLayer(activeRoute);
  
  const start = L.latLng(userLocation.lat, userLocation.lng);
  const end = L.latLng(targetLat, targetLng);
  
  // Start with a polyline between start and end
  let routePoints = [start];
  
  // Check if any hazard overlaps the straight route.
  // If so, bend the route by inserting avoidance nodes.
  const data = scenarios[currentScenario];
  
  data.hazards.forEach(hazard => {
    const hazardLoc = L.latLng(hazard.lat, hazard.lng);
    const midPoint = L.latLng((start.lat + end.lat) / 2, (start.lng + end.lng) / 2);
    
    // Check distance from hazard to the line midpoint
    const distanceToHazard = midPoint.distanceTo(hazardLoc);
    
    // If the path runs close or through the hazard, push route outward
    if (distanceToHazard < hazard.radius + 200) {
      // Calculate a safe diversion point (shift offset perpendicular to hazard direction)
      const offsetLat = hazard.lat + (hazard.lat - midPoint.lat > 0 ? -0.007 : 0.007);
      const offsetLng = hazard.lng + (hazard.lng - midPoint.lng > 0 ? -0.007 : 0.007);
      routePoints.push(L.latLng(offsetLat, offsetLng));
    }
  });
  
  routePoints.push(end);
  
  // Draw safe route (green glowing polyline)
  activeRoute = L.polyline(routePoints, {
    color: '#10b981',
    weight: 6,
    opacity: 0.8,
    lineJoin: 'round',
    dashArray: '10, 10',
    className: 'route-glow-polyline'
  }).addTo(map);
  
  map.fitBounds(activeRoute.getBounds(), { padding: [50, 50] });
  
  // Show popups
  L.popup()
    .setLatLng(L.latLng((start.lat + end.lat)/2, (start.lng + end.lng)/2))
    .setContent(`<div style="color:var(--text-primary); text-align:center;">
      <b>🗺️ Safe Route Plotted</b><br>
      Avoiding hazards to: <b>${destinationName}</b>
    </div>`)
    .openOn(map);
}

// UI Rendering Logic per Active Tab
function switchTab(tabName) {
  // Toggle Active States in Nav Tabs
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
  });
  
  // Toggle Panel Contents
  document.getElementById("sheltersPanel").style.display = tabName === "shelters" ? "block" : "none";
  document.getElementById("medicalPanel").style.display = tabName === "medical" ? "block" : "none";
  document.getElementById("suppliesPanel").style.display = tabName === "supplies" ? "block" : "none";
  document.getElementById("tipsPanel").style.display = tabName === "tips" ? "block" : "none";
  
  if (tabName === "shelters") renderShelters();
  if (tabName === "medical") renderHospitals();
  if (tabName === "supplies") renderSupplies();
  if (tabName === "tips") renderTips();
}

function renderShelters() {
  const container = document.getElementById("sheltersList");
  container.innerHTML = "";
  const data = scenarios[currentScenario];
  
  data.shelters.forEach(shelter => {
    const isFull = shelter.status === "Full";
    const statusClass = isFull ? "status-full" : "status-open";
    const statusText = isFull ? translations[currentLang].statusFull : translations[currentLang].statusOpen;
    
    // Calculate distance
    const dist = getDistanceKm(userLocation.lat, userLocation.lng, shelter.lat, shelter.lng).toFixed(2);
    
    const card = document.createElement("div");
    card.className = "data-item-card";
    card.onclick = () => {
      plotSafeRouteTo(shelter.lat, shelter.lng, shelter.name);
      map.setView([shelter.lat, shelter.lng], 14);
    };
    
    card.innerHTML = `
      <div class="data-item-header">
        <span class="data-item-title">🏢 ${shelter.name}</span>
        <span class="status-badge ${statusClass}">${statusText}</span>
      </div>
      <div class="data-item-details">
        <div class="detail-point"><i class="fa-solid fa-route"></i> <span>${dist} km</span></div>
        <div class="detail-point"><i class="fa-solid fa-users"></i> <span>${translations[currentLang].capacity}: ${shelter.occupied}/${shelter.capacity}</span></div>
        <div class="detail-point"><i class="fa-solid fa-phone"></i> <span>${shelter.phone}</span></div>
      </div>
      <div class="amenities-group">
        ${shelter.amenities.map(a => `<span class="amenity-chip">${a.toUpperCase()}</span>`).join('')}
      </div>
    `;
    container.appendChild(card);
  });
}

function renderHospitals() {
  const container = document.getElementById("medicalList");
  container.innerHTML = "";
  const data = scenarios[currentScenario];
  
  data.hospitals.forEach(hospital => {
    const dist = getDistanceKm(userLocation.lat, userLocation.lng, hospital.lat, hospital.lng).toFixed(2);
    const criticalER = hospital.erWaitMinutes > 45 ? "color: var(--accent-red); font-weight:bold;" : "";
    
    const card = document.createElement("div");
    card.className = "data-item-card";
    card.onclick = () => {
      plotSafeRouteTo(hospital.lat, hospital.lng, hospital.name);
      map.setView([hospital.lat, hospital.lng], 14);
    };
    
    card.innerHTML = `
      <div class="data-item-header">
        <span class="data-item-title">🏥 ${hospital.name}</span>
      </div>
      <div class="data-item-details">
        <div class="detail-point"><i class="fa-solid fa-route"></i> <span>${dist} km</span></div>
        <div class="detail-point"><i class="fa-solid fa-bed"></i> <span>${hospital.bedsAvailable} ${translations[currentLang].bedsAvailable}</span></div>
        <div class="detail-point"><i class="fa-solid fa-clock"></i> <span style="${criticalER}">${translations[currentLang].erWait}: ${hospital.erWaitMinutes} ${translations[currentLang].min}</span></div>
        <div class="detail-point"><i class="fa-solid fa-phone"></i> <span>${hospital.phone}</span></div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderSupplies() {
  const container = document.getElementById("checklistContainer");
  container.innerHTML = "";
  const data = scenarios[currentScenario];
  
  const savedState = JSON.parse(localStorage.getItem(`supplies_${currentScenario}`)) || {};
  
  data.supplies.forEach(item => {
    const isChecked = savedState[item.id] !== undefined ? savedState[item.id] : item.checked;
    
    const div = document.createElement("label");
    div.className = `checklist-item ${isChecked ? 'checked' : ''}`;
    
    div.innerHTML = `
      <input type="checkbox" id="chk-${item.id}" ${isChecked ? 'checked' : ''} onchange="toggleSupplyCheckbox('${item.id}', this)">
      <span class="checklist-text">${item.text}</span>
    `;
    container.appendChild(div);
  });
}

function toggleSupplyCheckbox(id, checkbox) {
  const label = checkbox.parentElement;
  label.classList.toggle("checked", checkbox.checked);
  
  // Save to LocalStorage
  const key = `supplies_${currentScenario}`;
  const savedState = JSON.parse(localStorage.getItem(key)) || {};
  savedState[id] = checkbox.checked;
  localStorage.setItem(key, JSON.stringify(savedState));
}

function loadChecklist() {
  const data = scenarios[currentScenario];
  const key = `supplies_${currentScenario}`;
  if (!localStorage.getItem(key)) {
    const defaultState = {};
    data.supplies.forEach(item => {
      defaultState[item.id] = false;
    });
    localStorage.setItem(key, JSON.stringify(defaultState));
  }
}

function renderTips() {
  const container = document.getElementById("tipsContainer");
  container.innerHTML = "";
  
  let instructions = [];
  if (currentScenario === "NORMAL") {
    instructions = [
      "Prepare a 72-hour disaster evacuation pack.",
      "Identify two evacuation routes from your home/office.",
      "Save emergency helpline coordinates to your phone book.",
      "Participate in local community rescue drills."
    ];
  } else if (currentScenario === "FLOOD") {
    instructions = [
      "Do NOT walk, swim, or drive through flood waters. Turn around, don't drown!",
      "Move to higher ground or upper levels of sturdy buildings immediately.",
      "Avoid underpasses, storm drains, and landslide-prone cliffs.",
      "Shut off main utility electrical switches if your building is flooded.",
      "Listen to weather broadcast warnings on battery-powered radios."
    ];
  } else if (currentScenario === "EARTHQUAKE") {
    instructions = [
      "DROP, COVER, and HOLD ON under sturdy desks/tables during seismic tremors.",
      "Stay inside if you are indoors; avoid running outside during active shaking.",
      "If outdoors, move away from power cables, concrete walls, and chimneys.",
      "Be prepared for immediate aftershocks; secure head protection.",
      "Sniff for gas leaks. Do NOT light matches or use gas appliances."
    ];
  } else if (currentScenario === "CYCLONE") {
    instructions = [
      "Secure external doors, window panels, and move loose items indoors.",
      "In coastal zones, evacuate immediately to high ground shelters.",
      "Stay indoors away from windows during high velocity winds.",
      "Unplug electrical devices to protect them from power spikes/lightning.",
      "Do not go outside during the calm eye of the storm; winds will shift rapidly."
    ];
  }
  
  instructions.forEach((inst, index) => {
    const card = document.createElement("div");
    card.className = "data-item-card";
    card.style.cursor = "default";
    card.innerHTML = `
      <div style="display:flex; gap:0.75rem; align-items:flex-start;">
        <span style="background:var(--accent-orange); color:white; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:bold; flex-shrink:0;">${index+1}</span>
        <span style="font-size:0.875rem; color:var(--text-primary);">${inst}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// Disaster Scenario Toggle
function changeScenario(scenarioKey) {
  currentScenario = scenarioKey;
  
  // Highlight active button in Console
  document.querySelectorAll(".sim-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-sim") === scenarioKey);
  });
  
  loadChecklist();
  updateUIForScenario();
  updateMapMarkers();
  
  // Use GeminiAgent for rich scenario briefing
  GeminiAgent.scenarioBriefing(scenarioKey);
}

function updateUIForScenario() {
  const data = scenarios[currentScenario];
  
  // Alert Banner Update
  const banner = document.getElementById("alertBanner");
  const alertText = document.getElementById("alertText");
  
  banner.className = `alert-banner ${data.alertClass}`;
  alertText.textContent = data.alertText;
  
  // Reload current active tab content
  const activeTabBtn = document.querySelector(".tab-btn.active");
  const tabName = activeTabBtn ? activeTabBtn.getAttribute("data-tab") : "shelters";
  switchTab(tabName);
}

// Emergency SOS Panel Logic
function triggerSOS() {
  isSOSActive = !isSOSActive;
  
  const container = document.getElementById("sosContainer");
  const btn = document.getElementById("btnSOS");
  const ring = document.getElementById("sosRing");
  
  if (isSOSActive) {
    container.classList.add("sos-active");
    ring.style.display = "block";
    
    // Play a buzzer sound if available, otherwise just log
    console.log("SOS Active: Simulated flashlight strobe and siren active.");
    
    // Auto post alarm notification into Copilot
    addChatMessage("ai", "🚨 **SOS BROADCAST ACTIVATED!** Simulated beacon dispatched with your coordinates. Copy your safety message below to send via SMS/WhatsApp.");
  } else {
    container.classList.remove("sos-active");
    ring.style.display = "none";
    document.getElementById("flashlightOverlay").classList.remove("flashlight-active");
  }
}

// Coordinates display simulation helper
function updateLocationCoords() {
  const coordsDiv = document.getElementById("sosCoords");
  coordsDiv.textContent = `Lat: ${userLocation.lat.toFixed(4)}, Lng: ${userLocation.lng.toFixed(4)}`;
}

// Family Check-In Logic
function setCheckinStatus(status) {
  selectedCheckinStatus = status;
  document.querySelectorAll(".status-opt-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-status") === status);
  });
}

function generateBroadcastMessage() {
  const name = document.getElementById("checkinName").value.trim() || "Suhani";
  const statusStr = selectedCheckinStatus === "safe" 
    ? translations[currentLang].optSafe 
    : translations[currentLang].optDanger;
  
  const textPattern = translations[currentLang].distressMessage;
  const generated = textPattern
    .replace("{name}", name)
    .replace("{status}", statusStr)
    .replace("{lat}", userLocation.lat.toFixed(4))
    .replace("{lng}", userLocation.lng.toFixed(4))
    .replace("{scenario}", currentScenario);
    
  const shareBox = document.getElementById("shareBox");
  const shareText = document.getElementById("shareText");
  
  shareText.textContent = generated;
  shareBox.style.display = "block";
}

function copySafetyBroadcast() {
  const shareText = document.getElementById("shareText").textContent;
  navigator.clipboard.writeText(shareText).then(() => {
    const copyBtn = document.getElementById("btn-copy-txt");
    const originalText = copyBtn.textContent;
    copyBtn.textContent = translations[currentLang].btnCopied;
    setTimeout(() => {
      copyBtn.textContent = originalText;
    }, 2000);
  });
}

// Multi-Language Toggle
function toggleLanguage() {
  currentLang = currentLang === "EN" ? "HI" : "EN";
  
  const toggleBtn = document.getElementById("btnLangToggle");
  toggleBtn.textContent = currentLang === "EN" ? "हिन्दी" : "English";
  
  updateLanguageUI();
  updateUIForScenario();
}

function updateLanguageUI() {
  const dict = translations[currentLang];
  
  // Global DOM Text Nodes
  document.getElementById("txt-app-title").textContent = dict.appTitle;
  document.getElementById("txt-app-tagline").textContent = dict.appTagline;
  document.getElementById("tab-shelters").textContent = dict.tabShelters;
  document.getElementById("tab-medical").textContent = dict.tabMedical;
  document.getElementById("tab-supplies").textContent = dict.tabSupplies;
  document.getElementById("tab-tips").textContent = dict.tabTips;
  
  document.getElementById("title-shelters").textContent = dict.titleShelters;
  document.getElementById("title-medical").textContent = dict.titleMedical;
  document.getElementById("title-supplies").textContent = dict.titleSupplies;
  document.getElementById("title-tips").textContent = dict.titleTips;
  
  document.getElementById("txt-shelters-desc").textContent = dict.sheltersDesc;
  document.getElementById("txt-medical-desc").textContent = dict.medicalDesc;
  document.getElementById("txt-supplies-desc").textContent = dict.suppliesDesc;
  document.getElementById("txt-tips-desc").textContent = dict.tipsDesc;
  
  document.getElementById("title-sos").textContent = dict.titleSOS;
  document.getElementById("txt-sos-inst").textContent = dict.sosInst;
  
  document.getElementById("title-checkin").textContent = dict.titleCheckin;
  document.getElementById("lbl-checkin-name").textContent = dict.lblCheckinName;
  document.getElementById("lbl-checkin-status").textContent = dict.lblCheckinStatus;
  document.getElementById("opt-safe").textContent = dict.optSafe;
  document.getElementById("opt-danger").textContent = dict.optDanger;
  document.getElementById("btn-generate-broadcast").textContent = dict.btnGenerateBroadcast;
  
  document.getElementById("title-simulation").textContent = dict.titleSimulation;
  document.getElementById("txt-copilot-status").textContent = dict.copilotStatus;
  
  // Update inputs placeholder
  document.getElementById("chatInput").placeholder = dict.placeholderAsk;
}

// =============================================================
// GEMINI AI AGENT — Enhanced Emergency Intelligence Engine
// =============================================================
const GeminiAgent = (() => {

  // Agent memory — remembers last topics across turns
  const memory = {
    lastIntent: null,
    lastShelter: null,
    lastHospital: null,
    mentionedScenarios: new Set(),
    turnCount: 0
  };

  // Intent classification database with scoring weights
  const intentMap = [
    {
      id: 'find_shelter',
      label: 'Find Shelter',
      keywords: ['shelter','refuge','stay','camp','somewhere safe','safe place','evacuate','where can i go','live','escape','sharan','sharnam','can i stay'],
      weight: 1.2
    },
    {
      id: 'safe_route',
      label: 'Plot Safe Route',
      keywords: ['route','path','road','safe way','navigate','navigation','go to','how to reach','get there','get to','blocked road','closed road','bypass','detour','marg','rasta'],
      weight: 1.1
    },
    {
      id: 'find_medical',
      label: 'Find Medical Help',
      keywords: ['hospital','medical','doctor','nurse','er','emergency room','icu','surgery','ambulance','injured','hurt','wound','sick','medicine','bleeding','treatment','aspatal','dawakhana'],
      weight: 1.2
    },
    {
      id: 'show_supplies',
      label: 'Show Supply Checklist',
      keywords: ['supply','supplies','kit','checklist','pack','what to carry','what do i need','food','water','torch','flashlight','backpack','bag','preparation'],
      weight: 1.0
    },
    {
      id: 'trigger_sos',
      label: 'Emergency SOS',
      keywords: ['sos','panic','help me','danger','trapped','stuck','distress','send help','save me','emergency','mayday','bachao','madad'],
      weight: 1.5
    },
    {
      id: 'situation_report',
      label: 'Situation Report',
      keywords: ['what is happening','current situation','report','status','update','brief me','situation','briefing','assess','aaj','abhi kya ho raha'],
      weight: 1.0
    },
    {
      id: 'first_aid_burn',
      label: 'First Aid — Burns',
      keywords: ['burn','scald','fire burn','skin burn','hot water','blisters'],
      weight: 1.0
    },
    {
      id: 'first_aid_bleed',
      label: 'First Aid — Bleeding',
      keywords: ['bleed','bleeding','wound','blood','cut','gash','haemorrhage'],
      weight: 1.0
    },
    {
      id: 'first_aid_fracture',
      label: 'First Aid — Fracture',
      keywords: ['fracture','broken bone','sprain','broken arm','broken leg','dislocate'],
      weight: 1.0
    },
    {
      id: 'first_aid_cpr',
      label: 'First Aid — CPR',
      keywords: ['cpr','cardiac','not breathing','unconscious','choking','heart attack','chest compression','resuscitation'],
      weight: 1.0
    },
    {
      id: 'hazard_info',
      label: 'Hazard Information',
      keywords: ['hazard','danger zone','unsafe area','blocked','floodwater','rubble','debris','gas leak','collapsed','fire zone'],
      weight: 1.0
    },
    {
      id: 'family_checkin',
      label: 'Family Safety Check-In',
      keywords: ['family','contact','reach','check in','status','broadcast','share','tell them','let them know','ghar wale','parivaar'],
      weight: 1.0
    }
  ];

  // Multi-intent parser: returns sorted [{id, score}] array
  function classifyIntents(query) {
    const q = query.toLowerCase();
    const scores = {};
    intentMap.forEach(intent => {
      let score = 0;
      intent.keywords.forEach(kw => {
        if (q.includes(kw)) score += intent.weight;
      });
      if (score > 0) scores[intent.id] = score;
    });
    return Object.entries(scores)
      .map(([id, score]) => ({ id, score }))
      .sort((a, b) => b.score - a.score);
  }

  // Collect all data from active scenario for agent context
  function getContext() {
    const data = scenarios[currentScenario];
    const allShelters = data.shelters;
    const openShelters = allShelters.filter(s => s.status === 'Open');
    const nearestShelter = findNearestItem(userLocation.lat, userLocation.lng, openShelters.length ? openShelters : allShelters);
    const nearestHospital = findNearestItem(userLocation.lat, userLocation.lng, data.hospitals);
    const bestHospital = [...data.hospitals].sort((a, b) => a.erWaitMinutes - b.erWaitMinutes)[0];
    return { data, allShelters, openShelters, nearestShelter, nearestHospital, bestHospital };
  }

  // Module Coordinators — each function executes the module action and returns a response string
  const modules = {

    find_shelter(ctx) {
      switchTab('shelters');
      const { nearestShelter, openShelters, data } = ctx;
      if (!nearestShelter) return '⚠️ No open shelters found in current database. Try switching to a different scenario.';
      memory.lastShelter = nearestShelter;
      plotSafeRouteTo(nearestShelter.lat, nearestShelter.lng, nearestShelter.name);
      map.setView([nearestShelter.lat, nearestShelter.lng], 14);
      const dist = getDistanceKm(userLocation.lat, userLocation.lng, nearestShelter.lat, nearestShelter.lng).toFixed(2);
      const pct = Math.round((nearestShelter.occupied / nearestShelter.capacity) * 100);
      const hazardCount = data.hazards.length;
      return `🏢 **Nearest Open Shelter Found:**

**${nearestShelter.name}**
📍 Distance: **${dist} km** from your location
👥 Occupancy: **${nearestShelter.occupied}/${nearestShelter.capacity}** (${pct}% full)
📞 Contact: ${nearestShelter.phone}
🎒 Amenities: ${nearestShelter.amenities.join(', ')}

🗺️ Safe route plotted on map — avoiding **${hazardCount} active hazard zone${hazardCount !== 1 ? 's' : ''}**. Total **${openShelters.length}** shelter${openShelters.length !== 1 ? 's' : ''} open nearby.`;
    },

    safe_route(ctx) {
      switchTab('shelters');
      const { nearestShelter, data } = ctx;
      if (!nearestShelter) return '⚠️ No destination found to plot a route.';
      plotSafeRouteTo(nearestShelter.lat, nearestShelter.lng, nearestShelter.name);
      const dist = getDistanceKm(userLocation.lat, userLocation.lng, nearestShelter.lat, nearestShelter.lng).toFixed(2);
      const avoided = data.hazards.map(h => `• **${h.name}** (${h.severity})`).join('\n') || '• No active hazards';
      return `🗺️ **Safe Route Calculated:**

Destination: **${nearestShelter.name}** (~${dist} km)

🚫 Bypassing:
${avoided}

✅ Glowing green path shown on map. Follow it and **do not enter red-shaded danger zones**.`;
    },

    find_medical(ctx) {
      switchTab('medical');
      const { bestHospital, nearestHospital } = ctx;
      const target = bestHospital;
      memory.lastHospital = target;
      plotSafeRouteTo(target.lat, target.lng, target.name);
      map.setView([target.lat, target.lng], 14);
      const dist = getDistanceKm(userLocation.lat, userLocation.lng, target.lat, target.lng).toFixed(2);
      const urgency = target.erWaitMinutes > 60 ? '🔴 **Critically Overloaded**' : target.erWaitMinutes > 30 ? '🟡 **Busy**' : '🟢 **Available**';
      return `🏥 **Best Available Medical Facility:**

**${target.name}**
📍 Distance: **${dist} km**
🛏️ Available Beds: **${target.bedsAvailable}**
⏱️ ER Wait: **${target.erWaitMinutes} min** — ${urgency}
🚑 Ambulances Available: **${target.ambulanceAvailable}**
📞 Phone: ${target.phone}

🗺️ Safe route plotted, avoiding all active hazard zones.`;
    },

    show_supplies(ctx) {
      switchTab('supplies');
      const items = ctx.data.supplies;
      const essentials = items.filter(i => i.category === 'essential').map(i => `• ${i.text}`).join('\n');
      const medical = items.filter(i => i.category === 'medical').map(i => `• ${i.text}`).join('\n');
      const tools = items.filter(i => i.category === 'tools').map(i => `• ${i.text}`).join('\n');
      return `🎒 **Emergency Supply Checklist — ${currentScenario} Mode:**

🔵 **Essentials:**
${essentials || '(none)'}

🔴 **Medical:**
${medical || '(none)'}

🟡 **Tools & Equipment:**
${tools || '(none)'}

✅ I have scrolled to the **Supplies** tab. Use checkboxes to track each item — saved offline to your device.`;
    },

    trigger_sos(ctx) {
      if (!isSOSActive) triggerSOS();
      return `⚠️ **SOS EMERGENCY BEACON ACTIVATED!**

Flashlight strobe signal initiated.
📍 GPS: **${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}**
🗺️ Google Maps: https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}

📋 Next steps:
1. Click **Generate Safety Message** below and copy it
2. Send via SMS or WhatsApp to family/emergency contacts
3. Keep your screen at maximum brightness
4. Call: 112 (Emergency) | 108 (Ambulance) | 101 (Fire)`;
    },

    situation_report(ctx) {
      const { data, openShelters, allShelters, bestHospital } = ctx;
      const hazardNames = data.hazards.map(h => `• ${h.name}`).join('\n') || '• None detected';
      return `📊 **Current Situation Report — ${currentScenario}**

🚨 **Alert:** ${data.alertText}

🏢 **Shelters:** ${openShelters.length}/${allShelters.length} open
🏥 **Best Hospital:** ${bestHospital.name} (ER: ${bestHospital.erWaitMinutes} min, Beds: ${bestHospital.bedsAvailable})
⚠️ **Active Hazard Zones:**
${hazardNames}

💡 **Recommended Actions:**
1. Stay calm and assess your immediate surroundings.
2. Ask me: *"Find nearest shelter"*, *"Plot safe route"*, or *"Show supply checklist"*`;
    },

    first_aid_burn() {
      return `### 🩹 Burn Treatment Protocol:
1. **Cool the burn** — run under cool (not cold) water for 10–15 minutes.
2. **Remove tight items** — rings, watches before swelling.
3. **Do not pop blisters** — they protect against infection.
4. **Cover loosely** with sterile gauze. Avoid butter, oil, or toothpaste.
5. **Seek emergency help** if burn is large, charred, or covers face/hands/joints.`;
    },

    first_aid_bleed() {
      return `### 🩸 Severe Bleeding Protocol:
1. **Apply direct pressure** — sterile pad or clean cloth, press firmly.
2. **Elevate** the injured limb above heart level if possible.
3. **Do not remove** soaked cloth — add more on top and keep pressing.
4. **Tourniquet** — only for life-threatening limb bleeding; apply 2–3" above wound.
5. **Prevent shock** — keep patient warm, lying flat, feet slightly elevated.`;
    },

    first_aid_fracture() {
      return `### 🦴 Broken Bone / Fracture Protocol:
1. **Stop bleeding** first — apply sterile pressure.
2. **Immobilize** — do NOT realign bone. Splint above and below fracture.
3. **Ice pack** — wrapped in cloth, never directly on skin.
4. **Treat for shock** — lay flat, elevate feet, keep warm.
5. **No movement** if neck/spine injury suspected.`;
    },

    first_aid_cpr() {
      return `### 🫁 CPR — Adult Emergency:
1. **Check responsiveness** — tap and shout. Check breathing (≤10 seconds).
2. **Call for help** — dial 112 or 108 immediately.
3. **30 chest compressions** — center of chest, 2 inches deep, 100–120/min.
4. **2 rescue breaths** — tilt head, lift chin, pinch nose, blow in.
5. **Repeat** until emergency services arrive. If untrained, do **Hands-Only CPR** (skip step 4).`;
    },

    hazard_info(ctx) {
      const { data } = ctx;
      if (!data.hazards.length) return '✅ No active hazard zones detected in the current scenario.';
      const list = data.hazards.map(h =>
        `⚠️ **${h.name}**\n   Severity: ${h.severity} | Zone radius: ~${h.radius}m`
      ).join('\n\n');
      return `🗺️ **Active Hazard Zones (${data.hazards.length} total):**

${list}

🔴 All zones shown as **red circles** on the map. Stay outside these areas.`;
    },

    family_checkin() {
      switchTab('shelters');
      return `👨‍👩‍👧 **Family Safety Check-In:**

To broadcast your safety status:
1. Scroll down to the **Safety Status Broadcast** panel.
2. Enter your name and select your status (**Safe** or **Need Help**).
3. Click **Generate Safety Message** — it will include your GPS coordinates.
4. Copy and send via SMS, WhatsApp, or any messenger.

📍 Your current location: **${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}**`;
    }
  };

  // Show thinking step animation
  function showThinkingSteps(steps) {
    const feed = document.getElementById('chatFeed');
    const thinking = document.createElement('div');
    thinking.className = 'chat-bubble ai thinking-steps';
    thinking.id = 'agentThinking';
    let html = '<div class="thinking-header"><span class="thinking-sparkle">✦</span> <strong>Gemini Agent is processing...</strong></div><ul class="thinking-list">';
    steps.forEach(step => {
      html += `<li class="thinking-item">${step}</li>`;
    });
    html += '</ul>';
    thinking.innerHTML = html;
    feed.appendChild(thinking);
    scrollChatToBottom();

    // Animate each step in sequence
    const items = thinking.querySelectorAll('.thinking-item');
    items.forEach((item, i) => {
      setTimeout(() => item.classList.add('thinking-done'), i * 300 + 200);
    });

    return thinking;
  }

  // Scenario briefing on simulation switch
  function scenarioBriefing(scenarioKey) {
    const ctx = getContext();
    memory.mentionedScenarios.add(scenarioKey);
    const label = scenarioKey.charAt(0) + scenarioKey.slice(1).toLowerCase();
    const brief = modules.situation_report(ctx);
    setTimeout(() => addChatMessage('ai', `🔄 **Scenario Loaded: ${label} Mode**\n\n${brief}`), 300);
  }

  // Main query processing pipeline
  function process(query) {
    memory.turnCount++;
    const intents = classifyIntents(query);
    const ctx = getContext();

    // Build thinking steps based on detected intents
    const stepLabels = intents.slice(0, 3).map(i => {
      const found = intentMap.find(m => m.id === i.id);
      return found ? `📡 Detected intent: <strong>${found.label}</strong>` : null;
    }).filter(Boolean);

    if (stepLabels.length === 0) stepLabels.push('🔍 Scanning knowledge base...');
    stepLabels.push('📦 Loading module data...', '🗺️ Coordinating map & panels...');

    // Show thinking animation
    const thinkingEl = showThinkingSteps(stepLabels);

    const totalDelay = stepLabels.length * 300 + 700;
    setTimeout(() => {
      // Remove thinking indicator
      if (thinkingEl && thinkingEl.parentNode) thinkingEl.remove();

      if (intents.length === 0) {
        // Smart fallback with memory context
        let fallback = `I couldn't pinpoint a specific action for **"${query}"**.\n\nTry asking me:\n- *"Find nearest shelter"*\n- *"Plot safe route to hospital"*\n- *"What supplies do I need?"*\n- *"How to treat severe bleeding?"*\n- *"Give me a situation report"*\n- *"Trigger SOS"*`;
        if (memory.lastIntent) fallback += `\n\n💬 Last action: **${intentMap.find(m => m.id === memory.lastIntent)?.label || memory.lastIntent}** — ask a follow-up if needed.`;
        addChatMessage('ai', fallback);
        return;
      }

      // Execute primary intent
      const primaryIntent = intents[0].id;
      memory.lastIntent = primaryIntent;

      let response = '';
      const fn = modules[primaryIntent];
      if (fn) {
        response = fn(ctx);
      } else {
        response = `Module **${primaryIntent}** is loading. Try again in a moment.`;
      }

      addChatMessage('ai', response);

      // If multiple high-confidence intents, auto-cascade to secondary (with a delay)
      if (intents.length > 1 && intents[1].score >= 1.0 && intents[0].id !== intents[1].id) {
        const secondaryIntent = intents[1].id;
        const secondaryFn = modules[secondaryIntent];
        if (secondaryFn && !['trigger_sos', 'show_supplies'].includes(secondaryIntent)) {
          setTimeout(() => {
            addChatMessage('ai', `💡 **Also relevant — ${intentMap.find(m => m.id === secondaryIntent)?.label}:**\n\n${secondaryFn(ctx)}`);
          }, 800);
        }
      }
    }, totalDelay);
  }

  return { process, scenarioBriefing };
})();

// =============================================================
// Chat UI Functions
// =============================================================
function handleChatKeypress(event) {
  if (event.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  addChatMessage('user', text);
  input.value = '';
  // Delegate to GeminiAgent
  GeminiAgent.process(text);
}

function submitSuggestedQuery(queryText) {
  document.getElementById('chatInput').value = queryText;
  sendChatMessage();
}

function addChatMessage(sender, text) {
  const feed = document.getElementById('chatFeed');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = formatMarkdown(text);
  feed.appendChild(bubble);
  scrollChatToBottom();
}

function scrollChatToBottom() {
  const feed = document.getElementById('chatFeed');
  feed.scrollTop = feed.scrollHeight;
}

// =============================================================
// Utility Functions
// =============================================================
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function deg2rad(deg) { return deg * (Math.PI / 180); }

function findNearestItem(lat, lng, list) {
  if (!list || list.length === 0) return null;
  let nearest = null, minDist = Infinity;
  list.forEach(item => {
    const d = getDistanceKm(lat, lng, item.lat, item.lng);
    if (d < minDist) { minDist = d; nearest = item; }
  });
  return nearest;
}

function formatMarkdown(text) {
  let html = text;
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/^[•\-] (.*?)$/gm, '<li>$1</li>');
  if (html.includes('<li>')) html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
  html = html.replace(/\n/g, '<br>');
  return html;
}
