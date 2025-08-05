"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import async from '../../public/async.png'
import mind from '../../public/mind.png'
import bookify from '../../public/bookify.png'
import ChatbotModal from './components/ChatbotModal';

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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
        setError('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError('Failed to fetch projects');
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
    setCurrentSlide((prev) => 
      prev + 3 >= projects.length ? 0 : prev + 3
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev - 3 < 0 ? Math.max(0, projects.length - 3) : prev - 3
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get current projects to display (3 at a time)
  const getCurrentProjects = () => {
    const currentProjects = projects.slice(currentSlide, currentSlide + 3);
    // Pad with empty objects to maintain 3 columns
    while (currentProjects.length < 3) {
      currentProjects.push(null);
    }
    return currentProjects;
  };

  // Calculate total slides
  const totalSlides = Math.ceil(projects.length / 3);
  return (
    <>
    <header className={styles.navbar}>
        <div className={styles.container}>
          <h1 className={styles.logo}>Wajahat Ali</h1>
          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <h2>Hi, I'm Wajahat 👋</h2>
          <p className={styles.heroSubtitle}>Full Stack Developer & Problem Solver</p>
          <p className={styles.heroDescription}>
          Full-stack developer building products that users love. From MVP to scale, I handle frontend magic (React/Next.js), backend logic (Node.js/Python), and everything in between.</p>
          <div className={styles.btnContainer}>
            <a href="#projects" className={styles.btn}>View My Work</a>
            <button onClick={openChatbot} className={styles.btn}>Chat with AI</button>
            <a href="#contact" className={styles.btn}>Get In Touch</a>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>2</span>
              <span className={styles.statLabel}>months Experience</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5</span>
              <span className={styles.statLabel}>Projects Completed</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={styles.about}>
        <div className={styles.container}>
          <h3>About Me</h3>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p>
                I'm a passionate Full Stack Developer from lahore, currently pursuing my BS in Computer Science 
                at the University of the Punjab. I love creating web applications that not only look great but 
                also solve real-world problems efficiently.
              </p>
              <p>
                My journey in web development started with curiosity and has evolved into a deep passion for 
                building user-centric applications. I believe in writing clean, maintainable code and staying 
                up-to-date with the latest technologies and best practices.
              </p>
              
            </div>
            <div className={styles.aboutDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>📍 Location:</span>
                <span className={styles.detailValue}>Pakistan</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>🎓 Education:</span>
                <span className={styles.detailValue}>BS Computer Science</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>🏢 University:</span>
                <span className={styles.detailValue}>University of the Punjab</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>📧 Email:</span>
                <span className={styles.detailValue}>wajahataliq1224@example.com</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>💼 Available:</span>
                <span className={styles.detailValue}>For Full-time job</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className={styles.skills}>
        <div className={styles.container}>
          <h3>Skills & Technologies</h3>
          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <h4>Frontend Development</h4>
              <div className={styles.skillItems}>
                <span className={styles.skillItem}>React.js</span>
                <span className={styles.skillItem}>Next.js</span>
                <span className={styles.skillItem}>JavaScript (ES6+)</span>
                <span className={styles.skillItem}>HTML5 & CSS3</span>
                <span className={styles.skillItem}>Tailwind CSS</span>
                <span className={styles.skillItem}>Responsive Design</span>
              </div>
            </div>
            <div className={styles.skillCategory}>
              <h4>Backend Development</h4>
              <div className={styles.skillItems}>
                <span className={styles.skillItem}>Node.js</span>
                <span className={styles.skillItem}>Express.js</span>
                <span className={styles.skillItem}>MongoDB</span>
                <span className={styles.skillItem}>RESTful APIs</span>
                <span className={styles.skillItem}>Authentication</span>
                <span className={styles.skillItem}>Database Design</span>
              </div>
            </div>
            <div className={styles.skillCategory}>
              <h4>Tools & Platforms</h4>
              <div className={styles.skillItems}>
                <span className={styles.skillItem}>Git & GitHub</span>
                <span className={styles.skillItem}>VS Code</span>
                <span className={styles.skillItem}>Postman</span>
                <span className={styles.skillItem}>Vercel</span>
                <span className={styles.skillItem}>Netlify</span>
                <span className={styles.skillItem}>Figma</span>
              </div>
            </div>
            </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className={styles.experience}>
        <div className={styles.container}>
          <h3>Experience</h3>
          <div className={styles.experienceTimeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeader}>
                  <h4>Full Stack Developer Intern</h4>
                  <span className={styles.company}>Musketeers Tech</span>
                  <span className={styles.duration}>July 2025 - September 2025</span>
                </div>
                <p>
                  • Built scalable web solutions using Next.js, Node.js, and MongoDB<br/>
                  • Applied internationalization (i18n) in multiple projects<br/>
                  • Collaborated with cross-functional teams to deliver high-quality products<br/>
                  • Implemented responsive design principles and modern UI/UX patterns
                </p>
              </div>
            </div>
           </div>
        </div>
      </section>

      <section id="projects" className={styles.projects}>
        <div className={styles.container}>
          <h3>Featured Projects</h3>
          <p className={styles.projectsIntro}>
            Here are some of my recent projects that showcase my skills in full-stack development, 
            UI/UX design, and problem-solving abilities.
          </p>
          
          {loading && (
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p>Loading projects...</p>
            </div>
          )}
          
          {error && (
            <div className={styles.errorContainer}>
              <p>Error: {error}</p>
            </div>
          )}
          
          {!loading && !error && projects.length === 0 && (
            <div className={styles.noProjectsContainer}>
              <p>No projects found. Add your first project!</p>
              <Link href="/add-new-project" className={styles.btn}>
                Add New Project
              </Link>
            </div>
          )}
          
          {!loading && !error && projects.length > 0 && (
            <div className={styles.projectSliderContainer}>
              {/* Slider Navigation Buttons */}
              {projects.length > 3 && (
                <div className={styles.sliderNavigation}>
                  <button 
                    onClick={prevSlide} 
                    className={styles.sliderButton}
                    aria-label="Previous projects"
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  
                  <button 
                    onClick={nextSlide} 
                    className={styles.sliderButton}
                    aria-label="Next projects"
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
                                GitHub
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
                          <p>No Project</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Slider Dots */}
              {projects.length > 3 && (
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
              {projects.length > 3 && (
                <div className={styles.projectCounter}>
                  <span>
                    {currentSlide + 1}-{Math.min(currentSlide + 3, projects.length)} of {projects.length} projects
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className={styles.addProjectButton}>
            <Link href="/login?redirect=/add-new-project" className={styles.btn}>
              Add New Project
            </Link>
            <button onClick={refreshProjects} className={styles.btnSecondary}>
              Refresh Projects
            </button>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className={styles.achievements}>
        <div className={styles.container}>
          <h3>Achievements & Certifications</h3>
          <div className={styles.achievementsGrid}>
            <div className={styles.achievementCard}>
              <div className={styles.achievementIcon}>🏆</div>
              <h4>Academic Excellence</h4>
              <p>Maintained high academic performance in Computer Science program</p>
            </div>
            <div className={styles.achievementCard}>
              <div className={styles.achievementIcon}>🚀</div>
              <h4>5 Projects</h4>
              <p>Successfully completed and deployed multiple web applications</p>
            </div>
           
            <div className={styles.achievementCard}>
              <div className={styles.achievementIcon}>🤝</div>
              <h4>Team Player</h4>
              <p>Collaborated effectively in diverse team environments</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className={styles.contact}>
        <div className={styles.container}>
          <h3>Let's Work Together</h3>
          <p>
            I'm always interested in new opportunities and exciting projects. 
            Whether you have a question, want to discuss a project, or just want to say hi, 
            I'd love to hear from you!
          </p>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📧</span>
              <div>
                <h4>Email</h4>
                <a href="mailto:wajahataliq1224@gmail.com">wajahataliq1224@gmail.com</a>
              </div>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <div>
                <h4>Location</h4>
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
            <a href="/contact" className={styles.btn}>Send Email</a>
            <button onClick={openChatbot} className={styles.btn}>Chat with AI</button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2025 Wajahat Ali. All rights reserved.</p>
        </div>
      </footer>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
      </>
 )
};

export default Home;