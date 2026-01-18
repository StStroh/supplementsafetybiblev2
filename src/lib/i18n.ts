/**
 * Simple i18n system for English/Spanish support
 * Usage: const t = useTranslation(); then t('key')
 */

export type Locale = 'en' | 'es';

export const translations = {
  en: {
    // Checker Input
    'checker.supplement.label': 'Supplements',
    'checker.supplement.placeholder': 'Type to search...',
    'checker.medication.label': 'Prescription Medicines',
    'checker.medication.placeholder': 'Type to search...',
    'checker.selectFromList': 'Select a suggestion or press Enter to continue',
    'checker.selectSuggestion': 'Select a suggestion or press Enter to continue',
    'checker.noMatchHint': 'Press Enter to continue - we\'ll try to match it automatically',
    'checker.runCheck': 'Run Check',
    'checker.checking': 'Checking...',
    'checker.minRequired': '🔒 Select at least 1 supplement and 1 medication to check',
    'checker.clearInputs': 'Please select items from the dropdown or clear the input fields',

    // Not Found
    'notFound.title': 'We\'re looking for "{name}"',
    'notFound.description': 'We couldn\'t find an exact match. Try a different spelling or pick a close match below.',
    'notFound.closestMatches': 'Closest matches:',
    'notFound.remove': 'Remove',
    'notFound.requestAdd': 'Request to add this',
    'notFound.requestSent': 'Request sent!',
    'notFound.requestFailed': 'Request failed',

    // Confidence UI
    'confidence.high': 'High',
    'confidence.moderate': 'Moderate',
    'confidence.low': 'Low',
    'confidence.clinicallySignificant': 'Clinically Significant Interaction',
    'confidence.useWithCaution': 'Use With Caution',
    'confidence.monitor': 'Monitor / Timing Adjustment',
    'confidence.noKnown': 'No Known Interaction',
    'confidence.notReviewed': 'Not Yet Reviewed',
    'confidence.whyThisResult': 'Why this result?',
    'confidence.evidenceGrade': 'Evidence Grade',
    'confidence.sourceType': 'Source Type',
    'confidence.lastReviewed': 'Last Reviewed',
    'confidence.confidence': 'Confidence',

    // Trust Statement
    'trust.howToInterpret': 'How to interpret results',
    'trust.reviewedStatement': 'Interactions shown here are clinically reviewed.',
    'trust.noInteractionWarning': 'If no interaction appears, it means none is currently documented — not that the combination is guaranteed safe.',
    'trust.consultProvider': 'Always consult with your healthcare provider before making changes to your supplement or medication regimen.',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
    'common.close': 'Close',
  },
  es: {
    // Checker Input
    'checker.supplement.label': 'Suplementos',
    'checker.supplement.placeholder': 'Escribe para buscar...',
    'checker.medication.label': 'Medicamentos Recetados',
    'checker.medication.placeholder': 'Escribe para buscar...',
    'checker.selectFromList': 'Seleccione una sugerencia o presione Enter para continuar',
    'checker.selectSuggestion': 'Seleccione una sugerencia o presione Enter para continuar',
    'checker.noMatchHint': 'Presione Enter para continuar - intentaremos encontrarlo automáticamente',
    'checker.runCheck': 'Ejecutar Verificación',
    'checker.checking': 'Verificando...',
    'checker.minRequired': '🔒 Seleccione al menos 1 suplemento y 1 medicamento para verificar',
    'checker.clearInputs': 'Seleccione artículos del menú desplegable o borre los campos de entrada',

    // Not Found
    'notFound.title': 'Buscando "{name}"',
    'notFound.description': 'No encontramos una coincidencia exacta. Intente con una ortografía diferente o elija una coincidencia cercana a continuación.',
    'notFound.closestMatches': 'Coincidencias más cercanas:',
    'notFound.remove': 'Eliminar',
    'notFound.requestAdd': 'Solicitar agregar esto',
    'notFound.requestSent': '¡Solicitud enviada!',
    'notFound.requestFailed': 'Solicitud fallida',

    // Confidence UI
    'confidence.high': 'Alto',
    'confidence.moderate': 'Moderado',
    'confidence.low': 'Bajo',
    'confidence.clinicallySignificant': 'Interacción Clínicamente Significativa',
    'confidence.useWithCaution': 'Usar con Precaución',
    'confidence.monitor': 'Monitorear / Ajuste de Tiempo',
    'confidence.noKnown': 'No se Conoce Interacción',
    'confidence.notReviewed': 'Aún No Revisado',
    'confidence.whyThisResult': '¿Por qué este resultado?',
    'confidence.evidenceGrade': 'Grado de Evidencia',
    'confidence.sourceType': 'Tipo de Fuente',
    'confidence.lastReviewed': 'Última Revisión',
    'confidence.confidence': 'Confianza',

    // Trust Statement
    'trust.howToInterpret': 'Cómo interpretar los resultados',
    'trust.reviewedStatement': 'Las interacciones mostradas aquí están revisadas clínicamente.',
    'trust.noInteractionWarning': 'Si no aparece ninguna interacción, significa que actualmente no está documentada, no que la combinación sea segura garantizada.',
    'trust.consultProvider': 'Siempre consulte con su proveedor de atención médica antes de realizar cambios en su régimen de suplementos o medicamentos.',

    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.retry': 'Reintentar',
    'common.close': 'Cerrar',
  },
};

export function getLocale(): Locale {
  // Check localStorage first
  const stored = localStorage.getItem('locale');
  if (stored === 'en' || stored === 'es') {
    return stored;
  }

  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) {
    return 'es';
  }

  return 'en';
}

export function setLocale(locale: Locale) {
  localStorage.setItem('locale', locale);
  // Trigger re-render by dispatching event
  window.dispatchEvent(new CustomEvent('localechange', { detail: locale }));
}

export function translate(key: string, params?: Record<string, string>): string {
  const locale = getLocale();
  let text = translations[locale][key as keyof typeof translations['en']] || translations.en[key as keyof typeof translations['en']] || key;

  // Replace parameters like {name}
  if (params) {
    Object.keys(params).forEach(paramKey => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), params[paramKey]);
    });
  }

  return text;
}

// React hook for translations
import { useState, useEffect } from 'react';

export function useTranslation() {
  const [, setLocale] = useState<Locale>(getLocale());

  useEffect(() => {
    const handleLocaleChange = () => {
      setLocale(getLocale());
    };

    window.addEventListener('localechange', handleLocaleChange);
    return () => window.removeEventListener('localechange', handleLocaleChange);
  }, []);

  return translate;
}
