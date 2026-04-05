import { useState, useEffect } from 'react';
import { getAllSurah } from '../services/surahService';
import { Link } from 'react-router-dom';

export default function QuranList() {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchSurah();
  }, []);

  if (loading) return <p>Sedang memuat daftar surah...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    
    <div style={{ padding: '20px'}}>
      <h1 style={{marginBottom: '50px'}}>Daftar Surah</h1>

      <div className='card-container'>
        {surahs.map((surah) => (
          <Link 
            to={`/surat/${surah.nomor}`} 
            key={surah.nomor} 
            style={{ textDecoration: 'none', 
                      color: 'inherit' }}
          >
            <div className='card-content'>
              <h1>{surah.namaLatin} {surah.nama}</h1>
              <h4>{surah.arti}</h4>
              <div className='content'>
                <p><svg width="10px" height="10px" fill='#EBD5AB' viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g id="icomoon-ignore">
                    </g>
                    <path d="M9.069 2.672v14.928h-6.397c0 0 0 6.589 0 8.718s1.983 3.010 3.452 3.010c1.469 0 16.26 0 20.006 0 1.616 0 3.199-1.572 3.199-3.199 0-1.175 0-23.457 0-23.457h-20.259zM6.124 28.262c-0.664 0-2.385-0.349-2.385-1.944v-7.652h5.331v7.192c0 0.714-0.933 2.404-2.404 2.404h-0.542zM28.262 26.129c0 1.036-1.096 2.133-2.133 2.133h-17.113c0.718-0.748 1.119-1.731 1.119-2.404v-22.12h18.126v22.391z" fill="white">
                    </path>
                    <path d="M12.268 5.871h13.861v1.066h-13.861v-1.066z" fill="white">
                    </path>
                    <path d="M12.268 20.265h13.861v1.066h-13.861v-1.066z" fill="white">
                    </path>
                    <path d="M12.268 23.997h13.861v1.066h-13.861v-1.066z" fill="white">
                    </path>
                    <path d="M26.129 9.602h-13.861v7.997h13.861v-7.997zM25.063 16.533h-11.729v-5.864h11.729v5.864z" fill="#EBD5AB">
                    </path>
                      </svg> {surah.jumlahAyat}</p>
                <p><svg width="10px" height="10px" fill='#EBD5AB' viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path class="cls-1" d="M24,4.5A14.82,14.82,0,0,0,9.18,19.32h0c0,.34,0,.68,0,1v.08C9.78,28.52,16.52,35.05,24,43.5,31.81,34.68,38.82,28,38.82,19.32h0A14.82,14.82,0,0,0,24,4.5Zm0,7.7a7.13,7.13,0,1,1-7.13,7.12A7.13,7.13,0,0,1,24,12.2Z"/></svg> {surah.tempatTurun}</p>  
              </div>
              
            </div>

          </Link>
        ))}
      </div>
      
    </div>
  );
}