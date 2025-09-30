import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import PageHero from '../components/PageHero.jsx'
import ProfileSidebar from '../components/ProfileSidebar.jsx';
import ProfileOrders from '../components/ProfileOrders.jsx';

function safeParse(key, fallback){
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback } catch { return fallback }
}

function Profile(){
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({ name:'', email:'', photoUrl:'' })
  const [addr, setAddr] = useState({ line1:'', line2:'', city:'', state:'', pincode:'' })
  const [message, setMessage] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [editAddrMode, setEditAddrMode] = useState(false)
  const [section, setSection] = useState('profile');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();

  // Apply theme to <html> only (previous behavior)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('auth-user');
    setUser(null);
    navigate('/login');
  }

  useEffect(() => {
    const u = safeParse('auth-user', null)
    if (!u) return
    setUser(u)
    setForm({ name: u.name || '', email: u.email || '', photoUrl: u.photoUrl || '' })
    const allAddr = safeParse('addresses', {})
    const a = allAddr[(u.email || '').toLowerCase()] || { line1:'', line2:'', city:'', state:'', pincode:'' }
    setAddr(a)
  }, [])

  function handlePhotoFile(e){
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result || '')
      setForm(prev => ({ ...prev, photoUrl: dataUrl }))
    }
    reader.readAsDataURL(file)
  }

  function saveProfile(e){
    e.preventDefault()
    if (!user) return
    const prevEmailKey = String(user.email || '').toLowerCase()
    const nextUser = { ...user, name: form.name.trim(), email: form.email.trim(), photoUrl: form.photoUrl.trim() }

    // Update auth-user
    try { localStorage.setItem('auth-user', JSON.stringify(nextUser)) } catch {}

    // Update addresses map (move if email changed)
    try {
      const map = safeParse('addresses', {})
      const nextEmailKey = String(nextUser.email || '').toLowerCase()
      if (prevEmailKey && prevEmailKey !== nextEmailKey && map[prevEmailKey]) {
        map[nextEmailKey] = map[prevEmailKey]
        delete map[prevEmailKey]
      } else {
        map[nextEmailKey] = addr
      }
      localStorage.setItem('addresses', JSON.stringify(map))
    } catch {}

    // Update users directory (auth-users) ensuring uniqueness
    try {
      const list = safeParse('auth-users', [])
      const filtered = list.filter(u => String(u.email).toLowerCase() !== prevEmailKey)
      filtered.push(nextUser)
      localStorage.setItem('auth-users', JSON.stringify(filtered))
    } catch {}

    setUser(nextUser)
    setMessage('Profile updated')
    setEditMode(false)
    setTimeout(()=>setMessage(''), 1500)
  }

  function saveAddress(e){
    e.preventDefault()
    if (!user) return
    try {
      const map = safeParse('addresses', {})
      const key = String(form.email || user.email || '').toLowerCase()
      map[key] = addr
      localStorage.setItem('addresses', JSON.stringify(map))
      setMessage('Address saved')
      setTimeout(()=>setMessage(''), 1500)
    } catch {}
  }

  if (!user) return <div className="hero">You are not logged in.</div>

  // Theme changer logic
  function handleThemeChange(e) {
    const t = e.target.value;
    setTheme(t);
    localStorage.setItem('theme', t);
    // The effect above will update the theme on body and html
  }

  return (
    <div>
      <PageHero title="My Profile" subtitle={`Welcome, ${user.name || user.email}`} />
      {message ? <div className="hero">{message}</div> : null}
      <div style={{display:'flex',gap:32,alignItems:'flex-start'}}>
        <ProfileSidebar section={section} setSection={setSection} />
        <div style={{flex:1}}>
          {section === 'profile' && (
            <div className="profile">
              <form className="profile__card" onSubmit={saveProfile}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', gap:'1rem'}}>
                  <h3 style={{margin:0}}>Account Details</h3>
                  <div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
                    {!editMode && (
                      <button type="button" title="Edit Profile" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>setEditMode(true)}>
                        <FaPen />
                      </button>
                    )}
                  </div>
                </div>
                <div className="profile__avatar">
                  {form.photoUrl ? <img src={form.photoUrl} alt="Profile" /> : <div className="profile__avatar-ph">👤</div>}
                </div>
                <label>Choose photo
                  <input type="file" accept="image/*" onChange={handlePhotoFile} disabled={!editMode} style={{display: editMode ? 'block' : 'none'}} />
                </label>
                {/* Name and Email: show as text if not editing, else as input */}
                {!editMode ? (
                  <>
                    <div style={{marginBottom:'0.5rem', fontWeight:500}}>Name</div>
                    <div style={{marginBottom:'1rem', fontSize:'1.1em'}}>{form.name || <span style={{color:'#aaa'}}>No name</span>}</div>
                    <div style={{marginBottom:'0.5rem', fontWeight:500}}>Email</div>
                    <div style={{marginBottom:'1rem', fontSize:'1.1em'}}>{form.email || <span style={{color:'#aaa'}}>No email</span>}</div>
                  </>
                ) : (
                  <>
                    <label>Name
                      <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Your name" />
                    </label>
                    <label>Email
                      <input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="you@example.com" required />
                    </label>
                  </>
                )}
                {editMode && (
                  <div style={{marginTop:'0.75rem',textAlign:'right'}}>
                    <button className="auth__submit" type="submit" style={{background:'#27ae60', color:'#fff', padding:'6px 18px', borderRadius:'4px', border:'none', cursor:'pointer'}}>Save Profile</button>
                  </div>
                )}
              </form>

              <form className="profile__card" onSubmit={saveAddress}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <h3 style={{margin:0}}>Address</h3>
                  {!editAddrMode && (
                    <button type="button" title="Edit Address" style={{background:'none',border:'none',cursor:'pointer'}} onClick={()=>setEditAddrMode(true)}>
                      <FaPen />
                    </button>
                  )}
                </div>
                <label>Address line 1
                  <input value={addr.line1} onChange={(e)=>setAddr({...addr,line1:e.target.value})} readOnly={!editAddrMode} />
                </label>
                <label>Address line 2
                  <input value={addr.line2} onChange={(e)=>setAddr({...addr,line2:e.target.value})} readOnly={!editAddrMode} />
                </label>
                <label>City
                  <input value={addr.city} onChange={(e)=>setAddr({...addr,city:e.target.value})} readOnly={!editAddrMode} />
                </label>
                <label>State
                  <input value={addr.state} onChange={(e)=>setAddr({...addr,state:e.target.value})} readOnly={!editAddrMode} />
                </label>
                <label>Pincode
                  <input value={addr.pincode} onChange={(e)=>setAddr({...addr,pincode:e.target.value})} readOnly={!editAddrMode} />
                </label>
                {editAddrMode && <button className="auth__submit" type="submit">Save Address</button>}
              </form>
            </div>
          )}
          {section === 'orders' && <ProfileOrders />}
          {section === 'settings' && (
            <div className="profile__card">
              <h3>Settings</h3>
              <div style={{margin:'16px 0'}}>
                <label style={{fontWeight:600,marginRight:12}}>Theme:</label>
                <select value={theme} onChange={handleThemeChange} style={{padding:'6px 12px',borderRadius:6}}>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div style={{color:'#888',fontSize:14,marginBottom:'18px'}}>Change the appearance of your dashboard.</div>
              <button className="auth__submit" style={{background:'#e74c3c', color:'#fff', padding:'8px 24px', borderRadius:'6px', border:'none', cursor:'pointer'}} onClick={handleLogout} type="button">Logout</button>
            </div>
          )}
          {section === 'policy' && (
            <div className="profile__card">
              <h3>Customer Policy</h3>
              <div style={{margin:'16px 0',color:'#555'}}>Our customer policy ensures your data is safe and your experience is our top priority. For more details, contact support.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile


