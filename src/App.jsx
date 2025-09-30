import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FlipkartLoginPopup from './components/FlipkartLoginPopup.jsx'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Home from './pages/Home.jsx'
import Electronics from './pages/Electronics.jsx'
import TVsAppliances from './pages/TVsAppliances.jsx'
import Men from './pages/Men.jsx'
import Women from './pages/Women.jsx'
import Kids from './pages/Kids.jsx'
import HomeFurniture from './pages/HomeFurniture.jsx'
import Sports from './pages/Sports.jsx'
import Books from './pages/Books.jsx'
import Flights from './pages/Flights.jsx'
import Grocery from './pages/Grocery.jsx'
import Fashion from './pages/Fashion.jsx'
import Beauty from './pages/Beauty.jsx'
import Mobile from './pages/Mobile.jsx'
import Laptops from './pages/Laptops.jsx'
import Appliances from './pages/Appliances.jsx'
import Travel from './pages/Travel.jsx'
import Offers from './pages/Offers.jsx'
import Support from './pages/Support.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import Overview from './pages/admin/Overview.jsx'
import ProductsAdmin from './pages/admin/Products.jsx'
import OrdersAdmin from './pages/admin/Orders.jsx'
import UsersAdmin from './pages/admin/Users.jsx'
import SettingsAdmin from './pages/admin/Settings.jsx'
import UserDetailAdmin from './pages/admin/UserDetail.jsx'
import ProductDetail from './pages/ProductDetail.jsx'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [showLoginPopup, setShowLoginPopup] = useState(false)

  useEffect(() => {
    // Don't show on login/register page
    if (location.pathname === '/login' || location.pathname === '/register') {
      setShowLoginPopup(false)
      return
    }
    // Only show if not logged in
    let timer = null
    try {
      const u = JSON.parse(localStorage.getItem('auth-user') || 'null')
      if (!u) {
        timer = setTimeout(() => setShowLoginPopup(true), 5000)
      } else {
        setShowLoginPopup(false)
      }
    } catch {
      timer = setTimeout(() => setShowLoginPopup(true), 5000)
    }
    return () => timer && clearTimeout(timer)
  }, [location.pathname])

  return (
    <CartProvider>
      <Navbar />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/tvs-appliances" element={<TVsAppliances />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/home-furniture" element={<HomeFurniture />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/books" element={<Books />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/appliances" element={<Appliances />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<AdminProfileRedirectOrProfile />} />
          <Route path="/admin" element={<AdminGate><AdminLayout /></AdminGate>}>
            <Route index element={<Overview />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="orders" element={<OrdersAdmin />} />
            <Route path="users" element={<UsersAdmin />} />
            <Route path="users/:email" element={<UserDetailAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <FlipkartLoginPopup open={showLoginPopup}>
          <button
            type="button"
            aria-label="Close popup"
            onClick={()=>setShowLoginPopup(false)}
            style={{
              position:'absolute',
              top:18,
              right:18,
              background:'none',
              border:'none',
              outline:'none',
              boxShadow:'none',
              fontSize:'1.7em',
              color:'#888',
              cursor:'pointer',
              zIndex:10001
            }}
          >×</button>
          <form style={{width:'100%'}} onSubmit={e => {e.preventDefault(); window.location.href='/login';}}>
            <input
              type="text"
              placeholder="Enter Email/Mobile number"
              style={{
                width: '100%',
                fontSize: '1.1em',
                padding: '0.9em 0.5em',
                marginBottom: 18,
                border: 'none',
                borderBottom: '1.5px solid #d0d0d0',
                outline: 'none',
                background: 'transparent',
                color: '#222',
                fontWeight: 500
              }}
            />
            <div style={{fontSize:13, color:'#888', marginBottom:18}}>
              By continuing, you agree to ShopKart's <a href="#" style={{color:'#2874f0'}}>Terms of Use</a> and <a href="#" style={{color:'#2874f0'}}>Privacy Policy</a>.
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                background: '#ff6600',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.1em',
                border: 'none',
                borderRadius: 3,
                padding: '0.95em 0',
                marginBottom: 32,
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0001'
              }}
            >
              Request OTP
            </button>
            <div style={{textAlign:'center',fontSize:15}}>
              <span style={{color:'#212121'}}>New to ShopKart?</span> <a href="/register" style={{color:'#2874f0',fontWeight:500,textDecoration:'none'}}>Create an account</a>
            </div>
          </form>
        </FlipkartLoginPopup>
      </main>
      {isHome ? <Footer /> : null}
    </CartProvider>
  )
}

function AdminGate({ children }){
  let ok = false
  try {
    const raw = localStorage.getItem('auth-user')
    if (raw) {
      const user = JSON.parse(raw)
      ok = user && user.role === 'admin'
    }
  } catch {}
  if (!ok) return <div className="hero">Access denied. Please login with admin credentials to view the dashboard.</div>
  return children
}



// Helper component: If admin, redirect to /admin, else show Profile
function AdminProfileRedirectOrProfile() {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const raw = localStorage.getItem('auth-user');
      if (raw) {
        const user = JSON.parse(raw);
        if (user && user.role === 'admin') {
          navigate('/admin', { replace: true });
        }
      }
    } catch {}
  }, [navigate]);
  // If not admin, show normal profile
  try {
    const raw = localStorage.getItem('auth-user');
    if (raw) {
      const user = JSON.parse(raw);
      if (user && user.role === 'admin') {
        return null;
      }
    }
  } catch {}
  return <Profile />;
}

export default App
