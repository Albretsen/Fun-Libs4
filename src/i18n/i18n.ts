import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../assets/locales/en/translation.json';
import es from '../../assets/locales/es/translation.json';

const resources = {
	en: {
		translation: en,
	},
	es: {
		translation: es,
	},
};

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	resources,
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;

/**
 * EXAMPLE USAGE:
 *
 * Standard usage (hook in functional component):
 * import { useTranslation } from 'react-i18next';
 *
 * const { t } = useTranslation();
 *
 * return <Text>{t('Welcome to React')}<Text/>
 *
 *
 *
 * Alternative usage (if first one fails):
 * import { useTranslation } from 'react-i18next';
 *
 * const { i18n } = useTranslation();
 *
 * return <Text>{i18n.t('BottomTabs.Play')}<Text/>
 *
 *
 *
 * Imperative usage (outside functional component):
 * import i18n from '../../src/i18n/i18n';
 *
 * i18n.t('Welcome to React')
 */
