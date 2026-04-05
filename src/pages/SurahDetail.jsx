import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDetailSurah } from '../services/surahService';

export default function SurahDetail() {
  const { nomor } = useParams(); // Menangkap :nomor dari URL
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getDetailSurah(nomor);
        setDetail(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [nomor]); // Jalankan ulang jika nomor di URL berubah

  if (loading) return <p>Memuat ayat...</p>;

  return (
    <div style={{ padding: '20px' }}>
    
      <h1 style={{
        marginBottom: '80px',
        
        }}><Link to="/">←</Link> {detail.namaLatin} ({detail.nama})</h1>
      
      <div className='card-container-detail'>
        {detail.ayat.map((item) => (
        <div className='card-content-detail'
          key={item.nomorAyat}>
          <h3> {item.teksArab} <span style={{fontSize: '18px'}}>({item.nomorAyat})</span></h3>
          <h2>{item.teksLatin}</h2>
          <h4>{item.teksIndonesia}</h4>
        </div>
        ))}
      </div>

    </div>
  );
}
