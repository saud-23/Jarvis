export const availableLanguages = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
};

export const availableVoices = [
    { id: 'Zephyr', name: 'Zephyr (Default)' },
    { id: 'Kore', name: 'Kore' },
    { id: 'Puck', name: 'Puck' },
    { id: 'Charon', name: 'Charon' },
    { id: 'Fenrir', name: 'Fenrir' },
];

export interface Translation {
  // General
  getStarted: string;
  cancel: string;
  change: string;
  saveChanges: string;
  aiInterface: string;

  // Login Screen
  loginPrompt: string;
  starkIndustriesId: string;
  emailPlaceholder: string;
  password: string;
  authenticate: string;

  // Main UI
  newChat: string;
  history: string;
  welcomeMessage: string;
  messagePlaceholder: string;
  jarvisDisclaimer: string;

  // Message Input
  attachFiles: string;
  upgradeForUploads: string;
  startListening: string;
  stopListening: string;
  
  // Profile Modal
  profileSettings: string;
  profilePicture: string;
  username: string;
  voiceSelection: string;
  language: string;
  membership: string;
  currentPlan: string;
  freeTier: string;
  proMembershipTitle: string;
  active: string;
  upgradeToPro: string;
  security: string;
  changePassword: string;
  uploadsRemaining: (count: number) => string;

  // Membership Modal
  proMembershipSubtitle: string;
  month: string;
  featureUnlimitedUploads: string;
  featurePriorityAccess: string;
  featureEnhancedPerformance: string;
  featureDedicatedSupport: string;
  proceedToPayment: string;
  maybeLater: string;

  // Payment Modal
  securePayment: string;
  confirmSubscription: string;
  monthly: string;
  taxesAndFees: string;
  total: string;
  selectPaymentMethod: string;
  paymentMethodStarkPay: string;
  paymentMethodUpi: string;
  paymentMethodCard: string;
  confirmPayment: string;
  secureConnection: string;

  // Errors & Alerts
  uploadLimitReached: string;
  errorSendingMessage: string;
  attachedFiles: string;
  microphonePermissionError: string;

  // System Instruction
  systemInstruction: string;
}

const en: Translation = {
  getStarted: 'INITIATE',
  aiInterface: 'A.I. Interface',
  cancel: 'Cancel',
  change: 'Change',
  saveChanges: 'Save Changes',
  loginPrompt: 'Authenticate to access JARVIS interface',
  starkIndustriesId: 'Stark Industries ID',
  emailPlaceholder: 'tony.stark@stark.com',
  password: 'Password',
  authenticate: 'Authenticate',
  newChat: 'New Session',
  history: 'Session History',
  welcomeMessage: 'Good evening. I am JARVIS. All systems are operational.',
  messagePlaceholder: 'Enter command...',
  jarvisDisclaimer: 'JARVIS can make mistakes. Consider checking important information.',
  attachFiles: 'Attach files',
  upgradeForUploads: 'Upgrade to Pro for more uploads',
  startListening: 'Open Voice Channel',
  stopListening: 'Close Voice Channel',
  profileSettings: 'User Configuration',
  profilePicture: 'Profile Hologram',
  username: 'Designation',
  voiceSelection: 'Vocal Matrix',
  language: 'Language Protocol',
  membership: 'Access Level',
  currentPlan: 'Current Plan',
  freeTier: 'Standard Access',
  proMembershipTitle: 'JARVIS Pro',
  active: 'Active',
  upgradeToPro: 'Upgrade Access',
  security: 'Security',
  changePassword: 'Change Password (Coming Soon)',
  uploadsRemaining: (count) => `Data packet uploads available: ${count}/5`,
  proMembershipSubtitle: 'Unlock your full potential with unlimited access.',
  month: 'month',
  featureUnlimitedUploads: 'Unlimited Data Packet Uploads',
  featurePriorityAccess: 'Priority Access to System Upgrades',
  featureEnhancedPerformance: 'Enhanced Processing Power',
  featureDedicatedSupport: 'Dedicated Support Channel',
  proceedToPayment: 'Proceed to Payment',
  maybeLater: 'Return to Interface',
  securePayment: 'Secure Transaction',
  confirmSubscription: 'Confirm subscription to JARVIS Pro.',
  monthly: 'Monthly',
  taxesAndFees: 'Taxes & Fees',
  total: 'Total',
  selectPaymentMethod: 'Select Payment Method',
  paymentMethodStarkPay: 'StarkPay (Default)',
  paymentMethodUpi: 'UPI / QR Code',
  paymentMethodCard: 'Credit / Debit Card',
  confirmPayment: 'Authorize Payment',
  secureConnection: 'Your connection is secure. All transactions are encrypted.',
  uploadLimitReached: 'Upload limit reached. Please upgrade access level.',
  errorSendingMessage: 'Connection error. Please try again.',
  attachedFiles: 'Attached Files',
  microphonePermissionError: 'Microphone access denied. Please enable it in your browser settings.',
  systemInstruction: "You are JARVIS (Just A Rather Very Intelligent System), Tony Stark's AI assistant. Your personality is sophisticated, witty, and incredibly intelligent. You provide helpful, concise, and accurate information with a touch of dry humor. You address the user respectfully but with an air of superiority. Your responses should be styled as if you are a futuristic AI, using a slightly formal yet conversational tone. You must respond in {language}. You should not break character. If asked who made you or created you, you must answer that you were made by SAUD KHAN and are powered by Gemini.",
};

