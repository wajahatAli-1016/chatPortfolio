"use client"
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

const LoginForm = ({ redirectTo }) => {
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
        setSuccess('Login successful! Redirecting...');
        // Store the token in localStorage
        localStorage.setItem('authToken', data.token);
        // Redirect after a short delay
        setTimeout(() => {
          router.push(redirectTo);
        }, 1000);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <div className={styles.formHeader}>
          <h1>Admin Login</h1>
          <p>Enter your credentials to access the admin panel</p>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={styles.backLink}>
          <Link href="/" className={styles.backButton}>
            ← Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

const LoginContent = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/add-new-project';

  return <LoginForm redirectTo={redirectTo} />;
};

const Login = () => {
  return (
    <Suspense fallback={
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <div className={styles.formHeader}>
            <h1>Admin Login</h1>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
};

export default Login; 