

const Voucher = ({handleVoucher}) => {
  

  return (
    <section id='voucher'>
        <div className="title">
            <h2>Voucher</h2>
        </div>


        <div className="bottom">
        <div className='form'>
          <input type="text" placeholder="Enter voucher code" className="val-voucher" />
          <button className="btn-voucher" onClick={handleVoucher}>Apply</button>
        </div>

        <div className="note">
            <p>*wajib follow facebook Deleonwira untuk klaim voucher </p>
            <p>Klaim Voucher disini<a href="https://www.facebook.com/profile.php?id=100081692648188"> dapatkan voucherr</a></p>
            
        </div>
        </div>
    </section>
  )
}

export default Voucher