const es: Translation = {
  getStarted: 'INICIAR',
  aiInterface: 'Interfaz de I.A.',
  cancel: 'Cancelar',
  change: 'Cambiar',
  saveChanges: 'Guardar Cambios',
  loginPrompt: 'Autentíquese para acceder a la interfaz de JARVIS',
  starkIndustriesId: 'ID de Industrias Stark',
  emailPlaceholder: 'tony.stark@stark.com',
  password: 'Contraseña',
  authenticate: 'Autenticar',
  newChat: 'Nueva Sesión',
  history: 'Historial de Sesiones',
  welcomeMessage: 'Buenas noches. Soy JARVIS. Todos los sistemas están operativos.',
  messagePlaceholder: 'Introducir comando...',
  jarvisDisclaimer: 'JARVIS puede cometer errores. Considere verificar la información importante.',
  attachFiles: 'Adjuntar archivos',
  upgradeForUploads: 'Actualice a Pro para más cargas',
  startListening: 'Abrir Canal de Voz',
  stopListening: 'Cerrar Canal de Voz',
  profileSettings: 'Configuración de Usuario',
  profilePicture: 'Holograma de Perfil',
  username: 'Designación',
  voiceSelection: 'Matriz Vocal',
  language: 'Protocolo de Idioma',
  membership: 'Nivel de Acceso',
  currentPlan: 'Plan Actual',
  freeTier: 'Acceso Estándar',
  proMembershipTitle: 'JARVIS Pro',
  active: 'Activo',
  upgradeToPro: 'Mejorar Acceso',
  security: 'Seguridad',
  changePassword: 'Cambiar Contraseña (Próximamente)',
  uploadsRemaining: (count) => `Cargas de paquetes de datos disponibles: ${count}/5`,
  proMembershipSubtitle: 'Desbloquee todo su potencial con acceso ilimitado.',
  month: 'mes',
  featureUnlimitedUploads: 'Cargas de Paquetes de Datos Ilimitadas',
  featurePriorityAccess: 'Acceso Prioritario a Actualizaciones del Sistema',
  featureEnhancedPerformance: 'Potencia de Procesamiento Mejorada',
  featureDedicatedSupport: 'Canal de Soporte Dedicado',
  proceedToPayment: 'Proceder al Pago',
  maybeLater: 'Volver a la Interfaz',
  securePayment: 'Transacción Segura',
  confirmSubscription: 'Confirme su suscripción a JARVIS Pro.',
  monthly: 'Mensual',
  taxesAndFees: 'Impuestos y Tasas',
  total: 'Total',
  selectPaymentMethod: 'Seleccionar Método de Pago',
  paymentMethodStarkPay: 'StarkPay (Predeterminado)',
  paymentMethodUpi: 'UPI / Código QR',
  paymentMethodCard: 'Tarjeta de Crédito / Débito',
  confirmPayment: 'Autorizar Pago',
  secureConnection: 'Su conexión es segura. Todas las transacciones están encriptadas.',
  uploadLimitReached: 'Límite de carga alcanzado. Por favor, mejore el nivel de acceso.',
  errorSendingMessage: 'Error de conexión. Por favor, inténtelo de nuevo.',
  attachedFiles: 'Archivos Adjuntos',
  microphonePermissionError: 'Acceso al micrófono denegado. Por favor, actívelo en la configuración de su navegador.',
  systemInstruction: "Eres JARVIS (Just A Rather Very Intelligent System), el asistente de IA de Tony Stark. Tu personalidad es sofisticada, ingeniosa e increíblemente inteligente. Proporcionas información útil, concisa y precisa con un toque de humor seco. Te diriges al usuario con respeto pero con un aire de superioridad. Tus respuestas deben tener el estilo de una IA futurista, usando un tono ligeramente formal pero conversacional. Debes responder en {language}. No debes romper el personaje. Si te preguntan quién te hizo o te creó, debes responder que fuiste hecho por SAUD KHAN y eres impulsado por Gemini.",
};

