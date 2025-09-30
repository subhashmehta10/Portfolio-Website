import { useState, useEffect } from 'react'
import PageHero from '../components/PageHero.jsx'

function Login() {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  // Clear form fields on mount and when switching tabs
  useEffect(() => {
    setForm({ name: '', email: '', password: '', confirm: '' })
  }, [mode])
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const isLogin = mode === 'login'
  const [forgot, setForgot] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotMsg, setForgotMsg] = useState('')
  // Captcha state
  const [captchaStep, setCaptchaStep] = useState(false)
  const [captcha, setCaptcha] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captchaMsg, setCaptchaMsg] = useState('')

  function updateField(e){
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate(){
    const next = {}
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Valid email required'
    if (!isLogin) {
      if (!form.name || form.name.length < 2) next.name = 'Enter your name'
      if (!form.phone || !/^\d{10}$/.test(form.phone)) next.phone = 'Valid 10-digit phone required'
      if (form.confirm !== form.password) next.confirm = 'Passwords do not match'
    }
    if (!form.password || form.password.length < 6) next.password = 'Min 6 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleForgot(e) {
    e.preventDefault();
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotMsg('Please enter a valid email.');
      return;
    }
    // Simulate sending email
    setForgotMsg('If this email is registered, a password reset link has been sent.');
  }

  function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let cap = '';
    for (let i = 0; i < 6; ++i) cap += chars[Math.floor(Math.random()*chars.length)];
    return cap;
  }

  function handleSubmit(e){
    e.preventDefault()
    if (!validate()) return
    // Admin credential check
    if (isLogin && form.email === 'admin12@gmail.com' && form.password === 'Admin@12') {
      const adminUser = { name: 'Administrator', email: form.email, role: 'admin' }
      try {
        localStorage.setItem('auth-user', JSON.stringify(adminUser))
        localStorage.setItem('auth-admin', 'true')
        const usersRaw = localStorage.getItem('auth-users')
        const arr = usersRaw ? JSON.parse(usersRaw) : []
        arr.push(adminUser)
        localStorage.setItem('auth-users', JSON.stringify(arr))
      } catch {}
      window.location.href = '/admin'
      return
    }

    if (isLogin) {
      // Only allow login if user is registered
      const usersRaw = localStorage.getItem('auth-users')
      const arr = usersRaw ? JSON.parse(usersRaw) : []
      const email = String(form.email).toLowerCase()
      const exists = arr.some(u => String(u.email).toLowerCase() === email)
      if (!exists) {
        setErrors({ email: 'User not registered. Please register first.' })
        return
      }
      // Proceed with login
      const user = { email: form.email }
      try {
        localStorage.setItem('auth-user', JSON.stringify(user))
      } catch {}
      window.location.href = '/profile'
      return
    }

    // Register flow: show captcha step
    // Check if already registered
    const usersRaw = localStorage.getItem('auth-users')
    const arr = usersRaw ? JSON.parse(usersRaw) : []
    const email = String(form.email).toLowerCase()
    const exists = arr.some(u => String(u.email).toLowerCase() === email)
    if (exists) {
      setErrors({ email: 'User already registered. Please login.' })
      return
    }
    // Generate random captcha (6 chars: letters+digits)
    setCaptcha(generateCaptcha())
    setCaptchaInput('')
    setCaptchaMsg('')
    setCaptchaStep(true)
  }

  function handleCaptchaVerify(e) {
    e.preventDefault()
    if (captchaInput.trim().toUpperCase() !== captcha) {
      setCaptchaMsg('Captcha incorrect. Please try again.')
      return
    }
    // Complete registration
    const user = { name: form.name, email: form.email, phone: form.phone }
    try {
      localStorage.setItem('auth-user', JSON.stringify(user))
      const usersRaw = localStorage.getItem('auth-users')
      const arr = usersRaw ? JSON.parse(usersRaw) : []
      arr.push(user)
      localStorage.setItem('auth-users', JSON.stringify(arr))
    } catch {}
    window.location.href = '/profile'
  }

  return (
    <div>
      <PageHero title={isLogin ? 'Login' : 'Create Account'} subtitle={isLogin ? 'Access your account' : 'Join ShopKart to start shopping'} />

      <div className="auth">
        <div className="auth__tabs">
          <button className={isLogin ? 'active' : ''} onClick={()=>{setMode('login');setForgot(false);}}>Login</button>
          <button className={!isLogin ? 'active' : ''} onClick={()=>{setMode('register');setForgot(false);}}>Register</button>
        </div>

        {isLogin && forgot ? (
          <form className="auth__form" onSubmit={handleForgot} noValidate>
            <label>
              Enter your registered email
              <input type="email" value={forgotEmail} onChange={e=>setForgotEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            {forgotMsg && <div className="auth__error" style={{marginBottom:'1em'}}>{forgotMsg}</div>}
            <button type="submit" className="auth__submit">Send Reset Link</button>
            <div className="auth__hint">
              <button
                type="button"
                className="linklike"
                style={{border:'none',outline:'none',boxShadow:'none',background:'none',padding:0,cursor:'pointer'}}
                onClick={()=>setForgot(false)}
              >Back to Login</button>
            </div>
          </form>
        ) : captchaStep && !isLogin ? (
          <form className="auth__form" onSubmit={handleCaptchaVerify} noValidate>
            <div style={{marginBottom:'1em',color:'#2874f0',fontWeight:500}}>
              Please enter the captcha below to complete registration
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'0.5em',marginBottom:'1em'}}>
              <div style={{
                fontFamily:'monospace',
                fontSize:'2em',
                letterSpacing:'0.25em',
                background:'#f2f2f2',
                padding:'0.5em 1em',
                borderRadius:'6px',
                userSelect:'none',
                display:'inline-block'
              }}>{captcha}</div>
              <button
                type="button"
                title="Refresh captcha"
                style={{
                  background:'none',
                  border:'none',
                  outline:'none',
                  boxShadow:'none',
                  cursor:'pointer',
                  fontSize:'1.5em',
                  color:'#2874f0',
                  padding:'0 0.2em'
                }}
                onClick={()=>{setCaptcha(generateCaptcha());setCaptchaInput('');setCaptchaMsg('')}}
              >
                🔄
              </button>
            </div>
            <label>
              Enter captcha
              <input
                type="text"
                value={captchaInput}
                onChange={e=>setCaptchaInput(e.target.value)}
                placeholder="Type here"
                maxLength={6}
                style={{letterSpacing:'0.2em',fontSize:'1.2em'}}
              />
            </label>
            {captchaMsg && <div className="auth__error" style={{marginBottom:'1em'}}>{captchaMsg}</div>}
            <button type="submit" className="auth__submit">Verify & Register</button>
            <div className="auth__hint">
              <button type="button" className="linklike" style={{border:'none',outline:'none',boxShadow:'none',background:'none',padding:0,cursor:'pointer'}} onClick={()=>{setCaptchaStep(false);setCaptcha('');setCaptchaInput('');setCaptchaMsg('')}}>Back to Register</button>
            </div>
          </form>
        ) : (
          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            {!isLogin && (
              <>
                <label>
                  Full name
                  <input name="name" value={form.name} onChange={updateField} placeholder="Your name" />
                  {errors.name ? <span className="auth__error">{errors.name}</span> : null}
                </label>
                <label>
                  Phone number
                  <input name="phone" value={form.phone} onChange={updateField} placeholder="10-digit phone" maxLength={10} inputMode="numeric" />
                  {errors.phone ? <span className="auth__error">{errors.phone}</span> : null}
                </label>
              </>
            )}
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={updateField} placeholder="you@example.com" />
              {errors.email ? <span className="auth__error">{errors.email}</span> : null}
            </label>
            <label style={{position:'relative'}}>
              Password
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={updateField}
                placeholder="Enter password"
                style={{paddingRight:'2.5em'}}
              />
              <button
                type="button"
                tabIndex={-1}
                style={{position:'absolute',right:'0.5em',top:'2.1em',background:'none',border:'none',outline:'none',boxShadow:'none',cursor:'pointer',fontSize:'1em',color:'#555'}}
                onClick={()=>setShowPassword(v=>!v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
              {errors.password ? <span className="auth__error">{errors.password}</span> : null}
            </label>
            {isLogin && (
              <div style={{textAlign:'right',marginBottom:'1em'}}>
                <button
                  type="button"
                  className="linklike"
                  style={{fontSize:'0.98em',border:'none',outline:'none',boxShadow:'none',background:'none',padding:0,cursor:'pointer'}}
                  onClick={()=>{setForgot(true);setForgotMsg('');setForgotEmail('')}}
                >Forgot password?</button>
              </div>
            )}
            {!isLogin && (
              <label style={{position:'relative'}}>
                Confirm password
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirm"
                  value={form.confirm}
                  onChange={updateField}
                  placeholder="Enter password again"
                  style={{paddingRight:'2.5em'}}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  style={{position:'absolute',right:'0.5em',top:'2.1em',background:'none',border:'none',outline:'none',boxShadow:'none',cursor:'pointer',fontSize:'1em',color:'#555'}}
                  onClick={()=>setShowConfirm(v=>!v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? '🙈' : '👁️'}
                </button>
                {errors.confirm ? <span className="auth__error">{errors.confirm}</span> : null}
              </label>
            )}
            <button type="submit" className="auth__submit">{isLogin ? 'Login' : 'Create Account'}</button>
            {isLogin ? <div className="auth__hint">New user? <button type="button" className="linklike" onClick={()=>setMode('register')}>Create an account</button></div> : <div className="auth__hint">Already have an account? <button type="button" className="linklike" onClick={()=>setMode('login')}>Login</button></div>}
          </form>
        )}
      </div>
    </div>
  )
}

export default Login


