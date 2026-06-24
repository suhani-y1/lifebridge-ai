// LifeBridge AI - Mock Database & AI Knowledge Base
// Geolocation centered around Mumbai (19.0760, 72.8777) for realistic simulation

const defaultLocation = {
  lat: 19.0760,
  lng: 72.8777,
  zoom: 12
};

const scenarios = {
  NORMAL: {
    title: "All Clear - Normal Status",
    type: "normal",
    alertText: "No active natural disasters detected in your region. Local services are fully operational.",
    alertClass: "alert-success",
    hazards: [],
    shelters: [
      { id: "s1", name: "Dharavi Community Shelter", lat: 19.0380, lng: 72.8538, status: "Open", capacity: 500, occupied: 45, phone: "+91 22 2401 1122", amenities: ["water", "power"] },
      { id: "s2", name: "Sion Relief Hall", lat: 19.0400, lng: 72.8630, status: "Open", capacity: 300, occupied: 20, phone: "+91 22 2402 3344", amenities: ["water", "food", "medical"] },
      { id: "s3", name: "Bandra Sports Complex", lat: 19.0550, lng: 72.8400, status: "Open", capacity: 800, occupied: 12, phone: "+91 22 2640 5566", amenities: ["water", "food", "medical", "power"] }
    ],
    hospitals: [
      { id: "h1", name: "Sion Hospital", lat: 19.0355, lng: 72.8596, bedsAvailable: 120, erWaitMinutes: 15, ambulanceAvailable: 8, phone: "+91 22 2407 6381" },
      { id: "h2", name: "KEM Hospital", lat: 19.0025, lng: 72.8420, bedsAvailable: 80, erWaitMinutes: 25, ambulanceAvailable: 5, phone: "+91 22 2410 7000" },
      { id: "h3", name: "Lilavati Hospital", lat: 19.0515, lng: 72.8270, bedsAvailable: 45, erWaitMinutes: 10, ambulanceAvailable: 3, phone: "+91 22 2675 1000" }
    ],
    supplies: [
      { id: "sup1", text: "Clean drinking water (3 liters per person/day)", category: "essential", checked: false },
      { id: "sup2", text: "Non-perishable food (canned goods, energy bars)", category: "essential", checked: false },
      { id: "sup3", text: "First-aid kit (bandages, antiseptic, pain relievers)", category: "medical", checked: false },
      { id: "sup4", text: "Flashlight and extra batteries", category: "tools", checked: false },
      { id: "sup5", text: "Personal hygiene items & hand sanitizer", category: "essential", checked: false }
    ]
  },
  FLOOD: {
    title: "Red Alert - Heavy Flooding & Waterlogging",
    type: "flood",
    alertText: "Severe waterlogging reported in low-lying areas. Avoid underpasses and flooded roads. Shelters have been opened.",
    alertClass: "alert-danger",
    hazards: [
      { id: "haz1", name: "Deep Flooding: Sion Circle Underpass", lat: 19.0370, lng: 72.8600, radius: 400, severity: "High" },
      { id: "haz2", name: "Waterlogging: Kurla Station Area", lat: 19.0680, lng: 72.8900, radius: 600, severity: "High" },
      { id: "haz3", name: "Waterlogging: Dadar East TT Circle", lat: 19.0180, lng: 72.8430, radius: 300, severity: "Medium" }
    ],
    shelters: [
      { id: "s1", name: "Dharavi Community Shelter", lat: 19.0380, lng: 72.8538, status: "Open", capacity: 500, occupied: 410, phone: "+91 22 2401 1122", amenities: ["water", "power"] },
      { id: "s2", name: "Sion Relief Hall", lat: 19.0400, lng: 72.8630, status: "Full", capacity: 300, occupied: 300, phone: "+91 22 2402 3344", amenities: ["water", "food", "medical"] },
      { id: "s3", name: "Bandra Sports Complex", lat: 19.0550, lng: 72.8400, status: "Open", capacity: 800, occupied: 150, phone: "+91 22 2640 5566", amenities: ["water", "food", "medical", "power"] },
      { id: "s4", name: "Vidyavihar Secondary School (Emergency)", lat: 19.0790, lng: 72.8960, status: "Open", capacity: 400, occupied: 80, phone: "+91 22 2511 8899", amenities: ["water", "food"] }
    ],
    hospitals: [
      { id: "h1", name: "Sion Hospital", lat: 19.0355, lng: 72.8596, bedsAvailable: 12, erWaitMinutes: 95, ambulanceAvailable: 0, phone: "+91 22 2407 6381" },
      { id: "h2", name: "KEM Hospital", lat: 19.0025, lng: 72.8420, bedsAvailable: 35, erWaitMinutes: 50, ambulanceAvailable: 2, phone: "+91 22 2410 7000" },
      { id: "h3", name: "Lilavati Hospital", lat: 19.0515, lng: 72.8270, bedsAvailable: 28, erWaitMinutes: 20, ambulanceAvailable: 4, phone: "+91 22 2675 1000" }
    ],
    supplies: [
      { id: "sup1", text: "Clean drinking water (stored high above ground)", category: "essential", checked: false },
      { id: "sup2", text: "Non-perishable food (ready-to-eat without cooking)", category: "essential", checked: false },
      { id: "sup3", text: "Waterproof pouch for documents and cash", category: "tools", checked: false },
      { id: "sup4", text: "Emergency whistle & high-powered flashlight", category: "tools", checked: false },
      { id: "sup5", text: "First-aid kit (including antiseptic wipes and rehydration salts)", category: "medical", checked: false },
      { id: "sup6", text: "Rain gear & waterproof boots", category: "essential", checked: false }
    ]
  },
  EARTHQUAKE: {
    title: "Critical Alert - Seismic Activity Detected",
    type: "earthquake",
    alertText: "Strong earthquake felt. Expect aftershocks. Stay away from damaged structures. Evacuate to open areas.",
    alertClass: "alert-danger",
    hazards: [
      { id: "haz4", name: "Structure Collapse: Dadar Flyover Damaged", lat: 19.0200, lng: 72.8420, radius: 450, severity: "Critical" },
      { id: "haz5", name: "Gas Leak/Fire: Mahim West Block", lat: 19.0420, lng: 72.8350, radius: 350, severity: "High" },
      { id: "haz6", name: "Debris Hazard: Kurla West Roadblock", lat: 19.0720, lng: 72.8820, radius: 250, severity: "Medium" }
    ],
    shelters: [
      { id: "s3", name: "Bandra Sports Complex (Open Field)", lat: 19.0550, lng: 72.8400, status: "Open", capacity: 1500, occupied: 940, phone: "+91 22 2640 5566", amenities: ["water", "food", "medical", "power"] },
      { id: "s5", name: "Shivaji Park Assembly Area", lat: 19.0270, lng: 72.8360, status: "Open", capacity: 3000, occupied: 1200, phone: "+91 22 2445 7788", amenities: ["water", "medical"] },
      { id: "s6", name: "Kurla Open Grounds", lat: 19.0660, lng: 72.8800, status: "Open", capacity: 1000, occupied: 450, phone: "+91 22 2504 3322", amenities: ["water"] }
    ],
    hospitals: [
      { id: "h1", name: "Sion Hospital (Trauma Center)", lat: 19.0355, lng: 72.8596, bedsAvailable: 5, erWaitMinutes: 120, ambulanceAvailable: 1, phone: "+91 22 2407 6381" },
      { id: "h2", name: "KEM Hospital (Trauma Ward)", lat: 19.0025, lng: 72.8420, bedsAvailable: 15, erWaitMinutes: 80, ambulanceAvailable: 0, phone: "+91 22 2410 7000" },
      { id: "h3", name: "Lilavati Hospital (Surgical Wing)", lat: 19.0515, lng: 72.8270, bedsAvailable: 22, erWaitMinutes: 45, ambulanceAvailable: 3, phone: "+91 22 2675 1000" }
    ],
    supplies: [
      { id: "sup1", text: "Sturdy closed-toe shoes (protect from glass/debris)", category: "essential", checked: false },
      { id: "sup2", text: "Thick work gloves", category: "tools", checked: false },
      { id: "sup3", text: "Portable FM radio & spare batteries (for broadcast)", category: "tools", checked: false },
      { id: "sup4", text: "Dust masks (protect against concrete/asbestos dust)", category: "medical", checked: false },
      { id: "sup5", text: "Emergency multi-tool or pocket knife", category: "tools", checked: false },
      { id: "sup6", text: "Emergency contact numbers card (printed)", category: "essential", checked: false }
    ]
  },
  CYCLONE: {
    title: "Warning - Severe Tropical Cyclone Approaching",
    type: "cyclone",
    alertText: "High wind speeds & tidal waves expected. Coastal residents must evacuate inland. Secure loose items.",
    alertClass: "alert-warning",
    hazards: [
      { id: "haz7", name: "Tidal Wave Hazard: Worli Seaface Flooding", lat: 19.0080, lng: 72.8150, radius: 800, severity: "High" },
      { id: "haz8", name: "High Winds: Bandra Bandstand Debris", lat: 19.0430, lng: 72.8180, radius: 500, severity: "Medium" }
    ],
    shelters: [
      { id: "s1", name: "Dharavi Community Shelter (Inland)", lat: 19.0380, lng: 72.8538, status: "Open", capacity: 500, occupied: 320, phone: "+91 22 2401 1122", amenities: ["water", "power"] },
      { id: "s2", name: "Sion Relief Hall (Safe Structure)", lat: 19.0400, lng: 72.8630, status: "Open", capacity: 300, occupied: 180, phone: "+91 22 2402 3344", amenities: ["water", "food", "medical"] },
      { id: "s7", name: "Vile Parle Inland Shelter", lat: 19.1020, lng: 72.8450, status: "Open", capacity: 600, occupied: 120, phone: "+91 22 2614 9900", amenities: ["water", "food", "medical", "power"] }
    ],
    hospitals: [
      { id: "h1", name: "Sion Hospital", lat: 19.0355, lng: 72.8596, bedsAvailable: 60, erWaitMinutes: 30, ambulanceAvailable: 5, phone: "+91 22 2407 6381" },
      { id: "h2", name: "KEM Hospital", lat: 19.0025, lng: 72.8420, bedsAvailable: 55, erWaitMinutes: 40, ambulanceAvailable: 4, phone: "+91 22 2410 7000" },
      { id: "h3", name: "Lilavati Hospital", lat: 19.0515, lng: 72.8270, bedsAvailable: 18, erWaitMinutes: 35, ambulanceAvailable: 1, phone: "+91 22 2675 1000" }
    ],
    supplies: [
      { id: "sup1", text: "Secure external window boards/tape", category: "essential", checked: false },
      { id: "sup2", text: "High-capacity power bank (fully charged)", category: "tools", checked: false },
      { id: "sup3", text: "Emergency LED lantern/candle with matches", category: "tools", checked: false },
      { id: "sup4", text: "Waterproof bags for all family medicine", category: "medical", checked: false },
      { id: "sup5", text: "Ready cash in low denominations", category: "essential", checked: false }
    ]
  }
};

