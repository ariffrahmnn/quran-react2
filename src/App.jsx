import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { useRef } from 'react';
import Hero from './components/hero';
import Footer from './components/footer';
import QuranList from './pages/QuranList';
import SurahDetail from './pages/SurahDetail';

export default function App() {

  const quranListRef = useRef(null);
  const scrollToQuotes = () => {
    quranListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Hero onExploreClick={scrollToQuotes} />
            
            <div ref={quranListRef}>
              <QuranList />
            </div>
          </>
        } />
        <Route path="/surat/:nomor" element={<SurahDetail />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}