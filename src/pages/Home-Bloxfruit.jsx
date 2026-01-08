

import Header from '../components/Header/Header'
import Qna from '../components/Qna/Qna'
import Sold from '../components/Sold/Sold'
import Testimonials from '../components/Testimonials/Testimonials'
import CardAkun from '../components/Card/CardAkun'
import CardFruit from '../components/Card/CardFruit'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Voucher from '../components/Voucher/Voucher';
import $ from 'jquery';



const HomeBloxFruit = () => {
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
    // Menampilkan animasi loading
    showLoading();

    // Menyembunyikan animasi loading setelah 3 detik (3000 milidetik)
    const timeoutId = setTimeout(() => {
      hideLoading();
    }, 500);

    // Membersihkan timeout jika komponen dibongkar sebelum waktu habis
    return () => clearTimeout(timeoutId);
  }, []);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };


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
            <CardAkun loading ={loading} voucher={voucher}/>
            <CardFruit loading ={loading}/>
            <Sold/>
            <Voucher handleVoucher={handleVoucher}/>
            <Testimonials/>
            <Qna/>
        </div>

    <Footer/>
    </div>
    
  )
}

export default HomeBloxFruit