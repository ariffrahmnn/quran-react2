import { useState, useEffect } from 'react';
import { getAllSurah } from '../services/surahService';
import { Link } from 'react-router-dom';

export default function QuranList() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        setLoading(true);
        const data = await getAllSurah();
        setSurahs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah()}, []);

  if (loading) return <p>Sedang memuat daftar surah...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  // 🔥 TAMBAHAN: fungsi normalize
  const normalize = (text) =>
    text.toLowerCase().replace(/[-\s]/g, '');

  // 🔥 FILTER SUPER FLEXIBLE
  const filteredSurahs = surahs.filter((surah) => {
    const keyword = normalize(search.trim());

    return normalize(surah.namaLatin).includes(keyword);
  });

  return (
    <div style={{ padding: '20px'}}>
      

      {/* 🔥 SEARCH INPUT */}
      <input
        type="text"
        placeholder="Cari surah... (contoh: al baqarah)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          width: '85%',
          maxWidth: '400px',
          marginBottom: '30px',
          marginLeft: 'auto',
          marginRight: 'auto',
          background: 'rgba(98, 129, 65, 0.2)',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}/>


      <h1 style={{marginBottom: '20px'}}>Daftar Surah</h1>

      <div className='card-container'>
        {filteredSurahs.map((surah) => (
          <Link to={`/surat/${surah.nomor}`} 
            key={surah.nomor} 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className='card-content'>
              <h1>{surah.namaLatin} {surah.nama}</h1>
              <h4>{surah.arti}</h4>

              <div className='content'>
                <p>{surah.jumlahAyat}</p>
                <p>{surah.tempatTurun}</p>  
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}