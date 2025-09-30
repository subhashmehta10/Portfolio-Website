
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const res = await fetch(`${apiUrl}/api/users`);
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {loading ? (
        <div className="hero">Loading users...</div>
      ) : error ? (
        <div className="hero" style={{color:'red'}}>{error}</div>
      ) : users.length === 0 ? (
        <div className="hero">No users registered yet.</div>
      ) : (
        <div className="admin-users">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={`${u.email}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td><Link to={`/admin/users/${encodeURIComponent(u.email)}`}>{u.name || '—'}</Link></td>
                  <td>{u.email}</td>
                  <td>{u.phone || '—'}</td>
                  <td>{u.role || 'user'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;


