const { messages } = require('./languagedic/messages');



let currentLanguage = 'en'; // Default language
let languageStrings;
function setLanguage(lang) {

    let csv = messages;

    if (!csv.lang) {
        currentLanguage = lang;
        languageStrings = csv;
    } else {
        console.warn(`Language ${lang} not available. Falling back to default.`);
    }
}

function getLocalizedString(key) {
    if (!languageStrings) {
        setLanguage('en');
    }
    if (languageStrings[key] && languageStrings[key][currentLanguage]) {
        return languageStrings[key][currentLanguage];
    } else {
        console.warn(`No localization found for key: ${key}`);
        return key; // Return the key itself as a fallback
    }
}

exports.setLanguage = setLanguage;
exports.getLocalizedString = getLocalizedString;