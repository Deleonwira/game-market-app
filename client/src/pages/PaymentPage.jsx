import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import dataAkun from "../assets/data/dataAkun.json";

const PaymentPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const voucherInputRef = useRef(null);

  const [selectedMethod, setSelectedMethod] = useState('whatsapp');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [voucher, setVoucher] = useState(null);
  const [voucherInput, setVoucherInput] = useState('');

  const akunTunggal = dataAkun.find(akun => akun.cardId === Number(productId));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!akunTunggal) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Produk tidak ditemukan</h2>
            <p>Silakan kembali ke halaman sebelumnya</p>
          </div>
        </div>
      </>
    );
  }

  const paymentMethods = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Payment',
      desc: 'Hubungi seller via WhatsApp',
      icon: '💬'
    },
    {
      id: 'qris',
      name: 'QRIS',
      desc: 'Scan QR untuk bayar',
      icon: '📱'
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      desc: 'BCA, BNI, Mandiri, BRI',
      icon: '🏦'
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      desc: 'DANA, OVO, GoPay, ShopeePay',
      icon: '💳'
    }
  ];

  const handleApplyVoucher = () => {
    const code = voucherInput.trim().toUpperCase();
    if (code === 'CATMIDKECE' || code === 'CATMID5') {
      setVoucher({
        code: code,
        discount: 0.05, // 5%
        label: 'Diskon 5%'
      });
      alert('Voucher berhasil diaktifkan! Diskon 5%');
    } else {
      alert('Kode voucher tidak valid');
    }
  };

  const removeVoucher = () => {
    setVoucher(null);
    setVoucherInput('');
  };

  const calculateDiscount = () => {
    if (!voucher) return 0;
    return Math.floor(akunTunggal.harga * voucher.discount);
  };

  const calculateTotal = () => {
    return akunTunggal.harga - calculateDiscount();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    const productInfo = `Halo, saya ingin membeli:\n\n` +
      `📦 *${akunTunggal.judul}*\n` +
      `💰 Harga: ${formatPrice(akunTunggal.harga)}\n` +
      (voucher ? `🎫 Voucher: ${voucher.code} (-${formatPrice(calculateDiscount())})\n` : '') +
      `💵 *Total: ${formatPrice(calculateTotal())}*\n\n` +
      `📱 WhatsApp: ${whatsappNumber || '-'}\n` +
      `📝 Catatan: ${notes || '-'}\n\n` +
      `Metode Pembayaran: ${paymentMethods.find(m => m.id === selectedMethod)?.name}`;

    const encodedMessage = encodeURIComponent(productInfo);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=6283103293225&text=${encodedMessage}&type=phone_number&app_absent=0`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Checkout - {akunTunggal.judul} | CatMid</title>
      </Helmet>

      <Navbar />

      <section id="payment-page">
        <div className="container">
          <div className="content-wrapper">
            {/* Order Summary */}
            <div className="order-summary">
              <div className="section-title">
                <span className="icon">📦</span>
                <h3>Ringkasan Pesanan</h3>
              </div>
              <div className="product-card">
                <img
                  src={akunTunggal.img}
                  alt={akunTunggal.judul}
                  className="product-image"
                />
                <div className="product-info">
                  <h4 className="product-title">{akunTunggal.judul}</h4>
                  <p className="product-game">Roblox: Blox Fruit</p>
                  <div className="product-price">
                    {formatPrice(akunTunggal.harga)}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="payment-method">
              <div className="section-title">
                <span className="icon">💳</span>
                <h3>Metode Pembayaran</h3>
              </div>
              <div className="method-options">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`method-option ${selectedMethod === method.id ? 'selected' : ''}`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                    />
                    <span className="radio-custom"></span>
                    <span className="method-icon">{method.icon}</span>
                    <div className="method-info">
                      <span className="method-name">{method.name}</span>
                      <span className="method-desc">{method.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Buyer Information */}
            <div className="buyer-info">
              <div className="section-title">
                <span className="icon">📝</span>
                <h3>Informasi Pembeli</h3>
              </div>
              <div className="form-group">
                <label htmlFor="whatsapp">Nomor WhatsApp</label>
                <input
                  type="tel"
                  id="whatsapp"
                  placeholder="Contoh: 081234567890"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="notes">Catatan (Opsional)</label>
                <textarea
                  id="notes"
                  placeholder="Pesan tambahan untuk seller..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Voucher Section */}
            <div className="voucher-section">
              <div className="section-title">
                <span className="icon">🎫</span>
                <h3>Kode Voucher</h3>
              </div>
              {voucher ? (
                <div className="voucher-applied">
                  <span>✓</span>
                  <span className="voucher-code">{voucher.code}</span>
                  <span>- {voucher.label}</span>
                  <button
                    className="remove-voucher"
                    onClick={removeVoucher}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="voucher-input-wrapper">
                  <input
                    type="text"
                    placeholder="Masukkan kode voucher"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                    ref={voucherInputRef}
                  />
                  <button onClick={handleApplyVoucher}>
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="price-summary">
              <div className="price-row">
                <span className="label">Subtotal</span>
                <span className="value">{formatPrice(akunTunggal.harga)}</span>
              </div>
              {voucher && (
                <div className="price-row discount">
                  <span className="label">Voucher ({voucher.code})</span>
                  <span className="value">- {formatPrice(calculateDiscount())}</span>
                </div>
              )}
              <div className="price-row total">
                <span className="label">Total</span>
                <span className="value">{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>

          {/* Fixed Checkout Button */}
          <div className="checkout-button">
            <div className="container">
              <button onClick={handleCheckout}>
                <span className="icon">🛒</span>
                <span>Konfirmasi Pesanan</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PaymentPage;