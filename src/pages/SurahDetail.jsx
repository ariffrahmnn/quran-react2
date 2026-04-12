import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from '../components/AudioPlayer';
import AyahAudio from '../components/AyahAudio';
import { getDetailSurah } from '../services/surahService';

export default function SurahDetail() {
  const { nomor } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 state untuk pilih qari
  const [qari, setQari] = useState("05");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDetailSurah(nomor);
        setDetail(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nomor]);

  if (loading) return <p>Loading...</p>;
  if (!detail) return <p>Data tidak ditemukan</p>;

  return (
    <div>
      <h1>{detail.namaLatin}</h1>
      <p dangerouslySetInnerHTML={{ __html: detail.deskripsi }} />

      {/* 🎧 PILIH QARI */}
      <div style={{ marginBottom: '20px' }}>
        <label>Pilih Qari: </label>
        <select value={qari} onChange={(e) => setQari(e.target.value)}>
          <option value="01">Abdullah Al-Juhany</option>
          <option value="02">Abdul Muhsin Al-Qasim</option>
          <option value="03">Abdurrahman As-Sudais</option>
          <option value="04">Ibrahim Al-Dossari</option>
          <option value="05">Misyari Rasyid Al-Afasi</option>
          <option value="06">Yasser Al-Dosari</option>
        </select>
      </div>

      {/* 🎧 AUDIO FULL */}
      <AudioPlayer audioUrl={detail.audioFull[qari]} />

      <hr />

      {/* 📖 AYAT */}
      {detail.ayat.map((ayat) => (
        <div key={ayat.nomorAyat} style={{ marginBottom: '20px' }}>
          <h3>Ayat {ayat.nomorAyat}</h3>
          <p style={{ fontSize: '24px' }}>{ayat.teksArab}</p>
          <p>{ayat.teksLatin}</p>
          <p>{ayat.teksIndonesia}</p>

          {/* 🎧 AUDIO PER AYAT */}
          <AyahAudio audioUrl={ayat.audio[qari]} />
        </div>
      ))}
    </div>
  );
}