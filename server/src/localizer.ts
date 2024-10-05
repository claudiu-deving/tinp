import { messages } from './messages';



let currentLanguage = 'en'; // Default language
let languageStrings: any;
function setLanguage(lang: any) {

    const csv = messages;
    currentLanguage = lang;
    languageStrings = csv;
}

function getLocalizedString(key: any) {
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

const _setLanguage = setLanguage;
export { _setLanguage as setLanguage };
const _getLocalizedString = getLocalizedString;
export { _getLocalizedString as getLocalizedString };