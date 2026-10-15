const translations = {
  "en": {
    "nav_home": "Home",
    "nav_events": "Events",
    "nav_venue": "Venues",
    "groom_name": "Shani Raj Kali",
    "groom_parents": "S/O Ex MLA Mr. Gopal Kali & Mrs. Sunita Kali",
    "bride_name": "Dr. Rekha Singh",
    "bride_parents": "D/O Mr. Surendar Pal Singh and Mrs. Vidhya Devi",
    "wedding_date": "14 November 2026 · 8:00 PM",
    "days": "Days",
    "hours": "Hours",
    "minutes": "Minutes",
    "seconds": "Seconds",
    "tagline": "Together with our families, we invite you to celebrate our wedding",
    "events_title": "Wedding Celebrations",
    "event3_date": "13 November 2026",
    "event3_name": "Haldi Ceremony",
    "event3_venue": "D 80, Ganga Nagar, Meerut",
    "event3_desc": "Join us for the joy and colours of Haldi",
    "event4_date": "14 November 2026",
    "event4_name": "Wedding Ceremony",
    "event4_time": "8:00 PM",
    "event4_venue": "SGN Garden, Kota, Rajasthan",
    "event4_desc": "With your blessings, we begin our journey together",
    "venue_title": "Venues & Locations",
    "venue_name": "SGN Garden",
    "venue_address": "Railway Overbridge Bundi Road, National Highway 12, Kota, Rajasthan 324008",
    "directions_btn": "Get Directions",
    "haldi_venue_title": "Haldi Venue",
    "haldi_venue_name": "Residence of Ex MLA Mr. Gopal Kali",
    "haldi_address": "D 80, Ganga Nagar, Meerut",
    "envelope_heading": "You're Invited",
    "envelope_names": "Shani Raj & Dr. Rekha",
    "envelope_subtext": "request the pleasure of your company",
    "footer_text": "We look forward to celebrating with you!",
    "footer_copyright": "Shani Raj Kali & Dr. Rekha Singh · 14 November 2026"
  },
  "hi": {
    "nav_home": "होम",
    "nav_events": "समारोह",
    "nav_venue": "स्थान",
    "groom_name": "शनि राज काली",
    "groom_parents": "पूर्व विधायक श्री गोपाल काली एवं श्रीमती सुनीता काली के सुपुत्र",
    "bride_name": "डॉ. रेखा सिंह",
    "bride_parents": "श्री सुरेंद्र पाल सिंह एवं श्रीमती विद्या देवी की सुपुत्री",
    "wedding_date": "14 नवंबर 2026 · रात्रि 8:00 बजे",
    "days": "दिन",
    "hours": "घंटे",
    "minutes": "मिनट",
    "seconds": "सेकंड",
    "tagline": "सपरिवार हमारे विवाह समारोह में पधारकर हमें आशीर्वाद दें",
    "events_title": "विवाह समारोह",
    "event3_date": "13 नवंबर 2026",
    "event3_name": "हल्दी समारोह",
    "event3_venue": "डी 80, गंगा नगर, मेरठ",
    "event3_desc": "हल्दी के रंगों और खुशियों में हमारे साथ शामिल हों",
    "event4_date": "14 नवंबर 2026",
    "event4_name": "विवाह समारोह",
    "event4_time": "रात्रि 8:00 बजे",
    "event4_venue": "एसजीएन गार्डन, कोटा, राजस्थान",
    "event4_desc": "आपके आशीर्वाद से हमारे नए जीवन का शुभारंभ",
    "venue_title": "समारोह स्थल एवं पता",
    "venue_name": "एसजीएन गार्डन",
    "venue_address": "रेलवे ओवरब्रिज बूंदी रोड, राष्ट्रीय राजमार्ग 12, कोटा, राजस्थान 324008",
    "directions_btn": "दिशा-निर्देश देखें",
    "haldi_venue_title": "हल्दी समारोह स्थल",
    "haldi_venue_name": "पूर्व विधायक श्री गोपाल काली का निवास",
    "haldi_address": "डी 80, गंगा नगर, मेरठ",
    "envelope_heading": "आप सादर आमंत्रित हैं",
    "envelope_names": "शनि राज एवं डॉ. रेखा",
    "envelope_subtext": "आपकी गरिमामयी उपस्थिति की कामना करते हैं",
    "footer_text": "आपके आगमन की प्रतीक्षा में!",
    "footer_copyright": "शनि राज काली एवं डॉ. रेखा सिंह · 14 नवंबर 2026"
  }
};

// Current language (default: English)
let currentLanguage = 'en';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    let savedLanguage = null;
    try { savedLanguage = localStorage.getItem('wedding-language'); } catch (_) {}

    if (urlLang && translations[urlLang]) {
        currentLanguage = urlLang;
        try { localStorage.setItem('wedding-language', urlLang); } catch (_) {}
    } else if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
    setLanguage(currentLanguage);

    // Add click event listeners to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);

            // Save to localStorage
            try { localStorage.setItem('wedding-language', lang); } catch (_) {}
        });
    });
});

// Function to set language
function setLanguage(lang) {
    currentLanguage = lang;

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Translate all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Translate placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}
