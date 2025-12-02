import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiHome, FiSettings, FiHelpCircle, FiUsers, FiCreditCard, FiMail, FiBell, FiPhone, FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import './ProfilePage.css'; // Make sure to create this CSS file
import logo from '../assets/logo.png';
import Flag from '../assets/Flag.png';
import profilePicture from '../assets/profilePicture.jpg';

const ProfilePage = () => {

  const navVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigateToHome = () => {
    window.location.href = '/dashboard';
  }

  return (
    <div className="profile-page-container">
      <motion.div
        className="sidebar"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="logo-section">
          <img src={logo} onClick={navigateToHome()} style={{ height: '50px', width: '50px', borderRadius: '8px' }} alt="Logo" />
          <span className="logo-text" style={{ fontWeight: '1000px' }}>Profile</span>
        </div>
        <nav className="main-nav">
          <motion.div whileHover={{ scale: 1.05 }} className="nav-item active">
            <FiHome /> Home <span className="notification-badge">10</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="nav-item">
            <FiCreditCard /> Subscription
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="nav-item">
            <FiSettings /> Settings
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="nav-item">
            <FiHelpCircle /> Help & Support
          </motion.div>
        </nav>
        <motion.div whileHover={{ scale: 1.05 }} className="go-pro-sidebar">
          <FaCrown /> Go Pro
        </motion.div>
        <div className="user-info">
          <img src="https://i.ibb.co/L8r4J1F/images.png" alt="User Avatar" />
          <div className="user-details">
            <span className="user-name">Username</span>
            <span className="user-status">Admin</span>
          </div>
          <FiSettings />
        </div>
      </motion.div>

      <motion.div
        className="main-content"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="content-area">
          <div className="settings-header">
            <h2>Settings</h2>
            <div className="search-settings">
              <input type="text" placeholder="Search settings..." />
              <FiSearch />
            </div>
          </div>

          <motion.div className="account-settings" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
            <h3>Your Profile</h3>
            <p className="subtitle">Please update your profile settings here</p>

            <div className="setting-item">
              <label>Username</label>
              <div className="input-group">
                <input type="text" placeholder='eg. John Doe' />
                <FiEdit />
              </div>
            </div>

            <div className="setting-item">
              <label>Phone Number</label>
              <div className="input-group">
                <img src={Flag} alt="Flag" className="flag-icon" />
                <select>
                  <option>+91</option>
                </select>
                <input type="number" />
              </div>
            </div>

            <div className="setting-item">
              <label>Profile Picture</label>
              <div className="profile-picture-upload">
                <img src={profilePicture} alt="Profile" className="current-profile-pic" />
                <div className="profile-picture-actions">
                  <label htmlFor="profile-pic-input" className="edit-button">
                    <FiEdit /> Edit
                    <input id="profile-pic-input" type="file" accept="image/*" onChange={handleProfilePictureChange} style={{ display: 'none' }} />
                  </label>
                  <motion.button whileHover={{ scale: 1.05 }} className="delete-button">
                    <FiTrash2 /> Delete
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="setting-item notifications-section">
              <label>Notifications</label>
              <div className="notification-option">
                <FiMail />
                <span>Email Notification</span>
                <p>You will be notified when a new email arrives.</p>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="notification-option">
                <FiBell />
                <span>Sound Notification</span>
                <p>You will be notified with sound when someone messages you.</p>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="profile-actions">
              <div
                className="tooltip-container"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <FiHelpCircle />
              </div>
              <motion.button whileHover={{ scale: 1.05 }} className="go-pro-button">
                Go Pro <FaCrown />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;