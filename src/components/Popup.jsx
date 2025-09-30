import { FaUserLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Popup({ open, message, onClose }) {
  const navigate = useNavigate();
  if (!open) return null;
  function handleLogin() {
    onClose();
    navigate('/login');
  }
  return (
    <div className="popup-backdrop" onClick={onClose}>
      <div className="popup-box popup-animate" onClick={e => e.stopPropagation()}>
        <div className="popup-icon"><FaUserLock size={38} color="#2874f0"/></div>
        <div className="popup-message">{message}</div>
        <div style={{display:'flex',gap:12,justifyContent:'center'}}>
          <button className="popup-login-btn" onClick={handleLogin}>Login</button>
          <button className="popup-close" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
