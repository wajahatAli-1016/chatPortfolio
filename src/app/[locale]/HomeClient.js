"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../page.module.css';
import async from '../../../public/async.png'
import mind from '../../../public/mind.png'
import bookify from '../../../public/bookify.png'
import ChatbotModal from '../components/ChatbotModal';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslation } from '../../lib/i18n';

const HomeClient = ({ locale }) => {
  const { t } = useTranslation(locale);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Reset current slide when screen size changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  const openChatbot = () => {
    setIsChatbotOpen(true);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  // Fetch projects from database
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/project');
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data);
      } else {
        setError(t('projects.error'));
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(t('projects.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Refresh projects (can be called after adding a new project)
  const refreshProjects = () => {
    fetchProjects();
  };

  // Slider navigation functions
  const nextSlide = () => {
    const projectsPerSlide = isMobile ? 2 : 3;
    setCurrentSlide((prev) => 
      prev + projectsPerSlide >= projects.length ? 0 : prev + projectsPerSlide
    );
  };

  const prevSlide = () => {
    const projectsPerSlide = isMobile ? 2 : 3;
    setCurrentSlide((prev) => 
      prev - projectsPerSlide < 0 ? Math.max(0, projects.length - projectsPerSlide) : prev - projectsPerSlide
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get current projects to display (3 on desktop/tablet, 2 on mobile)
  const getCurrentProjects = () => {
    const projectsPerSlide = isMobile ? 2 : 3;
    
    const currentProjects = projects.slice(currentSlide, currentSlide + projectsPerSlide);
    // Pad with empty objects to maintain consistent columns
    while (currentProjects.length < projectsPerSlide) {
      currentProjects.push(null);
    }
    return currentProjects;
  };

  // Calculate total slides based on screen size
  const calculateTotalSlides = () => {
    const projectsPerSlide = isMobile ? 2 : 3;
    return Math.ceil(projects.length / projectsPerSlide);
  };

  const totalSlides = calculateTotalSlides();
  
  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.container}>
          <h1 className={styles.logo}>Wajahat Ali</h1>
          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#about">{t('nav.about')}</a></li>
              <li><a href="#skills">{t('nav.skills')}</a></li>
              <li><a href="#experience">{t('nav.experience')}</a></li>
              <li><a href="#projects">{t('nav.projects')}</a></li>
              <li><a href="#contact">{t('nav.contact')}</a></li>
            </ul>
          </nav>
          <LanguageSwitcher locale={locale} />
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <h2>{t('hero.greeting')}</h2>
          <p className={styles.heroSubtitle}>{t('hero.subtitle')}</p>
          <p className={styles.heroDescription}>{t('hero.description')}</p>
          <div className={styles.btnContainer}>
            <a href="#projects" className={styles.btn}>{t('hero.viewWork')}</a>
            <button onClick={openChatbot} className={styles.btn}>{t('hero.chatWithAI')}</button>
            <a href="#contact" className={styles.btn}>{t('hero.getInTouch')}</a>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>2</span>
              <span className={styles.statLabel}>{t('hero.stats.experience')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{projects.length}</span>
              <span className={styles.statLabel}>{t('hero.stats.projects')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>{t('hero.stats.satisfaction')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={styles.about}>
        <div className={styles.container}>
          <h3>{t('about.title')}</h3>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p>{t('about.description1')}</p>
              <p>{t('about.description2')}</p>
            </div>
            <div className={styles.aboutDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{t('about.details.location')}</span>
                <span className={styles.detailValue}>{t('about.values.location')}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{t('about.details.education')}</span>
                <span className={styles.detailValue}>{t('about.values.education')}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{t('about.details.university')}</span>
                <span className={styles.detailValue}>{t('about.values.university')}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{t('about.details.email')}</span>
                <span className={styles.detailValue}>{t('about.values.email')}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{t('about.details.available')}</span>
                <span className={styles.detailValue}>{t('about.values.available')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={styles.skills}>
        <div className={styles.container}>
          <h3>{t('skills.title')}</h3>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <h4>{t('skills.categories.frontend')}</h4>
              <div className={styles.skillItems}>
                <span className={styles.skillItem}>{t('skills.items.react')}</span>
                <span className={styles.skillItem}>{t('skills.items.nextjs')}</span>
                <span className={styles.skillItem}>{t('skills.items.javascript')}</span>
                <span className={styles.skillItem}>{t('skills.items.htmlcss')}</span>
                <span className={styles.skillItem}>{t('skills.items.tailwind')}</span>
                <span className={styles.skillItem}>{t('skills.items.responsive')}</span>
              </div>
            </div>
            <div className={styles.skillCategory}>
              <h4>{t('skills.categories.backend')}</h4>
              <div className={styles.skillItems}>
                <span className={styles.skillItem}>{t('skills.items.nodejs')}</span>
                <span className={styles.skillItem}>{t('skills.items.express')}</span>
                <span className={styles.skillItem}>{t('skills.items.mongodb')}</span>
                <span className={styles.skillItem}>{t('skills.items.restapi')}</span>
                <span className={styles.skillItem}>{t('skills.items.auth')}</span>
                <span className={styles.skillItem}>{t('skills.items.database')}</span>
              </div>
            </div>
            <div className={styles.skillCategory}>
              <h4>{t('skills.categories.tools')}</h4>
              <div className={styles.skillItems}>
                <span className={styles.skillItem}>{t('skills.items.git')}</span>
                <span className={styles.skillItem}>{t('skills.items.vscode')}</span>
                <span className={styles.skillItem}>{t('skills.items.postman')}</span>
                <span className={styles.skillItem}>{t('skills.items.vercel')}</span>
                <span className={styles.skillItem}>{t('skills.items.netlify')}</span>
                <span className={styles.skillItem}>{t('skills.items.figma')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={styles.experience}>
        <div className={styles.container}>
          <h3>{t('experience.title')}</h3>
          <div className={styles.experienceTimeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <h4>{t('experience.items.title')}</h4>
                  <span className={styles.company}>{t('experience.items.company')}</span>
                  <span className={styles.duration}>{t('experience.items.duration')}</span>
                </div>
                <p>
                  {t('experience.items.description').map((item, index) => (
                    <span key={index}>
                      {item}<br/>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className={styles.projects}>
        <div className={styles.container}>
          <h3>{t('projects.title')}</h3>
          <p className={styles.projectsIntro}>{t('projects.intro')}</p>
          
          {loading && (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>{t('projects.loading')}</p>
            </div>
          )}
          
          {error && (
            <div className={styles.errorContainer}>
              <p>{t('projects.error')} {error}</p>
            </div>
          )}
          
          {!loading && !error && projects.length === 0 && (
            <div className={styles.noProjectsContainer}>
              <p>{t('projects.noProjects')}</p>
              <Link href={`/${locale}/add-new-project`} className={styles.btn}>
                {t('projects.addNewProject')}
              </Link>
            </div>
          )}
          
          {!loading && !error && projects.length > 0 && (
            <div className={styles.projectSliderContainer}>
              {/* Slider Navigation Buttons */}
              {projects.length > (isMobile ? 2 : 3) && (
                <div className={styles.sliderNavigation}>
                  <button 
                    onClick={prevSlide} 
                    className={styles.sliderButton}
                    aria-label={t('projects.previous')}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={nextSlide} 
                    className={styles.sliderButton}
                    aria-label={t('projects.next')}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                  </button>
                </div>
              )}

              {/* Projects Grid */}
              <div className={styles.projectGrid}>
                {getCurrentProjects().map((project, index) => (
                  <div 
                    key={project ? project._id : `empty-${index}`} 
                    className={styles.projectCard}
                    onClick={() => project && project.liveUrl && window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                    style={{ cursor: project && project.liveUrl ? 'pointer' : 'default' }}
                  >
                    {project ? (
                      <div>
                        <img 
                          src={project.imageUrl} 
                          alt={project.name}
                          onError={(e) => {
                            e.target.src = '/placeholder-project.png'; // Fallback image
                          }}
                        />
                        <div className={styles.projectContent}>
                          <h4>{project.name}</h4>
                          <p>{project.description}</p>
                          <div className={styles.projectTech}>
                            {project.technologies && project.technologies.map((tech, techIndex) => (
                              <span key={techIndex}>{tech}</span>
                            ))}
                          </div>
                          <div className={styles.projectLinks}>
                            {project.githubUrl && (
                              <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {t('projects.github')}
                              </a>
                            )}
                          </div>
                          <div className={styles.projectStatus}>
                            <span className={`${styles.statusBadge} ${styles[project.status.toLowerCase().replace(' ', '')]}`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.emptyCard}>
                        <div className={styles.emptyCardContent}>
                          <div className={styles.emptyCardIcon}>📁</div>
                          <p>{t('projects.noProject')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Slider Dots */}
              {projects.length > (isMobile ? 2 : 3) && (
                <div className={styles.sliderDots}>
                  {Array.from({ length: totalSlides }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index * 3)}
                      className={`${styles.dot} ${Math.floor(currentSlide / 3) === index ? styles.activeDot : ''}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Project Counter */}
              {projects.length > (isMobile ? 2 : 3) && (
                <div className={styles.projectCounter}>
                  <span>
                    {currentSlide + 1}-{Math.min(currentSlide + (isMobile ? 2 : 3), projects.length)} {t('projects.of')} {projects.length} {t('projects.projects')}
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className={styles.addProjectButton}>
            <Link href={`/${locale}/login?redirect=/${locale}/add-new-project`} className={styles.btn}>
              {t('projects.addNewProject')}
            </Link>
            <button onClick={refreshProjects} className={styles.btnSecondary}>
              {t('projects.refreshProjects')}
            </button>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className={styles.achievements}>
        <div className={styles.container}>
          <h3>{t('achievements.title')}</h3>
          <div className={styles.achievementsGrid}>
            <div className={styles.achievementCard}>
              <div className={styles.achievementIcon}>🏆</div>
              <h4>{t('achievements.items.academic.title')}</h4>
              <p>{t('achievements.items.academic.description')}</p>
            </div>
            <div className={styles.achievementCard}>
              <div className={styles.achievementIcon}>🚀</div>
              <h4>{t('achievements.items.projects.title')}</h4>
              <p>{t('achievements.items.projects.description')}</p>
            </div>
            <div className={styles.achievementCard}>
              <div className={styles.achievementIcon}>🤝</div>
              <h4>{t('achievements.items.team.title')}</h4>
              <p>{t('achievements.items.team.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={styles.container}>
          <h3>{t('contact.title')}</h3>
          <p>{t('contact.description')}</p>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📧</span>
              <div>
                <h4>{t('contact.email')}</h4>
                <a href="mailto:wajahataliq1224@gmail.com">wajahataliq1224@gmail.com</a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <div>
                <h4>{t('contact.location')}</h4>
                <p>Lahore</p>
              </div>
            </div>
          </div>
          <div className={styles.socialLinks}>
            <a href="https://github.com/wajahatAli-1016" target="_blank" rel="noopener noreferrer" className={styles.btn}>
              <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/wajahat-ali-880a74272/" target="_blank" rel="noopener noreferrer" className={styles.btn}>
              <span>LinkedIn</span>
            </a>
          </div>
          <div className={styles.contactButtons}>
            <a href={`/${locale}/contact`} className={styles.btn}>{t('contact.sendEmail')}</a>
            <button onClick={openChatbot} className={styles.btn}>{t('contact.chatWithAI')}</button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} locale={locale} />
    </>
  );
};

export default HomeClient;
