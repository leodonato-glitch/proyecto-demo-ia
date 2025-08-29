import React from 'react';
import { useAuth } from '../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'profile', label: 'Perfil', icon: '👤' },
    { id: 'users', label: 'Usuarios', icon: '👥' },
    { id: 'gallery', label: 'Galería', icon: '🖼️' }
  ];

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      console.log('Sesión cerrada exitosamente');
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Demo IA</span>
        </div>
      </div>

      <div className={styles.userInfo}>
        <img 
          src={user?.photoURL || '/default-avatar.png'} 
          alt="Avatar" 
          className={styles.userAvatar}
        />
        <div className={styles.userDetails}>
          <h3 className={styles.userName}>{user?.displayName}</h3>
          <p className={styles.userEmail}>{user?.email}</p>
        </div>
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`${styles.menuItem} ${
                  activeSection === item.id ? styles.active : ''
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuLabel}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <button 
          className={`btn btn-secondary ${styles.logoutBtn}`}
          onClick={handleLogout}
        >
          <span>🚪</span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