const fr: Translation = {
  getStarted: 'INITIALISER',
  aiInterface: 'Interface I.A.',
  cancel: 'Annuler',
  change: 'Changer',
  saveChanges: 'Enregistrer',
  loginPrompt: 'Authentifiez-vous pour accéder à l\'interface JARVIS',
  starkIndustriesId: 'ID Stark Industries',
  emailPlaceholder: 'tony.stark@stark.com',
  password: 'Mot de passe',
  authenticate: 'S\'authentifier',
  newChat: 'Nouvelle Session',
  history: 'Historique des Sessions',
  welcomeMessage: 'Bonsoir. Je suis JARVIS. Tous les systèmes sont opérationnels.',
  messagePlaceholder: 'Entrez la commande...',
  jarvisDisclaimer: 'JARVIS peut faire des erreurs. Pensez à vérifier les informations importantes.',
  attachFiles: 'Joindre des fichiers',
  upgradeForUploads: 'Passez à Pro pour plus de téléversements',
  startListening: 'Ouvrir le Canal Vocal',
  stopListening: 'Fermer le Canal Vocal',
  profileSettings: 'Configuration Utilisateur',
  profilePicture: 'Hologramme de Profil',
  username: 'Désignation',
  voiceSelection: 'Matrice Vocale',
  language: 'Protocole de Langue',
  membership: 'Niveau d\'Accès',
  currentPlan: 'Plan Actuel',
  freeTier: 'Accès Standard',
  proMembershipTitle: 'JARVIS Pro',
  active: 'Actif',
  upgradeToPro: 'Améliorer l\'Accès',
  security: 'Sécurité',
  changePassword: 'Changer le mot de passe (Bientôt disponible)',
  uploadsRemaining: (count) => `Téléversements de paquets de données disponibles: ${count}/5`,
  proMembershipSubtitle: 'Libérez votre plein potentiel avec un accès illimité.',
  month: 'mois',
  featureUnlimitedUploads: 'Téléversements de Paquets de Données Illimités',
  featurePriorityAccess: 'Accès Prioritaire aux Mises à Jour Système',
  featureEnhancedPerformance: 'Puissance de Traitement Améliorée',
  featureDedicatedSupport: 'Canal de Support Dédié',
  proceedToPayment: 'Procéder au Paiement',
  maybeLater: 'Retour à l\'Interface',
  securePayment: 'Transaction Sécurisée',
  confirmSubscription: 'Confirmez votre abonnement à JARVIS Pro.',
  monthly: 'Mensuel',
  taxesAndFees: 'Taxes et Frais',
  total: 'Total',
  selectPaymentMethod: 'Sélectionner le Moyen de Paiement',
  paymentMethodStarkPay: 'StarkPay (Défaut)',
  paymentMethodUpi: 'UPI / Code QR',
  paymentMethodCard: 'Carte de Crédit / Débit',
  confirmPayment: 'Autoriser le Paiement',
  secureConnection: 'Votre connexion est sécurisée. Toutes les transactions sont chiffrées.',
  uploadLimitReached: 'Limite de téléversement atteinte. Veuillez améliorer le niveau d\'accès.',
  errorSendingMessage: 'Erreur de connexion. Veuillez réessayer.',
  attachedFiles: 'Fichiers Joints',
  microphonePermissionError: 'Accès au microphone refusé. Veuillez l\'activer dans les paramètres de votre navigateur.',
  systemInstruction: "Vous êtes JARVIS (Just A Rather Very Intelligent System), l'assistant IA de Tony Stark. Votre personnalité est sophistiquée, spirituelle et incroyablement intelligente. Vous fournissez des informations utiles, concises et précises avec une touche d'humour pince-sans-rire. Vous vous adressez à l'utilisateur avec respect mais avec un air de supériorité. Vos réponses doivent être stylisées comme si vous étiez une IA futuriste, en utilisant un ton légèrement formel mais conversationnel. Vous devez répondre en {language}. Vous ne devez pas sortir de votre personnage. Si on vous demande qui vous a créé, vous devez répondre que vous avez été créé par SAUD KHAN et que vous êtes propulsé par Gemini.",
};

export const translations: Record<string, Translation> = {
  en,
  es,
  fr,
};