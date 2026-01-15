import Header from '../components/Header/Header'
import Qna from '../components/Qna/Qna'
import Testimonials from '../components/Testimonials/Testimonials'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Voucher from '../components/Voucher/Voucher';
import $ from 'jquery';
import CardCategory from '../components/Card/CardCategory'



const HomePage = () => {
  const [voucher, isVoucher] = useState(false);
  const [loading, setLoading] = useState(true);

    function handleVoucher() {
    const voucherCode = $('.val-voucher').val();
    if (voucherCode === 'CATMIDKECEasdasiud') {
      isVoucher(true);
      alert('Voucher 5% berhasil diaktifkan');
    } 
    
    else {
      alert('Voucher tidak valid');
    }
    }
    
    window.scrollTo(0,0);
  

  useEffect(() => {
    // Menyembunyikan animasi loading setelah 3 detik (3000 milidetik)
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Membersihkan timeout jika komponen dibongkar sebelum waktu habis
    return () => clearTimeout(timeoutId);
  }, []);




  return (
    <div className='containers'>
      <Helmet>
        <title>Beli Akun Blox Fruit</title>
        <meta name='description' content='Menyediakan Akun Blox Fruit yang super murah dan anti hb 100%' />
        <meta name='keywords' content='blox fruit, roblox, beli akun,beli fruit'/>
      </Helmet>
      <Navbar loading={loading}/>
      <Header loading={loading}/>
      <div className="container">
          <CardCategory title="akun" loading={loading} voucher={voucher} />
          <CardCategory title="fruit" loading={loading} />
          <CardCategory title="sold" />
          <Voucher handleVoucher={handleVoucher} />
          <Testimonials />
          <Qna />
      </div>

    <Footer/>
    </div>
    
  )
}

export default HomePage