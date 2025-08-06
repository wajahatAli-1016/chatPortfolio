import { useState, useEffect } from 'react';

// Translation data
const translations = {
  en: {
    // Navigation
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
    },
    
    // Hero Section
    hero: {
      greeting: "Hi, I'm Wajahat 👋",
      subtitle: 'Full Stack Developer & Problem Solver',
      description: 'Full-stack developer building products that users love. From MVP to scale, I handle frontend magic (React/Next.js), backend logic (Node.js/Python), and everything in between.',
      viewWork: 'View My Work',
      chatWithAI: 'Chat with AI',
      getInTouch: 'Get In Touch',
      stats: {
        experience: 'months Experience',
        projects: 'Projects Completed',
        satisfaction: 'Client Satisfaction',
      },
    },
    
    // About Section
    about: {
      title: 'About Me',
      description1: "I'm a passionate Full Stack Developer from lahore, currently pursuing my BS in Computer Science at the University of the Punjab. I love creating web applications that not only look great but also solve real-world problems efficiently.",
      description2: 'My journey in web development started with curiosity and has evolved into a deep passion for building user-centric applications. I believe in writing clean, maintainable code and staying up-to-date with the latest technologies and best practices.',
      details: {
        location: '📍 Location:',
        education: '🎓 Education:',
        university: '🏢 University:',
        email: '📧 Email:',
        available: '💼 Available:',
      },
      values: {
        location: 'Pakistan',
        education: 'BS Computer Science',
        university: 'University of the Punjab',
        email: 'wajahataliq1224@example.com',
        available: 'For Full-time job',
      },
    },
    
    // Skills Section
    skills: {
      title: 'Skills & Technologies',
      categories: {
        frontend: 'Frontend Development',
        backend: 'Backend Development',
        tools: 'Tools & Platforms',
      },
      items: {
        react: 'React.js',
        nextjs: 'Next.js',
        javascript: 'JavaScript (ES6+)',
        htmlcss: 'HTML5 & CSS3',
        tailwind: 'Tailwind CSS',
        responsive: 'Responsive Design',
        nodejs: 'Node.js',
        express: 'Express.js',
        mongodb: 'MongoDB',
        restapi: 'RESTful APIs',
        auth: 'Authentication',
        database: 'Database Design',
        git: 'Git & GitHub',
        vscode: 'VS Code',
        postman: 'Postman',
        vercel: 'Vercel',
        netlify: 'Netlify',
        figma: 'Figma',
      },
    },
    
    // Experience Section
    experience: {
      title: 'Experience',
      items: {
        title: 'Full Stack Developer Intern',
        company: 'Musketeers Tech',
        duration: 'July 2025 - September 2025',
        description: [
          '• Built scalable web solutions using Next.js, Node.js, and MongoDB',
          '• Applied internationalization (i18n) in multiple projects',
          '• Collaborated with cross-functional teams to deliver high-quality products',
          '• Implemented responsive design principles and modern UI/UX patterns',
        ],
      },
    },
    
    // Projects Section
    projects: {
      title: 'Featured Projects',
      intro: 'Here are some of my recent projects that showcase my skills in full-stack development, UI/UX design, and problem-solving abilities.',
      loading: 'Loading projects...',
      error: 'Error:',
      of: 'of',
      projects: 'projects',
      addNewProject: 'Add New Project',
      refreshProjects: 'Refresh Projects',
      viewProject: 'View Project',
      viewCode: 'View Code',
      techStack: 'Tech Stack:',
    },
    
    // Achievements Section
    achievements: {
      title: 'Achievements & Recognition',
      items: {
        academic: {
          title: 'Academic Excellence',
          description: 'Consistently maintained high academic performance with strong foundation in computer science principles.',
        },
        projects: {
          title: 'Project Success',
          description: 'Successfully delivered multiple full-stack projects with positive user feedback and technical excellence.',
        },
        team: {
          title: 'Team Collaboration',
          description: 'Effectively collaborated with cross-functional teams to deliver high-quality software solutions.',
        },
      },
    },
    
    // Contact Section
    contact: {
      title: 'Get In Touch',
      description: "I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and development.",
      email: 'Email',
      location: 'Location',
      sendEmail: 'Send Email',
      chatWithAI: 'Chat with AI',
    },
    
    // Footer
    footer: {
      copyright: '© 2024 Wajahat Ali. All rights reserved.',
    },
    
    // Login Page
    login: {
      title: 'Admin Login',
      subtitle: 'Enter your credentials to access the admin panel',
      email: 'Email',
      password: 'Password',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      login: 'Login',
      loggingIn: 'Logging in...',
      loginSuccess: 'Login successful! Redirecting...',
      loginFailed: 'Login failed',
      loginError: 'An error occurred during login',
      backToPortfolio: '← Back to Portfolio',
      loading: 'Loading...',
    },
  },
  
  fr: {
    // Navigation
    nav: {
      about: 'À propos',
      skills: 'Compétences',
      experience: 'Expérience',
      projects: 'Projets',
      contact: 'Contact',
    },
    
    // Hero Section
    hero: {
      greeting: "Salut, je suis Wajahat 👋",
      subtitle: 'Développeur Full Stack & Résolveur de Problèmes',
      description: 'Développeur full-stack créant des produits que les utilisateurs adorent. Du MVP à l\'échelle, je gère la magie frontend (React/Next.js), la logique backend (Node.js/Python), et tout le reste.',
      viewWork: 'Voir Mon Travail',
      chatWithAI: 'Discuter avec l\'IA',
      getInTouch: 'Me Contacter',
      stats: {
        experience: 'mois d\'Expérience',
        projects: 'Projets Terminés',
        satisfaction: 'Satisfaction Client',
      },
    },
    
    // About Section
    about: {
      title: 'À Propos de Moi',
      description1: "Je suis un développeur Full Stack passionné de Lahore, actuellement en train de poursuivre mon BS en Informatique à l'Université du Punjab. J'aime créer des applications web qui non seulement ont l'air géniales mais résolvent aussi efficacement les problèmes du monde réel.",
      description2: 'Mon parcours dans le développement web a commencé par la curiosité et a évolué vers une passion profonde pour la création d\'applications centrées sur l\'utilisateur. Je crois en l\'écriture de code propre et maintenable et en restant à jour avec les dernières technologies et meilleures pratiques.',
      details: {
        location: '📍 Localisation:',
        education: '🎓 Éducation:',
        university: '🏢 Université:',
        email: '📧 Email:',
        available: '💼 Disponible:',
      },
      values: {
        location: 'Pakistan',
        education: 'BS Informatique',
        university: 'Université du Punjab',
        email: 'wajahataliq1224@example.com',
        available: 'Pour un emploi à temps plein',
      },
    },
    
    // Skills Section
    skills: {
      title: 'Compétences & Technologies',
      categories: {
        frontend: 'Développement Frontend',
        backend: 'Développement Backend',
        tools: 'Outils & Plateformes',
      },
      items: {
        react: 'React.js',
        nextjs: 'Next.js',
        javascript: 'JavaScript (ES6+)',
        htmlcss: 'HTML5 & CSS3',
        tailwind: 'Tailwind CSS',
        responsive: 'Design Responsive',
        nodejs: 'Node.js',
        express: 'Express.js',
        mongodb: 'MongoDB',
        restapi: 'APIs RESTful',
        auth: 'Authentification',
        database: 'Conception de Base de Données',
        git: 'Git & GitHub',
        vscode: 'VS Code',
        postman: 'Postman',
        vercel: 'Vercel',
        netlify: 'Netlify',
        figma: 'Figma',
      },
    },
    
    // Experience Section
    experience: {
      title: 'Expérience',
      items: {
        title: 'Stagiaire Développeur Full Stack',
        company: 'Musketeers Tech',
        duration: 'Juillet 2025 - Septembre 2025',
        description: [
          '• Construit des solutions web évolutives utilisant Next.js, Node.js et MongoDB',
          '• Appliqué l\'internationalisation (i18n) dans plusieurs projets',
          '• Collaboré avec des équipes interfonctionnelles pour livrer des produits de haute qualité',
          '• Implémenté les principes de design responsive et les patterns UI/UX modernes',
        ],
      },
    },
    
    // Projects Section
    projects: {
      title: 'Projets Vedettes',
      intro: 'Voici quelques-uns de mes projets récents qui démontrent mes compétences en développement full-stack, design UI/UX et capacités de résolution de problèmes.',
      loading: 'Chargement des projets...',
      error: 'Erreur:',
      of: 'sur',
      projects: 'projets',
      addNewProject: 'Ajouter un Nouveau Projet',
      refreshProjects: 'Actualiser les Projets',
      viewProject: 'Voir le Projet',
      viewCode: 'Voir le Code',
      techStack: 'Stack Technique:',
    },
    
    // Achievements Section
    achievements: {
      title: 'Réalisations & Reconnaissance',
      items: {
        academic: {
          title: 'Excellence Académique',
          description: 'Performance académique constamment élevée avec une base solide dans les principes informatiques.',
        },
        projects: {
          title: 'Succès des Projets',
          description: 'Livraison réussie de plusieurs projets full-stack avec des retours utilisateurs positifs et excellence technique.',
        },
        team: {
          title: 'Collaboration d\'Équipe',
          description: 'Collaboration efficace avec des équipes interfonctionnelles pour livrer des solutions logicielles de haute qualité.',
        },
      },
    },
    
    // Contact Section
    contact: {
      title: 'Me Contacter',
      description: 'Je suis toujours ouvert à discuter de nouvelles opportunités, de projets intéressants, ou simplement de bavarder sur la technologie et le développement.',
      email: 'Email',
      location: 'Localisation',
      sendEmail: 'Envoyer un Email',
      chatWithAI: 'Discuter avec l\'IA',
    },
    
    // Footer
    footer: {
      copyright: '© 2024 Wajahat Ali. Tous droits réservés.',
    },
    
    // Login Page
    login: {
      title: 'Connexion Admin',
      subtitle: 'Entrez vos identifiants pour accéder au panneau d\'administration',
      email: 'Email',
      password: 'Mot de passe',
      emailPlaceholder: 'Entrez votre email',
      passwordPlaceholder: 'Entrez votre mot de passe',
      login: 'Se connecter',
      loggingIn: 'Connexion en cours...',
      loginSuccess: 'Connexion réussie ! Redirection...',
      loginFailed: 'Échec de la connexion',
      loginError: 'Une erreur s\'est produite lors de la connexion',
      backToPortfolio: '← Retour au Portfolio',
      loading: 'Chargement...',
    },
  },
};

