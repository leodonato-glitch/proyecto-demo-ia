import React, { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  addDoc 
} from 'firebase/firestore';
import { db } from '../services/firebase';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: ''
  });

  // Cargar usuarios desde Firebase
  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersList);
      setError('');
    } catch (err) {
      setError('Error al cargar los usuarios: ' + err.message);
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar usuario
  const deleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Error al eliminar el usuario: ' + err.message);
      console.error('Error deleting user:', err);
    }
  };

  // Agregar nuevo usuario
  const addUser = async (e) => {
    e.preventDefault();
    
    if (!newUser.name.trim() || !newUser.email.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }

    try {
      const userToAdd = {
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        createdAt: new Date().toISOString(),
        photoURL: null,
        uid: null // Usuario manual, no tiene uid de Firebase Auth
      };

      const docRef = await addDoc(collection(db, 'users'), userToAdd);
      setUsers([...users, { id: docRef.id, ...userToAdd }]);
      setNewUser({ name: '', email: '' });
      setShowAddForm(false);
      setError('');
    } catch (err) {
      setError('Error al agregar el usuario: ' + err.message);
      console.error('Error adding user:', err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
          Gestión de Usuarios
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--color-text-secondary)', 
          margin: 0 
        }}>
          Lista de todos los usuarios registrados en la aplicación
        </p>
      </div>

      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          padding: '1rem',
          borderRadius: 'var(--border-radius)',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancelar' : '+ Agregar Usuario'}
        </button>
      </div>

      {showAddForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Agregar Nuevo Usuario</h3>
          <form onSubmit={addUser}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1rem', 
              marginBottom: '1rem' 
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 500 
                }}>
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-gray-medium)',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '1rem'
                  }}
                  placeholder="Ingresa el nombre completo"
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: 500 
                }}>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--color-gray-medium)',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '1rem'
                  }}
                  placeholder="Ingresa el correo electrónico"
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary">
                Agregar Usuario
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowAddForm(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Cargando usuarios...</div>
      ) : (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '0.95rem'
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-gray-medium)' }}>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: 600,
                    color: 'var(--color-text-primary)'
                  }}>
                    Usuario
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: 600,
                    color: 'var(--color-text-primary)'
                  }}>
                    Email
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: 600,
                    color: 'var(--color-text-primary)'
                  }}>
                    Fecha de registro
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'left', 
                    fontWeight: 600,
                    color: 'var(--color-text-primary)'
                  }}>
                    Tipo
                  </th>
                  <th style={{ 
                    padding: '1rem', 
                    textAlign: 'center', 
                    fontWeight: 600,
                    color: 'var(--color-text-primary)'
                  }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--color-gray-medium)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img 
                          src={user.photoURL || '/default-avatar.png'} 
                          alt="Avatar" 
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            backgroundColor: 'var(--color-gray-medium)'
                          }}
                        />
                        <div>
                          <div style={{ 
                            fontWeight: 500, 
                            color: 'var(--color-text-primary)' 
                          }}>
                            {user.name || user.displayName || 'Sin nombre'}
                          </div>
                          <div style={{ 
                            fontSize: '0.85rem', 
                            color: 'var(--color-text-secondary)' 
                          }}>
                            ID: {user.id.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--color-text-primary)' }}>
                      {user.email}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--color-text-secondary)' }}>
                      {formatDate(user.createdAt)}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        backgroundColor: user.uid ? '#dcfce7' : '#fef3c7',
                        color: user.uid ? '#166534' : '#92400e'
                      }}>
                        {user.uid ? 'Google Auth' : 'Manual'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button 
                        className="btn btn-danger"
                        onClick={() => deleteUser(user.id)}
                        style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem', 
                color: 'var(--color-text-secondary)' 
              }}>
                No hay usuarios registrados
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
