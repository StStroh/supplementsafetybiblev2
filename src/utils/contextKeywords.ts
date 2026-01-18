export interface ContextFlags {
  bloodThinners: boolean;
  pregnancy: boolean;
  surgery: boolean;
  bloodPressure: boolean;
}

export interface ContextNote {
  type: 'bloodThinners' | 'pregnancy' | 'surgery' | 'bloodPressure';
  message: string;
}

const KEYWORDS = {
  bloodThinners: [
    'bleeding',
    'anticoagulant',
    'platelet',
    'warfarin',
    'coagulation',
    'hemorrhage',
    'bruising',
    'clotting',
  ],
  pregnancy: [
    'pregnancy',
    'pregnant',
    'fetal',
    'teratogenic',
    'embryo',
    'lactation',
    'breastfeeding',
    'conception',
  ],
  surgery: [
    'bleeding',
    'clotting',
    'anesthesia',
    'sedative',
    'surgery',
    'surgical',
    'perioperative',
    'procedure',
  ],
  bloodPressure: [
    'blood pressure',
    'hypotension',
    'hypertension',
    'bradycardia',
    'tachycardia',
    'cardiovascular',
    'bp',
  ],
};

const MESSAGES = {
  bloodThinners:
    'If you are taking anticoagulants, this combination may raise bleeding risk. Discuss with a qualified clinician.',
  pregnancy:
    'If you are pregnant or trying to conceive, this interaction may have fetal or maternal implications. Consult your healthcare provider.',
  surgery:
    'If you have surgery scheduled, this combination may affect bleeding, clotting, or anesthesia. Inform your surgical team and clinician.',
  bloodPressure:
    'If you are managing blood pressure, this combination may affect cardiovascular function. Monitor with your healthcare provider.',
};

export function getRelevantContextNotes(
  interactionText: string,
  contextFlags: ContextFlags,
  severity?: string
): ContextNote[] {
  if (!severity) return [];

  const severityNorm = severity.toLowerCase();
  if (severityNorm !== 'major' && severityNorm !== 'moderate') {
    return [];
  }

  const notes: ContextNote[] = [];
  const lowerText = interactionText.toLowerCase();

  if (contextFlags.bloodThinners && containsKeywords(lowerText, KEYWORDS.bloodThinners)) {
    notes.push({ type: 'bloodThinners', message: MESSAGES.bloodThinners });
  }

  if (contextFlags.pregnancy && containsKeywords(lowerText, KEYWORDS.pregnancy)) {
    notes.push({ type: 'pregnancy', message: MESSAGES.pregnancy });
  }

  if (contextFlags.surgery && containsKeywords(lowerText, KEYWORDS.surgery)) {
    notes.push({ type: 'surgery', message: MESSAGES.surgery });
  }

  if (contextFlags.bloodPressure && containsKeywords(lowerText, KEYWORDS.bloodPressure)) {
    notes.push({ type: 'bloodPressure', message: MESSAGES.bloodPressure });
  }

  return notes;
}

function containsKeywords(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}
