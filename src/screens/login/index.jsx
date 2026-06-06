'use client';
import { loginApi } from '@/networking/auth/auth-apis';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import NetworkBackground from './NetworkBackground';
import { snrLogo } from '@/resources/images/logo';
import Link from 'next/link';
import { useAuthContext } from '@/hooks/useauth';
import styles from './styles.module.css';

const LoginScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { userLogin, isLoading: isAuthLoading } = useAuthContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await userLogin({
      username_or_email: formData.username,
      password: formData.password,
    });
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
            <p>
              Enter your credentials to access your secure enterprise dashboard.
            </p>
          </div>

        </div>

        {/* Right Side - Form */}
        <div className={styles.cardRight}>
          <div className={styles.logoTopRight}>
            <div className={styles.logoImageWrapper}>
              <Image
                src={snrLogo}
                alt="SNR Edatas"
                width={200}
                height={65}
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className={styles.rightHeader}>
            <span className={styles.greeting}>NetMonitor System</span>
            <h2 className={styles.rightTitle}>
              <span>Sign In</span> To Your Account
            </h2>
          </div>

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
                  type={showPassword ? 'text' : 'password'}
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
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Icon
                    icon={showPassword ? 'lucide:eye-off' : 'lucide:eye'}
                    width={18}
                  />
                </button>
              </div>
            </div>

            <div className={styles.actionsArea}>
              <label className={styles.rememberMe}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#" className={styles.forgotPass}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isAuthLoading}
            >
              {isAuthLoading ? (
                <Icon icon="line-md:loading-twotone-loop" width={24} />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className={styles.footerText}>
            Need assistance? <Link href="/manual">Read the User Manual</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
