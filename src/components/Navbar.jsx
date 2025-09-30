import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const [query, setQuery] = useState('')
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem('auth-user') || 'null')
      setUser(u)
    } catch {
      setUser(null)
    }
    // Listen to storage changes (multi-tab login/logout)
    const onStorage = () => {
      try {
        const u = JSON.parse(localStorage.getItem('auth-user') || 'null')
        setUser(u)
      } catch {
        setUser(null)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <header className="nav">
      <div className="nav__inner">
        <div className="nav__left">
          <Link to="/" className="nav__logo">
            <span className="nav__logo-primary">ShopKart</span>
            <span className="nav__logo-sub">Explore Plus</span>
          </Link>

          <button className="nav__menu-btn" aria-label="Open Menu" onClick={() => setMenuOpen(m => !m)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className="nav__search">
          <input
            type="text"
            placeholder="Search for Products, Brands and More"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="nav__search-btn" aria-label="Search">🔍</button>
        </div>

        <nav className="nav__actions">
          {user ? (
            <NavLink to="/profile" className="nav__login" style={{display:'flex',alignItems:'center',gap:'1.2em',marginLeft:'1.2em'}}>
              {user.photoUrl ? (
                <img src={user.photoUrl} alt="Profile" style={{width:24,height:24,borderRadius:'50%',objectFit:'cover',background:'#eee',border:'none',verticalAlign:'middle'}} />
              ) : (
                <span className="nav__login-icon" aria-hidden="true">👤</span>
              )}
              <span className="nav__login-text">{user.name || user.email}</span>
            </NavLink>
          ) : (
            <NavLink to="/login" className="nav__login">
              <span className="nav__login-icon" aria-hidden="true">👤</span>
              <span className="nav__login-text">Login</span>
            </NavLink>
          )}
          <NavLink className="nav__link" to="/offers">Offers</NavLink>
          <NavLink className="nav__cart" to="/cart">🛒 Cart</NavLink>
        </nav>
      </div>

  <div className={`nav__categories${menuOpen ? ' nav__categories--open' : ''}`} role="menubar" aria-label="Main categories">
        <div className="nav__cat" role="none">
          <NavLink to="/electronics" className="nav__category" role="menuitem" aria-haspopup="true" aria-expanded="false" onClick={() => setMenuOpen(false)}>Electronics</NavLink>
          <div className="nav__mega" role="menu">
            <NavLink to="/mobile" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Mobiles</NavLink>
            <NavLink to="/laptops" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Laptops</NavLink>
            <NavLink to="/electronics" className="nav__mega-link" onClick={() => setMenuOpen(false)}>All Electronics</NavLink>
          </div>
        </div>
        <div className="nav__cat" role="none">
          <NavLink to="/tvs-appliances" className="nav__category" role="menuitem" aria-haspopup="true" aria-expanded="false" onClick={() => setMenuOpen(false)}>TVs & Appliances</NavLink>
          <div className="nav__mega" role="menu">
            <NavLink to="/tvs-appliances" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Televisions</NavLink>
            <NavLink to="/appliances" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Home Appliances</NavLink>
          </div>
        </div>
        <div className="nav__cat" role="none">
          <NavLink to="/men" className="nav__category" role="menuitem" aria-haspopup="true" aria-expanded="false" onClick={() => setMenuOpen(false)}>Men</NavLink>
          <div className="nav__mega" role="menu">
            <NavLink to="/fashion" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Clothing</NavLink>
            <NavLink to="/men" className="nav__mega-link" onClick={() => setMenuOpen(false)}>All Men</NavLink>
          </div>
        </div>
        <div className="nav__cat" role="none">
          <NavLink to="/women" className="nav__category" role="menuitem" aria-haspopup="true" aria-expanded="false" onClick={() => setMenuOpen(false)}>Women</NavLink>
          <div className="nav__mega" role="menu">
            <NavLink to="/fashion" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Clothing</NavLink>
            <NavLink to="/women" className="nav__mega-link" onClick={() => setMenuOpen(false)}>All Women</NavLink>
          </div>
        </div>
        <div className="nav__cat" role="none">
          <NavLink to="/kids" className="nav__category" role="menuitem" aria-haspopup="true" aria-expanded="false" onClick={() => setMenuOpen(false)}>Baby & Kids</NavLink>
          <div className="nav__mega" role="menu">
            <NavLink to="/kids" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Kids Wear</NavLink>
            <NavLink to="/toys" className="nav__mega-link" onClick={(e)=>e.preventDefault()} onClickCapture={() => setMenuOpen(false)}>Toys (coming)</NavLink>
          </div>
        </div>
        <div className="nav__cat" role="none">
          <NavLink to="/home-furniture" className="nav__category" role="menuitem" aria-haspopup="true" aria-expanded="false" onClick={() => setMenuOpen(false)}>Home & Furniture</NavLink>
          <div className="nav__mega" role="menu">
            <NavLink to="/home-furniture" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Furniture</NavLink>
            <NavLink to="/home-furniture" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Home Decor</NavLink>
          </div>
        </div>
        <div className="nav__cat" role="none">
          <NavLink to="/sports" className="nav__category" role="menuitem" aria-haspopup="true" aria-expanded="false" onClick={() => setMenuOpen(false)}>Sports</NavLink>
          <div className="nav__mega" role="menu">
            <NavLink to="/sports" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Sports Gear</NavLink>
            <NavLink to="/travel" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Travel</NavLink>
          </div>
        </div>
        <div className="nav__cat" role="none">
          <NavLink to="/books" className="nav__category" role="menuitem" aria-haspopup="true" aria-expanded="false" onClick={() => setMenuOpen(false)}>Books</NavLink>
          <div className="nav__mega" role="menu">
            <NavLink to="/books" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Bestsellers</NavLink>
            <NavLink to="/support" className="nav__mega-link" onClick={() => setMenuOpen(false)}>Customer Support</NavLink>
          </div>
        </div>
        <div className="nav__cat" role="none">
          <NavLink to="/seller" className="nav__category" role="menuitem" onClick={() => setMenuOpen(false)}>Become a Seller</NavLink>
        </div>
        <div className="nav__cat nav__more" role="none" tabIndex="0">
          <span className="nav__category" role="menuitem" aria-haspopup="true" aria-expanded="false">More ▾</span>
          <div className="nav__more-menu" role="menu">
            <NavLink to="/offers" className="nav__more-item" onClick={() => setMenuOpen(false)}>Offers</NavLink>
            <NavLink to="/support" className="nav__more-item" onClick={() => setMenuOpen(false)}>Customer Care</NavLink>
            {typeof window !== 'undefined' && (()=>{ try { const u = JSON.parse(localStorage.getItem('auth-user')||'null'); return u && u.role==='admin' } catch { return false } })() ? (
              <NavLink to="/admin" className="nav__more-item" onClick={() => setMenuOpen(false)}>Admin</NavLink>
            ) : null}
            <a href="#" className="nav__more-item" onClick={(e)=>{e.preventDefault();setMenuOpen(false);}}>Download App</a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar


