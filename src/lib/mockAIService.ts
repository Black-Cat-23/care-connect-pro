// Mock AI Service for Hospital Information System
// Simulates AI responses for demo purposes

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface SymptomAnalysis {
  possibleConditions: string[];
  urgency: 'low' | 'medium' | 'high';
  recommendations: string[];
  disclaimer: string;
}

// Symptom to response mapping for demo
const symptomResponses: Record<string, SymptomAnalysis> = {
  headache: {
    possibleConditions: ['Tension Headache', 'Migraine', 'Dehydration'],
    urgency: 'low',
    recommendations: [
      'Rest in a quiet, dark room',
      'Stay hydrated - drink plenty of water',
      'Consider over-the-counter pain relief',
      'Apply a cold compress to your forehead',
    ],
    disclaimer: 'This is AI-generated guidance for information only. Please consult a doctor for proper diagnosis.',
  },
  'chest pain': {
    possibleConditions: ['Muscle Strain', 'Anxiety', 'Acid Reflux', 'Cardiac Issue'],
    urgency: 'high',
    recommendations: [
      'If severe, seek emergency care immediately',
      'Note when the pain started and any triggers',
      'Avoid strenuous activity',
      'Schedule an appointment with a cardiologist',
    ],
    disclaimer: 'Chest pain can indicate serious conditions. Seek immediate medical attention if symptoms are severe.',
  },
  fever: {
    possibleConditions: ['Viral Infection', 'Bacterial Infection', 'Flu'],
    urgency: 'medium',
    recommendations: [
      'Rest and stay hydrated',
      'Take temperature regularly',
      'Use fever-reducing medication if above 101°F',
      'Consult a doctor if fever persists over 3 days',
    ],
    disclaimer: 'This is AI-generated guidance for information only. Please consult a doctor for proper diagnosis.',
  },
  cough: {
    possibleConditions: ['Common Cold', 'Allergies', 'Bronchitis', 'Respiratory Infection'],
    urgency: 'low',
    recommendations: [
      'Stay hydrated with warm fluids',
      'Use honey and ginger for sore throat',
      'Avoid irritants like smoke and dust',
      'See a doctor if cough persists over 2 weeks',
    ],
    disclaimer: 'This is AI-generated guidance for information only. Please consult a doctor for proper diagnosis.',
  },
  'stomach pain': {
    possibleConditions: ['Indigestion', 'Gastritis', 'Food Poisoning', 'IBS'],
    urgency: 'medium',
    recommendations: [
      'Eat light, bland foods',
      'Avoid spicy and fatty foods',
      'Stay hydrated',
      'Consult a doctor if pain is severe or persistent',
    ],
    disclaimer: 'This is AI-generated guidance for information only. Please consult a doctor for proper diagnosis.',
  },
};

const generalResponses = [
  "I understand you're not feeling well. Could you describe your symptoms in more detail?",
  "Based on what you've shared, I recommend scheduling an appointment with a healthcare professional for a proper evaluation.",
  "Remember, while I can provide general health information, only a qualified doctor can diagnose and treat medical conditions.",
  "Is there anything specific about your symptoms you'd like to know more about?",
];

