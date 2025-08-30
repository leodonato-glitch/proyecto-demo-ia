// Archivo de configuración para personalizar los datos del perfil
// Este archivo puede ser utilizado para modificar fácilmente los datos mostrados

export const PROFILE_CONFIG = {
  // Configuración de la experiencia laboral
  experience: {
    showCurrentBadge: true,
    showLocation: true,
    showDuration: true,
    showDescription: true,
    maxDescriptionLength: 200,
    dateFormat: 'es-ES' // Formato de fecha español
  },
  
  // Configuración de la educación
  education: {
    showGrade: true,
    showFieldOfStudy: true,
    showDuration: true,
    showDescription: true,
    maxDescriptionLength: 150
  },
  
  // Configuración de la API simulada
  api: {
    simulateDelay: true,
    delayMs: 1000,
    errorProbability: 0.05, // 5% probabilidad de error
    enableRetry: true
  },
  
  // Configuración visual
  ui: {
    timeline: {
      showConnectorLines: true,
      dotColor: 'var(--color-primary)',
      lineColor: 'var(--color-gray-medium)'
    },
    cards: {
      hoverEffect: true,
      borderColor: 'var(--color-primary-light)',
      shadowLevel: 'medium'
    }
  }
};

// Datos personalizables - Experiencia
export const CUSTOM_EXPERIENCE = [
  {
    id: 1,
    company: "Tu Empresa Actual",
    position: "Tu Puesto Actual", 
    startDate: "2023-01",
    endDate: null,
    description: "Descripción de tu trabajo actual y responsabilidades principales.",
    location: "Tu Ciudad, País"
  }
  // Agregar más experiencias aquí...
];

// Datos personalizables - Educación
export const CUSTOM_EDUCATION = [
  {
    id: 1,
    institution: "Tu Universidad",
    degree: "Tu Título",
    fieldOfStudy: "Tu Campo de Estudio",
    startDate: "2020-09",
    endDate: "2024-06",
    grade: "Tu Calificación",
    description: "Descripción de tu formación académica y logros destacados."
  }
  // Agregar más educación aquí...
];

// Función para personalizar los datos según el usuario
export const getPersonalizedData = (userId) => {
  // Aquí se puede implementar lógica para cargar datos específicos del usuario
  // Por ejemplo, desde una base de datos o API externa
  
  return {
    experience: CUSTOM_EXPERIENCE,
    education: CUSTOM_EDUCATION
  };
};

// Utilidades para formateo personalizado
export const formatUtils = {
  // Formatear fecha según configuración
  formatDate: (dateString, locale = 'es-ES') => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long'
    });
  },
  
  // Truncar texto si excede longitud máxima
  truncateText: (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },
  
  // Capitalizar primera letra
  capitalize: (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
};
