import React from 'react';

export default function Hero({ onExploreClick }) {
    return (
      <section className="hero-section">
        <div className="hero-content">
          <h1>Al-Qur'an Digital</h1>
          <p>Created by saying Bismillah, We provide a website that has a beautiful UI and easy to use, now you can
          read Quran anywhere and anytime.</p>
          
          <button className="btn-explore" onClick={onExploreClick}>
            Start Reading
          </button>
        </div>
      </section>
    );
  }