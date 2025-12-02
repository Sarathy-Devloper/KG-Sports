import { useState } from "react";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../pages/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../pages/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Moved outside for reusability, now accepts navigate as an argument
const signInWithGoogle = async (navigate) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken();

    const response = await axios.post("http://localhost:5000/api/users/google-login", {
      name: user.displayName,
      email: user.email,
      googleId: user.uid,
      photo: user.photoURL,
      token: idToken,
    });

    console.log("Backend response for Google login:", response.data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user object

      // *** Role-based redirection for Google Login ***
      const userRole = response.data.user.role;
      if (userRole === "turf_owner") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    }

  } catch (error) {
    console.error("Error signing in with Google: ", error.message);
    // Optionally display an error message to the user
  }
};

const RegisterPage = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Password visibility states
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Sign Up form state
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "user", // Default role
  });
  const [signUpErrors, setSignUpErrors] = useState({});

  // Sign In form state
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [signInErrors, setSignInErrors] = useState({}); // Corrected line

  const API_BASE_URL = "http://localhost:5000/api/users"; // Backend URL

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateSignUp = () => {
    const errors = {};
    if (!signUpData.name.trim()) errors.name = "Name is required";
    if (!signUpData.email.trim()) errors.email = "Email is required";
    else if (!validateEmail(signUpData.email)) errors.email = "Email is invalid";
    if (!signUpData.password) errors.password = "Password is required";
    else if (signUpData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (!signUpData.mobile.trim()) errors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(signUpData.mobile))
      errors.mobile = "Mobile number must be 10 digits";

    setSignUpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignIn = () => {
    const errors = {};
    if (!signInData.email.trim()) errors.email = "Email is required";
    else if (!validateEmail(signInData.email)) errors.email = "Email is invalid";
    if (!signInData.password) errors.password = "Password is required";

    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const toggleSignUpPasswordVisibility = () => {
    setShowSignUpPassword(!showSignUpPassword);
  };

  const toggleSignInPasswordVisibility = () => {
    setShowSignInPassword(!showSignInPassword);
  };

  const handleSignUpSubmit = async () => {
    if (validateSignUp()) {
      setLoading(true);
      setMessage(""); // Clear previous messages
      try {
        const response = await axios.post(`${API_BASE_URL}/register`, signUpData);
        setMessage(response.data.message || "Registration successful!");
        setSignUpData({ name: "", email: "", password: "", mobile: "", role: "user" }); // Clear form
        setIsRightPanelActive(false); // Switch to sign-in for login
      } catch (error) {
        setMessage(error.response?.data?.message || "Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignInSubmit = async () => {
    if (validateSignIn()) {
      setLoading(true);
      setMessage(""); // Clear previous messages
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, signInData);
        setMessage(response.data.message || "Login successful!");
        // Store token/user info (e.g., in localStorage or context)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user object

        // *** Role-based redirection after successful regular login ***
        const userRole = response.data.user.role;
        if (userRole === "turf_owner") {
          navigate("/admin-dashboard"); // Redirect to admin dashboard
        } else {
          navigate("/dashboard"); // Redirect to regular user dashboard
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "Login failed. Invalid credentials.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`register-container`}>
      <motion.div
        className={`auth-container ${isRightPanelActive ? "auth-right-panel-active" : ""}`}
        id="container"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        {/* Sign Up */}
        <div className="auth-form-container auth-sign-up-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignUpSubmit();
            }}
            noValidate
          >
            <h1>Sign Up</h1>
            <input
              className="input-signIn"
              type="text"
              name="name"
              placeholder="Name"
              value={signUpData.name}
              onChange={handleSignUpChange}
            />
            {signUpErrors.name && <p className="error-text">{signUpErrors.name}</p>}

            <input
              className="input-signIn"
              type="email"
              name="email"
              placeholder="Email"
              value={signUpData.email}
              onChange={handleSignUpChange}
            />
            {signUpErrors.email && <p className="error-text">{signUpErrors.email}</p>}

            {/* Password field with visibility toggle for Sign Up */}
            <div className="password-input-container">
              <input
                className="input-signIn"
                type={showSignUpPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={signUpData.password}
                onChange={handleSignUpChange}
              />
              <span
                className="password-toggle-icon"
                onClick={toggleSignUpPasswordVisibility}
              >
                <i className={`fas ${showSignUpPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
            {signUpErrors.password && <p className="error-text">{signUpErrors.password}</p>}

            <input
              className="input-signIn"
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={signUpData.mobile}
              onChange={handleSignUpChange}
              maxLength={10}
            />
            {signUpErrors.mobile && <p className="error-text">{signUpErrors.mobile}</p>}

            <select
              name="role"
              className="input-signIn"
              id="role"
              value={signUpData.role}
              onChange={handleSignUpChange}
            >
              <option value="user">I'm a User</option>
              <option value="turf_owner">I'm a Turf Owner</option>
            </select>
            <br />

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Sign Up"}
            </button>
            {message && <p className="api-message">{message}</p>}
          </form>
        </div>

        {/* Sign In */}
        <div className="auth-form-container auth-sign-in-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignInSubmit();
            }}
            noValidate
          >
            <h1>Sign in</h1>
            <div className="auth-social-container">
              <a href="#" className="auth-social" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="auth-social" onClick={() => signInWithGoogle(navigate)} aria-label="Google Plus">
                <i className="fab fa-google-plus-g" ></i>
              </a>
              <a href="#" className="auth-social" aria-label="apple">
                <i className="fa-brands fa-apple"></i>
              </a>
            </div>
            <span>or use your account</span>

            <input
              type="email"
              name="email"
              placeholder="Email or Username"
              value={signInData.email}
              onChange={handleSignInChange}
              className="input-signIn"
            />
            {signInErrors.email && <p className="error-text">{signInErrors.email}</p>}

            {/* Password field with visibility toggle for Sign In */}
            <div className="password-input-container">
              <input
                type={showSignInPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={signInData.password}
                onChange={handleSignInChange}
                className="input-signIn"
              />
              <span
                className="password-toggle-icon"
                onClick={toggleSignInPasswordVisibility}
              >
                <i className={`fas ${showSignInPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </span>
            </div>
            {signInErrors.password && <p className="error-text">{signInErrors.password}</p>}

            <a href="#">Forgot your password?</a><br />
            <br />
            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
            {message && <p className="api-message">{message}</p>}
          </form>
        </div>

        {/* Overlay */}
        <div className="auth-overlay-container">
          <div className="auth-overlay">
            <div className="auth-overlay-panel auth-overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button
                className="auth-button-ghost"
                id="signIn"
                onClick={() => {
                  setIsRightPanelActive(false);
                  setMessage("");
                  setSignInErrors({});
                }}
              >
                Sign In
              </button>
            </div>
            <div className="auth-overlay-panel auth-overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="auth-button-ghost"
                id="signUp"
                onClick={() => {
                  setIsRightPanelActive(true);
                  setMessage("");
                  setSignUpErrors({});
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;