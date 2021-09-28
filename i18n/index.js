import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { getStoredData, storeData } from '../constants/storage';

import en from './locales/en.json';
import fi from './locales/fi.json';

let deviceLanguage = Localization.locale.substr(0,2);
if (!['en', 'fi'].includes(deviceLanguage)) {
    deviceLanguage = 'en'
}

i18n.translations = {
    default: en,
    en: en,
    fi: fi,
};
getStoredData('language').then((result)=>{
    i18n.locale = result || deviceLanguage;
    i18n.fallbacks = true;
}, (err)=> {
    i18n.locale = deviceLanguage;
    i18n.fallbacks = true;
});

export const setLocale = (language) => {
    i18n.locale = language;
    storeData('language', language);
}  

export default i18n;
