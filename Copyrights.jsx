import React from 'react';

const Copyrights = () => {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        animation: "fadeIn 1s ease-out forwards" /* Added animation */
      }}
    >
      {/* CSS for the fade-in animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <h1>Copyright Policy</h1>
      <p>Effective Date: 01/11/2025</p>
      <p>
        At KG Sports, we value and respect intellectual property rights and are committed to protecting the original content, creative materials, and resources published on our website. This Copyright Policy outlines how the materials on this platform are owned, protected, and permitted for use, ensuring transparency and fair use for all visitors.
      </p>

      <h3>1. Ownership of Content</h3>
      <p>
        All materials published on the KG Sports website — including but not limited to text, images, graphics, videos, logos, icons, and digital downloads — are the exclusive property of KG Sports, unless otherwise stated. These materials are protected under applicable copyright laws, intellectual property regulations, and international treaties. Unauthorized use, reproduction, or distribution of any content without prior written consent from KG Sports is strictly prohibited.
      </p>

      <h2>2. Permitted Use</h2>
      <p>
        Visitors and users of the KG Sports website are permitted to view, share, and print content solely for personal, non-commercial use. However, such usage must not:
      </p>
      <ul>
        <li>Alter, modify, or distort the content in any form.</li>
        <li>Misrepresent ownership, authorship, or affiliation with KG Sports.</li>
        <li>Use any content for resale, replication, or redistribution purposes.</li>
      </ul>
      <p>
        For educational, promotional, or partnership-related usage, written authorization must be obtained in advance from KG Sports management.
      </p>

      <h2>3. Third-Party Content</h2>
      <p>
        The website may occasionally feature materials such as photos, references, or resources from third-party sources. All such third-party content is used with appropriate permissions, licenses, or as permitted under applicable fair use provisions. Any third-party material remains the property of its rightful owner, and KG Sports does not claim ownership over such materials.
        If you believe that any material displayed on our website infringes upon your copyright or intellectual property rights, please contact us immediately with relevant details.
      </p>

      <h2>4. Reporting Copyright Infringement</h2>
      <p>
        KG Sports takes copyright infringement seriously. If you suspect that your copyrighted work has been used in a manner that constitutes an infringement, please provide the following details to our official contact:
      </p>
      <ul>
        <li>A detailed description of the copyrighted work.</li>
        <li>The exact URL or location where the infringing material appears.</li>
        <li>Proof of ownership or authorization.</li>
        <li>Your contact details for follow-up communication.</li>
      </ul>
      <p>
        Upon verification, KG Sports will promptly investigate and, if necessary, remove or restrict access to the infringing content.
      </p>

      <h2>5. Policy Updates</h2>
      <p>
        KG Sports reserves the right to modify, amend, or update this Copyright Policy as needed to reflect legal, technological, or operational changes. Users are encouraged to review this page periodically for updates. All changes will take effect immediately upon posting.
      </p>

      <h2>6. Contact Information</h2>
      <p>
        For copyright-related inquiries or reporting issues, please reach out to us at:
      </p>
      <p>
        📧 Email: <a href="mailto:info@kgsports.in">info@kgsports.in</a><br />
        📞 Phone: 7598959595<br />
        🏢 Address:<br />
        No.149/1, Ground Floor, Elango Street,<br />
        Tiruvalleeswarar Nagar,<br />
        Anna Nagar West,<br />
        Chennai - 600040, Tamil Nadu, India
      </p>

      <p>
        We value creativity, originality, and respect for intellectual property. Thank you for supporting KG Sports in maintaining an ethical and protected digital environment.
      </p>
    </div>
  );
}

export default Copyrights;