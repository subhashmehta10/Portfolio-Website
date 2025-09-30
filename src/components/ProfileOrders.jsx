import React from 'react';
import { FaBox } from 'react-icons/fa';

export default function ProfileOrders() {
  // You can later fetch/display real orders here
  return (
    <div className="profile__card">
      <h3><FaBox style={{marginRight:8}}/> Orders</h3>
      <div className="hero">You have no recent orders.</div>
    </div>
  );
}
