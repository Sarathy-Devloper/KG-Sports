// src/components/ProfileButton.js
import { useState, useEffect } from 'react';
import "../pages/Register.css";
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS bundle is imported for dropdown
import defaultProfilePic from '../assets/profilepicture.jpg'; // You'll need a default image

const ProfileButton = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // This effect runs once on component mount to load user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage or your global state
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    // Redirect to login or home page
    navigate('/register'); // Or wherever your login page is
  };

  // If user is null, we can render nothing or a placeholder.
  // This prevents accessing properties of null.
  if (!user) {
    // You could render a login/register link here instead,
    // or simply return null to hide the button until user data is loaded.
    return (
      <Link to="/register" className="btn btn-primary login-button d-none">Sign In</Link> // Example: Render a login button
    );
  }

  return (
    <div className="dropdown">
      <button
        className="btn btn-link nav-link dropdown-toggle d-flex align-items-center p-0"
        type="button"
        id="profileDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ textDecoration: 'none', color: 'white', border: 'none', background: 'none', marginTop:'10px' }}
      >
        <img
          src={user.photo || defaultProfilePic} // Use user.photo if available, else default
          alt="Profile"
          className="rounded-circle me-2"
          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
        />
        <span className="d-none d-lg-block text-light fw-bold">
          {user.username || (user.email ? user.email.split('@')[0] : 'Guest')} {/* Display username or part of email, with a fallback */}
        </span>
      </button>
      <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="profileDropdown">
        <li>
          <Link className="dropdown-item text-light" to="/profile">
            <i className="bi bi-person-circle me-2"></i> Profile
          </Link>
          <Link className="dropdown-item text-light" to="/my-bookings">
            <i className="bi bi-person-circle me-2"></i>My Bookings
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider bg-secondary" />
        </li>
        <li>
          <button className="dropdown-item text-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileButton;