"use client"
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation, setStoredLocale } from '../../lib/i18n';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = ({ locale }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation(locale);

  const switchLanguage = (newLocale) => {
    // Store the new locale in localStorage for persistence
    setStoredLocale(newLocale);
    
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    
    // Construct the new path with the new locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    // Navigate to the new path
    router.push(newPath);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        className={`${styles.langButton} ${locale === 'en' ? styles.active : ''}`}
        onClick={() => switchLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className={styles.separator}>|</span>
      <button
        className={`${styles.langButton} ${locale === 'fr' ? styles.active : ''}`}
        onClick={() => switchLanguage('fr')}
        aria-label="Switch to French"
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher; 