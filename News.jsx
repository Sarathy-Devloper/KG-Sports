import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

import '../App.css';
import HeroBanner from '../assets/news-banner.jpg'
import logo from '../assets/logo.png';
import ProfileButton from '../components/ProfileButton';

// --- NEW DATA STRUCTURE TO MATCH THE IMAGE LAYOUT ---
const newsPageData = {
  mainArticle: {
    id: 1,
    title: 'Chennai Turf Premier League 2025 Concludes with Thrilling Final',
    summary:
      "The much-anticipated Chennai Turf Premier League 2025 concluded at Marina Turf, where Madras Warriors lifted the trophy after a nail-biting super-over against Kovai Strikers. The tournament brought together more than 40 corporate and college teams across Tamil Nadu, showcasing the growing popularity of turf cricket.",
    date: '2025-09-15',
    comments: 214,
    image: 'https://woxsen.edu.in/uploads/a20240613061249.webp',
    author: {
      name: 'Arun Prakash',
      avatar: 'https://i.pravatar.cc/40?u=arun',
    },
  },
  subArticles: [
    {
      id: 2,
      title: 'Salem Opens New Floodlit Turf for Night Cricket',
      date: '2025-09-20',
      comments: 89,
      image:
        'https://images.pexels.com/photos/32801392/pexels-photo-32801392.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    },
    {
      id: 3,
      title: 'Madurai Hosts Inter-District Turf Cricket Tournament',
      date: '2025-09-10',
      comments: 132,
      image:
        'https://images.pexels.com/photos/32801393/pexels-photo-32801393.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    },
  ],
  sidebarArticles: [
    {
      id: 4,
      title: 'Mens Turf Cricket League Launched in Coimbatore',
      date: '2025-09-18',
      comments: 97,
      image:
        'https://images.pexels.com/photos/32801394/pexels-photo-32801394.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
    },
    {
      id: 5,
      title: 'Rising Turf Culture in Tirunelveli',
      summary:
        "From college tournaments to weekend leagues, Tirunelveli is fast emerging as a hotspot for turf cricket. Newly opened synthetic turf grounds have created opportunities for players of all ages to enjoy professional-quality facilities.",
      date: '2025-09-12',
      comments: 65,
      image:
        'https://5.imimg.com/data5/IOS/Default/2021/10/MB/GE/QW/8478850/product-jpeg.png',
      author: {
        name: 'Meena Krishnan',
        avatar: 'https://i.pravatar.cc/40?u=meena',
      },
    },
  ],
};



// --- FRAMER MOTION VARIANTS (from your original code) ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

const NewsBlog = () => {
    const [text] = useTypewriter({
  words: ['News & Updates'], // The word you want to type
  loop: 0, // Loop once, or set to 0 for infinite loop
  typeSpeed: 100, // Speed of typing
  deleteSpeed: 100, // Speed of deleting
  delaySpeed: 1000, // Delay before deleting
});
  return (
    <div className="bg-light min-vh-100">
      
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
                 
                  <h1 className="display-1 fw-bold mb-3  text-white" style={{marginTop: '200px'}}>
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

      {/* --- NEW BODY CONTENT STARTS HERE --- */}
      <main className="container py-5">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <div className="mb-4">
            <h1 className="fw-bold">NEWS Updates</h1>
            <p className="text-muted">24 Sep 2025</p>
          </div>

          <div className="row g-4">
            {/* Main Column */}
            <div className="col-lg-8">
              <motion.div variants={itemVariants}>
                {/* Main Article */}
                <div className="card shadow-sm h-100 news-card">
                  <img src={newsPageData.mainArticle.image} className="card-img-top" alt={newsPageData.mainArticle.title} style={{ height: '350px', objectFit: 'cover' }} />
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex gap-4 text-muted small mb-2">
                      <span><i className="bi bi-calendar3 me-1"></i> {new Date(newsPageData.mainArticle.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span><i className="bi bi-chat-left me-1"></i> {newsPageData.mainArticle.comments} Comments</span>
                    </div>
                    <h3 className="card-title fw-bold">{newsPageData.mainArticle.title}</h3>
                    <p className="card-text text-muted flex-grow-1">{newsPageData.mainArticle.summary}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="d-flex align-items-center">
                        <img src={newsPageData.mainArticle.author.avatar} alt={newsPageData.mainArticle.author.name} className="rounded-circle me-2" width="40" height="40" />
                        <span className="fw-bold">{newsPageData.mainArticle.author.name}</span>
                      </div>
                      <a href="#" className="btn btn-success btn-sm">Read More <i className="bi bi-arrow-right-short"></i></a>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sub Articles Row */}
              <div className="row g-4 mt-1">
                {newsPageData.subArticles.map(article => (
                  <motion.div key={article.id} className="col-md-6" variants={itemVariants}>
                    <div className="card shadow-sm h-100 news-card">
                      <img src={article.image} className="card-img-top" alt={article.title} style={{ height: '200px', objectFit: 'cover' }} />
                      <div className="card-body">
                         <div className="d-flex gap-4 text-muted small mb-2">
                          <span><i className="bi bi-calendar3 me-1"></i> {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span><i className="bi bi-chat-left me-1"></i> {article.comments} Comments</span>
                        </div>
                        <h5 className="card-title fw-bold">{article.title}</h5>
                        <a href="#" className="btn btn-success btn-sm mt-auto">Read More <i className="bi bi-arrow-right-short"></i></a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="col-lg-4 d-flex flex-column gap-4">
              {newsPageData.sidebarArticles.map(article => (
                <motion.div key={article.id} variants={itemVariants}>
                   <div className="card shadow-sm h-100 news-card">
                    <img src={article.image} className="card-img-top" alt={article.title} style={{ height: '180px', objectFit: 'cover' }} />
                    <div className="card-body">
                      <div className="d-flex gap-4 text-muted small mb-2">
                        <span><i className="bi bi-calendar3 me-1"></i> {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span><i className="bi bi-chat-left me-1"></i> {article.comments} Comments</span>
                      </div>
                      <h5 className="card-title fw-bold">{article.title}</h5>
                      {article.summary && <p className="card-text small text-muted">{article.summary}</p>}
                       <div className="d-flex justify-content-between align-items-center mt-3">
                        {article.author ? (
                          <div className="d-flex align-items-center">
                            <img src={article.author.avatar} alt={article.author.name} className="rounded-circle me-2" width="30" height="30" />
                            <small className="fw-bold">{article.author.name}</small>
                          </div>
                        ) : <div></div>}
                        <a href="#" className="btn btn-success btn-sm">Read More <i className="bi bi-arrow-right-short"></i></a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* ======= Footer ======= */}
      <footer style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#004204ff", color: "white" }}>
        {/* Newsletter Section */}
        <div
          style={{
            backgroundColor: "#017628", // Darker blue for newsletter section
            padding: "2.5rem 1rem",
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
            margin: "3rem auto",
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
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "#ccc" }}>
              KG Sports is the No.1 Turf booking app in india
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Services</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="/dashboard" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Turf Booking</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Register Turf</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Admin Access</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Company</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="/turfs" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Book a Turf</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/sports" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Sports</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/trainers" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Trainers</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/tournaments" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Tournaments</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="/contact" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Legal</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Terms</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Privacy</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Cookies</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>License</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Refund Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontWeight: "bold", marginBottom: "1rem", fontSize: "1.1rem" }}>Social</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Twitter</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>LinkedIn</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>Facebook</a></li>
              <li style={{ marginBottom: "0.75rem" }}><a href="#" style={{ textDecoration: "none", color: "#ccc", fontSize: "0.9rem" }}>YouTube</a></li>
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
            ©2025 KG. All rights reserved
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="https://www.linkedin.com/company/kalsun-groups/posts/?feedView=all" target="_blank" aria-label="LinkedIn" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="https://kalsungroups.com/" target="_blank" aria-label="Twitter" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="https://kalsungroups.com/" target="_blank" aria-label="Facebook" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://www.instagram.com/kalsun_groups/" target="_blank" aria-label="Instagram" style={{ color: "#ccc", fontSize: "1.2rem" }}>
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
      {/* ======= Footer ======= */}
    </div>
  );
};

export default NewsBlog;