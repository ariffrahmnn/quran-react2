import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDetailSurah } from '../services/surahService';
import AudioPlayer from '../components/AudioPlayer';
import AyahAudio from '../components/AyahAudio';

export default function SurahDetail() {
  const { nomor } = useParams(); // Menangkap :nomor dari URL
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 TAMBAHAN (pilih qari) 
  const [qari, setQari] = useState("05");

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
    
      <h1 style={{marginBottom: '80px'}}><Link to="/quran-react2" style={{color:'rgba(98, 129, 65)', textDecoration:'none'}}> ← </Link> {detail.namaLatin} ({detail.nama})</h1>

      {/* // bagian sini untuk memilih qari, dengan metode dropdown */}
      <div style={{ marginBottom: '20px', display:'flex', flexDirection:'column'}}>
        <label style={{marginBottom: '10px'}}>Pilih Qari</label>
        <select style={{background: 'rgba(98, 129, 65, 0.8)', padding: '5px', borderRadius: '8px', color:'white', borderColor:'rgba(98, 129, 65, 0.8)', width: '200px', margin:'auto'}} value={qari} onChange={(e) => setQari(e.target.value)}>
          <option value="01">Abdullah Al-Juhany</option>
          <option value="02">Abdul Muhsin Al-Qasim</option>
          <option value="03">Abdurrahman As-Sudais</option>
          <option value="04">Ibrahim Al-Dossari</option>
          <option value="05">Misyari Rasyid Al-Afasi</option>
          <option value="06">Yasser Al-Dosari</option>
        </select>
      </div>

        {/* /disini untuk menambahkan file audio full surah, dengan qari yang dipilih */}
      <AudioPlayer audioUrl={detail.audioFull[qari]} />
      
      <div className='card-container-detail'>
        {detail.ayat.map((item) => (
        <div className='card-content-detail'
          key={item.nomorAyat}>
          <h3> {item.teksArab} <span style={{fontSize: '18px'}}>({item.nomorAyat})</span></h3>
          <h2>{item.teksLatin}</h2>
          <h4>{item.teksIndonesia}</h4>

          {/* 🔥 TAMBAHAN: AUDIO PER AYAT */}
          <AyahAudio audioUrl={item.audio[qari]} />

        </div>
        ))}
      </div>

    </div>
  );
}