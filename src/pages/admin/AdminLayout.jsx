import { NavLink, Outlet } from 'react-router-dom'

function AdminLayout(){
  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <h3 className="admin__title">Admin</h3>
        <NavLink to="/admin" end className="admin__link">Overview</NavLink>
        <NavLink to="/admin/products" className="admin__link">Products</NavLink>
        <NavLink to="/admin/orders" className="admin__link">Orders</NavLink>
        <NavLink to="/admin/users" className="admin__link">Users</NavLink>
        <NavLink to="/admin/settings" className="admin__link">Settings</NavLink>
      </aside>
      <section className="admin__content">
        <Outlet />
      </section>
    </div>
  )
}

export default AdminLayout


