import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función para generar URLs de imágenes aleatorias
  const generateRandomImages = (count = 10) => {
    const newImages = [];
    for (let i = 0; i < count; i++) {
      const randomId = Math.floor(Math.random() * 1000) + 1;
      newImages.push({
        id: Date.now() + i,
        url: `https://picsum.photos/300/200?random=${randomId}`,
        alt: `Imagen aleatoria ${randomId}`
      });
    }
    return newImages;
  };

  // Cargar imágenes iniciales
  useEffect(() => {
    setLoading(true);
    const initialImages = generateRandomImages(10);
    setImages(initialImages);
    
    // Simular tiempo de carga
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Agregar nuevas imágenes
  const addNewImages = () => {
    setLoading(true);
    const newImages = generateRandomImages(4);
    setImages(prevImages => [...prevImages, ...newImages]);
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  // Eliminar imagen
  const removeImage = (imageId) => {
    setImages(images.filter(img => img.id !== imageId));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          color: 'var(--color-text-primary)', 
          margin: '0 0 0.5rem 0' 
        }}>
          Galería de Imágenes
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--color-text-secondary)', 
          margin: 0 
        }}>
          Colección de imágenes aleatorias desde API pública
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button 
          className="btn btn-primary"
          onClick={addNewImages}
          disabled={loading}
        >
          {loading ? (
            <>
              <span style={{
                width: '16px',
                height: '16px',
                border: '2px solid transparent',
                borderTop: '2px solid var(--color-white)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: '0.5rem'
              }}></span>
              Cargando...
            </>
          ) : (
            '+ Agregar Más Imágenes'
          )}
        </button>
        
        <span style={{ 
          marginLeft: '1rem', 
          color: 'var(--color-text-secondary)',
          fontSize: '0.9rem'
        }}>
          Total: {images.length} imágenes
        </span>
      </div>

      {loading && images.length === 0 ? (
        <div className="loading">
          Cargando galería...
        </div>
      ) : (
        <div className="grid grid-4" style={{ gap: '1.5rem' }}>
          {images.map((image) => (
            <div 
              key={image.id} 
              className="card" 
              style={{ 
                padding: '0',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ position: 'relative' }}>
                <img 
                  src={image.url} 
                  alt={image.alt}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x200/00b050/ffffff?text=Error+Cargando`;
                  }}
                />
                <button
                  onClick={() => removeImage(image.id)}
                  style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ 
                  margin: '0 0 0.5rem 0', 
                  fontSize: '1rem',
                  color: 'var(--color-text-primary)'
                }}>
                  {image.alt}
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.85rem',
                  color: 'var(--color-text-secondary)'
                }}>
                  ID: {image.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          color: 'var(--color-text-secondary)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🖼️</div>
          <h3 style={{ marginBottom: '0.5rem' }}>No hay imágenes en la galería</h3>
          <p>Haz clic en "Agregar Más Imágenes" para comenzar</p>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
