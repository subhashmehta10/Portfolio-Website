function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <h4>About</h4>
          <a href="#">Contact</a>
          <a href="#">About</a>
          <a href="#">Careers</a>
        </div>
        <div className="footer__col">
          <h4>Help</h4>
          <a href="#">Payments</a>
          <a href="#">Shipping</a>
          <a href="#">Cancellation</a>
        </div>
        <div className="footer__col">
          <h4>Policy</h4>
          <a href="#">Return Policy</a>
          <a href="#">Terms Of Use</a>
          <a href="#">Security</a>
        </div>
        <div className="footer__col">
          <h4>Social</h4>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">YouTube</a>
        </div>
      </div>
      <div className="footer__bar">© {new Date().getFullYear()} ShopKart</div>
    </footer>
  )
}

export default Footer


