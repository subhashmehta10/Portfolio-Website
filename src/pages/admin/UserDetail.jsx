import { useParams } from 'react-router-dom'
import PageHero from '../../components/PageHero.jsx'
import { getUsers } from '../../utils/adminData.js'

function loadOrdersByEmail(email){
  try {
    const all = JSON.parse(localStorage.getItem('orders')||'[]')
    return all.filter(o => String(o.email).toLowerCase() === String(email).toLowerCase())
  } catch { return [] }
}

function loadAddressByEmail(email){
  try {
    const all = JSON.parse(localStorage.getItem('addresses')||'{}')
    return all[String(email).toLowerCase()] || null
  } catch { return null }
}

function UserDetail(){
  const params = useParams()
  const emailParam = decodeURIComponent(params.email || '')
  const users = getUsers()
  const user = users.find(u => String(u.email).toLowerCase() === String(emailParam).toLowerCase())
  const orders = loadOrdersByEmail(emailParam)
  const address = loadAddressByEmail(emailParam)

  return (
    <div>
      <PageHero title="User Details" subtitle={user ? user.email : 'User not found'} />
      {!user ? (
        <div className="hero">No such user.</div>
      ) : (
        <div className="profile" style={{gridTemplateColumns:'2fr 1fr'}}>
          <div className="profile__card">
            <h3>Profile</h3>
            <div className="profile__row"><span>Name</span><span>{user.name || '—'}</span></div>
            <div className="profile__row"><span>Email</span><span>{user.email}</span></div>
            <div className="profile__row"><span>Phone</span><span>{user.phone || '—'}</span></div>
            <div className="profile__row"><span>Role</span><span>{user.role || 'user'}</span></div>
          </div>
          <div className="profile__card">
            <h3>Address</h3>
            {address ? (
              <div>
                <div>{address.line1}</div>
                <div>{address.line2}</div>
                <div>{address.city}, {address.state} - {address.pincode}</div>
              </div>
            ) : (
              <div className="hero">No address saved.</div>
            )}
          </div>
          <div className="profile__card" style={{gridColumn:'1 / -1'}}>
            <h3>Orders</h3>
            {orders.length === 0 ? (
              <div className="hero">No orders found.</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, idx)=> (
                    <tr key={o.id || idx}>
                      <td>{idx+1}</td>
                      <td>{o.id || '—'}</td>
                      <td>{o.date || '—'}</td>
                      <td>₹{Number(o.total||0).toFixed(2)}</td>
                      <td>{o.status || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDetail


