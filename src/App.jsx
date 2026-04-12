import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRef } from 'react';

import Hero from './components/hero';
import Footer from './components/footer';
import QuranList from './pages/QuranList';
import SurahDetail from './pages/SurahDetail';

export default function App() {
  // 🔗 reference untuk scroll ke QuranList
  const quranListRef = useRef(null);

  // 🔽 function scroll
  const scrollToQuranList = () => {
    quranListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 HALAMAN UTAMA */}
        <Route
          path="/quran-react2"
          element={
            <>
              {/* Hero Section */}
              <Hero onExploreClick={scrollToQuranList} />

              {/* Quran List Section */}
              <div ref={quranListRef}>
                <QuranList />
              </div>
            </>
          }
        />

        {/* 📖 HALAMAN DETAIL SURAH */}
        <Route
          path="/surat/:nomor"
          element={<SurahDetail />}
        />

      </Routes>

      {/* 🔻 FOOTER (GLOBAL) */}
      <Footer />
    </BrowserRouter>
  );
}