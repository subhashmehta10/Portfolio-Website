import React from 'react';

const popupStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999
};

const containerStyle = {
  display: 'flex',
  width: 600,
  minHeight: 400,
  background: '#fff',
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0,0,0,0.18)'
};

const leftStyle = {
  background: '#2874f0',
  color: '#fff',
  width: 240,
  padding: '40px 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
};

const rightStyle = {
  flex: 1,
  background: '#fff',
  padding: '40px 32px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const imgStyle = {
  width: 120,
  marginTop: 40,
};

export default function FlipkartLoginPopup({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div style={popupStyle}>
      <div style={containerStyle}>
        <div style={leftStyle}>
          <h2 style={{fontWeight:600, fontSize:28, marginBottom:16}}>Login</h2>
          <div style={{fontSize:16, marginBottom:32, opacity:0.9}}>
            Get access to your Orders,<br/> Wishlist and Recommendations
          </div>
          <img src="https://img.icons8.com/fluency/120/000000/laptop.png" alt="login" style={imgStyle} />
        </div>
        <div style={rightStyle}>
          {children}
        </div>
      </div>
    </div>
  );
}