const geminiKnowledgeBase = {
  intents: [
    {
      keywords: ["shelter", "refuge", "stay", "camp", "place to live", "somewhere safe", "safe place", "sharan"],
      action: "find_shelter",
      response: "Based on current conditions, I have marked all open emergency shelters on the map with **blue pins**. The closest safe and open shelter is **{nearestShelter}**. I have highlighted it on the map and calculated a safe route avoiding active hazard zones."
    },
    {
      keywords: ["route", "path", "road", "safe way", "navigation", "go to", "get to", "blocked", "closed", "map"],
      action: "show_route",
      response: "Calculating a safe route... Done. I have plotted a safe path on the map (shown as a **glowing green path**) from your current simulated location to **{destination}**, bypassing the active **{hazardCount} hazard zones** (flashing red areas). Avoid the red alert zones at all costs!"
    },
    {
      keywords: ["hospital", "medical", "doctor", "er", "emergency room", "wait time", "injured", "hurt", "ambulance"],
      action: "find_medical",
      response: "Here is the medical facility information. **{nearestHospital}** is the closest facility with **{beds} beds available** and an ER wait time of **{wait} minutes**. I've highlighted medical centers on the map with **green cross icons**."
    },
    {
      keywords: ["supply", "supplies", "kit", "checklist", "pack", "food", "water", "flashlight", "what should i pack"],
      action: "show_supplies",
      response: "I've pulled up the emergency checklist for **{scenarioName}**. Key items to secure immediately: **Water, non-perishable food, flashlights, and document pouches**. I've highlighted the Checklist section on your dashboard so you can track items offline."
    },
    {
      keywords: ["sos", "panic", "help me", "danger", "trapped", "stuck", "police", "fire", "distress"],
      action: "trigger_sos",
      response: "⚠️ **CRITICAL RED ALERT ACTIVED!** ⚠️ I have initiated the Emergency SOS module. Your GPS coordinates **({lat}, {lng})** are displayed in the SOS console. Copy the pre-filled distress beacon and click the broadcast button to signal for help. Keep your device screen active!"
    },
    {
      keywords: ["burn", "fire burn", "skin burn", "hot water"],
      action: "info_only",
      response: "### 🩹 Burn Treatment First Aid Guidelines:\n1. **Cool the Burn**: Hold the burned area under cool (not cold) running water for 10-15 minutes or until pain subsides.\n2. **Remove Tight Items**: Gently take off rings, bracelets, or shoes before the area swells.\n3. **Do Not Pop Blisters**: Fluid-filled blisters protect against infection. If one pops, clean with mild soap and water.\n4. **Apply Bandage**: Cover loosely with a sterile gauze bandage. Do not apply butter, oil, or toothpaste to the burn.\n5. **Seek Emergency Medical Help** if the burn is large, charred, or on the face/hands."
    },
    {
      keywords: ["bleeding", "wound", "blood", "cut", "gash"],
      action: "info_only",
      response: "### 🩸 Severe Bleeding First Aid Guidelines:\n1. **Apply Direct Pressure**: Place a sterile bandage or clean cloth on the wound. Press firmly with your hands.\n2. **Elevate**: If possible, raise the injured limb above heart level.\n3. **Keep Pressing**: Do not remove the cloth if blood seeps through. Add another cloth on top and keep pressing.\n4. **Apply Tourniquet (if trained)**: If bleeding is life-threatening on a limb and direct pressure fails, apply a tourniquet 2-3 inches above the wound (not on a joint).\n5. **Keep Warm**: Prevent shock by keeping the casualty warm with blankets."
    },
    {
      keywords: ["fracture", "broken bone", "sprain", "broken arm", "broken leg"],
      action: "info_only",
      response: "### 🦴 Broken Bone / Fracture Protocol:\n1. **Stop Bleeding**: Apply pressure to any wound with a sterile bandage.\n2. **Immobilize the Area**: Do NOT try to realign the bone. Use a splint (cardboard, wood, folded newspapers) to support the joint above and below the fracture.\n3. **Apply Ice**: Wrap ice in a cloth to reduce swelling. Do not apply ice directly to the skin.\n4. **Treat for Shock**: Lay the person flat, elevate feet slightly, and cover them with a jacket/blanket.\n5. **Avoid Movement**: Do not move the patient if you suspect a neck or spine injury unless absolutely necessary."
    },
    {
      keywords: ["cpr", "not breathing", "unconscious", "choking"],
      action: "info_only",
      response: "### 🫁 Emergency CPR Instructions (Adult):\n1. **Verify Responsiveness**: Tap the shoulders and shout 'Are you okay?'. Check for breathing (maximum 10 seconds).\n2. **Call for Help**: Shout for nearby help and dial the nearest hospital or emergency helpline.\n3. **Give 30 Compressions**: Place hands in the center of the chest. Push hard and fast (100-120 beats per minute, 2 inches deep).\n4. **Give 2 Rescue Breaths**: Tilt head back, lift chin, pinch nose, and blow into the mouth. (Skip if untrained; perform **Hands-Only CPR** instead).\n5. **Continue Cycles**: Repeat 30 compressions and 2 breaths until help arrives or the person begins breathing."
    }
  ],
  fallback: "I understand you are asking about '{query}'. I'm coordinating with your device's routing, medical, and shelter databases. Try asking things like:\n- *'Where is the nearest shelter?'*\n- *'Plot a safe route to the nearest hospital'*\n- *'First aid for severe bleeding'*\n- *'What supplies do I need?'*\n- *'Trigger SOS warning'*"
};

// Export to window object for browser access
window.defaultLocation = defaultLocation;
window.scenarios = scenarios;
window.geminiKnowledgeBase = geminiKnowledgeBase;
