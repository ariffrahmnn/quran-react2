import quranApi from './api';

export const getAllSurah = async () => {
  try {
    const response = await quranApi.get('/surat');
    
    return response.data.data; 
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Gagal mengambil daftar surah');
  }
};

export const getDetailSurah = async (nomor) => {
    try {
      const response = await quranApi.get(`/surat/${nomor}`);
      return response.data.data; // 
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Gagal memuat detail surah');
    }
  };