export const analyzeSymptoms = (symptoms: string): SymptomAnalysis => {
  const lowerSymptoms = symptoms.toLowerCase();
  
  for (const [key, response] of Object.entries(symptomResponses)) {
    if (lowerSymptoms.includes(key)) {
      return response;
    }
  }
  
  return {
    possibleConditions: ['Unable to determine - please provide more details'],
    urgency: 'low',
    recommendations: [
      'Please describe your symptoms in more detail',
      'Note when symptoms started and their severity',
      'Consider booking an appointment with a general physician',
    ],
    disclaimer: 'This is AI-generated guidance for information only. Please consult a doctor for proper diagnosis.',
  };
};

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for symptom-related queries
  for (const [symptom, response] of Object.entries(symptomResponses)) {
    if (lowerMessage.includes(symptom)) {
      const urgencyEmoji = response.urgency === 'high' ? '🚨' : response.urgency === 'medium' ? '⚠️' : 'ℹ️';
      return `${urgencyEmoji} **Symptom Analysis: ${symptom.charAt(0).toUpperCase() + symptom.slice(1)}**

**Possible Conditions:**
${response.possibleConditions.map(c => `• ${c}`).join('\n')}

**Recommendations:**
${response.recommendations.map(r => `• ${r}`).join('\n')}

---
⚕️ *${response.disclaimer}*`;
    }
  }
  
  // Medication-related queries
  if (lowerMessage.includes('medication') || lowerMessage.includes('medicine') || lowerMessage.includes('drug')) {
    return `💊 **Medication Information**

I can provide general information about medications. However, please note:

• Always follow your doctor's prescription exactly
• Never change dosage without consulting your doctor
• Report any side effects to your healthcare provider
• Check for drug interactions before taking new medications

Which specific medication would you like to know about?

---
⚕️ *This is general information only. Consult your doctor or pharmacist for specific advice.*`;
  }
  
  // Appointment-related queries
  if (lowerMessage.includes('appointment') || lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
    return `📅 **Appointment Assistance**

I can help you with appointment information:

• To book a new appointment, go to the **Appointments** section
• View your upcoming appointments in your dashboard
• You can also reschedule or cancel appointments there

Would you like me to guide you through the booking process?`;
  }
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `👋 Hello! I'm your AI Health Assistant.

I can help you with:
• Symptom information and general guidance
• Medication information
• Appointment assistance
• General health questions

How can I assist you today?

---
⚕️ *Remember: I provide information only. For medical diagnosis and treatment, please consult a qualified healthcare professional.*`;
  }
  
  // Default response
  return generalResponses[Math.floor(Math.random() * generalResponses.length)] + 
    '\n\n---\n⚕️ *This is AI-generated guidance for information only. Please consult a doctor for proper diagnosis.*';
};

export const generatePreVisitSummary = (patient: {
  name: string;
  symptoms?: string;
  medicalHistory?: string[];
  lastVisit?: string;
}): string => {
  return `## Pre-Visit Summary for ${patient.name}

### Chief Complaint
${patient.symptoms || 'No symptoms recorded'}

### Medical History
${patient.medicalHistory?.map(h => `• ${h}`).join('\n') || 'No significant history recorded'}

### Last Visit
${patient.lastVisit || 'First visit'}

### AI Observations
Based on the available information, consider:
• Review current medications for interactions
• Check vital signs including blood pressure
• Discuss lifestyle factors if applicable

---
*AI-generated summary for physician reference. Verify all information with patient.*`;
};

export const getMedicationInfo = (medicationName: string): string => {
  const medications: Record<string, { use: string; dosage: string; sideEffects: string[]; warnings: string[] }> = {
    amlodipine: {
      use: 'Treatment of high blood pressure and chest pain (angina)',
      dosage: 'Usually 5-10mg once daily',
      sideEffects: ['Swelling in ankles', 'Dizziness', 'Flushing', 'Fatigue'],
      warnings: ['Avoid grapefruit', 'Do not stop suddenly'],
    },
    ibuprofen: {
      use: 'Pain relief, fever reduction, anti-inflammatory',
      dosage: '200-400mg every 4-6 hours as needed',
      sideEffects: ['Stomach upset', 'Nausea', 'Dizziness'],
      warnings: ['Take with food', 'Avoid if you have stomach ulcers'],
    },
    metformin: {
      use: 'Management of type 2 diabetes',
      dosage: '500-2000mg daily in divided doses',
      sideEffects: ['Nausea', 'Diarrhea', 'Stomach upset'],
      warnings: ['Take with meals', 'Stay hydrated'],
    },
  };

  const med = medications[medicationName.toLowerCase()];
  if (med) {
    return `## ${medicationName.charAt(0).toUpperCase() + medicationName.slice(1)}

**Use:** ${med.use}

**Typical Dosage:** ${med.dosage}

**Common Side Effects:**
${med.sideEffects.map(s => `• ${s}`).join('\n')}

**Warnings:**
${med.warnings.map(w => `• ${w}`).join('\n')}

---
*Always follow your doctor's prescription. This is general information only.*`;
  }

  return `I don't have specific information about "${medicationName}" in my database. Please consult your pharmacist or doctor for accurate medication information.`;
};