// Utility functions for locale persistence
export function getStoredLocale() {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem('app-locale') || 'en';
}

export function setStoredLocale(locale) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('app-locale', locale);
}

export function getUrlLocale() {
  if (typeof window === 'undefined') return 'en';
  const pathname = window.location.pathname;
  const urlLocale = pathname.split('/')[1];
  return ['en', 'fr'].includes(urlLocale) ? urlLocale : 'en';
}

export function getPreferredLocale() {
  if (typeof window === 'undefined') return 'en';
  
  // Priority: URL path > localStorage > browser language > default
  const urlLocale = getUrlLocale();
  if (urlLocale !== 'en') return urlLocale;
  
  const storedLocale = getStoredLocale();
  if (storedLocale !== 'en') return storedLocale;
  
  // Check browser language
  const browserLang = navigator.language?.split('-')[0];
  if (['en', 'fr'].includes(browserLang)) return browserLang;
  
  return 'en';
}

// Custom hook for client-side locale detection and management
export function useLocale() {
  const [currentLocale, setCurrentLocale] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const preferredLocale = getPreferredLocale();
      setCurrentLocale(preferredLocale);
      setStoredLocale(preferredLocale);
      setIsInitialized(true);
    }
  }, []);

  const updateLocale = (newLocale) => {
    if (['en', 'fr'].includes(newLocale)) {
      setCurrentLocale(newLocale);
      setStoredLocale(newLocale);
    }
  };

  return {
    locale: currentLocale,
    isInitialized,
    updateLocale,
  };
}

export function getTranslation(locale, key) {
  const keys = key.split('.');
  let value = translations[locale] || translations['en'];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if translation not found
      value = translations['en'];
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key; // Return the key if translation not found
        }
      }
      break;
    }
  }
  
  return value || key;
}

export function getAllTranslations(key) {
  return {
    en: getTranslation('en', key),
    fr: getTranslation('fr', key),
  };
}

export function useTranslation(locale = 'en') {
  return {
    t: (key) => getTranslation(locale, key),
    locale,
  };
} 