"use client"
import { useState } from 'react';
import Link from 'next/link';
import styles from '../../contact/contact.module.css';
import { useTranslation } from '../../../lib/i18n';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const ContactPage = ({ params }) => {
  const locale = params?.locale || 'en';
  const { t } = useTranslation(locale);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send email using our API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        console.error('API Error:', result.error);
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerTop}>
            <Link href={`/${locale}`} className={styles.backButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              {locale === 'fr' ? 'Retour au Portfolio' : 'Back to Portfolio'}
            </Link>
            <LanguageSwitcher locale={locale} />
          </div>
          <div className={styles.headerContent}>
            <h1>{locale === 'fr' ? 'Contactez-moi' : 'Get In Touch'}</h1>
            <p>
              {locale === 'fr' 
                ? "J'aimerais avoir de vos nouvelles ! Envoyez-moi un message et je répondrai dès que possible."
                : "I'd love to hear from you! Send me a message and I'll respond as soon as possible."
              }
            </p>
          </div>
        </div>
      </header>

      {/* Contact Form */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <h2>{locale === 'fr' ? 'Connectons-nous' : "Let's Connect"}</h2>
              <p>
                {locale === 'fr'
                  ? "Je suis toujours ouvert à discuter de nouvelles opportunités, de projets intéressants, ou simplement d'avoir une conversation amicale sur la technologie et le développement."
                  : "I'm always open to discussing new opportunities, interesting projects, or just having a friendly chat about technology and development."
                }
              </p>
              
              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📧</div>
                  <div>
                    <h3>{t('contact.email')}</h3>
                    <a href="mailto:wajahataliq1224@gmail.com">wajahataliq1224@gmail.com</a>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📍</div>
                  <div>
                    <h3>{t('contact.location')}</h3>
                    <p>Lahore</p>
                  </div>
                </div>
                
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>💼</div>
                  <div>
                    <h3>{locale === 'fr' ? 'Disponibilité' : 'Availability'}</h3>
                    <p>{locale === 'fr' ? 'Ouvert aux opportunités à temps plein' : 'Open to full-time opportunities'}</p>
                  </div>
                </div>
              </div>

              <div className={styles.socialLinks}>
                <h3>{locale === 'fr' ? 'Suivez-moi' : 'Follow Me'}</h3>
                <div className={styles.socialButtons}>
                  <a href="https://github.com/wajahatAli-1016" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/wajahat-ali-880a74272/" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contactForm}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">{locale === 'fr' ? 'Nom' : 'Name'} *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={locale === 'fr' ? 'Votre nom complet' : 'Your full name'}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">{t('contact.email')} *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject">{locale === 'fr' ? 'Sujet' : 'Subject'} *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={locale === 'fr' ? 'De quoi s\'agit-il ?' : "What's this about?"}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">{locale === 'fr' ? 'Message' : 'Message'} *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={
                      locale === 'fr' 
                        ? 'Parlez-moi de votre projet, posez une question, ou dites simplement bonjour !'
                        : "Tell me about your project, question, or just say hello!"
                    }
                    rows="6"
                    className={styles.textarea}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner}></div>
                      {locale === 'fr' ? 'Envoi...' : 'Sending...'}
                    </>
                  ) : (
                    locale === 'fr' ? 'Envoyer le Message' : 'Send Message'
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className={styles.successMessage}>
                    ✅ {locale === 'fr' 
                      ? 'Message envoyé avec succès ! Je vous répondrai bientôt.'
                      : 'Message sent successfully! I\'ll get back to you soon.'
                    }
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    ❌ {locale === 'fr'
                      ? 'Quelque chose s\'est mal passé. Veuillez réessayer ou m\'envoyer un email directement à wajahataliq1224@gmail.com'
                      : 'Something went wrong. Please try again or email me directly at wajahataliq1224@gmail.com'
                    }
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage; 
