"use client"
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../../login/page.module.css';
import { useTranslation } from '../../../lib/i18n';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const LoginForm = ({ redirectTo, locale }) => {
  const { t } = useTranslation(locale);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(t('login.loginSuccess'));
        // Store the token in localStorage
        localStorage.setItem('authToken', data.token);
        // Redirect after a short delay
        setTimeout(() => {
          router.push(redirectTo);
        }, 1000);
      } else {
        setError(data.message || t('login.loginFailed'));
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(t('login.loginError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.formHeader}>
          <h1>{t('login.title')}</h1>
          <p>{t('login.subtitle')}</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        {success && (
          <div className={styles.successMessage}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">{t('login.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder={t('login.emailPlaceholder')}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">{t('login.password')}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder={t('login.passwordPlaceholder')}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? t('login.loggingIn') : t('login.login')}
          </button>
        </form>

        <div className={styles.backLink}>
          <Link href={`/${locale}`} className={styles.backButton}>
            {t('login.backToPortfolio')}
          </Link>
        </div>
      </div>
    </div>
  );
};

const LoginContent = ({ locale }) => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || `/add-new-project`;

  return <LoginForm redirectTo={redirectTo} locale={locale} />;
};

const LoginClient = ({ locale }) => {
  const { t } = useTranslation(locale);

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.container}>
          <h1 className={styles.logo}>Wajahat Ali</h1>
          <LanguageSwitcher locale={locale} />
        </div>
      </header>
      
      <Suspense fallback={
        <div className={styles.loginContainer}>
          <div className={styles.loginForm}>
            <div className={styles.formHeader}>
              <h1>{t('login.title')}</h1>
              <p>{t('login.loading')}</p>
            </div>
          </div>
        </div>
      }>
        <LoginContent locale={locale} />
      </Suspense>
    </>
  );
};

const Login = async ({ params }) => {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';
  
  return <LoginClient locale={locale} />;
};

export default Login; 