import React from 'react';

export default function Footer() {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} Quran App - Arif Developer</p>
      <div className="footer-links">
        <span>Built with React & equran.id API</span>
      </div>
    </footer>
  );
}