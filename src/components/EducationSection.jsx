import React, { useState, useEffect } from 'react';
import { getUserEducation, formatPeriod, calculateDuration } from '../services/linkedin';
import { useAuth } from '../context/AuthContext';
import styles from './EducationSection.module.css';

const EducationSection = () => {
  const { user } = useAuth();
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEducation = async () => {
      if (!user?.uid) return;
      
      setLoading(true);
      setError('');
      
      try {
        const result = await getUserEducation();
        
        if (result.success) {
          setEducation(result.data);
        } else {
          setError(result.error);
        }
      } catch {
        setError('Error inesperado al cargar la educación');
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  }, [user?.uid]);

  const handleRetry = () => {
    const loadEducation = async () => {
      setLoading(true);
      setError('');
      
      try {
        const result = await getUserEducation();
        
        if (result.success) {
          setEducation(result.data);
        } else {
          setError(result.error);
        }
      } catch {
        setError('Error inesperado al cargar la educación');
      } finally {
        setLoading(false);
      }
    };

    loadEducation();
  };

  if (loading) {
    return (
      <div className={styles.educationSection}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.icon}>🎓</span>
          Educación
        </h3>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <span>Cargando educación...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.educationSection}>
        <h3 className={styles.sectionTitle}>
          <span className={styles.icon}>🎓</span>
          Educación
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
    <div className={styles.educationSection}>
      <h3 className={styles.sectionTitle}>
        <span className={styles.icon}>🎓</span>
        Educación
      </h3>
      
      <div className={styles.educationList}>
        {education.map((study, index) => (
          <div key={study.id} className={styles.educationItem}>
            <div className={styles.timeline}>
              <div className={styles.timelineDot}></div>
              {index < education.length - 1 && <div className={styles.timelineLine}></div>}
            </div>
            
            <div className={styles.educationContent}>
              <div className={styles.educationHeader}>
                <h4 className={styles.degree}>{study.degree}</h4>
                {study.grade && (
                  <span className={styles.grade}>{study.grade}</span>
                )}
              </div>
              
              <div className={styles.institution}>
                <strong>{study.institution}</strong>
              </div>
              
              {study.fieldOfStudy && (
                <div className={styles.fieldOfStudy}>
                  {study.fieldOfStudy}
                </div>
              )}
              
              <div className={styles.period}>
                <span>{formatPeriod(study.startDate, study.endDate)}</span>
                <span className={styles.duration}>
                  ({calculateDuration(study.startDate, study.endDate)})
                </span>
              </div>
              
              {study.description && (
                <p className={styles.description}>{study.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {education.length === 0 && (
        <div className={styles.noData}>
          <span className={styles.noDataIcon}>📚</span>
          <p>No se encontró información educativa</p>
        </div>
      )}
    </div>
  );
};

export default EducationSection;
