"use client"
import { useState } from 'react';
import Link from 'next/link';
import styles from'./page.module.css';
import async from '../../public/async.png'
import mind from '../../public/mind.png'
import bookify from '../../public/bookify.png'
import ChatbotModal from './components/ChatbotModal';

const Home = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const openChatbot = () => {
    setIsChatbotOpen(true);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };
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
          <div className={styles.projectGrid}>
            <Link href="https://async-standups-loux.vercel.app/" className={styles.projectCard}>
            <div>
              <img src={async.src} alt="Async Standups" />
              <div className={styles.projectContent}>
                <h4>Async Standups</h4>
                <p>Keep your team in sync without syncing your schedules. A modern solution for remote team coordination.</p>
                <div className={styles.projectTech}>
                  <span>Next.js</span>
                  <span>MongoDB</span>
                  <span>Tailwind CSS</span>
                  <span>Auth.js</span>
                </div>
              
              </div>
              </div>
            </Link>
            <Link href="https://mindtherapy1-wzsc.vercel.app/" className={styles.projectCard}>
            <div>
              <img src={mind.src} alt="Mind Therapy App" />
              <div className={styles.projectContent}>
                <h4>Mind Therapy App</h4>
                <p>Emotional support app with journal and mood tracker featuring AI feedback and intelligent chatbot.</p>
                <div className={styles.projectTech}>
                  <span>Next.js</span>
                  <span>Node.js</span>
                  <span>MongoDB</span>
                  <span>AI Integration</span>
                </div>
               
              </div>
              </div>
            </Link>
            <Link href="https://bookify-frontend-vw31.vercel.app/" className={styles.projectCard}>
              <img src={bookify.src} alt="Bookify App" />
              <div className={styles.projectContent}>
                <h4>Bookify App</h4>
                <p>Modern e-commerce platform for buying books online with smart search and personalized recommendations.</p>
                <div className={styles.projectTech}>
                  <span>React</span>
                  <span>Express</span>
                  <span>MongoDB</span>
                  <span>Tailwind CSS</span>
                </div>
              </div>
            </Link>
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