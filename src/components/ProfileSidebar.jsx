import React from 'react';
import { FaUser, FaCog, FaFileAlt, FaBox } from 'react-icons/fa';

export default function ProfileSidebar({ section, setSection }) {
  return (
    <aside className="profile-sidebar">
      <nav>
        <ul>
          <li className={section === 'profile' ? 'active' : ''} onClick={() => setSection('profile')}>
            <FaUser style={{marginRight:8}}/> My Profile
          </li>
          <li className={section === 'orders' ? 'active' : ''} onClick={() => setSection('orders')}>
            <FaBox style={{marginRight:8}}/> Orders
          </li>
          <li className={section === 'settings' ? 'active' : ''} onClick={() => setSection('settings')}>
            <FaCog style={{marginRight:8}}/> Settings
          </li>
          <li className={section === 'policy' ? 'active' : ''} onClick={() => setSection('policy')}>
            <FaFileAlt style={{marginRight:8}}/> Customer Policy
          </li>
        </ul>
      </nav>
    </aside>
  );
}
