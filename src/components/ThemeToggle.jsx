import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import gsap from 'gsap';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ hamburger }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    console.log("clicked");
    
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    gsap.fromTo(`.${styles.icon}`,
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
    );
  };

  return (
    <div className={`${styles.ThemeToggle} ${hamburger ? styles.customHam : ""}`} style={hamburger ? {display: "flex"} : {}} onClick={toggleTheme}>
      <div className={styles.icon}>
        {theme === 'dark' ? <FaSun className={styles.sun} /> : <FaMoon className={styles.moon} />}
      </div>
    </div>
  );
}
