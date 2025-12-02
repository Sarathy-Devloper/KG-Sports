import React from 'react';
import './privacyPolicy.css'; //Assuming you'll create a CSS file for styling

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <header className="privacy-policy-header">
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date: 01/11/2025</strong></p>
      </header>

      <section className="privacy-policy-intro">
        <p>At KG Sports, we value your privacy and are committed to safeguarding the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you access our website, book services, or interact with us in any manner.</p>
        <p>By using our website or services, you consent to the collection and use of your information as described in this policy.</p>
      </section>

      <section className="privacy-policy-section">
        <h4 className='text-primary'>1. Information We Collect</h4>
        <p>We collect both personal and non-personal data to improve your experience and provide better service. The types of information we may collect include:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, phone number, email address, billing details, and other information provided during registration or booking.</li>
          <li><strong>Usage Data:</strong> Browser type, IP address, device information, and pages visited on our website.</li>
          <li><strong>Cookies and Tracking:</strong> We use cookies and analytics tools to enhance user experience and improve website performance. You may choose to disable cookies through your browser settings; however, some website features may not function properly as a result.</li>
        </ul>
      </section>

      <section className="privacy-policy-section">
        <h2>2. How We Use Your Information</h2>
        <p>KG Sports uses collected data for the following purposes:</p>
        <ul>
          <li>To manage bookings, registrations, and communications.</li>
          <li>To personalize your experience and improve website usability.</li>
          <li>To send important updates, confirmations, or promotional information (only if you’ve opted in).</li>
          <li>To maintain safety, prevent fraud, and comply with legal requirements.</li>
        </ul>
        <p>We do not sell, trade, or rent user information to third parties.</p>
      </section>

      <section className="privacy-policy-section">
        <h2>3. Data Storage and Protection</h2>
        <p>We employ industry-standard measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. All sensitive information is stored securely with restricted access. While we take strong precautions, please note that no online data transmission can be guaranteed as 100% secure.</p>
      </section>

      <section className="privacy-policy-section">
        <h2>4. Sharing of Information</h2>
        <p>Your personal data may be shared only when necessary to:</p>
        <ul>
          <li>Fulfill service requirements (such as payment processing or communication tools).</li>
          <li>Comply with legal obligations or law enforcement requests.</li>
          <li>Protect the rights and safety of KG Sports, its users, or the public.</li>
        </ul>
        <p>All third-party partners are required to handle information in accordance with applicable data protection standards.</p>
      </section>

      <section className="privacy-policy-section">
        <h2>5. Your Rights</h2>
        <p>As a user, you have the right to:</p>
        <ul>
          <li>Access, update, or correct your personal information.</li>
          <li>Withdraw consent for communications at any time.</li>
          <li>Request deletion of your data, subject to legal and operational requirements.</li>
        </ul>
        <p>You can exercise these rights by contacting us through the details provided below.</p>
      </section>

      <section className="privacy-policy-section">
        <h2>6. Retention of Data</h2>
        <p>We retain your personal data only for as long as necessary to fulfill service obligations or legal requirements. Once data is no longer needed, it is securely deleted or anonymized.</p>
      </section>

      <section className="privacy-policy-section">
        <h2>7. Links to Other Websites</h2>
        <p>Our website may contain links to third-party websites for your convenience. KG Sports is not responsible for the content, policies, or practices of these sites. We encourage users to review the privacy policies of any external websites they visit.</p>
      </section>

      <section className="privacy-policy-section">
        <h2>8. Updates to This Policy</h2>
        <p>KG Sports reserves the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page with a revised “Last Updated” date. Continued use of our services after changes indicates your acceptance of the revised policy.</p>
      </section>

      <section className="privacy-policy-section">
        <h2>9. Contact Us</h2>
        <p>If you have any questions or concerns about our Privacy Policy or the handling of your data, please contact us:</p>
        <p>📧 Email: <a href="mailto:info@kgsports.in">info@kgsports.in</a></p>
        <p>📞 Phone: <a href="tel:7598959595">7598959595</a></p>
        <p>🏢 Address:</p>
        <address>
          No.149/1, Ground Floor, Elango Street,<br />
          Tiruvalleeswarar Nagar,<br />
          Anna Nagar West,<br />
          Chennai - 600040, Tamil Nadu, India
        </address>
      </section>
    </div>
  );
}

export default PrivacyPolicy;