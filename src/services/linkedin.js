// Servicio simulado para datos de LinkedIn
// En un entorno real, aquí se integraría con la API de LinkedIn

const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

// Datos simulados de experiencia laboral
const mockExperience = [
  {
    id: 1,
    company: "TechCorp Solutions",
    position: "Senior Full Stack Developer",
    startDate: "2022-03",
    endDate: null, // null indica trabajo actual
    description: "Desarrollo de aplicaciones web modernas usando React, Node.js y bases de datos NoSQL. Liderazgo de equipo de 4 desarrolladores.",
    location: "Madrid, España"
  },
  {
    id: 2,
    company: "InnovateIT",
    position: "Frontend Developer",
    startDate: "2020-06",
    endDate: "2022-02",
    description: "Creación de interfaces de usuario responsivas y accesibles. Implementación de mejores prácticas en JavaScript y React.",
    location: "Barcelona, España"
  },
  {
    id: 3,
    company: "StartupHub",
    position: "Junior Web Developer",
    startDate: "2019-01",
    endDate: "2020-05",
    description: "Desarrollo de sitios web corporativos y tiendas en línea. Trabajo con WordPress y tecnologías web básicas.",
    location: "Valencia, España"
  }
];

// Datos simulados de educación
const mockEducation = [
  {
    id: 1,
    institution: "Universidad Politécnica de Madrid",
    degree: "Máster en Ingeniería de Software",
    fieldOfStudy: "Ingeniería de Software y Sistemas Distribuidos",
    startDate: "2020-09",
    endDate: "2022-06",
    grade: "Sobresaliente (9.2/10)",
    description: "Especialización en arquitecturas de software, metodologías ágiles y desarrollo de sistemas escalables."
  },
  {
    id: 2,
    institution: "Universidad de Valencia",
    degree: "Grado en Ingeniería Informática",
    fieldOfStudy: "Ingeniería de Computadores",
    startDate: "2016-09",
    endDate: "2020-06",
    grade: "Notable (7.8/10)",
    description: "Formación integral en programación, bases de datos, redes y arquitectura de computadores."
  },
  {
    id: 3,
    institution: "Instituto Tecnológico Regional",
    degree: "Técnico Superior en Desarrollo de Aplicaciones Web",
    fieldOfStudy: "Desarrollo Web",
    startDate: "2014-09",
    endDate: "2016-06",
    grade: "Sobresaliente (9.5/10)",
    description: "Fundamentos de desarrollo web, programación orientada a objetos y bases de datos relacionales."
  }
];

// Función para obtener experiencia laboral
export const getUserExperience = async () => {
  try {
    await simulateApiDelay();
    
    // Simular posible error (5% probabilidad)
    if (Math.random() < 0.05) {
      throw new Error('Error al conectar con LinkedIn API');
    }
    
    return {
      success: true,
      data: mockExperience
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Función para obtener educación
export const getUserEducation = async () => {
  try {
    await simulateApiDelay();
    
    // Simular posible error (5% probabilidad)
    if (Math.random() < 0.05) {
      throw new Error('Error al conectar con LinkedIn API');
    }
    
    return {
      success: true,
      data: mockEducation
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// Función para formatear fechas
export const formatPeriod = (startDate, endDate) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Presente';
  
  return `${start} - ${end}`;
};

// Función para calcular duración
export const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffTime = Math.abs(end - start);
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
  
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  
  if (years === 0) {
    return `${months} ${months === 1 ? 'mes' : 'meses'}`;
  } else if (months === 0) {
    return `${years} ${years === 1 ? 'año' : 'años'}`;
  } else {
    return `${years} ${years === 1 ? 'año' : 'años'} ${months} ${months === 1 ? 'mes' : 'meses'}`;
  }
};
