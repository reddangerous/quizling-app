import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-light text-center text-lg-start bottom">
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <p>App made possible by Opentb API</p>
        © {currentYear} Quizling-App: made with ❤️ by<br />
        <a className="text-dark" href="https://davidwainaina.netlify.app/">
          David Wainaina
        </a>
      </div>
    </footer>
  );
};

export default Footer;
