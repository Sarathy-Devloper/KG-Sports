import React from 'react';
import { motion } from 'framer-motion';

const Cookie = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const textVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
            <motion.h1
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                style={{ textAlign: "center", color: "#2c3e50", marginBottom: "2rem" }}
            >
                Cookie Policy
            </motion.h1>

            <motion.p
                initial="hidden"
                animate="visible"
                variants={textVariants}
                style={{ fontSize: "0.9rem", color: "#7f8c8d", textAlign: "center", marginBottom: "3rem" }}
            >
                Effective Date: 01/11/2025
            </motion.p>

            <motion.p
                initial="hidden"
                animate="visible"
                variants={textVariants}
                style={{ lineHeight: "1.6", marginBottom: "1.5rem" }}
            >
                At KG Sports, we are committed to providing a smooth and personalized online experience for our users. This Cookie Policy explains how we use cookies and similar technologies on our website to enhance functionality, analyze performance, and improve your browsing experience.
                By continuing to browse or use our website, you agree to our use of cookies as outlined in this policy.
            </motion.p>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                style={{ marginBottom: "2rem" }}
            >
                <motion.h2
                    variants={textVariants}
                    style={{ color: "#34495e", marginBottom: "1rem" }}
                >
                    1. What Are Cookies?
                </motion.h2>
                <motion.p
                    variants={textVariants}
                    style={{ lineHeight: "1.6" }}
                >
                    Cookies are small text files placed on your device (computer, tablet, or smartphone) when you visit a website. These files help websites recognize your device, remember preferences, and improve site performance and usability. Cookies do not collect personal information such as names or contact details unless provided voluntarily by you.
                </motion.p>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                style={{ marginBottom: "2rem" }}
            >
                <motion.h2
                    variants={textVariants}
                    style={{ color: "#34495e", marginBottom: "1rem" }}
                >
                    2. Types of Cookies We Use
                </motion.h2>
                <motion.div variants={textVariants}>
                    <h3 style={{ color: "#34495e", fontSize: "1.1rem", marginBottom: "0.5rem" }}>a. Essential Cookies</h3>
                    <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>
                        These cookies are necessary for the proper functioning of our website. They enable features such as navigation, security, and access to booking forms and user accounts. Without these cookies, certain parts of our site may not function correctly.
                    </p>
                    <h3 style={{ color: "#34495e", fontSize: "1.1rem", marginBottom: "0.5rem" }}>b. Performance and Analytics Cookies</h3>
                    <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>
                        These cookies help us understand how visitors use our website by collecting data on pages visited, time spent, and interactions. The information gathered is anonymized and used only to improve site performance and content relevance.
                    </p>
                    <h3 style={{ color: "#34495e", fontSize: "1.1rem", marginBottom: "0.5rem" }}>c. Functional Cookies</h3>
                    <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>
                        Functional cookies remember user preferences such as location, language, and display settings. This ensures a more personalized and convenient browsing experience when you return to our site.
                    </p>
                    <h3 style={{ color: "#34495e", fontSize: "1.1rem", marginBottom: "0.5rem" }}>d. Third-Party Cookies</h3>
                    <p style={{ lineHeight: "1.6", marginBottom: "1rem" }}>
                        Our website may include embedded content (e.g., videos, analytics tools, or social media integrations) that set cookies managed by third parties. KG Sports does not control these external cookies and encourages users to review the respective policies of third-party providers.
                    </p>
                </motion.div>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                style={{ marginBottom: "2rem" }}
            >
                <motion.h2
                    variants={textVariants}
                    style={{ color: "#34495e", marginBottom: "1rem" }}
                >
                    3. Why We Use Cookies
                </motion.h2>
                <motion.ul variants={textVariants} style={{ listStyleType: "disc", marginLeft: "1.5rem", lineHeight: "1.6" }}>
                    <li>Improve website functionality and user experience.</li>
                    <li>Analyze traffic patterns to enhance content and layout.</li>
                    <li>Remember user preferences and booking selections.</li>
                    <li>Measure the effectiveness of marketing and promotional efforts.</li>
                </motion.ul>
                <motion.p
                    variants={textVariants}
                    style={{ lineHeight: "1.6", marginTop: "1rem" }}
                >
                    All data collected through cookies is used responsibly and securely in compliance with applicable data protection laws.
                </motion.p>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                style={{ marginBottom: "2rem" }}
            >
                <motion.h2
                    variants={textVariants}
                    style={{ color: "#34495e", marginBottom: "1rem" }}
                >
                    4. Managing and Disabling Cookies
                </motion.h2>
                <motion.p
                    variants={textVariants}
                    style={{ lineHeight: "1.6" }}
                >
                    You can manage, disable, or delete cookies through your browser settings at any time. However, please note that restricting cookies may affect the functionality and performance of certain features on our website, including slot booking and login systems.
                    For more detailed instructions, refer to your browser’s help documentation on managing cookies.
                </motion.p>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                style={{ marginBottom: "2rem" }}
            >
                <motion.h2
                    variants={textVariants}
                    style={{ color: "#34495e", marginBottom: "1rem" }}
                >
                    5. Policy Updates
                </motion.h2>
                <motion.p
                    variants={textVariants}
                    style={{ lineHeight: "1.6" }}
                >
                    KG Sports may update this Cookie Policy from time to time to reflect new technologies, legal requirements, or operational needs. Any changes will be posted on this page with an updated “Last Revised” date. Users are encouraged to review this section periodically to stay informed.
                </motion.p>
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                style={{ marginBottom: "2rem" }}
            >
                <motion.h2
                    variants={textVariants}
                    style={{ color: "#34495e", marginBottom: "1rem" }}
                >
                    6. Contact Information
                </motion.h2>
                <motion.p variants={textVariants} style={{ lineHeight: "1.6" }}>
                    If you have any questions or concerns about our Cookie Policy or how cookies are used on our website, please contact us at:
                </motion.p>
                <motion.ul variants={textVariants} style={{ listStyleType: "none", paddingLeft: "0", lineHeight: "1.8", marginTop: "1rem" }}>
                    <li>📧 Email: <a href="mailto:info@kgsports.in" style={{ color: "#3498db", textDecoration: "none" }}>info@kgsports.in</a></li>
                    <li>📞 Phone: <a href="tel:7598959595" style={{ color: "#3498db", textDecoration: "none" }}>7598959595</a></li>
                    <li>🏢 Address:</li>
                    <li style={{ marginLeft: "1rem" }}>No.149/1, Ground Floor, Elango Street,</li>
                    <li style={{ marginLeft: "1rem" }}>Tiruvalleeswarar Nagar,</li>
                    <li style={{ marginLeft: "1rem" }}>Anna Nagar West,</li>
                    <li style={{ marginLeft: "1rem" }}>Chennai - 600040, Tamil Nadu, India</li>
                </motion.ul>
            </motion.div>

            <motion.p
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                style={{ textAlign: "center", marginTop: "3rem", fontSize: "0.9rem", color: "#7f8c8d" }}
            >
                KG Sports is dedicated to ensuring transparency and user control over data and browsing preferences, offering a safe and personalized online experience for everyone.
            </motion.p>
        </div>
    );
}

export default Cookie;