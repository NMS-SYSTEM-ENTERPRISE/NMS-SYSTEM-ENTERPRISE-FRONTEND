"use client";
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';
import { loginApi } from '@/networking/auth/auth-apis';
import NetworkBackground from './NetworkBackground';

const LoginScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginApi({
        username_or_email: formData.username,
        password: formData.password
      });

      const data = response.data || response;
      if (data.access_token) {
        localStorage.setItem('accessToken', data.access_token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login failed', err);
      const detail = err.detail || err.message || 'Login failed. Please check your credentials.';
      const msg = Array.isArray(detail) ? detail[0]?.msg : detail;
      setError(typeof msg === 'string' ? msg : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <NetworkBackground />
      
      <div className={styles.card}>

        {/* Left Side - Graphic & Welcome Text */}
        <div className={styles.cardLeft}>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
          <div className={styles.sphere1}></div>
          <div className={styles.sphere2}></div>
          <div className={styles.sphere3}></div>

          <div className={styles.leftContent}>
            <h1>Welcome Back</h1>
            <p>Enter your credentials to access your secure enterprise dashboard.</p>
          </div>

          <div className={styles.logoBottom}>
            NETMONITOR
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.cardRight}>
          <div className={styles.rightHeader}>
            <span className={styles.greeting}>NetMonitor System</span>
            <h2 className={styles.rightTitle}><span>Sign In</span> To Your Account</h2>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <Icon icon="lucide:alert-circle" width={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username or Email</label>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={styles.loginInput}
                  placeholder="e.g. admin@nms.com"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon icon={showPassword ? "lucide:eye-off" : "lucide:eye"} width={18} />
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

          <div className={styles.ssoDivider}>
            <span>Or continue with SSO</span>
          </div>

          <div className={styles.socialLogin}>
            <button className={styles.socialBtn} type="button">
              <Icon icon="simple-icons:okta" width={18} color="#007dc1" />
              <span>Okta</span>
            </button>
            <button className={styles.socialBtn} type="button">
              <Icon icon="simple-icons:microsoft" width={18} color="#00a4ef" />
              <span>Microsoft</span>
            </button>
          </div>

          <div className={styles.footerText}>
            Need assistance? <a href="#">Contact IT Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
