import React, { useState, useEffect } from 'react';
import { getUserExperience, formatPeriod, calculateDuration } from '../services/linkedin';
import { useAuth } from '../context/AuthContext';
import styles from './ExperienceSection.module.css';

const ExperienceSection = () => {
  const { user } = useAuth();
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadExperience = async () => {
      if (!user?.uid) return;
      
      setLoading(true);
      setError('');
      
      try {
        const result = await getUserExperience();
        
        if (result.success) {
          setExperience(result.data);
        } else {
          setError(result.error);
        }
      } catch {
        setError('Error inesperado al cargar la experiencia');
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, [user?.uid]);

  const handleRetry = () => {
    const loadExperience = async () => {
      setLoading(true);
      setError('');
      
      try {
        const result = await getUserExperience();
        
        if (result.success) {
          setExperience(result.data);
        } else {
          setError(result.error);
        }
      } catch {
        setError('Error inesperado al cargar la experiencia');
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  };

  if (loading) {
    return (
      <div className={styles.experienceSection}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.icon}>💼</span>
          Experiencia Laboral
        </h3>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <span>Cargando experiencia...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.experienceSection}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.icon}>💼</span>
          Experiencia Laboral
        </h3>
        <div className={styles.error}>
          <p>{error}</p>
          <button 
            className="btn btn-secondary"
            onClick={handleRetry}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.experienceSection}>
      <h3 className={styles.sectionTitle}>
        <span className={styles.icon}>💼</span>
        Experiencia Laboral
      </h3>
      
      <div className={styles.experienceList}>
        {experience.map((job, index) => (
          <div key={job.id} className={styles.experienceItem}>
            <div className={styles.timeline}>
              <div className={styles.timelineDot}></div>
              {index < experience.length - 1 && <div className={styles.timelineLine}></div>}
            </div>
            
            <div className={styles.experienceContent}>
              <div className={styles.experienceHeader}>
                <h4 className={styles.position}>{job.position}</h4>
                <span className={styles.current}>
                  {!job.endDate && (
                    <span className={styles.currentBadge}>Actual</span>
                  )}
                </span>
              </div>
              
              <div className={styles.company}>
                <strong>{job.company}</strong>
                {job.location && <span className={styles.location}> • {job.location}</span>}
              </div>
              
              <div className={styles.period}>
                <span>{formatPeriod(job.startDate, job.endDate)}</span>
                <span className={styles.duration}>
                  ({calculateDuration(job.startDate, job.endDate)})
                </span>
              </div>
              
              {job.description && (
                <p className={styles.description}>{job.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {experience.length === 0 && (
        <div className={styles.noData}>
          <span className={styles.noDataIcon}>📋</span>
          <p>No se encontró información de experiencia laboral</p>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
