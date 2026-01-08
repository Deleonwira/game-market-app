
import dataAkun from "../assets/data/dataAkun";
import DisplayDagangan from '../components/DisplayDagangan/DisplayDagangan';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import { Helmet } from "react-helmet";
import Voucher from "../components/Voucher/Voucher";
import { useState } from "react";
import $ from 'jquery'

const ProductDetailPage = () => {
    const [voucher, isVoucher] = useState(false);

    function handleVoucher() {
        const voucherCode = $('.val-voucher').val();
        if (voucherCode === 'CATMIDKECE') {
          isVoucher(true);
          alert('Voucher 5% berhasil diaktifkan');
        } 
        
        else {
          alert('Voucher tidak valid');
        }
          
          
        }
    const {productId} = useParams(); //untuk mengambil props id path
    

    const akunTunggal = dataAkun.find(akun => akun.cardId === Number(productId));


    return (
        <>
            <Navbar/>
        
        <div className='container'>
            <Helmet>
                <title>{akunTunggal.judul}</title>
            </Helmet>
            <DisplayDagangan akunTunggal = {akunTunggal} voucher={voucher}/>
        
        <Voucher voucher={voucher} handleVoucher={handleVoucher}/>
        <Footer/>
        </div>
        </>
    
    )
}

export default ProductDetailPage;