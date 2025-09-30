import { getUsers } from '../../utils/adminData.js'
import { Link } from 'react-router-dom'

function Users(){
  const users = getUsers()
  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? (
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
  )
}
export default Users


