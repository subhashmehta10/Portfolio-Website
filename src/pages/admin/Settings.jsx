
import { useNavigate } from 'react-router-dom';
function Settings(){
  const navigate = useNavigate();
  function makeAdmin(){
    try { localStorage.setItem('auth-admin','true') } catch {}
    alert('Admin enabled. Go to /admin')
  }
  function clearAdmin(){
    try { localStorage.removeItem('auth-admin') } catch {}
    alert('Admin disabled')
  }
  function handleLogout(){
    try {
      localStorage.removeItem('auth-user');
      localStorage.removeItem('auth-admin');
    } catch {}
    navigate('/login');
  }
  return (
    <div>
      <h2>Settings</h2>
      <button className="product__btn" onClick={makeAdmin}>Enable Admin</button>
      <button className="product__btn" style={{marginLeft:8}} onClick={clearAdmin}>Disable Admin</button>
      <button className="product__btn" style={{marginLeft:16,background:'#e53935',color:'#fff'}} onClick={handleLogout}>Logout</button>
    </div>
  )
}
export default Settings


