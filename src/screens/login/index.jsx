
"use client";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';

const LoginScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating a professional login delay
    setTimeout(() => {
      setIsLoading(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className={styles.loginContainer}>
      {/* Corner Decorations */}
      <div className={`${styles.cornerDecor} ${styles.topLeft}`}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
          <path d="M0 20V0H20M0 40V100M40 0H100" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0L30 0L0 30Z" fill="currentColor" opacity="0.1" />
        </svg>
      </div>
      <div className={`${styles.cornerDecor} ${styles.topRight}`}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
          <path d="M0 20V0H20M0 40V100M40 0H100" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0L30 0L0 30Z" fill="currentColor" opacity="0.1" />
        </svg>
      </div>
      <div className={`${styles.cornerDecor} ${styles.bottomLeft}`}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
          <path d="M0 20V0H20M0 40V100M40 0H100" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0L30 0L0 30Z" fill="currentColor" opacity="0.1" />
        </svg>
      </div>
      <div className={`${styles.cornerDecor} ${styles.bottomRight}`}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
          <path d="M0 20V0H20M0 40V100M40 0H100" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0L30 0L0 30Z" fill="currentColor" opacity="0.1" />
        </svg>
      </div>

      <div className={styles.loginLeft}>
        <div className={styles.loginContent}>
          {/* Logo Section */}
          <div className={styles.logoArea}>
            <div className={styles.logoIcon}>
              <Icon icon="mdi:alpha-n-circle-outline" width={28} color="white" />
            </div>
            <div className={styles.logoText}>
              Net<span>Monitor</span>
            </div>
          </div>

          {/* Header Texts */}
          <div className={styles.headerArea}>
            <h1>Welcome Back</h1>
            <p>Please enter your details to login and securely access your dashboard.</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username or Email</label>
              <div className={styles.inputWrapper}>
                <Icon icon="lucide:user" className={styles.inputIcon} width={20} />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={styles.loginInput}
                  placeholder="e.g. admin@netmonitor.pro"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <Icon icon="lucide:lock" className={styles.inputIcon} width={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={styles.loginInput}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon icon={showPassword ? "lucide:eye-off" : "lucide:eye"} width={20} />
                </button>
              </div>
            </div>

            <div className={styles.actionsArea}>
              <label className={styles.rememberMe}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className={styles.forgotPass}>Forgot password?</a>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isLoading}>
              {isLoading ? (
                <Icon icon="line-md:loading-twotone-loop" width={24} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Enterprise Logins */}
          <div className={styles.divider}>
            <span>Or sign in with SSO</span>
          </div>

          <div className={styles.socialLogin}>
            <button className={styles.socialBtn} type="button">
              <Icon icon="simple-icons:okta" width={20} color="#007dc1" />
              <span>OKTA</span>
            </button>
            <button className={styles.socialBtn} type="button">
              <Icon icon="simple-icons:auth0" width={20} color="#eb5424" />
              <span>One Login</span>
            </button>
          </div>

          <div className={styles.footerText}>
            Don't have an account? <a href="#">Contact IT Admin</a>
          </div>
        </div>
      </div>

      <div className={styles.loginRight}>
        <div className={styles.illustrationWrapper}>
          <img 
            src="/images/login-illustration.png" 
            alt="NMS Monitoring Illustration" 
            className={styles.illustrationImage}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
