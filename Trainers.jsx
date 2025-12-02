import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from 'react-simple-typewriter';

import HeroBanner from '../assets/trainers-banner.jpg';
import logo from '../assets/logo.png';
import ProfileButton from '../components/ProfileButton';


const Trainers = () => {
  const sports = [
    { name: "Football", image: "https://img.freepik.com/free-photo/football-trainer-teaching-his-pupils_23-2149707992.jpg", color: "#0f2d10" },
    { name: "Badminton", image: "https://images.pexels.com/photos/8007421/pexels-photo-8007421.jpeg?_gl=1*159rho9*_ga*MzE2NjE3NDY4LjE3NTgyNjk1Njg.*_ga_8JE65Q40S6*czE3NTg4ODI3NTIkbzIkZzEkdDE3NTg4ODI3NTQkajU4JGwwJGgw", color: "#0f2d10" },
    { name: "Cricket", image: "https://img.freepik.com/free-photo/cricketer-field-action_53876-63345.jpg", color: "#0f2d10" },
    { name: "Pickleball", image: "https://media.istockphoto.com/id/2023551013/photo/woman-serving-pickleball-game.jpg?s=612x612&w=0&k=20&c=UkQUvUc6wXuWVWcbHK5HyjElB5KEtyi6iLl-WgEkoHs=", color: "#0f2d10" },
    { name: "Swimming", image: "https://media.istockphoto.com/id/1167733673/photo/female-coach-in-water-giving-group-of-children-swimming-lesson-in-indoor-pool.jpg?s=612x612&w=0&k=20&c=NC9SY321Q4PwuVNDjVI7Z_2sO46hxfXXCQBXxWkgEow=", color: "#0f2d10" },
    { name: "Squash", image: "https://img.freepik.com/premium-photo/closeup-view-squash-game-training-equipment_266732-35304.jpg?semt=ais_hybrid&w=740&q=80", color: "#0f2d10" },
  ];

    const [text] = useTypewriter({
    words: ['Trainers'], // The word you want to type
    loop: 0, // Loop once, or set to 0 for infinite loop
    typeSpeed: 100, // Speed of typing
    deleteSpeed: 100, // Speed of deleting
    delaySpeed: 1000, // Delay before deleting
  });

  return (
    <div className="bg-light min-vh-100 d-grid gap-4">

      {/* ======= Navbar ======= */}
      <motion.nav
        id="navbar"
        className="navbar navbar-expand-lg navbar-light bg-transparent position-absolute w-100 top-0 start-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        style={{ zIndex: 100 }}
      >
        <div className="container" style={{ alignItems: "start" }}>
          <a className="navbar-brand fw-bold text-success" href="/dashboard">
            <img
              className="main-logo"
              src={logo}
              style={{ height: "100px", marginTop: "-15px" }}
              alt="logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button btn-bg-light"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mt-0 me-1">
              <li className="nav-item">
                <Link className="nav-link text-light fw-bold" to={"/dashboard"}  style={{textDecoration:'none'}}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-bold" to={"/aboutUs"} style={{textDecoration:'none'}}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-bolder" to={"/sports"}  style={{textDecoration:'none'}} >
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-bolder" to={"/trainers"}  style={{textDecoration:'none'}} >
                  Trainers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-light fw-bolder"
                  style={{ letterSpacing: "1px", textDecoration:'none' }}
                  to={"/tournaments"}
                >
                  Tournaments
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light fw-bolder" to={"/news"}  style={{textDecoration:'none'}} >
                  News
                </Link>
              </li>
            </ul>
            <div className="d-flex ms-auto gap-3">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto mt-0 gap-3 me-1 ">
                  <li className="nav-item dropdown">
                    {" "}
                    {/* Added dropdown class here */}
                    {<Link
                      className="text-light fw-bolder btn btn-success" // Added dropdown-toggle
                      style={{borderRadius:'25px', padding:'8px', textDecoration:'none'}}
                      to={"/turfs"}
                      role="button"
                      aria-expanded="false"
                    >
                      Book a Turf
                    </Link>}
                  </li>
                </ul>
              </div>
              <ProfileButton />
            </div>
          </div>
        </div>
      </motion.nav>
    
          {/* ======= Hero Banner ======= */}
          <section
            className="text-center text-white position-relative"
            style={{
              backgroundImage: `url(${HeroBanner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 15px",
            }}
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
               
                <h1 className="display-1 fw-bold mb-3 trainers_h1  text-white" style={{marginTop: '200px'}}>
                  {text}
                  <span className="text-light">
                    <Cursor cursorStyle='|' /> {/* Optional: add a blinking cursor */}
                  </span>
                </h1>
    
                {/* Search Bar */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="row justify-content-center gap-2 align-items-center"
                  style={{ maxWidth: 900, margin: "0 auto" }}
                  onSubmit={(e) => e.preventDefault()}
                  aria-label="Search turfs form"
                >
                </motion.form>
              </motion.div>
            </div>
          </section>

      <Splide
        options={{
          perPage: 5,
          perMove: 1,
          gap: "1rem",
          pagination: false,
          arrows: true,
          drag: "free",
          breakpoints: {
            1024: { perPage: 2 },
            640: { perPage: 1 },
          },
        }}
      >
        {sports.map((sport, index) => (
          <SplideSlide key={index}>
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                textAlign: "center",
                padding: "20px",
                background: sport.color,
                color: "#fff",
              }}
            >
              <img
                src={sport.image}
                alt={sport.name}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px" }}
              />
              <h3 style={{ marginTop: "10px" }}>{sport.name}</h3>
            </div>
          </SplideSlide>
        ))}
      </Splide>
      <hr />

      {/* ======= Footer ======= */}
      <footer style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#004204ff", color: "white" }}>
        {/* Newsletter Section */}
        <div
          style={{
            backgroundColor: "#017628", // Darker blue for newsletter section
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div style={{ textAlign: "left", maxWidth: "400px" }}>
            <h3 style={{ fontWeight: "600", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
              Stay Connected With Our Newsletter
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
              Subscribe to our newsletter to get more news
            </p>
          </div>
          <form
            style={{
              display: "flex",
              maxWidth: "400px",
              width: "100%",
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter email address"
              style={{
                flex: 1,
                padding: "10px 6px",
                fontSize: "1rem",
                border: "none",
                borderRadius: "4px 0 0 4px",
                outline: "none",
                backgroundColor: "#fff",
                color: "#333",
              }}
              required
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#18cc00ff", // Blue subscribe button
                color: "white",
                border: "none",
                borderRadius: "0 4px 4px 0",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#165e28ff")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#18cc00ff")}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "15px auto",
            padding: "0 1rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            textAlign: "left",
          }}
        >
          {/* HomePro Section */}
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "0.5rem" }}
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>KG Sports</span>
            </div>
            <p style={{ fontSize: "14px", lineHeight: "1.5", color: "#ccc" }}>
              KG Sports is more than a name, It’s a movement that inspires energy, balance, and growth. We believe in creating a lifestyle built around wellness and togetherness. Every day is a new chance to move forward, stay positive, and feel alive. © KG Sports — Energize Your Everyday.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Sports</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="/dashboard" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Cricket</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Football</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Volleyball</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Badminton</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Pickleball</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Throwball</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Menus</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="/aboutUs" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>About Us</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/sports" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Sports</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/trainers" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Trainers</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/tournaments" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Tournaments</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/contact" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Legal Menus</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="/terms&conditions" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Terms & Conditions</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/privacy" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Privacy Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/refund" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Refund & Cancellation Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/disclaimer" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Disclaimer Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="copyrights" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Copyright Policy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/cookie" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Others</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Yoga</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Zumba</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Bharatanatyam</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Karate</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Silambam</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright and Social Icons at the very bottom */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            padding: "1.5rem 1rem",
            textAlign: "center",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <p style={{ fontSize: "0.9rem", color: "#ccc", margin: 0 }}>
            Copyright © 2025 All Rights reserved by <span className="fw-bold" style={{ cursor: 'pointer' }}>KG Sports.com</span>  Designed & Developed by <span style={{ cursor: 'pointer' }} href="https://hellointech.com/" className="fw-bolder"><a style={{ color: 'white' }} target="_blank" href="https://hellointech.com/">Hellointech.com</a> </span>
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="https://kalsungroups.com/" target="_blank" aria-label="Facebook" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.instagram.com/kalsun_groups/" target="_blank" aria-label="Instagram" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://www.instagram.com/kalsun_groups/" target="_blank" aria-label="Youtube" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-youtube"></i>
            </a>
            <a href="https://www.linkedin.com/company/kalsun-groups/posts/?feedView=all" target="_blank" aria-label="LinkedIn" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://kalsungroups.com/" target="_blank" aria-label="Twitter" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="https://www.instagram.com/kalsun_groups/" target="_blank" aria-label="Whatsapp" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-whatsapp"></i>
            </a>
          </div>
        </div>
      </footer>
      {/* ======= Footer ======= */}
    </div>
  );
};

export default Trainers;